export interface ResearchInput {
  companyName: string;
  industry: string;
  targetRole: string;
  productService: string;
  tone: string;
}

export interface SalesInsights {
  companySummary: string;
  painPoints: string[];
  valueProposition: string;
  coldEmail: string;
  linkedInMessage: string;
}

export interface ResearchSession {
  id: string;
  input: ResearchInput;
  insights: SalesInsights;
  timestamp: number;
}
