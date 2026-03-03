import { useNavigate } from '@tanstack/react-router';
import { useAllCategories, useAllProducts } from '../hooks/useQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowRight } from 'lucide-react';
import type { Product } from '../backend';

const CATEGORY_ICONS: Record<string, string> = {
  'Kitchen Appliances': '🍳',
  'Washing Machines': '🫧',
  'Air Conditioners': '❄️',
  'Refrigerators': '🧊',
  'Small Appliances': '⚡',
};

const CATEGORY_COLORS: Record<string, string> = {
  'Kitchen Appliances': 'from-orange-500/20 to-amber-500/10',
  'Washing Machines': 'from-blue-500/20 to-cyan-500/10',
  'Air Conditioners': 'from-sky-500/20 to-blue-500/10',
  'Refrigerators': 'from-teal-500/20 to-emerald-500/10',
  'Small Appliances': 'from-purple-500/20 to-violet-500/10',
};

export default function Categories() {
  const navigate = useNavigate();
  const { data: categories, isLoading: categoriesLoading } = useAllCategories();
  const { data: products } = useAllProducts();

  const getProductCount = (categoryId: bigint): number => {
    if (!products) return 0;
    return products.filter((p: Product) => p.category === categoryId).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-amber text-sm font-semibold uppercase tracking-wider mb-1">Browse by Type</p>
        <h1 className="font-display text-3xl font-bold text-foreground">Product Categories</h1>
        <p className="text-muted-foreground mt-2">
          Explore our wide range of home appliances organized by category.
        </p>
      </div>

      {/* Categories Grid */}
      {categoriesLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((cat) => {
            const count = getProductCount(cat.id);
            const icon = CATEGORY_ICONS[cat.name] ?? '📦';
            const gradient = CATEGORY_COLORS[cat.name] ?? 'from-gray-500/20 to-slate-500/10';

            return (
              <div
                key={cat.id.toString()}
                className="group relative rounded-xl overflow-hidden border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate({ to: '/products', search: { category: cat.id.toString() } })}
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <img
                    src="/assets/generated/category-bg.dim_600x400.png"
                    alt=""
                    className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
                </div>

                <div className="relative p-8">
                  <div className="text-5xl mb-4">{icon}</div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-amber transition-colors">
                    {cat.name}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-amber bg-amber/10 px-3 py-1 rounded-full border border-amber/20">
                      {count} {count === 1 ? 'product' : 'products'}
                    </span>
                    <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-amber transition-colors">
                      Browse <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
