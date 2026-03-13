import { useState } from 'react';
import { 
  LayoutDashboard, 
  Plus, 
  Edit3, 
  Calendar, 
  Settings, 
  LogOut, 
  Save, 
  Trash2, 
  Eye,
  Check,
  X,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Quiz, QuizQuestion } from '@/types/quiz';

interface AdminPanelProps {
  quizzes: Quiz[];
  onUpdateQuizzes: (quizzes: Quiz[]) => void;
  onExit: () => void;
}

export function AdminPanel({ quizzes, onUpdateQuizzes, onExit }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    totalQuizzes: quizzes.length,
    totalQuestions: quizzes.reduce((acc, q) => acc + q.questions.length, 0),
    thisMonth: quizzes.filter(q => {
      const date = new Date(q.date);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
  };

  const filteredQuizzes = quizzes.filter(q =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateQuiz = () => {
    const today = new Date();
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      date: today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      title: `Today Telenor Quiz Answers – ${today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      slug: `telenor-quiz-answers-${today.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toLowerCase().replace(/ /g, '-')}`,
      excerpt: 'New quiz answers for today.',
      createdAt: today.toISOString(),
      updatedAt: today.toISOString(),
      questions: [
        {
          id: 'q1',
          question: '',
          options: [
            { id: 'a', text: '', isCorrect: false },
            { id: 'b', text: '', isCorrect: false },
            { id: 'c', text: '', isCorrect: true },
            { id: 'd', text: '', isCorrect: false },
          ],
          correctAnswer: 'c',
        },
      ],
    };
    setEditingQuiz(newQuiz);
    setActiveTab('editor');
  };

  const handleSaveQuiz = () => {
    if (!editingQuiz) return;

    const existingIndex = quizzes.findIndex(q => q.id === editingQuiz.id);
    let updatedQuizzes;
    
    if (existingIndex >= 0) {
      updatedQuizzes = [...quizzes];
      updatedQuizzes[existingIndex] = editingQuiz;
    } else {
      updatedQuizzes = [editingQuiz, ...quizzes];
    }

    onUpdateQuizzes(updatedQuizzes);
    setEditingQuiz(null);
    setActiveTab('quizzes');
  };

  const handleDeleteQuiz = (quizId: string) => {
    if (confirm('Are you sure you want to delete this quiz?')) {
      onUpdateQuizzes(quizzes.filter(q => q.id !== quizId));
    }
  };

  const addQuestion = () => {
    if (!editingQuiz) return;
    
    const newQuestion: QuizQuestion = {
      id: `q${editingQuiz.questions.length + 1}`,
      question: '',
      options: [
        { id: 'a', text: '', isCorrect: false },
        { id: 'b', text: '', isCorrect: false },
        { id: 'c', text: '', isCorrect: true },
        { id: 'd', text: '', isCorrect: false },
      ],
      correctAnswer: 'c',
    };

    setEditingQuiz({
      ...editingQuiz,
      questions: [...editingQuiz.questions, newQuestion],
    });
  };

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: string) => {
    if (!editingQuiz) return;

    const updatedQuestions = [...editingQuiz.questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setEditingQuiz({ ...editingQuiz, questions: updatedQuestions });
  };

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    if (!editingQuiz) return;

    const updatedQuestions = [...editingQuiz.questions];
    updatedQuestions[qIndex].options[oIndex].text = value;
    setEditingQuiz({ ...editingQuiz, questions: updatedQuestions });
  };

  const setCorrectAnswer = (qIndex: number, optionId: string) => {
    if (!editingQuiz) return;

    const updatedQuestions = [...editingQuiz.questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.map(o => ({
      ...o,
      isCorrect: o.id === optionId,
    }));
    updatedQuestions[qIndex].correctAnswer = optionId;
    setEditingQuiz({ ...editingQuiz, questions: updatedQuestions });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-[#1A1A2E] text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00ACE7] to-[#0078A0] flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold font-heading">Admin Dashboard</h1>
                <p className="text-xs text-gray-400">Telenor Quiz Manager</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onExit}
              className="text-gray-400 hover:text-white hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Exit Admin
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="quizzes">
              <Calendar className="w-4 h-4 mr-2" />
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="editor">
              <Edit3 className="w-4 h-4 mr-2" />
              Editor
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              <Card className="border-2 border-[#00ACE7]/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Quizzes</p>
                      <p className="text-3xl font-bold text-[#1A1A2E]">{stats.totalQuizzes}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-[#00ACE7]/10 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-[#00ACE7]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Questions</p>
                      <p className="text-3xl font-bold text-[#1A1A2E]">{stats.totalQuestions}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-amber-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">This Month</p>
                      <p className="text-3xl font-bold text-[#1A1A2E]">{stats.thisMonth}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={handleCreateQuiz} className="bg-[#00ACE7] hover:bg-[#0078A0]">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Quiz
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('quizzes')}>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Manage Quizzes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quizzes List */}
          <TabsContent value="quizzes">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <CardTitle>All Quizzes</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search quizzes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button onClick={handleCreateQuiz} className="bg-[#00ACE7] hover:bg-[#0078A0]">
                      <Plus className="w-4 h-4 mr-2" />
                      New
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredQuizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-4 border rounded-xl hover:border-[#00ACE7]/30 transition-colors"
                    >
                      <div>
                        <h3 className="font-semibold text-[#1A1A2E]">{quiz.title}</h3>
                        <p className="text-sm text-gray-500">{quiz.date} • {quiz.questions.length} questions</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingQuiz(quiz);
                            setActiveTab('editor');
                          }}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:bg-red-50"
                          onClick={() => handleDeleteQuiz(quiz.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Editor */}
          <TabsContent value="editor">
            {editingQuiz ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-[#1A1A2E]">
                    {editingQuiz.id === Date.now().toString() ? 'Create New Quiz' : 'Edit Quiz'}
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setActiveTab('quizzes')}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button onClick={handleSaveQuiz} className="bg-green-600 hover:bg-green-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Quiz
                    </Button>
                  </div>
                </div>

                {/* Quiz Details */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
                      <Input
                        value={editingQuiz.title}
                        onChange={(e) => setEditingQuiz({ ...editingQuiz, title: e.target.value })}
                        placeholder="Enter quiz title..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                      <Textarea
                        value={editingQuiz.excerpt}
                        onChange={(e) => setEditingQuiz({ ...editingQuiz, excerpt: e.target.value })}
                        placeholder="Short description..."
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Questions */}
                <div className="space-y-4">
                  {editingQuiz.questions.map((question, qIndex) => (
                    <Card key={question.id} className="border-2 border-gray-100">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-[#1A1A2E]">Question {qIndex + 1}</h3>
                          {editingQuiz.questions.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500"
                              onClick={() => {
                                const updated = [...editingQuiz.questions];
                                updated.splice(qIndex, 1);
                                setEditingQuiz({ ...editingQuiz, questions: updated });
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                          <Textarea
                            value={question.question}
                            onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                            placeholder="Enter question..."
                          />
                        </div>

                        <div className="grid gap-3">
                          <label className="block text-sm font-medium text-gray-700">Options (Select correct answer)</label>
                          {question.options.map((option, oIndex) => (
                            <div key={option.id} className="flex items-center gap-3">
                              <button
                                onClick={() => setCorrectAnswer(qIndex, option.id)}
                                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                                  option.isCorrect
                                    ? 'border-green-500 bg-green-500'
                                    : 'border-gray-300 hover:border-green-400'
                                }`}
                              >
                                {option.isCorrect && <Check className="w-4 h-4 text-white" />}
                              </button>
                              <Input
                                value={option.text}
                                onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                placeholder={`Option ${option.id.toUpperCase()}`}
                                className={option.isCorrect ? 'border-green-300 bg-green-50' : ''}
                              />
                            </div>
                          ))}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                          <Textarea
                            value={question.description || ''}
                            onChange={(e) => updateQuestion(qIndex, 'description', e.target.value)}
                            placeholder="Additional info about the answer..."
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Button onClick={addQuestion} variant="outline" className="w-full border-dashed">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 mb-4">Select a quiz to edit or create a new one</p>
                <Button onClick={handleCreateQuiz} className="bg-[#00ACE7] hover:bg-[#0078A0]">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Quiz
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
                  <Input defaultValue="Telenor Quiz Answers" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <Textarea 
                    defaultValue="Get 100% correct answers for daily Telenor quiz. Win free MBs with our accurate solutions." 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Google Analytics ID</label>
                  <Input placeholder="G-XXXXXXXXXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">AdSense Publisher ID</label>
                  <Input placeholder="pub-XXXXXXXXXXXXXXXX" />
                </div>
                <Button className="bg-[#00ACE7] hover:bg-[#0078A0]">
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
