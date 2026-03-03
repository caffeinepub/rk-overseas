import { Link, useNavigate } from '@tanstack/react-router';
import { ArrowRight, Shield, Truck, HeadphonesIcon, Star, ChevronRight } from 'lucide-react';
import { useAllProducts, useAllCategories } from '../hooks/useQueries';
import ProductCard from '../components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import type { Category } from '../backend';

const highlights = [
  {
    icon: Shield,
    title: 'Genuine Products',
    desc: 'All appliances are 100% authentic with manufacturer warranty.',
  },
  {
    icon: Truck,
    title: 'Worldwide Shipping',
    desc: 'Fast and reliable delivery to customers across the globe.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    desc: 'Our expert team is always ready to assist you.',
  },
  {
    icon: Star,
    title: 'Best Prices',
    desc: 'Competitive pricing with no compromise on quality.',
  },
];

export default function Home() {
  const { data: products, isLoading: productsLoading } = useAllProducts();
  const { data: categories } = useAllCategories();
  const navigate = useNavigate();

  const categoryMap: Record<string, Category> = {};
  if (categories) {
    categories.forEach((cat) => {
      categoryMap[cat.id.toString()] = cat;
    });
  }

  const featuredProducts = products?.slice(0, 6) ?? [];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-charcoal min-h-[420px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-banner.dim_1440x500.png"
            alt="RK Overseas Home Appliances"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark/90 via-charcoal/70 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-amber/20 border border-amber/30 text-amber text-xs font-semibold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
              <Star size={12} className="fill-amber" />
              Premium Home Appliances
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Elevate Your Home with{' '}
              <span className="text-amber">World-Class</span> Appliances
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Discover top brands like Samsung, LG, Bosch, and more. Quality appliances at competitive prices, shipped worldwide.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-amber text-amber-foreground font-semibold px-6 py-3 rounded-md hover:bg-amber-dark transition-all duration-200 shadow-amber"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-md hover:bg-white/10 transition-all duration-200"
              >
                Browse Categories
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-white dark:bg-charcoal-dark border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 p-4">
                <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center">
                  <Icon size={22} className="text-amber" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{title}</div>
                  <div className="text-muted-foreground text-xs mt-1 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-amber text-sm font-semibold uppercase tracking-wider mb-1">Our Selection</p>
            <h2 className="font-display text-3xl font-bold text-foreground">Featured Products</h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-amber hover:text-amber-dark transition-colors"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-lg overflow-hidden border border-border">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-between pt-2">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                category={categoryMap[product.category.toString()]}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-amber text-amber-foreground font-semibold px-6 py-3 rounded-md hover:bg-amber-dark transition-all duration-200"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="bg-muted/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-amber text-sm font-semibold uppercase tracking-wider mb-1">Shop by Type</p>
            <h2 className="font-display text-3xl font-bold text-foreground">Browse Categories</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {(categories ?? []).map((cat) => (
              <button
                key={cat.id.toString()}
                onClick={() => navigate({ to: '/products', search: { category: cat.id.toString() } })}
                className="group bg-card rounded-lg p-5 text-center border border-border hover:border-amber hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-amber/20 transition-colors">
                  <span className="text-2xl">
                    {cat.name === 'Kitchen Appliances' ? '🍳' :
                     cat.name === 'Washing Machines' ? '🫧' :
                     cat.name === 'Air Conditioners' ? '❄️' :
                     cat.name === 'Refrigerators' ? '🧊' : '⚡'}
                  </span>
                </div>
                <div className="text-sm font-semibold text-foreground group-hover:text-amber transition-colors">{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Need Help Choosing the Right Appliance?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Our experts are ready to help you find the perfect appliance for your needs and budget.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-amber text-amber-foreground font-semibold px-8 py-4 rounded-md hover:bg-amber-dark transition-all duration-200 shadow-amber text-lg"
          >
            Get in Touch <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
