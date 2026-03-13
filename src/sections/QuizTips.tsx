import { Lightbulb, Clock, Bell, Smartphone, Trophy, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const tips = [
  {
    icon: Clock,
    title: 'Check Daily at 12 AM',
    description: 'New quiz questions are updated at midnight. Be the first to answer and win maximum rewards.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    icon: Bell,
    title: 'Enable Notifications',
    description: 'Turn on notifications in My Telenor App to get alerts when new quiz is available.',
    color: 'from-red-400 to-rose-500',
  },
  {
    icon: Smartphone,
    title: 'Use Our Website Daily',
    description: 'Bookmark this page and visit daily for instant 100% correct answers without guessing.',
    color: 'from-[#00ACE7] to-[#0078A0]',
  },
  {
    icon: Trophy,
    title: 'Answer All 5 Correctly',
    description: 'You need to answer all 5 questions correctly to get the maximum free MBs reward.',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Star,
    title: 'Share with Friends',
    description: 'Share answers with friends and family so they can also win free MBs daily.',
    color: 'from-purple-400 to-violet-500',
  },
  {
    icon: Lightbulb,
    title: 'Learn While Playing',
    description: 'Read the descriptions to learn interesting facts about each answer.',
    color: 'from-pink-400 to-fuchsia-500',
  },
];

export function QuizTips() {
  return (
    <section id="tips" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200">
            <Lightbulb className="w-3 h-3 mr-1" />
            Pro Tips
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[#1A1A2E] mb-4">
            Quiz Tips & Tricks
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Follow these expert tips to maximize your rewards and never miss a quiz answer.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, index) => (
            <Card
              key={tip.title}
              className="group border-2 border-gray-100 hover:border-transparent transition-all duration-300 card-hover overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tip.color} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <tip.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-2 group-hover:text-[#00ACE7] transition-colors">
                  {tip.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {tip.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 p-8 bg-gradient-to-r from-[#00ACE7] to-[#0078A0] rounded-2xl text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Ready to Win Free MBs?</h3>
          <p className="text-white/80 mb-0">
            Bookmark this page and visit daily for instant correct answers!
          </p>
        </div>
      </div>
    </section>
  );
}
