import React from 'react';
import { SalesInsights } from '@/types/sales';
import { 
  Copy, Check, Mail, Linkedin, Target, Lightbulb, 
  Building2, Users, BarChart3, Info, ArrowRight,
  RefreshCcw, Smartphone
} from 'lucide-react';

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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Lead Score Badge */}
      <div className="flex justify-center">
        <div className="bg-indigo-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-indigo-200 flex items-center gap-4 border-2 border-indigo-400/20">
          <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full font-bold text-xl border border-white/30">
            {insights.leadScore.score}
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Lead Fit Score</div>
            <div className="text-sm font-medium">{insights.leadScore.explanation}</div>
          </div>
        </div>
      </div>

      {/* Refine Tone Section */}
      {onRefineTone && (
        <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-2xl">
          <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <RefreshCcw className="w-4 h-4" />
            Refine Tone:
          </span>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone) => (
              <button
                key={tone}
                disabled={isLoading}
                onClick={() => onRefineTone(tone)}
                className="px-4 py-2 text-xs font-semibold bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {tone}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 0. Enriched Profile */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
          <Building2 className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-800">Enriched Profile</h2>
        </div>
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Company Summary</h3>
              <p className="text-slate-700 leading-relaxed text-lg font-medium italic">
                "{insights.enrichedProfile.summary}"
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-1">
                  <BarChart3 className="w-4 h-4" />
                  Revenue Est.
                </div>
                <p className="text-indigo-900 font-semibold">{insights.enrichedProfile.extras.revenueEst}</p>
              </div>
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm mb-1">
                  <Info className="w-4 h-4" />
                  Funding/Size
                </div>
                <p className="text-emerald-900 font-semibold">{insights.enrichedProfile.extras.fundingSize}</p>
              </div>
            </div>
            <div className="p-5 bg-amber-50 border border-amber-100 rounded-xl">
              <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Tech & Pain Signals
              </h3>
              <p className="text-amber-900">{insights.enrichedProfile.extras.techPainSignals}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4" />
              Key Contacts
            </h3>
            {insights.enrichedProfile.keyContacts.map((contact, idx) => (
              <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-indigo-300 transition-colors">
                <div className="font-bold text-slate-800">{contact.name}</div>
                <div className="text-xs font-semibold text-indigo-600 mb-2 uppercase">{contact.role}</div>
                <div className="text-sm text-slate-500 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {contact.emailEst}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Pain Points */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-6">
            <Lightbulb className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800">Likely Pain Points</h3>
          </div>
          <div className="space-y-3">
            {insights.painPoints.map((point, idx) => (
              <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-sm shadow-indigo-200">
                  {idx + 1}
                </span>
                <span className="text-sm text-slate-700 leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Value Proposition */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800">Value Proposition Angle</h3>
          </div>
          <div className="flex-grow flex items-center justify-center p-8 bg-indigo-50/30 rounded-2xl border-2 border-dashed border-indigo-100">
            <p className="text-indigo-900 text-lg font-medium text-center leading-relaxed">
              {insights.valuePropositionAngle}
            </p>
          </div>
        </section>

        {/* 3. Cold Email */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                <Mail className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-800">Cold Email</h3>
            </div>
            <button
              onClick={() => copyToClipboard(insights.coldEmail, 'email')}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
            >
              {copiedField === 'email' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedField === 'email' ? 'COPIED' : 'COPY'}
            </button>
          </div>
          <div className="p-8 flex-grow">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
              <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                {insights.coldEmail}
              </pre>
            </div>
          </div>
        </section>

        {/* 4. LinkedIn Message */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Linkedin className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-800">LinkedIn Message</h3>
            </div>
            <button
              onClick={() => copyToClipboard(insights.linkedInMessage, 'linkedin')}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
            >
              {copiedField === 'linkedin' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedField === 'linkedin' ? 'COPIED' : 'COPY'}
            </button>
          </div>
          <div className="p-8 flex-grow flex items-center">
            <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-2xl w-full">
              <p className="text-blue-900 font-medium italic text-lg leading-relaxed text-center">
                "{insights.linkedInMessage}"
              </p>
            </div>
          </div>
        </section>

        {/* 5. SDR Follow-Up */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden lg:col-span-2">
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-indigo-600">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 text-white rounded-lg">
                <ArrowRight className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white uppercase tracking-wider">SDR Follow-Up Sequence (Day 3 Nudge)</h3>
            </div>
            <button
              onClick={() => copyToClipboard(insights.followUpEmail, 'followup')}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-indigo-600 bg-white rounded-lg hover:bg-indigo-50 transition-colors shadow-sm shadow-white/20"
            >
              {copiedField === 'followup' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedField === 'followup' ? 'COPIED' : 'COPY'}
            </button>
          </div>
          <div className="p-8 bg-slate-50/30">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <pre className="text-slate-700 whitespace-pre-wrap font-sans leading-relaxed italic">
                {insights.followUpEmail}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};