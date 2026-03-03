import { useState, useMemo } from 'react';
import { useSearch, useNavigate } from '@tanstack/react-router';
import { Search, SlidersHorizontal, X, Package } from 'lucide-react';
import { useAllProducts, useAllCategories } from '../hooks/useQueries';
import ProductCard from '../components/ProductCard';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { Category } from '../backend';

export default function Products() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { category?: string };
  const initialCategory = search?.category ?? '';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const { data: products, isLoading: productsLoading } = useAllProducts();
  const { data: categories, isLoading: categoriesLoading } = useAllCategories();

  const categoryMap = useMemo(() => {
    const map: Record<string, Category> = {};
    if (categories) {
      categories.forEach((cat) => {
        map[cat.id.toString()] = cat;
      });
    }
    return map;
  }, [categories]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    let result = [...products];

    if (selectedCategory) {
      result = result.filter((p) => p.category.toString() === selectedCategory);
    }

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.brand.toLowerCase().includes(lower) ||
          p.model.toLowerCase().includes(lower) ||
          p.description.toLowerCase().includes(lower)
      );
    }

    return result;
  }, [products, selectedCategory, searchTerm]);

  const handleCategorySelect = (catId: string) => {
    const newCat = selectedCategory === catId ? '' : catId;
    setSelectedCategory(newCat);
    navigate({ to: '/products', search: newCat ? { category: newCat } : {} });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    navigate({ to: '/products' });
  };

  const hasFilters = searchTerm.trim() || selectedCategory;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <p className="text-amber text-sm font-semibold uppercase tracking-wider mb-1">Our Collection</p>
        <h1 className="font-display text-3xl font-bold text-foreground">All Products</h1>
        <p className="text-muted-foreground mt-2">
          {products ? `${filteredProducts.length} of ${products.length} products` : 'Loading...'}
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, brand, or model..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border px-4 py-2 rounded-md transition-colors"
          >
            <X size={14} />
            Clear Filters
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => handleCategorySelect('')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
            !selectedCategory
              ? 'bg-charcoal text-white border-charcoal'
              : 'bg-card text-foreground border-border hover:border-charcoal'
          }`}
        >
          <SlidersHorizontal size={13} />
          All
        </button>
        {categoriesLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-28 rounded-full" />
            ))
          : categories?.map((cat) => (
              <button
                key={cat.id.toString()}
                onClick={() => handleCategorySelect(cat.id.toString())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  selectedCategory === cat.id.toString()
                    ? 'bg-amber text-amber-foreground border-amber'
                    : 'bg-card text-foreground border-border hover:border-amber'
                }`}
              >
                {cat.name}
              </button>
            ))}
      </div>

      {/* Active filter badge */}
      {selectedCategory && categoryMap[selectedCategory] && (
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">Filtering by:</span>
          <Badge className="bg-amber/10 text-amber border border-amber/30 gap-1">
            {categoryMap[selectedCategory].name}
            <button onClick={() => handleCategorySelect('')} className="ml-1 hover:text-amber-dark">
              <X size={12} />
            </button>
          </Badge>
        </div>
      )}

      {/* Products Grid */}
      {productsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
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
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Package size={28} className="text-muted-foreground" />
          </div>
          <h3 className="font-semibold text-foreground text-lg mb-2">No products found</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Try adjusting your search or filter criteria.
          </p>
          <button
            onClick={clearFilters}
            className="bg-amber text-amber-foreground font-semibold px-6 py-2.5 rounded-md hover:bg-amber-dark transition-all duration-200"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              category={categoryMap[product.category.toString()]}
            />
          ))}
        </div>
      )}
    </div>
  );
}
