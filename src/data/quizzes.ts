import type { Quiz, Category } from '@/types/quiz';

export const categories: Category[] = [
  { id: '1', name: 'Daily Telenor Quiz', slug: 'daily-telenor-quiz', description: 'Daily quiz answers for Telenor users', count: 156 },
  { id: '2', name: 'Previous Quiz Answers', slug: 'previous-quiz-answers', description: 'Archive of past quiz answers', count: 1240 },
  { id: '3', name: 'Quiz Tips', slug: 'quiz-tips', description: 'Tips and tricks for Telenor quiz', count: 45 },
  { id: '4', name: 'My Telenor App', slug: 'my-telenor-app', description: 'My Telenor app related quizzes', count: 89 },
];

export const generateTodayQuiz = (): Quiz => {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const slugDate = today.toLocaleDateString('en-US', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  }).toLowerCase().replace(/ /g, '-');
  
  return {
    id: 'today',
    date: dateStr,
    title: `Today Telenor Quiz Answers – ${dateStr}`,
    slug: `telenor-quiz-answers-${slugDate}`,
    excerpt: 'Get 100% correct answers for today\'s Telenor quiz and win free MBs!',
    createdAt: today.toISOString(),
    updatedAt: today.toISOString(),
    questions: [
      {
        id: 'q1',
        question: 'What is the capital city of Pakistan?',
        options: [
          { id: 'a', text: 'Lahore', isCorrect: false },
          { id: 'b', text: 'Karachi', isCorrect: false },
          { id: 'c', text: 'Islamabad', isCorrect: true },
          { id: 'd', text: 'Peshawar', isCorrect: false },
        ],
        correctAnswer: 'c',
        description: 'Islamabad is the capital city of Pakistan, located in the Potohar Plateau.',
      },
      {
        id: 'q2',
        question: 'Which planet is known as the Red Planet?',
        options: [
          { id: 'a', text: 'Venus', isCorrect: false },
          { id: 'b', text: 'Mars', isCorrect: true },
          { id: 'c', text: 'Jupiter', isCorrect: false },
          { id: 'd', text: 'Saturn', isCorrect: false },
        ],
        correctAnswer: 'b',
        description: 'Mars is called the Red Planet due to iron oxide (rust) on its surface.',
      },
      {
        id: 'q3',
        question: 'Who is the founder of Pakistan?',
        options: [
          { id: 'a', text: 'Allama Iqbal', isCorrect: false },
          { id: 'b', text: 'Liaquat Ali Khan', isCorrect: false },
          { id: 'c', text: 'Muhammad Ali Jinnah', isCorrect: true },
          { id: 'd', text: 'Sir Syed Ahmed Khan', isCorrect: false },
        ],
        correctAnswer: 'c',
        description: 'Muhammad Ali Jinnah is the founder of Pakistan and its first Governor-General.',
      },
      {
        id: 'q4',
        question: 'What is the largest ocean on Earth?',
        options: [
          { id: 'a', text: 'Atlantic Ocean', isCorrect: false },
          { id: 'b', text: 'Indian Ocean', isCorrect: false },
          { id: 'c', text: 'Arctic Ocean', isCorrect: false },
          { id: 'd', text: 'Pacific Ocean', isCorrect: true },
        ],
        correctAnswer: 'd',
        description: 'The Pacific Ocean is the largest and deepest ocean on Earth.',
      },
      {
        id: 'q5',
        question: 'In which year did Pakistan win the Cricket World Cup?',
        options: [
          { id: 'a', text: '1987', isCorrect: false },
          { id: 'b', text: '1992', isCorrect: true },
          { id: 'c', text: '1996', isCorrect: false },
          { id: 'd', text: '1999', isCorrect: false },
        ],
        correctAnswer: 'b',
        description: 'Pakistan won the Cricket World Cup in 1992 under the captaincy of Imran Khan.',
      },
    ],
  };
};

