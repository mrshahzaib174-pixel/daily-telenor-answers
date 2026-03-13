import { useState } from 'react';
import { MessageCircle, Send, ThumbsUp, Reply, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
  replies: Comment[];
}

const initialComments: Comment[] = [
  {
    id: '1',
    author: 'Ahmed Khan',
    content: 'Thanks for the accurate answers! Got my free MBs today. Keep up the good work!',
    createdAt: '2 hours ago',
    likes: 12,
    replies: [],
  },
  {
    id: '2',
    author: 'Sara Ali',
    content: 'This website is a lifesaver! I check it every day before attempting the quiz.',
    createdAt: '5 hours ago',
    likes: 8,
    replies: [
      {
        id: '2-1',
        author: 'Telenor Quiz Team',
        content: 'Thank you Sara! We update answers daily at 12 AM. Glad we could help!',
        createdAt: '4 hours ago',
        likes: 3,
        replies: [],
      },
    ],
  },
  {
    id: '3',
    author: 'Muhammad Usman',
    content: 'The answers are always 100% correct. Highly recommended!',
    createdAt: '1 day ago',
    likes: 15,
    replies: [],
  },
];

export function Comments() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        author: authorName,
        content: newComment,
        createdAt: 'Just now',
        likes: 0,
        replies: [],
      };

      setComments([comment, ...comments]);
      setNewComment('');
      setIsSubmitting(false);
    }, 500);
  };

  const handleLike = (commentId: string) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, likes: comment.likes + 1 }
        : comment
    ));
  };

  return (
    <section id="comments" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#00ACE7]/10 text-[#00ACE7] border-[#00ACE7]/20 hover:bg-[#00ACE7]/20">
            <MessageCircle className="w-3 h-3 mr-1" />
            Community
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#1A1A2E] mb-4">
            Comments & Discussion
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join the conversation! Share your experience and help others win free MBs.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Comment Form */}
          <Card className="mb-8 border-2 border-[#00ACE7]/20">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#00ACE7]" />
                Leave a Comment
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00ACE7] focus:ring-[#00ACE7]/20 outline-none transition-colors"
                    required
                  />
                </div>
                <Textarea
                  placeholder="Share your thoughts..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[120px] border-2 border-gray-200 focus:border-[#00ACE7] focus:ring-[#00ACE7]/20 resize-none"
                  required
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || !newComment.trim() || !authorName.trim()}
                  className="bg-gradient-to-r from-[#00ACE7] to-[#0078A0] hover:from-[#0078A0] hover:to-[#00ACE7] text-white"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Post Comment
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#1A1A2E]">
                {comments.length} Comment{comments.length !== 1 ? 's' : ''}
              </h3>
            </div>

            {comments.map((comment) => (
              <Card key={comment.id} className="border-2 border-gray-100 hover:border-[#00ACE7]/20 transition-colors">
                <CardContent className="p-6">
                  {/* Comment Header */}
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10 bg-gradient-to-br from-[#00ACE7] to-[#0078A0]">
                      <AvatarFallback className="text-white font-bold">
                        {comment.author.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-[#1A1A2E]">{comment.author}</span>
                        <span className="text-xs text-gray-400">{comment.createdAt}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.content}</p>

                      {/* Comment Actions */}
                      <div className="flex items-center gap-4 mt-3">
                        <button
                          onClick={() => handleLike(comment.id)}
                          className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#00ACE7] transition-colors"
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#00ACE7] transition-colors">
                          <Reply className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors">
                          <Flag className="w-4 h-4" />
                          <span>Report</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies.length > 0 && (
                    <div className="mt-4 ml-14 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500">
                              <AvatarFallback className="text-white text-xs font-bold">
                                {reply.author.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-sm text-[#1A1A2E]">{reply.author}</span>
                                <Badge className="bg-[#00ACE7]/10 text-[#00ACE7] text-xs">Admin</Badge>
                                <span className="text-xs text-gray-400">{reply.createdAt}</span>
                              </div>
                              <p className="text-sm text-gray-700">{reply.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
