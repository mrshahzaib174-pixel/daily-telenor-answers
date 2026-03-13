import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { AdminPanel } from '@/components/AdminPanel';
import { Hero } from '@/sections/Hero';
import { TodayQuiz } from '@/sections/TodayQuiz';
import { PreviousQuizzes } from '@/sections/PreviousQuizzes';
import { AdPlacement } from '@/sections/AdPlacement';
import { QuizTips } from '@/sections/QuizTips';
import { Comments } from '@/sections/Comments';
import { Footer } from '@/sections/Footer';
import { generateTodayQuiz, previousQuizzes } from '@/data/quizzes';
import type { ViewMode, Quiz } from '@/types/quiz';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('user');
  const [quizzes, setQuizzes] = useState<Quiz[]>(previousQuizzes);
  const [todayQuiz, setTodayQuiz] = useState<Quiz>(generateTodayQuiz());
  const [searchResults, setSearchResults] = useState<Quiz[] | null>(null);

  // Update today's quiz on mount and daily
  useEffect(() => {
    const updateTodayQuiz = () => {
      setTodayQuiz(generateTodayQuiz());
    };

    updateTodayQuiz();
    
    // Check for date change every minute
    const interval = setInterval(updateTodayQuiz, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (query: string) => {
    const results = quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(query.toLowerCase()) ||
      quiz.date.toLowerCase().includes(query.toLowerCase()) ||
      quiz.questions.some(q => 
        q.question.toLowerCase().includes(query.toLowerCase())
      )
    );
    
    setSearchResults(results);
    
    if (results.length === 0) {
      toast.info('No quizzes found matching your search.');
    } else {
      toast.success(`Found ${results.length} quiz(es)`);
      document.getElementById('previous')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateQuizzes = (updatedQuizzes: Quiz[]) => {
    setQuizzes(updatedQuizzes);
    toast.success('Quiz saved successfully!');
  };

  // SEO Schema for FAQ
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: todayQuiz.questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.options.find(o => o.isCorrect)?.text || '',
      },
    })),
  };

  // Website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Telenor Quiz Answers',
    url: window.location.origin,
    description: 'Get 100% correct answers for daily Telenor quiz. Win free MBs with our accurate solutions.',
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <title>Today Telenor Quiz Answers | 100% Correct Answers Daily</title>
      <meta name="description" content="Get 100% correct answers for daily Telenor quiz. Win free MBs with our accurate solutions. Updated daily at 12 AM." />
      <meta name="keywords" content="Telenor Quiz Answers, Today Telenor Quiz, My Telenor App Quiz, Telenor Quiz Today, Free MBs Telenor" />
      <meta name="author" content="Telenor Quiz Answers" />
      <meta name="robots" content="index, follow" />
      
      {/* Open Graph */}
      <meta property="og:title" content="Today Telenor Quiz Answers | 100% Correct Answers Daily" />
      <meta property="og:description" content="Get 100% correct answers for daily Telenor quiz. Win free MBs with our accurate solutions." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Today Telenor Quiz Answers" />
      <meta name="twitter:description" content="Get 100% correct answers for daily Telenor quiz. Win free MBs!" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={window.location.href} />
      
      {/* Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {viewMode === 'admin' ? (
        <AdminPanel
          quizzes={quizzes}
          onUpdateQuizzes={handleUpdateQuizzes}
          onExit={() => setViewMode('user')}
        />
      ) : (
        <>
          {/* Header */}
          <Header
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onSearch={handleSearch}
          />

          {/* Main Content */}
          <main>
            {/* Hero Section */}
            <Hero />

            {/* Ad Placement - Banner */}
            <div className="container mx-auto px-4">
              <AdPlacement size="banner" />
            </div>

            {/* Today's Quiz Section */}
            <TodayQuiz quiz={todayQuiz} />

            {/* Ad Placement - Rectangle */}
            <div className="container mx-auto px-4">
              <AdPlacement size="rectangle" />
            </div>

            {/* Previous Quizzes Section */}
            <PreviousQuizzes quizzes={searchResults || quizzes} />

            {/* Quiz Tips Section */}
            <QuizTips />

            {/* Ad Placement - Banner */}
            <div className="container mx-auto px-4">
              <AdPlacement size="banner" />
            </div>

            {/* Comments Section */}
            <Comments />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}

      {/* Toast Notifications */}
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
