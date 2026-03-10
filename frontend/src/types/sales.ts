export interface EnrichedProfile {
  summary: string;
  keyContacts: {
    role: string;
    name: string;
    emailEst: string;
  }[];
  extras: {
    revenueEst: string;
    fundingSize: string;
    techPainSignals: string;
  };
}

export interface LeadScore {
  score: number;
  explanation: string;
  breakdown?: {
    industryFit: number;
    painAlignment: number;
    growthPotential: number;
  };
}

export interface ResearchInput {
  companyName: string;
  industry: string;
  targetRole: string;
  productService: string;
  tone: string;
}

export interface SalesInsights {
  companyName?: string;
  enrichedProfile: EnrichedProfile;
  painPoints: string[];
  leadScore: LeadScore;
  valuePropositionAngle: string;
  coldEmail: string;
  coldEmailVariant?: string;
  linkedInMessage: string;
  followUpEmail?: string;
  followUpSequence?: string[];
}

export interface ResearchSession {
  id: string;
  input: ResearchInput;
  insights: SalesInsights;
  timestamp: number;
}

export interface Template {
  id: string;
  name: string;
  input: ResearchInput;
}