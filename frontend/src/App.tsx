import React from 'react';
import { ResearchForm } from '@/components/ResearchForm';
import { InsightsDisplay } from '@/components/InsightsDisplay';
import { HistoryLog } from '@/components/HistoryLog';
import { TemplatesList } from '@/components/TemplatesList';
import { ResearchInput, SalesInsights, ResearchSession, Template } from '@/types/sales';
import { salesService } from '@/services/sales.service';
import { Sparkles, History, LayoutDashboard, Send, FileText, Download, AlertCircle, Search } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'history' | 'templates'>(() => {
    return (localStorage.getItem('activeTab') as any) || 'dashboard';
  });
  const [currentSession, setCurrentSession] = React.useState<ResearchSession | null>(null);
  const [bulkInsights, setBulkInsights] = React.useState<(SalesInsights & { companyName: string })[]>([]);
  const [currentFormData, setCurrentFormData] = React.useState<ResearchInput>({
    companyName: '',
    industry: '',
    targetRole: '',
    productService: '',
    tone: 'Professional',
  });
  
  const [history, setHistory] = React.useState<ResearchSession[]>([]);
  const [templates, setTemplates] = React.useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSuggesting, setIsSuggesting] = React.useState(false);

  const fetchHistory = React.useCallback(async () => {
    try {
      const data = await salesService.getHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to fetch history:', error);
    }
  }, []);

  const fetchTemplates = React.useCallback(async () => {
    try {
      const data = await salesService.getTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('activeTab', activeTab);
    if (activeTab === 'history') fetchHistory();
    if (activeTab === 'templates') fetchTemplates();
  }, [activeTab, fetchHistory, fetchTemplates]);

  React.useEffect(() => {
    fetchHistory();
    fetchTemplates();
  }, [fetchHistory, fetchTemplates]);

  const handleResearch = async (input: ResearchInput) => {
    setIsLoading(true);
    setBulkInsights([]);
    setCurrentSession(null);
    try {
      const result = await salesService.generateInsights(input);
      
      if (Array.isArray(result.insights)) {
        setBulkInsights(result.insights);
      } else {
        const newSession: ResearchSession = {
          id: crypto.randomUUID(),
          input,
          insights: result.insights,
          timestamp: Date.now(),
        };
        setCurrentSession(newSession);
      }
      fetchHistory();
    } catch (error) {
      console.error('Failed to generate insights:', error);
      alert('Failed to generate sales insights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSession = async (id: string) => {
    try {
      await salesService.deleteHistory(id);
      setHistory(history.filter(h => h.id !== id));
      if (currentSession?.id === id) setCurrentSession(null);
    } catch (error) {
      console.error('Failed to delete history:', error);
    }
  };

  const handleClearHistory = async () => {
    if (confirm('Are you sure you want to clear all history?')) {
      try {
        await salesService.clearHistory();
        setHistory([]);
        setCurrentSession(null);
      } catch (error) {
        console.error('Failed to clear history:', error);
      }
    }
  };

  const handleRefine = async (newTone: string) => {
    if (!currentSession) return;
    setIsLoading(true);
    try {
      const updatedInput = { ...currentSession.input, tone: newTone };
      const result = await salesService.generateInsights(updatedInput);
      
      if (!Array.isArray(result.insights)) {
        const updatedSession: ResearchSession = {
          ...currentSession,
          input: updatedInput,
          insights: result.insights,
        };
        setCurrentSession(updatedSession);
        fetchHistory();
      }
    } catch (error) {
      console.error('Failed to refine insights:', error);
      alert('Failed to refine sales insights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSession = (session: ResearchSession) => {
    setCurrentSession(session);
    setBulkInsights([]);
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadTemplate = (template: Template) => {
    setCurrentFormData(template.input);
    setActiveTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveAsTemplate = async () => {
    const name = prompt('Enter a name for this template:');
    if (name) {
      try {
        const newTemplate = await salesService.createTemplate(name, currentFormData);
        setTemplates([...templates, newTemplate]);
        alert('Template saved!');
      } catch (error) {
        console.error('Failed to save template:', error);
      }
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    try {
      await salesService.deleteTemplate(id);
      setTemplates(templates.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete template:', error);
    }
  };

  const handleSuggestTemplate = async () => {
    setIsSuggesting(true);
    try {
      const suggested = await salesService.suggestTemplate();
      const newTemplate = await salesService.createTemplate(suggested.name, suggested.input);
      setTemplates([newTemplate, ...templates]);
      alert('AI suggested a new template based on your history!');
    } catch (error: any) {
      console.error('Failed to suggest template:', error);
      alert(error.response?.data?.message || 'Failed to suggest template. Try generating more research first.');
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleExportCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const rows = data.map(item => headers.map(header => {
      const val = (item as any)[header];
      if (typeof val === 'string') {
        return '"' + val.replace(/"/g, '""') + '"';
      }
      return val;
    }));
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportAllHistory = () => {
    const exportData = history.map(h => ({
      Date: new Date(h.timestamp).toLocaleString(),
      Company: h.input.companyName,
      Industry: h.input.industry,
      Score: h.insights.leadScore.score,
      PainPoints: h.insights.painPoints.join('; '),
      Email: h.insights.coldEmail
    }));
    handleExportCSV(exportData, 'sales_research_history.csv');
  };

  const filteredHistory = history.filter(h => 
    h.input.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.input.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg"><Send className="w-6 h-6 text-white" /></div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">SalesResearcher</h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">B2B Outreach Assistant</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => setActiveTab('dashboard')} className={`text-sm font-medium pb-1 transition-all ${activeTab === 'dashboard' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>Dashboard</button>
            <button onClick={() => setActiveTab('history')} className={`text-sm font-medium pb-1 transition-all ${activeTab === 'history' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>History</button>
            <button onClick={() => setActiveTab('templates')} className={`text-sm font-medium pb-1 transition-all ${activeTab === 'templates' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}>Templates</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-8 text-white shadow-lg">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Research & Outreach</h2>
                    <p className="text-indigo-100 max-w-md">Analyze target companies and generate high-converting sales copy in seconds.</p>
                  </div>
                  <Sparkles className="w-12 h-12 text-indigo-200/50" />
                </div>
              </div>
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-indigo-600" /><h3 className="text-lg font-bold">Research Input</h3></div>
                  <button onClick={() => setActiveTab('templates')} className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Use Template</button>
                </div>
                <ResearchForm onSubmit={handleResearch} isLoading={isLoading} initialData={currentFormData} onChange={setCurrentFormData} />
              </section>

              {bulkInsights.length > 0 && (
                <section className="pt-8 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-600" /><h3 className="text-lg font-bold">Bulk Leads Found ({bulkInsights.length})</h3></div>
                    <button onClick={() => setBulkInsights([])} className="text-xs font-bold text-slate-400 hover:text-indigo-600">Clear Leads</button>
                  </div>
                  <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Company</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Score</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Key Pain</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {bulkInsights.map((insight, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-800">{insight.companyName}</td>
                            <td className="px-6 py-4"><span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-bold text-xs">{insight.leadScore.score}</span></td>
                            <td className="px-6 py-4 text-sm text-slate-600 truncate max-w-[200px]">{insight.painPoints[0]}</td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => { 
                                  const sess: ResearchSession = { 
                                    id: `bulk-${idx}-${Date.now()}`, 
                                    input: { ...currentFormData, companyName: insight.companyName || '' }, 
                                    insights: insight, 
                                    timestamp: Date.now() 
                                  };
                                  setCurrentSession(sess);
                                  window.scrollTo({ top: document.getElementById('insights-section')?.offsetTop || 500, behavior: 'smooth' });
                                }} 
                                className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all"
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {currentSession && (
                <section id="insights-section" className="pt-8 border-t border-slate-200">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-600" /><h3 className="text-lg font-bold">Generated Insights: {currentSession.input.companyName}</h3></div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">{currentSession.input.tone} Tone</span>
                      <button onClick={() => handleExportCSV([currentSession.insights], `${currentSession.input.companyName}_insights.csv`)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Export Insights"><Download className="w-5 h-5" /></button>
                    </div>
                  </div>
                  <InsightsDisplay insights={currentSession.insights} onRefineTone={handleRefine} isLoading={isLoading} />
                </section>
              )}
            </div>

            <aside className="lg:col-span-4 space-y-8">
              <section>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><History className="w-5 h-5 text-indigo-600" /><h3 className="text-lg font-bold">Recent Activity</h3></div>
                  <button onClick={() => setActiveTab('history')} className="text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">View All</button>
                </div>
                <HistoryLog 
                  sessions={history.slice(0, 5)} 
                  onSelect={handleSelectSession} 
                  onDelete={handleDeleteSession} 
                  onClearAll={handleClearHistory} 
                  onExport={(s) => handleExportCSV([s.insights], `${s.input.companyName}_insights.csv`)}
                  currentSessionId={currentSession?.id} 
                  isSidebar={true} 
                />
              </section>
            </aside>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input type="text" placeholder="Search history by company or industry..." className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-600 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
              <button onClick={handleExportAllHistory} className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"><Download className="w-5 h-5" /> Export All</button>
            </div>
            <HistoryLog 
              sessions={filteredHistory} 
              onSelect={handleSelectSession} 
              onDelete={handleDeleteSession} 
              onClearAll={handleClearHistory} 
              onExport={(s) => handleExportCSV([s.insights], `${s.input.companyName}_insights.csv`)}
              isSidebar={false} 
            />
          </div>
        )}

        {activeTab === 'templates' && (
          <TemplatesList templates={templates} onLoad={handleLoadTemplate} onDelete={handleDeleteTemplate} onSaveCurrent={handleSaveAsTemplate} onExport={() => handleExportCSV(templates.map(t => ({ Name: t.name, Industry: t.input.industry, Role: t.input.targetRole, Product: t.input.productService })), 'sales_templates.csv')} onSuggest={handleSuggestTemplate} isSuggesting={isSuggesting} />
        )}
      </main>
      <footer className="bg-white border-t border-slate-200 py-8 mt-12"><div className="max-w-7xl mx-auto px-4 text-center"><p className="text-sm text-slate-500">© 2026 SalesResearcher Assistant. Powered by AI Insights.</p></div></footer>
    </div>
  );
};

export default App;
