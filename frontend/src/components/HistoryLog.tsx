import React from 'react';
import { ResearchSession } from '@/types/sales';
import { Clock, ChevronRight, Trash2, Calendar, LayoutGrid, FileText, Download, RotateCcw, Search } from 'lucide-react';

interface HistoryLogProps {
  sessions: ResearchSession[];
  onSelect: (session: ResearchSession) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  onExport?: (session: ResearchSession) => void;
  currentSessionId?: string;
  isSidebar?: boolean;
}

export const HistoryLog: React.FC<HistoryLogProps> = ({ 
  sessions, 
  onSelect, 
  onDelete, 
  onClearAll,
  onExport,
  currentSessionId,
  isSidebar = false 
}) => {
  if (sessions.length === 0) {
    return (
      <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-slate-200 text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-slate-300" />
        </div>
        <p className="text-slate-500 font-medium text-lg mb-4">Start finding leads!</p>
        <button 
          onClick={() => (document.querySelector('input[type="text"]') as HTMLInputElement)?.focus()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
        >
          <Search className="w-4 h-4" />
          Quick-search now
        </button>
      </div>
    );
  }

  if (isSidebar) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <h3 className="font-semibold text-slate-800">Recent Research</h3>
          </div>
        </div>
        <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`group flex items-center justify-between hover:bg-slate-50 transition-colors ${
                currentSessionId === session.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
              }`}
            >
              <button
                onClick={() => onSelect(session)}
                className="flex-grow text-left p-4"
              >
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {session.input.companyName}
                  </p>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-md">
                    {session.insights.leadScore.score}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {session.input.targetRole} • {new Date(session.timestamp).toLocaleDateString()}
                </p>
              </button>
              <div className="pr-4 flex items-center gap-2">
                <button
                  onClick={() => onDelete(session.id)}
                  className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <ChevronRight className={`w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors ${
                  currentSessionId === session.id ? 'text-indigo-600' : ''
                }`} />
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          <button
            onClick={onClearAll}
            className="w-full py-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear All History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold">Research History</h3>
        </div>
        <button
          onClick={onClearAll}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"
        >
          <Trash2 className="w-4 h-4" />
          Clear All History
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden group hover:border-indigo-300 transition-all">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-indigo-50 p-3 rounded-xl">
                  <LayoutGrid className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="flex gap-2">
                   <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-right">Lead Score</span>
                    <span className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-sm shadow-indigo-200">
                      {session.insights.leadScore.score}
                    </span>
                  </div>
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-slate-900 mb-1">{session.input.companyName}</h4>
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                <Calendar className="w-4 h-4" />
                {new Date(session.timestamp).toLocaleString()}
              </div>

              <div className="space-y-3 mb-6">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Persona</div>
                  <div className="text-sm font-semibold text-slate-700 truncate">{session.input.targetRole} in {session.input.industry}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onSelect(session)}
                  className="flex-grow flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs transition-all shadow-sm shadow-indigo-100"
                >
                  <FileText className="w-4 h-4" />
                  Expand
                </button>
                <button
                  onClick={() => onSelect(session)}
                  className="p-2.5 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 border border-slate-200 rounded-xl transition-all shadow-sm"
                  title="Regen / Load"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                {onExport && (
                  <button
                    onClick={() => onExport(session)}
                    className="p-2.5 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 border border-slate-200 rounded-xl transition-all shadow-sm"
                    title="Export CSV"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onDelete(session.id)}
                  className="p-2.5 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 border border-slate-200 hover:border-red-200 rounded-xl transition-all shadow-sm"
                  title="Delete Research"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};