export interface Task {
  id: string;
  title: string;
  category: 'work' | 'personal' | 'growth' | 'admin';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  synced: boolean;
}

export interface TianganModule {
  id: string;
  name: string;
  status: 'active' | 'merging' | 'stable';
  complexity: number;
  lastUpdate: string;
  workFolder: string;
}

export interface SyncConnection {
  sourceId: string;
  targetId: string;
  strength: number;
  label: string;
}

export interface TranscriptionMessage {
  text: string;
  sender: 'user' | 'ai' | 'system';
  timestamp: number;
}

export interface PromptEntry {
  id: string;
  timestamp: string;
  prompt: string;
  outcome: string;
}

export interface ProjectManifest {
  versionId: string; 
  repoType: 'module_repo' | 'merged_system_repo';
  suffix: string;
  username: string;
  createdAt: string;
  workDirectory: string;
  promptLineage: PromptEntry[];
  modules: TianganModule[];
  coreSettings: Record<string, any>;
}

export interface SessionLogEntry {
  session_id: string;
  timestamp: string;
  adminp: string;
  admins: string;
  events: string[];
  status: 'SECURED' | 'OPEN' | 'RESTRICTED';
}