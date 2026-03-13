import { useEffect, useRef } from 'react';
import { ArrowDown, Zap, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.min(50, Math.floor(window.innerWidth / 30));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#E6F7FD');
      gradient.addColorStop(0.5, '#FFFFFF');
      gradient.addColorStop(1, '#E6F7FD');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 172, 231, ${particle.opacity})`;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 172, 231, ${0.1 * (1 - distance / 150)})`;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    resize();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resize();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToQuiz = () => {
    document.getElementById('today')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00ACE7]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0078A0]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-[#00ACE7]/20 mb-8 animate-fade-in">
          <Zap className="w-4 h-4 text-[#00ACE7]" />
          <span className="text-sm font-medium text-gray-700">100% Correct Answers Daily</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-[#1A1A2E] mb-6 animate-slide-up stagger-1">
          Today{' '}
          <span className="text-gradient relative">
            Telenor Quiz
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#00ACE7] to-[#0078A0] rounded-full" />
          </span>
          <br />
          Answers
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-slide-up stagger-2">
          Get instant access to 100% correct answers for My Telenor App quiz daily. 
          Win free MBs and rewards with our accurate solutions.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10 animate-slide-up stagger-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#00ACE7]/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-[#00ACE7]" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-[#1A1A2E]">100%</p>
              <p className="text-xs text-gray-500">Accuracy</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#00ACE7]/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#00ACE7]" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-[#1A1A2E]">Daily</p>
              <p className="text-xs text-gray-500">Updates</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-[#00ACE7]/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#00ACE7]" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-[#1A1A2E]">Free</p>
              <p className="text-xs text-gray-500">MBs Daily</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-slide-up stagger-4">
          <Button
            onClick={scrollToQuiz}
            size="lg"
            className="bg-gradient-to-r from-[#00ACE7] to-[#0078A0] hover:from-[#0078A0] hover:to-[#00ACE7] text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-xl shadow-[#00ACE7]/30 hover:shadow-2xl hover:shadow-[#00ACE7]/40 transition-all duration-300 hover:-translate-y-1"
          >
            View Today&apos;s Answers
            <ArrowDown className="w-5 h-5 ml-2 animate-bounce" />
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-gray-500 animate-fade-in stagger-5">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Updated Daily
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Verified Answers
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            Free to Use
          </span>
        </div>
      </div>
    </section>
  );
}
