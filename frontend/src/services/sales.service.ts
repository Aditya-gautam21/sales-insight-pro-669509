import { emitter } from '@/agentSdk';
import { ResearchInput, SalesInsights } from '@/types/sales';
import { z } from 'zod';

const salesInsightsSchema = z.object({
  enrichedProfile: z.object({
    summary: z.string(),
    keyContacts: z.array(z.object({
      role: z.string(),
      name: z.string(),
      emailEst: z.string()
    })),
    extras: z.object({
      revenueEst: z.string(),
      fundingSize: z.string(),
      techPainSignals: z.string()
    })
  }),
  painPoints: z.array(z.string()),
  leadScore: z.object({
    score: z.number(),
    explanation: z.string()
  }),
  valuePropositionAngle: z.string(),
  coldEmail: z.string(),
  linkedInMessage: z.string(),
  followUpEmail: z.string()
});

const PRIMARY_AGENT_ID = '96cf504d-f62c-4c21-b86d-5e5c92121e7a';
const OUTREACH_AGENT_ID = 'c2fba067-60dd-47d3-93dc-c28becee82cc';

export const salesService = {
  async generateInsights(input: ResearchInput): Promise<SalesInsights> {
    const isMock = import.meta.env.VITE_USE_MOCK_DATA === 'true';

    if (isMock) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return {
        enrichedProfile: {
          summary: `${input.companyName} is an industry-leading organization in ${input.industry}, recently mentioned in global tech news for its expansion into AI-driven services.`,
          keyContacts: [
            { role: 'VP of Sales', name: 'Sarah Johnson', emailEst: 'sarah.j@example.com' },
            { role: 'Head of Growth', name: 'Marcus Chen', emailEst: 'marcus.c@example.com' }
          ],
          extras: {
            revenueEst: '$50M - $100M',
            fundingSize: 'Series C ($45M total)',
            techPainSignals: 'Scaling issues with legacy CRM; high turnover in SDR team.'
          }
        },
        painPoints: [
          `Inefficient lead qualification for ${input.targetRole}s in ${input.industry}.`, 
          `High customer acquisition cost (CAC) due to poor segmentation.`, 
          `Manual data entry causing ${input.targetRole}s to lose 20% of their weekly capacity.`, 
        ],
        leadScore: {
          score: 8.5,
          explanation: '8.5/10: High growth potential with clear tech pain signals that align with our product value.'
        },
        valuePropositionAngle: `Our ${input.productService} automates the manual tasks that are currently draining ${input.targetRole} capacity by 20%, directly lowering your CAC and accelerating growth.`, 
        coldEmail: `Hi Sarah,

I saw ${input.companyName} is scaling rapidly in the ${input.industry} space, especially with your recent expansion.

I noticed many teams in your position struggle with manual data entry for ${input.targetRole} roles. Our ${input.productService} can cut that overhead by 20%.

Would you be open to a 5-minute chat next Tuesday?

Best,
[Your Name]`, 
        linkedInMessage: `Hi Marcus, I've been following ${input.companyName}'s recent growth. I'd love to connect and share how we're helping ${input.industry} leaders like you optimize ${input.targetRole} workflows and lower CAC.`, 
        followUpEmail: `Hi Sarah, just a quick nudge on my last note. I'd love to show you how ${input.productService} could save your team significant time each week. Any time for a quick chat?`
      };
    }

    try {
      const response = await emitter.emit({
        agentId: PRIMARY_AGENT_ID,
        event: 'company_enrichment_request',
        payload: input,
      });

      return salesInsightsSchema.parse(response);
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
    return salesInsightsSchema.parse(response);
  }
};