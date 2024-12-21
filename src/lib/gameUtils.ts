import { Question } from '../types';

export function getRandomQuestions(questions: Question[], count: number = 6): Question[] {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function formatQuestionText(questionNumber: number, text: string): string {
  return `${questionNumber}. ${text}`;
}

export function clearGameState() {
  localStorage.removeItem('lastGame');
}
