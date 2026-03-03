import { Link } from '@tanstack/react-router';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Categories', path: '/categories' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'rk-overseas');

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber flex-shrink-0">
                <img
                  src="/assets/generated/rk-logo.dim_256x256.png"
                  alt="RK Overseas Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-amber font-display font-bold text-lg leading-none">RK Overseas</div>
                <div className="text-white/50 text-xs tracking-widest uppercase">Home Appliances</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Your trusted partner for premium home appliances. Quality products, competitive prices, and exceptional service for customers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-amber transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin size={16} className="text-amber mt-0.5 flex-shrink-0" />
                <span>123 Commerce Street, Business District, Mumbai 400001, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone size={16} className="text-amber flex-shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail size={16} className="text-amber flex-shrink-0" />
                <span>info@rkoverseas.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {year} RK Overseas Home Appliances. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Built with <Heart size={12} className="text-amber fill-amber" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
