export interface Communication {
  id: number;
  created_at: string;
  updated_at: string;
  status: boolean;
  identify: string | null;
  agent_number: string;
  duration: number | null;
  sentiments: string | null;
  transcription: string | null;
  recording: string | null;
  summary: string | null;
  suggestions: string | null;
  obtained_variables: Record<string, any> | null;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  medium: number;
  comunication_type: number;
  order: number;
  agent: number;
  recipients: number[];
  schedule: number[];
}

export interface CommunicationsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Communication[];
}
