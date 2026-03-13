import { useState, useEffect } from 'react';
import { Menu, X, Search, Home, Calendar, Lightbulb, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { ViewMode } from '@/types/quiz';

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onSearch?: (query: string) => void;
}

export function Header({ viewMode, onViewModeChange, onSearch }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const navLinks = [
    { href: '#home', label: 'Home', icon: Home },
    { href: '#today', label: 'Today\'s Answers', icon: Calendar },
    { href: '#previous', label: 'Previous Quizzes', icon: Calendar },
    { href: '#tips', label: 'Quiz Tips', icon: Lightbulb },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg border-b border-[#00ACE7]/10 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00ACE7] to-[#0078A0] flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-[#00ACE7]/30 transition-all duration-300">
              <span className="text-white font-bold text-lg font-heading">T</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold font-heading text-[#1A1A2E] group-hover:text-[#00ACE7] transition-colors">
                TELENOR
              </span>
              <span className="text-lg font-bold font-heading text-[#00ACE7] ml-1">
                QUIZ
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#00ACE7] transition-colors group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#00ACE7] to-[#0078A0] group-hover:w-3/4 transition-all duration-300 rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className={`hidden md:flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-10'}`}>
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="relative w-full">
                  <Input
                    type="text"
                    placeholder="Search quizzes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-8 h-10 border-[#00ACE7]/30 focus:border-[#00ACE7] focus:ring-[#00ACE7]/20"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                </form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                  className="hover:bg-[#00ACE7]/10 hover:text-[#00ACE7]"
                >
                  <Search className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Admin Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewModeChange(viewMode === 'admin' ? 'user' : 'admin')}
              className={`hidden sm:flex items-center gap-2 ${
                viewMode === 'admin' 
                  ? 'bg-[#00ACE7]/10 text-[#00ACE7]' 
                  : 'hover:bg-[#00ACE7]/10 hover:text-[#00ACE7]'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm">{viewMode === 'admin' ? 'Exit Admin' : 'Admin'}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden hover:bg-[#00ACE7]/10 hover:text-[#00ACE7]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-100 animate-slide-up">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4 relative">
              <Input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 h-12 border-[#00ACE7]/30"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </form>

            {/* Mobile Nav Links */}
            <nav className="mt-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#00ACE7]/10 hover:text-[#00ACE7] rounded-lg transition-colors"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
              <button
                onClick={() => {
                  onViewModeChange(viewMode === 'admin' ? 'user' : 'admin');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  viewMode === 'admin'
                    ? 'bg-[#00ACE7]/10 text-[#00ACE7]'
                    : 'text-gray-700 hover:bg-[#00ACE7]/10 hover:text-[#00ACE7]'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="font-medium">{viewMode === 'admin' ? 'Exit Admin' : 'Admin Panel'}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
