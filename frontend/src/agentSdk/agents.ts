import { z } from 'zod';
import type { AgentConfig } from './types';

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

export const AGENT_CONFIGS: AgentConfig[] = [
  {
    "id": "96cf504d-f62c-4c21-b86d-5e5c92121e7a",
    "name": "B2B Sales Research Assistant",
    "description": "Enriches target companies with key data, analyzes sales insights, and enhances SDR outreach.",
    "triggerEvents": [
      {
        "type": "sync",
        "name": "company_enrichment_request",
        "description": "When a user requests enrichment for a specific company, the agent should fetch and compile key data about the company, including recent news, key contacts, and relevant metrics.",
        "outputSchema": salesInsightsSchema
      },
      {
        "type": "sync",
        "name": "sales_insight_generation",
        "description": "When a user requests sales insights for a specific target customer role, the agent should analyze the enriched data to identify pain points, generate a lead score, and create a tailored value proposition.",
        "outputSchema": salesInsightsSchema
      },
      {
        "type": "sync",
        "name": "outreach_material_creation",
        "description": "When a user requests outreach materials, the agent should generate a cold email, LinkedIn message, and follow-up email template based on the enriched profile and sales insights.",
        "outputSchema": salesInsightsSchema
      }
    ],
    "config": {
      "appId": "ced59212-a27c-435d-9d10-80866d6c5ce1",
      "accountId": "c8dd74ec-b6f8-4d5e-8339-09620bfe99a7",
      "widgetKey": "FYSBVjWiqIMzjWTvV6jbcrEudWYWYv7x4rivo0FL"
    }
  },
  {
    "id": "0a2c9e1d-d8bc-4ef4-a764-037c4baf208f",
    "name": "B2B Sales Insight Generator",
    "description": "Assists B2B sales by researching target companies and generating personalized sales insights.",
    "triggerEvents": [
      {
        "type": "sync",
        "name": "company_research_request",
        "description": "When a user inputs company details, analyze and produce structured insights.",
        "outputSchema": salesInsightsSchema
      },
      {
        "type": "async",
        "name": "update_company_information",
        "description": "Prompt user for updated insights on changes like funding, acquisitions."
      },
      {
        "type": "async",
        "name": "new_product_launch",
        "description": "Support in creating outreach materials for new product launches with updated insights."
      }
    ],
    "config": {
      "appId": "ced59212-a27c-435d-9d10-80866d6c5ce1",
      "accountId": "c8dd74ec-b6f8-4d5e-8339-09620bfe99a7",
      "widgetKey": "FYSBVjWiqIMzjWTvV6jbcrEudWYWYv7x4rivo0FL"
    }
  },
  {
    "id": "c2fba067-60dd-47d3-93dc-c28becee82cc",
    "name": "B2B Sales Research and Outreach Assistant",
    "description": "Automates prospecting by analyzing company data and industry trends to create personalized outreach copy.",
    "triggerEvents": [
      {
        "type": "sync",
        "name": "on_research_submission",
        "description": "When the user submits the company research form, the agent should immediately analyze the inputs and generate the structured sales insights and outreach copy.",
        "outputSchema": salesInsightsSchema
      },
      {
        "type": "sync",
        "name": "on_refinement_request",
        "description": "When a user requests a change in tone or specific focus, the agent should regenerate the pain points and outreach messages accordingly.",
        "outputSchema": salesInsightsSchema
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