export const previousQuizzes: Quiz[] = [
  {
    id: '1',
    date: 'March 9, 2026',
    title: 'Today Telenor Quiz Answers – March 9, 2026',
    slug: 'telenor-quiz-answers-09-mar-2026',
    excerpt: 'Get 100% correct answers for March 9 Telenor quiz!',
    createdAt: '2026-03-09T00:00:00Z',
    updatedAt: '2026-03-09T00:00:00Z',
    questions: [
      {
        id: 'q1',
        question: 'What is the national language of Pakistan?',
        options: [
          { id: 'a', text: 'English', isCorrect: false },
          { id: 'b', text: 'Urdu', isCorrect: true },
          { id: 'c', text: 'Punjabi', isCorrect: false },
          { id: 'd', text: 'Sindhi', isCorrect: false },
        ],
        correctAnswer: 'b',
      },
      {
        id: 'q2',
        question: 'Which is the highest mountain in the world?',
        options: [
          { id: 'a', text: 'K2', isCorrect: false },
          { id: 'b', text: 'Mount Everest', isCorrect: true },
          { id: 'c', text: 'Nanga Parbat', isCorrect: false },
          { id: 'd', text: 'Kangchenjunga', isCorrect: false },
        ],
        correctAnswer: 'b',
      },
      {
        id: 'q3',
        question: 'What is the currency of Pakistan?',
        options: [
          { id: 'a', text: 'Rupee', isCorrect: true },
          { id: 'b', text: 'Taka', isCorrect: false },
          { id: 'c', text: 'Riyal', isCorrect: false },
          { id: 'd', text: 'Dinar', isCorrect: false },
        ],
        correctAnswer: 'a',
      },
      {
        id: 'q4',
        question: 'Which is the largest province of Pakistan by area?',
        options: [
          { id: 'a', text: 'Punjab', isCorrect: false },
          { id: 'b', text: 'Sindh', isCorrect: false },
          { id: 'c', text: 'Balochistan', isCorrect: true },
          { id: 'd', text: 'KPK', isCorrect: false },
        ],
        correctAnswer: 'c',
      },
      {
        id: 'q5',
        question: 'Who wrote the national anthem of Pakistan?',
        options: [
          { id: 'a', text: 'Allama Iqbal', isCorrect: false },
          { id: 'b', text: 'Hafeez Jalandhari', isCorrect: true },
          { id: 'c', text: 'Faiz Ahmed Faiz', isCorrect: false },
          { id: 'd', text: 'Ahmed Faraz', isCorrect: false },
        ],
        correctAnswer: 'b',
      },
    ],
  },
  {
    id: '2',
    date: 'March 8, 2026',
    title: 'Today Telenor Quiz Answers – March 8, 2026',
    slug: 'telenor-quiz-answers-08-mar-2026',
    excerpt: 'Get 100% correct answers for March 8 Telenor quiz!',
    createdAt: '2026-03-08T00:00:00Z',
    updatedAt: '2026-03-08T00:00:00Z',
    questions: [
      {
        id: 'q1',
        question: 'What is the national sport of Pakistan?',
        options: [
          { id: 'a', text: 'Cricket', isCorrect: false },
          { id: 'b', text: 'Hockey', isCorrect: true },
          { id: 'c', text: 'Football', isCorrect: false },
          { id: 'd', text: 'Squash', isCorrect: false },
        ],
        correctAnswer: 'b',
      },
      {
        id: 'q2',
        question: 'Which river is known as the lifeline of Pakistan?',
        options: [
          { id: 'a', text: 'Ravi', isCorrect: false },
          { id: 'b', text: 'Chenab', isCorrect: false },
          { id: 'c', text: 'Indus', isCorrect: true },
          { id: 'd', text: 'Jhelum', isCorrect: false },
        ],
        correctAnswer: 'c',
      },
      {
        id: 'q3',
        question: 'What is the national flower of Pakistan?',
        options: [
          { id: 'a', text: 'Rose', isCorrect: false },
          { id: 'b', text: 'Jasmine', isCorrect: true },
          { id: 'c', text: 'Sunflower', isCorrect: false },
          { id: 'd', text: 'Tulip', isCorrect: false },
        ],
        correctAnswer: 'b',
      },
      {
        id: 'q4',
        question: 'Which city is known as the City of Lights?',
        options: [
          { id: 'a', text: 'Lahore', isCorrect: false },
          { id: 'b', text: 'Islamabad', isCorrect: false },
          { id: 'c', text: 'Karachi', isCorrect: true },
          { id: 'd', text: 'Faisalabad', isCorrect: false },
        ],
        correctAnswer: 'c',
      },
      {
        id: 'q5',
        question: 'When did Pakistan become an independent country?',
        options: [
          { id: 'a', text: '14 August 1947', isCorrect: true },
          { id: 'b', text: '15 August 1947', isCorrect: false },
          { id: 'c', text: '23 March 1940', isCorrect: false },
          { id: 'd', text: '25 December 1876', isCorrect: false },
        ],
        correctAnswer: 'a',
      },
    ],
  },
  {
    id: '3',
    date: 'March 7, 2026',
    title: 'Today Telenor Quiz Answers – March 7, 2026',
    slug: 'telenor-quiz-answers-07-mar-2026',
    excerpt: 'Get 100% correct answers for March 7 Telenor quiz!',
    createdAt: '2026-03-07T00:00:00Z',
    updatedAt: '2026-03-07T00:00:00Z',
    questions: [
      {
        id: 'q1',
        question: 'What is the national animal of Pakistan?',
        options: [
          { id: 'a', text: 'Lion', isCorrect: false },
          { id: 'b', text: 'Markhor', isCorrect: true },
          { id: 'c', text: 'Tiger', isCorrect: false },
          { id: 'd', text: 'Elephant', isCorrect: false },
        ],
        correctAnswer: 'b',
      },
      {
        id: 'q2',
        question: 'Which is the largest mosque in Pakistan?',
        options: [
          { id: 'a', text: 'Badshahi Mosque', isCorrect: false },
          { id: 'b', text: 'Faisal Mosque', isCorrect: true },
          { id: 'c', text: 'Grand Jamia Mosque', isCorrect: false },
          { id: 'd', text: 'Shah Jahan Mosque', isCorrect: false },
        ],
        correctAnswer: 'b',
      },
      {
        id: 'q3',
        question: 'What is the national bird of Pakistan?',
        options: [
          { id: 'a', text: 'Eagle', isCorrect: false },
          { id: 'b', text: 'Falcon', isCorrect: false },
          { id: 'c', text: 'Chukar Partridge', isCorrect: true },
          { id: 'd', text: 'Peacock', isCorrect: false },
        ],
        correctAnswer: 'c',
      },
      {
        id: 'q4',
        question: 'Which Pakistani scientist won the Nobel Prize?',
        options: [
          { id: 'a', text: 'Dr. AQ Khan', isCorrect: false },
          { id: 'b', text: 'Dr. Abdus Salam', isCorrect: true },
          { id: 'c', text: 'Dr. Atta-ur-Rahman', isCorrect: false },
          { id: 'd', text: 'Dr. Samar Mubarakmand', isCorrect: false },
        ],
        correctAnswer: 'b',
      },
      {
        id: 'q5',
        question: 'What is the total area of Pakistan?',
        options: [
          { id: 'a', text: '796,095 sq km', isCorrect: true },
          { id: 'b', text: '881,913 sq km', isCorrect: false },
          { id: 'c', text: '652,025 sq km', isCorrect: false },
          { id: 'd', text: '945,085 sq km', isCorrect: false },
        ],
        correctAnswer: 'a',
      },
    ],
  },
];

export const getQuizBySlug = (slug: string): Quiz | undefined => {
  const todayQuiz = generateTodayQuiz();
  if (todayQuiz.slug === slug) return todayQuiz;
  return previousQuizzes.find(q => q.slug === slug);
};

export const getQuizByDate = (date: string): Quiz | undefined => {
  return previousQuizzes.find(q => q.date === date);
};

export const searchQuizzes = (query: string): Quiz[] => {
  const lowerQuery = query.toLowerCase();
  return previousQuizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(lowerQuery) ||
    quiz.questions.some(q => 
      q.question.toLowerCase().includes(lowerQuery) ||
      q.options.some(o => o.text.toLowerCase().includes(lowerQuery))
    )
  );
};
