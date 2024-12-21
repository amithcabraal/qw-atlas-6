export interface Question {
  id: string;
  text: string;
  latitude: number;
  longitude: number;
  gameId: string;
}

export interface Player {
  id: string;
  initials: string;
  gameId: string;
  score: number;
  hasAnswered: boolean;
}

export interface Game {
  id: string;
  code: string;
  status: 'waiting' | 'playing' | 'finished';
  currentQuestionId: string | null;
}