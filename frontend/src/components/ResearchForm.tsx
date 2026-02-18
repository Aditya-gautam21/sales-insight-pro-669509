import React from 'react';
import { ResearchInput } from '@/types/sales';
import { Search, Loader2 } from 'lucide-react';

interface ResearchFormProps {
  onSubmit: (input: ResearchInput) => void;
  isLoading: boolean;
}

export const ResearchForm: React.FC<ResearchFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = React.useState<ResearchInput>({
    companyName: '',
    industry: '',
    targetRole: '',
    productService: '',
    tone: 'Professional',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Company Name</label>
          <input
            required
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Acme Corp"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Industry</label>
          <input
            required
            type="text"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            placeholder="e.g. SaaS, Fintech"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Target Customer Role</label>
          <input
            required
            type="text"
            name="targetRole"
            value={formData.targetRole}
            onChange={handleChange}
            placeholder="e.g. CTO, Head of Sales"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Tone</label>
          <select
            name="tone"
            value={formData.tone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none bg-white"
          >
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
            <option value="Persuasive">Persuasive</option>
            <option value="Direct">Direct</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Product/Service Being Sold</label>
        <textarea
          required
          name="productService"
          value={formData.productService}
          onChange={handleChange}
          rows={3}
          placeholder="Describe what you are selling..."
          className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing Insights...
          </>
        ) : (
          <>
            <Search className="w-5 h-5" />
            Generate Sales Research
          </>
        )}
      </button>
    </form>
  );
};
