export interface Step {
  id: string;
  title: string;
  done: boolean;
  owner: string;
}

export interface Test {
  id: string;
  title: string;
  passed: boolean;
}

export interface Group {
  id: string;
  title: string;
  owner: string;
  dependsOn: string[];
  status: 'done' | 'in-progress' | 'blocked' | 'not-started';
  fixes: string[];
  steps: Step[];
  tests: Test[];
}

export interface ProgressData {
  project: string;
  lastUpdated: string;
  owners: Record<string, string>;
  groups: Group[];
}

export interface Issue {
  id: string;
  category: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
}

export const ISSUES: Issue[] = [
  { id: 'D1', category: 'Discovery', severity: 'critical', title: 'party:state fires into void' },
  { id: 'D2', category: 'Discovery', severity: 'critical', title: 'No broadcast on party creation' },
  { id: 'D3', category: 'Discovery', severity: 'high', title: 'Strict language match, no fallback' },
  { id: 'D4', category: 'Discovery', severity: 'medium', title: 'New rooms buried in trending' },
  { id: 'L1', category: 'Lifecycle', severity: 'critical', title: 'Unlimited parties per user' },
  { id: 'L2', category: 'Lifecycle', severity: 'high', title: 'Scheduled rooms never go live' },
  { id: 'L3', category: 'Lifecycle', severity: 'high', title: 'No cleanup job' },
  { id: 'L4', category: 'Lifecycle', severity: 'low', title: 'PartyVoiceSession dead weight' },
  { id: 'V1', category: 'Voice', severity: 'critical', title: 'Mesh topology CPU collapse' },
  { id: 'V2', category: 'Voice', severity: 'critical', title: 'No TURN server' },
  { id: 'V3', category: 'Voice', severity: 'high', title: 'Signaling targets wrong socket' },
  { id: 'V4', category: 'Voice', severity: 'high', title: 'One AudioContext per peer' },
  { id: 'V5', category: 'Voice', severity: 'medium', title: 'No bandwidth adaptation' },
  { id: 'M1', category: 'Moderation', severity: 'high', title: 'Kicked user can rejoin via code' },
  { id: 'M2', category: 'Moderation', severity: 'medium', title: 'No persistent global ban' },
  { id: 'M3', category: 'Moderation', severity: 'low', title: 'No moderator boundary contract' },
  { id: 'DC1', category: 'Data', severity: 'medium', title: 'findFirst on unique field' },
  { id: 'DC2', category: 'Data', severity: 'medium', title: 'Moderator demoted on rejoin' },
  { id: 'DC3', category: 'Data', severity: 'high', title: 'Race condition on voice join' },
  { id: 'F1', category: 'Frontend', severity: 'high', title: 'No caching / Redux' },
  { id: 'F2', category: 'Frontend', severity: 'high', title: 'No optimistic UI' },
  { id: 'F3', category: 'Frontend', severity: 'medium', title: 'No skeleton screens' },
  { id: 'F4', category: 'Frontend', severity: 'low', title: 'conversationId not surfaced' },
];
