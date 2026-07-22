// Contract shared with the HealthVA Python API (mirrors api.py in the
// health_agent repo). Keep in sync with docs/WEBAPP_PLAN.md.

export type TraceEvent = {
  event: string; // route | tool_start | tool_end | tool_error | grounding_retry | ...
  route?: string;
  method?: string;
  tool?: string;
  input?: string;
  output?: string;
  error?: string;
  name?: string;
  timestamp?: number;
};

export type ChatResponse = {
  reply: string;
  route: string;
  tool_trace: TraceEvent[];
  profile: Record<string, unknown>;
};

// One turn in the UI. A freshly-sent turn is `pending` until the reply lands.
export type UiMessage = {
  role: 'user' | 'assistant';
  content: string;
  route?: string;
  trace?: TraceEvent[];
  profile?: Record<string, unknown>;
  pending?: boolean;
  error?: boolean;
};
