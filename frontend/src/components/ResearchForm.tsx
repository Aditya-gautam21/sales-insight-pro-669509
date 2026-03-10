import React from 'react';
import { ResearchInput } from '@/types/sales';
import { Search, Loader2, RotateCcw } from 'lucide-react';

interface ResearchFormProps {
  onSubmit: (input: ResearchInput) => void;
  isLoading: boolean;
  initialData?: ResearchInput;
  onChange?: (input: ResearchInput) => void;
}

export const ResearchForm: React.FC<ResearchFormProps> = ({ onSubmit, isLoading, initialData, onChange }) => {
  const [formData, setFormData] = React.useState<ResearchInput>({
    companyName: '',
    industry: '',
    targetRole: '',
    productService: '',
    tone: 'Professional',
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleClear = () => {
    const cleared = {
      companyName: '',
      industry: '',
      targetRole: '',
      productService: '',
      tone: 'Professional',
    };
    setFormData(cleared);
    onChange?.(cleared);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    onChange?.(updated);
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
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleClear}
          disabled={isLoading}
          className="flex-shrink-0 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed border border-slate-200"
        >
          <RotateCcw className="w-5 h-5" />
          Clear
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="flex-grow flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
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
      </div>
    </form>
  );
};
