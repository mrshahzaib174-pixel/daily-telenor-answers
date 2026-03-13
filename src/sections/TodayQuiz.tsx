import { useState } from 'react';
import { Calendar, Share2, Copy, Check, MessageCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizCard } from '@/components/QuizCard';
import type { Quiz } from '@/types/quiz';

interface TodayQuizProps {
  quiz: Quiz;
}

export function TodayQuiz({ quiz }: TodayQuizProps) {
  const [copied, setCopied] = useState(false);
  const [showAllAnswers, setShowAllAnswers] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: quiz.title,
          text: `Check out today's Telenor Quiz Answers!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToComments = () => {
    document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="today" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#00ACE7]/10 text-[#00ACE7] border-[#00ACE7]/20 hover:bg-[#00ACE7]/20">
            <Calendar className="w-3 h-3 mr-1" />
            Daily Updated
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#1A1A2E] mb-4">
            Today&apos;s Telenor Quiz Answers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {quiz.date} — Get 100% correct answers for all 5 questions and win free MBs in your My Telenor App.
          </p>
        </div>

        {/* Quiz Info Card */}
        <Card className="mb-8 border-2 border-[#00ACE7]/20 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00ACE7] to-[#0078A0] flex items-center justify-center shadow-lg">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A1A2E]">{quiz.title}</h3>
                  <p className="text-sm text-gray-500">{quiz.questions.length} Questions • Updated Today</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => setShowAllAnswers(!showAllAnswers)}
                  variant="outline"
                  className="border-[#00ACE7] text-[#00ACE7] hover:bg-[#00ACE7] hover:text-white"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showAllAnswers ? 'Hide All' : 'Show All'}
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-gray-300"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="border-gray-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-green-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Questions */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full max-w-md mx-auto mb-8 grid grid-cols-3">
            <TabsTrigger value="all">All Questions</TabsTrigger>
            <TabsTrigger value="quick">Quick View</TabsTrigger>
            <TabsTrigger value="answers">Answers Only</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {quiz.questions.map((question, index) => (
              <QuizCard
                key={question.id}
                question={question}
                questionNumber={index + 1}
                showAnswers={showAllAnswers}
              />
            ))}
          </TabsContent>

          <TabsContent value="quick">
            <Card className="border-2 border-[#00ACE7]/20">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {quiz.questions.map((question, index) => {
                    const correctOption = question.options.find(o => o.id === question.correctAnswer);
                    return (
                      <div
                        key={question.id}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-[#E6F7FD]/50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#00ACE7] text-white flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[#1A1A2E] mb-2">{question.question}</p>
                          <Badge className="bg-green-100 text-green-700 border-green-200">
                            <Check className="w-3 h-3 mr-1" />
                            {correctOption?.text}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="answers">
            <Card className="border-2 border-green-200 bg-green-50/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-green-800 mb-4 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  All Correct Answers
                </h3>
                <div className="grid gap-3">
                  {quiz.questions.map((question, index) => {
                    const correctOption = question.options.find(o => o.id === question.correctAnswer);
                    return (
                      <div
                        key={question.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200"
                      >
                        <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </span>
                        <span className="font-medium text-green-700">{correctOption?.text}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Comments CTA */}
        <div className="mt-12 text-center">
          <Button
            onClick={scrollToComments}
            variant="outline"
            className="border-[#00ACE7] text-[#00ACE7] hover:bg-[#00ACE7] hover:text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Join the Discussion
          </Button>
        </div>
      </div>
    </section>
  );
}
