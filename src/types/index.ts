export type LanguageOption = 'typescript' | 'python' | 'go' | 'curl';

export interface CodeSnippet {
  id: LanguageOption;
  label: string;
  filename: string;
  code: string;
  runtime: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  category: 'Edge' | 'Compute' | 'AI Inference' | 'Storage' | 'Security';
  summary: string;
  specifications: {
    latency: string;
    throughput: string;
    redundancy: string;
    protocol: string;
  };
  features: string[];
  telemetry: {
    activeInstances: string;
    p99Latency: string;
    healthyNodes: string;
    egressBandwidth: string;
  };
}

export interface PlaygroundEndpoint {
  id: string;
  name: string;
  method: 'POST' | 'GET';
  path: string;
  summary: string;
  samplePayload: Record<string, unknown>;
  simulatedResponseTime: number;
  generateResponse: (payload: Record<string, unknown>) => Record<string, unknown>;
}

export interface CaseStudy {
  id: string;
  company: string;
  industry: string;
  summary: string;
  metrics: {
    value: string;
    label: string;
    timeframe: string;
  }[];
  quote: string;
  author: {
    name: string;
    role: string;
  };
}

export interface DemoBooking {
  name: string;
  email: string;
  company: string;
  teamSize: string;
  workload: string;
  region: string;
  date: string;
  timeSlot: string;
  specialRequests?: string;
}
