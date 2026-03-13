import { useState } from 'react';
import { Check, X, HelpCircle, Eye, EyeOff, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { QuizQuestion } from '@/types/quiz';

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  showAnswers?: boolean;
}

export function QuizCard({ question, questionNumber, showAnswers = false }: QuizCardProps) {
  const [revealed, setRevealed] = useState(showAnswers);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(false);

  const correctOption = question.options.find(o => o.id === question.correctAnswer);

  const handleOptionClick = (optionId: string) => {
    if (!revealed) {
      setSelectedOption(optionId);
    }
  };

  return (
    <Card className="w-full overflow-hidden border-2 border-gray-100 hover:border-[#00ACE7]/30 transition-all duration-300 card-hover">
      <CardHeader className="bg-gradient-to-r from-[#E6F7FD] to-white pb-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ACE7] to-[#0078A0] flex items-center justify-center shadow-lg">
            <span className="text-white font-bold font-heading">{questionNumber}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#1A1A2E] leading-relaxed">
              {question.question}
            </h3>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        {/* Options Grid */}
        <div className="grid gap-3">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.id;
            const isCorrect = option.id === question.correctAnswer;
            const showResult = revealed && (isCorrect || isSelected);

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                disabled={revealed}
                className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                  showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : isSelected
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-white'
                    : isSelected
                    ? 'border-[#00ACE7] bg-[#E6F7FD]'
                    : 'border-gray-200 hover:border-[#00ACE7]/50 hover:bg-[#E6F7FD]/50'
                }`}
              >
                {/* Option Letter */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-semibold text-sm transition-colors ${
                    showResult
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : isSelected
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                      : isSelected
                      ? 'bg-[#00ACE7] text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {option.id.toUpperCase()}
                </div>

                {/* Option Text */}
                <span
                  className={`flex-1 font-medium ${
                    showResult
                      ? isCorrect
                        ? 'text-green-700'
                        : isSelected
                        ? 'text-red-700'
                        : 'text-gray-600'
                      : isSelected
                      ? 'text-[#00ACE7]'
                      : 'text-gray-700'
                  }`}
                >
                  {option.text}
                </span>

                {/* Result Icon */}
                {showResult && (
                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : isSelected ? (
                      <X className="w-5 h-5 text-red-500" />
                    ) : null}
                  </div>
                )}

                {/* Correct Answer Indicator (when revealed) */}
                {revealed && isCorrect && !isSelected && (
                  <Badge className="absolute right-4 bg-green-500/10 text-green-600 border-green-500/20">
                    Correct
                  </Badge>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap gap-3">
          {!revealed ? (
            <Button
              onClick={() => setRevealed(true)}
              variant="outline"
              className="flex-1 sm:flex-none border-[#00ACE7] text-[#00ACE7] hover:bg-[#00ACE7] hover:text-white"
            >
              <Eye className="w-4 h-4 mr-2" />
              Show Answer
            </Button>
          ) : (
            <Button
              onClick={() => setRevealed(false)}
              variant="outline"
              className="flex-1 sm:flex-none border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              <EyeOff className="w-4 h-4 mr-2" />
              Hide Answer
            </Button>
          )}

          {question.description && (
            <Button
              onClick={() => setShowDescription(!showDescription)}
              variant="ghost"
              className="text-gray-500 hover:text-[#00ACE7]"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {showDescription ? 'Hide Info' : 'Learn More'}
            </Button>
          )}
        </div>

        {/* Description Panel */}
        {showDescription && question.description && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl animate-slide-up">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">{question.description}</p>
            </div>
          </div>
        )}

        {/* Answer Summary (when revealed) */}
        {revealed && correctOption && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl animate-fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="font-semibold text-green-700">
                Correct Answer: {correctOption.text}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
