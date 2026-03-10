import React from 'react';
import { Template } from '@/types/sales';
import { FileText, Download, Play, PlusCircle, Trash2 } from 'lucide-react';

interface TemplatesListProps {
  templates: Template[];
  onLoad: (template: Template) => void;
  onDelete: (id: string) => void;
  onSaveCurrent: () => void;
  onExport: () => void;
}

export const TemplatesList: React.FC<TemplatesListProps> = ({ 
  templates, 
  onLoad, 
  onDelete, 
  onSaveCurrent,
  onExport 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold">Outreach Templates</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={onSaveCurrent}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Save Current as Template
          </button>
        </div>
      </div>

      {templates.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-slate-200 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium text-lg mb-1">Save your first template from the dashboard!</p>
          <p className="text-slate-400 text-sm italic">Pre-fill common outreach scenarios to speed up your research.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-all group relative">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
                <button 
                  onClick={() => onDelete(template.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <h4 className="text-lg font-bold text-slate-900 mb-1">{template.name}</h4>
              <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider mb-4">
                {template.input.industry} • {template.input.targetRole}
              </p>
              
              <div className="space-y-2 mb-6">
                <div className="text-xs text-slate-500 flex justify-between">
                  <span className="font-semibold">Tone:</span>
                  <span>{template.input.tone}</span>
                </div>
                <div className="text-xs text-slate-500 flex flex-col">
                  <span className="font-semibold mb-1">Product/Service:</span>
                  <span className="line-clamp-2 italic">"{template.input.productService}"</span>
                </div>
              </div>

              <button
                onClick={() => onLoad(template)}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-indigo-600 text-slate-700 hover:text-white border border-slate-200 hover:border-indigo-600 rounded-lg font-bold text-sm transition-all"
              >
                <Play className="w-4 h-4" />
                Load Template
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
