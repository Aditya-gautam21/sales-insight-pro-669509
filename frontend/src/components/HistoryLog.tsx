import React from 'react';
import { ResearchSession } from '@/types/sales';
import { Clock, ChevronRight } from 'lucide-react';

interface HistoryLogProps {
  sessions: ResearchSession[];
  onSelect: (session: ResearchSession) => void;
  currentSessionId?: string;
}

export const HistoryLog: React.FC<HistoryLogProps> = ({ sessions, onSelect, currentSessionId }) => {
  if (sessions.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center gap-2">
        <Clock className="w-4 h-4 text-slate-400" />
        <h3 className="font-semibold text-slate-800">Recent Research</h3>
      </div>
      <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => onSelect(session)}
            className={`w-full text-left p-4 hover:bg-slate-50 transition-colors group flex items-center justify-between ${
              currentSessionId === session.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : ''
            }`}
          >
            <div>
              <p className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                {session.input.companyName}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {session.input.targetRole} • {new Date(session.timestamp).toLocaleDateString()}
              </p>
            </div>
            <ChevronRight className={`w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors ${
              currentSessionId === session.id ? 'text-indigo-600' : ''
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
};
