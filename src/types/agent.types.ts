export interface Agent {
  id: string;
  name: string;
  description: string;
  channel: 'whatsapp' | 'calls';
  channelType: 'incoming' | 'outgoing';
  language: 'spanish' | 'english';
  toolsCount: number;
  variablesCount: number;
  
  // Advanced fields
  initialMessage?: string;
  prompt?: string;
  tools?: string[];
  ragFiles?: File[];
  variables?: AgentVariable[];
  temperature?: number;
  
  // Call specific
  stability?: number;
  speed?: number;
  similarity?: number;
  
  createdAt: Date;
  updatedAt: Date;
}

export interface AgentVariable {
  id: string;
  name: string;
  value?: string;
}

export interface AgentFormData {
  name: string;
  description: string;
  channel: 'whatsapp' | 'calls';
  channelType: 'incoming' | 'outgoing';
  language: 'spanish' | 'english';
  initialMessage: string;
  prompt: string;
  tools: string;
  temperature: number;
  stability: number;
  speed: number;
  similarity: number;
  variables: AgentVariable[];
}