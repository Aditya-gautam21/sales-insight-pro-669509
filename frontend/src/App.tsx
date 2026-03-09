import React from 'react';
import { ResearchForm } from '@/components/ResearchForm';
import { InsightsDisplay } from '@/components/InsightsDisplay';
import { HistoryLog } from '@/components/HistoryLog';
import { ResearchInput, SalesInsights, ResearchSession } from '@/types/sales';
import { salesService } from '@/services/sales.service';
import { Sparkles, History, LayoutDashboard, Send } from 'lucide-react';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentSession, setCurrentSession] = React.useState<ResearchSession | null>(null);
  const [history, setHistory] = React.useState<ResearchSession[]>(() => {
    const saved = localStorage.getItem('sales_research_history');
    return saved ? JSON.parse(saved) : [];
  });

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
      const updatedHistory = [newSession, ...history].slice(0, 50);
      setHistory(updatedHistory);
      localStorage.setItem('sales_research_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Failed to generate insights:', error);
      alert('Failed to generate sales insights. Please try again.');
    } finally {
      setIsLoading(false);
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
      // Update history as well
      const updatedHistory = history.map(h => h.id === currentSession.id ? updatedSession : h);
      setHistory(updatedHistory);
      localStorage.setItem('sales_research_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Failed to refine insights:', error);
      alert('Failed to refine sales insights. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSession = (session: ResearchSession) => {
    setCurrentSession(session);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <a href="#" className="text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 pb-1">Dashboard</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">History</a>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">Templates</a>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <div className="flex items-center gap-2 mb-4">
                <LayoutDashboard className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold">Research Input</h3>
              </div>
              <ResearchForm onSubmit={handleResearch} isLoading={isLoading} />
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
              <div className="flex items-center gap-2 mb-4">
                <History className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold">Research History</h3>
              </div>
              <HistoryLog 
                sessions={history} 
                onSelect={handleSelectSession} 
                currentSessionId={currentSession?.id} 
              />
            </section>

            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
              <h4 className="font-bold text-indigo-900 mb-2">Pro Tip</h4>
              <p className="text-sm text-indigo-800 leading-relaxed">
                Personalized emails with specific pain points get 3x higher response rates. Use the generated insights to customize your outreach even further.
              </p>
            </div>
          </aside>
        </div>
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