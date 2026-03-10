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
      <div className="flex flex-col items-center gap-4">
        <div className="bg-indigo-600 text-white px-6 py-4 rounded-2xl shadow-lg shadow-indigo-200 flex items-center gap-4 border-2 border-indigo-400/20 w-full max-w-2xl">
          <div className="flex items-center justify-center w-14 h-14 bg-white/20 rounded-full font-bold text-2xl border border-white/30 shrink-0">
            {insights.leadScore.score}
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">Lead Fit Score</div>
            <div className="text-sm font-medium">{insights.leadScore.explanation}</div>
          </div>
        </div>
        
        {insights.leadScore.breakdown && (
          <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Industry Fit</div>
              <div className="font-bold text-indigo-600">{insights.leadScore.breakdown.industryFit}/3</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Pain Alignment</div>
              <div className="font-bold text-indigo-600">{insights.leadScore.breakdown.painAlignment}/3</div>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Growth Potential</div>
              <div className="font-bold text-indigo-600">{insights.leadScore.breakdown.growthPotential}/4</div>
            </div>
          </div>
        )}
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
              <p className="text-slate-700 leading-relaxed text-lg font-medium italic mb-4">
                "{insights.enrichedProfile.summary}"
              </p>
              {insights.enrichedProfile.recentNews && (
                <div className="p-3 bg-indigo-50 border-l-4 border-indigo-600 rounded-r-lg">
                  <div className="text-[10px] font-bold text-indigo-600 uppercase mb-1">Recent News Highlight</div>
                  <p className="text-sm text-indigo-900 font-medium">{insights.enrichedProfile.recentNews}</p>
                </div>
              )}
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
              <h3 className="font-bold text-slate-800">Cold Email (A/B)</h3>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Variant A</span>
                <button
                  onClick={() => copyToClipboard(insights.coldEmail, 'email-a')}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {copiedField === 'email-a' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                  {insights.coldEmail}
                </pre>
              </div>
            </div>

            {insights.coldEmailVariant && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">Variant B (Tone Tweak)</span>
                  <button
                    onClick={() => copyToClipboard(insights.coldEmailVariant!, 'email-b')}
                    className="p-1.5 text-slate-400 hover:text-violet-600 transition-colors"
                  >
                    {copiedField === 'email-b' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <div className="bg-violet-50/30 p-4 rounded-xl border border-violet-100">
                  <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {insights.coldEmailVariant}
                  </pre>
                </div>
              </div>
            )}
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
              <h3 className="font-bold text-white uppercase tracking-wider">SDR Follow-Up Sequence</h3>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/30">
            {(insights.followUpSequence || [insights.followUpEmail]).map((step, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full uppercase tracking-widest">Day {idx === 0 ? '3' : '7'} Nudge</span>
                  <button
                    onClick={() => copyToClipboard(step || '', `followup-${idx}`)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    {copiedField === `followup-${idx}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-full">
                  <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed italic">
                    {step}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};