
export enum EntityType {
  CITTA = 'CITTA',
  CETASIKA = 'CETASIKA',
  RUPA = 'RUPA',
  NIBBANA = 'NIBBANA'
}

export type Language = 'si' | 'en';
export type Theme = 'light' | 'dark';

export interface AbhidharmaEntity {
  id: string;
  paliName: string;
  englishName: string;
  description: string; // Dynamic based on lang
  type: EntityType;
  category?: string; 
  associatedFactors?: string[]; 
}

export interface LabModule {
  id: string;
  title: string;
  description: string;
  entities: AbhidharmaEntity[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

// --- New Types for Interactivity ---

export interface QuizItem {
  id: string;
  term: string;
  type: 'concept' | 'reality';
  explanation: string;
}

export interface VithiStage {
  id: string;
  paliName: string;
  englishName: string;
  function: string;
  duration: number; 
}

export interface CittaChallenge {
  id: string;
  name: string;
  description: string;
  criteria: {
    root: string;
    feeling: string;
    view: string;
  };
  hint: string;
}

export interface CetasikaGroup {
  id: string;
  name: string;
  color: string;
  items: AbhidharmaEntity[];
}

export interface KammaSituation {
  id: string;
  title: string;
  description: string;
  imageIcon: string; 
}

export interface KammaScenario { 
  id: string;
  title: string;
  description: string;
  correctType: 'kusala' | 'akusala';
  roots: string[]; 
  explanation: string;
}
