import { emitter } from '@/agentSdk';
import { ResearchInput, SalesInsights } from '@/types/sales';
import { z } from 'zod';

const insightsSchema = z.object({
  companySummary: z.string(),
  painPoints: z.array(z.string()),
  valueProposition: z.string(),
  coldEmail: z.string(),
  linkedInMessage: z.string(),
});

const RESEARCH_AGENT_ID = '0a2c9e1d-d8bc-4ef4-a764-037c4baf208f';
const OUTREACH_AGENT_ID = 'c2fba067-60dd-47d3-93dc-c28becee82cc';

export const salesService = {
  async generateInsights(input: ResearchInput): Promise<SalesInsights> {
    const isMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';

    if (isMock) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        companySummary: `${input.companyName} is a leading player in the ${input.industry} industry, focused on delivering innovative solutions to their clients.`, 
        painPoints: [
          `Inefficiency in existing ${input.industry} workflows for ${input.targetRole}s.`, 
          `Difficulty scaling operations without increasing overhead.`, 
          `Lack of real-time data visibility for decision making.`, 
        ],
        valueProposition: `Our ${input.productService} directly addresses these challenges by streamlining core processes and providing actionable insights, enabling ${input.targetRole}s to focus on high-impact tasks.`, 
        coldEmail: `Hi {{Name}},

I noticed ${input.companyName} is making great strides in ${input.industry}. Given your role as ${input.targetRole}, I thought you might be interested in how ${input.productService} helps similar teams overcome {{Pain Point}}.

Would you be open to a 5-minute chat next Tuesday?

Best,
[Your Name]`, 
        linkedInMessage: `Hi {{Name}}, I've been following ${input.companyName}'s growth in ${input.industry}. I'd love to connect and share some insights on how we're helping ${input.targetRole}s optimize their workflows.`, 
      };
    }

    try {
      const response = await emitter.emit({
        agentId: RESEARCH_AGENT_ID,
        event: 'company_research_request',
        payload: input,
      });

      // Validating and returning the data from agent
      return insightsSchema.parse(response);
    } catch (error) {
      console.error('Error generating insights:', error);
      throw error;
    }
  },

  async refineInsights(input: ResearchInput & { focus: string }): Promise<SalesInsights> {
    const response = await emitter.emit({
      agentId: OUTREACH_AGENT_ID,
      event: 'on_refinement_request',
      payload: input,
    });
    return insightsSchema.parse(response);
  }
};
