import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Search, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import type { Quiz } from '@/types/quiz';

interface PreviousQuizzesProps {
  quizzes: Quiz[];
}

export function PreviousQuizzes({ quizzes }: PreviousQuizzesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredQuizzes = quizzes.filter(quiz =>
    quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    quiz.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuizzes = filteredQuizzes.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.getElementById('previous')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="previous" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#0078A0]/10 text-[#0078A0] border-[#0078A0]/20 hover:bg-[#0078A0]/20">
            <Calendar className="w-3 h-3 mr-1" />
            Archive
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#1A1A2E] mb-4">
            Previous Quiz Answers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our archive of past Telenor quiz answers. Find answers from any date quickly.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by date or title..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 h-14 text-lg border-2 border-gray-200 focus:border-[#00ACE7] focus:ring-[#00ACE7]/20 rounded-xl"
            />
          </div>
        </div>

        {/* Quiz Grid */}
        {paginatedQuizzes.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedQuizzes.map((quiz, index) => (
              <Card
                key={quiz.id}
                className="group border-2 border-gray-100 hover:border-[#00ACE7]/30 transition-all duration-300 card-hover overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  {/* Date Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-[#E6F7FD] text-[#00ACE7]">
                      <Calendar className="w-3 h-3 mr-1" />
                      {quiz.date}
                    </Badge>
                    <span className="text-xs text-gray-500">{quiz.questions.length} Qs</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-3 line-clamp-2 group-hover:text-[#00ACE7] transition-colors">
                    {quiz.title}
                  </h3>

                  {/* Preview */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {quiz.excerpt}
                  </p>

                  {/* Quick Answers Preview */}
                  <div className="space-y-2 mb-4">
                    {quiz.questions.slice(0, 2).map((q, i) => {
                      const correctOption = q.options.find(o => o.id === q.correctAnswer);
                      return (
                        <div key={q.id} className="flex items-center gap-2 text-sm">
                          <span className="w-5 h-5 rounded bg-[#00ACE7]/10 text-[#00ACE7] flex items-center justify-center text-xs font-bold">
                            {i + 1}
                          </span>
                          <span className="text-gray-600 truncate">{correctOption?.text}</span>
                        </div>
                      );
                    })}
                    {quiz.questions.length > 2 && (
                      <p className="text-xs text-gray-400 pl-7">+{quiz.questions.length - 2} more</p>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    variant="outline"
                    className="w-full border-[#00ACE7] text-[#00ACE7] hover:bg-[#00ACE7] hover:text-white group-hover:shadow-lg transition-all"
                    asChild
                  >
                    <a href={`#quiz-${quiz.slug}`}>
                      View Answers
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No quizzes found</h3>
            <p className="text-gray-500">Try adjusting your search query</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-gray-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 ${
                  currentPage === page
                    ? 'bg-[#00ACE7] hover:bg-[#0078A0]'
                    : 'border-gray-300 hover:border-[#00ACE7] hover:text-[#00ACE7]'
                }`}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-gray-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
