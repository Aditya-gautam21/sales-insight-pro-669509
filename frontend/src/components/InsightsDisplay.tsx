import React from 'react';
import { SalesInsights } from '@/types/sales';
import { Copy, Check, Mail, Linkedin, Target, Lightbulb, Building2 } from 'lucide-react';

interface InsightsDisplayProps {
  insights: SalesInsights;
  onRefineTone?: (tone: string) => void;
  isLoading?: boolean;
}

export const InsightsDisplay: React.FC<InsightsDisplayProps> = ({ insights, onRefineTone, isLoading }) => {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const tones = ['Professional', 'Casual', 'Direct', 'Persuasive'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Refine Tone Section */}
      {onRefineTone && (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
          <span className="text-sm font-semibold text-indigo-900 flex items-center gap-2">
            <Check className="w-4 h-4" />
            Refine Tone:
          </span>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone) => (
              <button
                key={tone}
                disabled={isLoading}
                onClick={() => onRefineTone(tone)}
                className="px-3 py-1.5 text-xs font-medium bg-white border border-indigo-200 text-indigo-700 rounded-lg hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {tone}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Company Summary */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800">Company Summary</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">{insights.companySummary}</p>
        </section>

        {/* Value Proposition */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800">Value Proposition Angle</h3>
          </div>
          <p className="text-slate-600 leading-relaxed">{insights.valueProposition}</p>
        </section>

        {/* Pain Points */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800">Likely Pain Points</h3>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.painPoints.map((point, idx) => (
              <li key={idx} className="flex gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="text-sm text-slate-700">{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Cold Email */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-800">Cold Email</h3>
            </div>
            <button
              onClick={() => copyToClipboard(insights.coldEmail, 'email')}
              className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              {copiedField === 'email' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedField === 'email' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="p-6">
            <pre className="text-sm text-slate-600 whitespace-pre-wrap font-sans leading-relaxed">
              {insights.coldEmail}
            </pre>
          </div>
        </section>

        {/* LinkedIn Message */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center gap-2">
              <Linkedin className="w-5 h-5 text-indigo-600" />
              <h3 className="font-bold text-slate-800">LinkedIn Message</h3>
            </div>
            <button
              onClick={() => copyToClipboard(insights.linkedInMessage, 'linkedin')}
              className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              {copiedField === 'linkedin' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copiedField === 'linkedin' ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-600 leading-relaxed italic">
              "{insights.linkedInMessage}"
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
