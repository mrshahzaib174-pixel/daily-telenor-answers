export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: string;
  description?: string;
}

export interface Quiz {
  id: string;
  date: string;
  title: string;
  slug: string;
  questions: QuizQuestion[];
  excerpt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count: number;
}

export interface Comment {
  id: string;
  quizId: string;
  author: string;
  content: string;
  createdAt: string;
}

export type ViewMode = 'user' | 'admin';
