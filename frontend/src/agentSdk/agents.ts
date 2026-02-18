import { z } from 'zod';
import type { AgentConfig } from './types';

export const AGENT_CONFIGS: AgentConfig[] = [
  {
    "id": "c2fba067-60dd-47d3-93dc-c28becee82cc",
    "name": "B2B Sales Research and Outreach Assistant",
    "description": "Automates prospecting by analyzing company data and industry trends to create personalized outreach copy.",
    "triggerEvents": [
      {
        "type": "sync",
        "name": "on_research_submission",
        "description": "When the user submits the company research form, the agent should immediately analyze the inputs and generate the structured sales insights and outreach copy.",
        "outputSchema": z.object({
          companySummary: z.string(),
          painPoints: z.array(z.string()),
          valueProposition: z.string(),
          coldEmail: z.string(),
          linkedInMessage: z.string(),
        })
      },
      {
        "type": "sync",
        "name": "on_refinement_request",
        "description": "When a user requests a change in tone or specific focus, the agent should regenerate the pain points and outreach messages accordingly.",
        "outputSchema": z.object({
          companySummary: z.string(),
          painPoints: z.array(z.string()),
          valueProposition: z.string(),
          coldEmail: z.string(),
          linkedInMessage: z.string(),
        })
      },
      {
        "type": "async",
        "name": "on_copy_completion",
        "description": "When the analysis is finalized, the agent should suggest additional outreach variants or follow-up message templates based on the initial research."
      }
    ],
    "config": {
      "appId": "ced59212-a27c-435d-9d10-80866d6c5ce1",
      "accountId": "c8dd74ec-b6f8-4d5e-8339-09620bfe99a7",
      "widgetKey": "FYSBVjWiqIMzjWTvV6jbcrEudWYWYv7x4rivo0FL"
    }
  }
];