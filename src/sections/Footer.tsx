import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart } from 'lucide-react';

const footerLinks = {
  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'Today\'s Answers', href: '#today' },
    { label: 'Previous Quizzes', href: '#previous' },
    { label: 'Quiz Tips', href: '#tips' },
  ],
  categories: [
    { label: 'Daily Telenor Quiz', href: '#daily' },
    { label: 'My Telenor App', href: '#app' },
    { label: 'Quiz Archive', href: '#archive' },
    { label: 'Help & Support', href: '#help' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Disclaimer', href: '#disclaimer' },
    { label: 'Contact Us', href: '#contact' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A2E] text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00ACE7] to-[#0078A0] flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl font-heading">T</span>
              </div>
              <div>
                <span className="text-xl font-bold font-heading text-white">TELENOR</span>
                <span className="text-xl font-bold font-heading text-[#00ACE7] ml-1">QUIZ</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted source for daily Telenor quiz answers. Get 100% correct answers and win free MBs every day!
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#00ACE7] transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00ACE7] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#00ACE7] transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6">Categories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#00ACE7] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-[#00ACE7] transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-[#00ACE7]" />
                <span>support@telenorquiz.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-[#00ACE7]" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-[#00ACE7] flex-shrink-0" />
                <span>Islamabad, Pakistan</span>
              </li>
            </ul>

            <h3 className="text-lg font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-[#00ACE7] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} Telenor Quiz Answers. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for Telenor Users
            </p>
            <p className="text-gray-500 text-sm">
              Not affiliated with Telenor Pakistan. Independent fan site.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
