import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, ShoppingBag } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Categories', path: '/categories' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-charcoal shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber flex-shrink-0">
              <img
                src="/assets/generated/rk-logo.dim_256x256.png"
                alt="RK Overseas Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-amber font-display font-bold text-lg leading-none">RK Overseas</span>
              <span className="text-white/60 text-xs tracking-widest uppercase">Home Appliances</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-amber bg-white/10'
                    : 'text-white/80 hover:text-amber hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-2 bg-amber text-amber-foreground text-sm font-semibold px-4 py-2 rounded-md hover:bg-amber-dark transition-all duration-200 shadow-amber"
            >
              <ShoppingBag size={16} />
              Shop Now
            </Link>
            <button
              className="md:hidden text-white/80 hover:text-amber transition-colors p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-charcoal-dark border-t border-white/10 animate-fade-in">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-amber bg-white/10'
                    : 'text-white/80 hover:text-amber hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/products"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 bg-amber text-amber-foreground text-sm font-semibold px-4 py-3 rounded-md hover:bg-amber-dark transition-all duration-200"
            >
              <ShoppingBag size={16} />
              Shop Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
