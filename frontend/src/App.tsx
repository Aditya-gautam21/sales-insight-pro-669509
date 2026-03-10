import React from 'react';
import { ResearchForm } from '@/components/ResearchForm';
import { InsightsDisplay } from '@/components/InsightsDisplay';
import { HistoryLog } from '@/components/HistoryLog';
import { TemplatesList } from '@/components/TemplatesList';
import { ResearchInput, SalesInsights, ResearchSession, Template } from '@/types/sales';
import { salesService } from '@/services/sales.service';
import { Sparkles, History, LayoutDashboard, Send, FileText } from 'lucide-react';

const DEFAULT_TEMPLATES: Template[] = [
  {
    id: 't-1',
    name: "Fintech Outreach",
    input: { companyName: "", industry: "Fintech", targetRole: "Head of Sales", productService: "AI lead scoring tool", tone: "Professional" }
  },
  {
    id: 't-2',
    name: "Quick Commerce Pitch",
    input: { companyName: "", industry: "Quick Commerce", targetRole: "Manager", productService: "Cheaper ad platform", tone: "Casual" }
  },
  {
    id: 't-3',
    name: "Custom Blank",
    input: { companyName: "", industry: "", targetRole: "", productService: "", tone: "Professional" }
  }
];

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'history' | 'templates'>(() => {
    return (localStorage.getItem('activeTab') as any) || 'dashboard';
  });
  const [currentSession, setCurrentSession] = React.useState<ResearchSession | null>(null);
  const [currentFormData, setCurrentFormData] = React.useState<ResearchInput>({
    companyName: '',
    industry: '',
    targetRole: '',
    productService: '',
    tone: 'Professional',
  });
  
  const [history, setHistory] = React.useState<ResearchSession[]>(() => {
    const saved = localStorage.getItem('researchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [templates, setTemplates] = React.useState<Template[]>(() => {
    const saved = localStorage.getItem('templates');
    return saved ? JSON.parse(saved) : DEFAULT_TEMPLATES;
  });

  React.useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  React.useEffect(() => {
    localStorage.setItem('researchHistory', JSON.stringify(history));
  }, [history]);

  React.useEffect(() => {
    localStorage.setItem('templates', JSON.stringify(templates));
  }, [templates]);

  const handleResearch = async (input: ResearchInput) => {
    setIsLoading(true);
    try {
      const insights = await salesService.generateInsights(input);
      const newSession: ResearchSession = {
        id: crypto.randomUUID(),
        input,
        insights,
        timestamp: Date.now(),
      };
      
      setCurrentSession(newSession);
      const updatedHistory = [newSession, ...history].slice(0, 10); // Limit to last 10 entries
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to generate insights:', error);
      alert('Failed to generate sales insights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSession = (id: string) => {
    setHistory(history.filter(h => h.id !== id));
    if (currentSession?.id === id) setCurrentSession(null);
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      setHistory([]);
      setCurrentSession(null);
    }
  };

  const handleRefine = async (newTone: string) => {
    if (!currentSession) return;
    setIsLoading(true);
    try {
      const updatedInput = { ...currentSession.input, tone: newTone };
      const refinedInsights = await salesService.refineInsights({ 
        ...updatedInput, 
        focus: `Refine outreach with ${newTone} tone` 
      });
      
      const updatedSession: ResearchSession = {
        ...currentSession,
        input: updatedInput,
        insights: refinedInsights,
      };
      
      setCurrentSession(updatedSession);
      const updatedHistory = history.map(h => h.id === currentSession.id ? updatedSession : h);
      setHistory(updatedHistory);
    } catch (error) {
      console.error('Failed to refine insights:', error);
      alert('Failed to refine sales insights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSession = (session: ResearchSession) => {
    setCurrentSession(session);
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadTemplate = (template: Template) => {
    setCurrentFormData(template.input);
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveAsTemplate = () => {
    const name = prompt('Enter a name for this template:');
    if (name) {
      const newTemplate: Template = {
        id: crypto.randomUUID(),
        name,
        input: { ...currentFormData }
      };
      setTemplates([...templates, newTemplate]);
      alert('Template saved!');
    }
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const handleExportTemplates = () => {
    if (templates.length === 0) return;
    
    const headers = ['Name', 'Industry', 'Target Role', 'Product/Service', 'Tone'];
    const rows = templates.map(t => [
      t.name,
      t.input.industry,
      t.input.targetRole,
      t.input.productService.replace(/"/g, '""'), // Escape quotes for CSV
      t.input.tone
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'sales_templates.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">SalesResearcher</h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">B2B Outreach Assistant</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`text-sm font-medium pb-1 transition-all ${activeTab === 'dashboard' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('history')}
              className={`text-sm font-medium pb-1 transition-all ${activeTab === 'history' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              History
            </button>
            <button 
              onClick={() => setActiveTab('templates')}
              className={`text-sm font-medium pb-1 transition-all ${activeTab === 'templates' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Templates
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Research & Outreach</h2>
                    <p className="text-indigo-100 max-w-md">
                      Analyze target companies and generate high-converting sales copy in seconds.
                    </p>
                  </div>
                  <Sparkles className="w-12 h-12 text-indigo-200/50" />
                </div>
              </div>

              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-bold">Research Input</h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('templates')}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Use Template
                  </button>
                </div>
                <ResearchForm 
                  onSubmit={handleResearch} 
                  isLoading={isLoading} 
                  initialData={currentFormData}
                  onChange={setCurrentFormData}
                />
              </section>

              {currentSession && (
                <section className="pt-8 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-lg font-bold">Generated Insights: {currentSession.input.companyName}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                        {currentSession.input.tone} Tone
                      </span>
                    </div>
                  </div>
                  <InsightsDisplay 
                    insights={currentSession.insights} 
                    onRefineTone={handleRefine}
                    isLoading={isLoading}
                  />
                </section>
              )}
            </div>

            {/* Sidebar Area */}
            <aside className="lg:col-span-4 space-y-8">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-bold">Recent Activity</h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('history')}
                    className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    View All
                  </button>
                </div>
                <HistoryLog 
                  sessions={history} 
                  onSelect={handleSelectSession} 
                  onDelete={handleDeleteSession}
                  onClearAll={handleClearHistory}
                  currentSessionId={currentSession?.id} 
                  isSidebar={true}
                />
              </section>

              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  SDR Pro Tip
                </h4>
                <p className="text-sm text-indigo-800 leading-relaxed">
                  Personalized emails with specific pain points get 3x higher response rates. Use the generated insights to customize your outreach even further.
                </p>
              </div>
            </aside>
          </div>
        )}

        {activeTab === 'history' && (
          <HistoryLog 
            sessions={history} 
            onSelect={handleSelectSession} 
            onDelete={handleDeleteSession}
            onClearAll={handleClearHistory}
            isSidebar={false}
          />
        )}

        {activeTab === 'templates' && (
          <TemplatesList 
            templates={templates}
            onLoad={handleLoadTemplate}
            onDelete={handleDeleteTemplate}
            onSaveCurrent={handleSaveAsTemplate}
            onExport={handleExportTemplates}
          />
        )}
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">© 2026 SalesResearcher Assistant. Powered by AI Insights.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;