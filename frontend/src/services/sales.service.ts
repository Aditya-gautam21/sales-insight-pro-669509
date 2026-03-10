import { api } from '@/lib/api';
import { ResearchInput, SalesInsights, ResearchSession, Template } from '@/types/sales';

export const salesService = {
  async generateInsights(input: ResearchInput): Promise<{ insights: SalesInsights | (SalesInsights & { companyName: string })[] }> {
    const response = await api.post('/api/sales/research', input);
    return response.data;
  },

  async getHistory(): Promise<ResearchSession[]> {
    const response = await api.get('/api/sales/history');
    return response.data.history.map((h: any) => ({
      id: h.id,
      input: h.input,
      insights: h.insights,
      timestamp: new Date(h.createdAt).getTime()
    }));
  },

  async deleteHistory(id: string): Promise<void> {
    await api.delete(`/api/sales/history/${id}`);
  },

  async clearHistory(): Promise<void> {
    await api.delete('/api/sales/history');
  },

  async getTemplates(): Promise<Template[]> {
    const response = await api.get('/api/sales/templates');
    return response.data.templates.map((t: any) => ({
      id: t.id,
      name: t.name,
      input: {
        companyName: '',
        industry: t.industry,
        targetRole: t.targetRole,
        productService: t.product,
        tone: t.tone
      }
    }));
  },

  async suggestTemplate(): Promise<Template> {
    const response = await api.get('/api/sales/templates/suggest');
    const t = response.data;
    return {
      id: 'suggested-' + Date.now(),
      name: t.name,
      input: {
        companyName: '',
        industry: t.industry,
        targetRole: t.targetRole,
        productService: t.product,
        tone: t.tone
      }
    };
  },

  async createTemplate(name: string, input: ResearchInput): Promise<Template> {
    const response = await api.post('/api/sales/templates', { name, input });
    const t = response.data;
    return {
      id: t.id,
      name: t.name,
      input: {
        companyName: '',
        industry: t.industry,
        targetRole: t.targetRole,
        productService: t.product,
        tone: t.tone
      }
    };
  },

  async deleteTemplate(id: string): Promise<void> {
    await api.delete(`/api/sales/templates/${id}`);
  },

  async updateTemplate(id: string, name: string, input: ResearchInput): Promise<Template> {
    const response = await api.patch(`/api/sales/templates/${id}`, { name, input });
    const t = response.data;
    return {
      id: t.id,
      name: t.name,
      input: {
        companyName: '',
        industry: t.industry,
        targetRole: t.targetRole,
        productService: t.product,
        tone: t.tone
      }
    };
  }
};
