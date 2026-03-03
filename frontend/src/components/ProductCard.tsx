import { useNavigate } from '@tanstack/react-router';
import { ShoppingBag, CheckCircle, XCircle, Tag } from 'lucide-react';
import type { Product, Category } from '../backend';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  category?: Category;
}

const PRODUCT_IMAGES: Record<string, string> = {
  'Samsung': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80',
  'LG': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80',
  'Whirlpool': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
  'Daikin': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
  'Philips': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
  'Bosch': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  'Panasonic': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80',
  'Haier': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80',
  'Sony': 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=400&q=80',
  'Morphy Richards': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
  'Hitachi': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
  'IFB': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80',
};

const CATEGORY_IMAGES: Record<string, string> = {
  'Kitchen Appliances': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
  'Washing Machines': 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&q=80',
  'Air Conditioners': 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
  'Refrigerators': 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80',
  'Small Appliances': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
};

export function getProductImage(product: Product, category?: Category): string {
  if (PRODUCT_IMAGES[product.brand]) return PRODUCT_IMAGES[product.brand];
  if (category && CATEGORY_IMAGES[category.name]) return CATEGORY_IMAGES[category.name];
  return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80';
}

export default function ProductCard({ product, category }: ProductCardProps) {
  const navigate = useNavigate();
  const inStock = Number(product.inStock) > 0;
  const imageUrl = getProductImage(product, category);

  return (
    <div
      className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer group border border-border"
      onClick={() => navigate({ to: '/products/$id', params: { id: product.id.toString() } })}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80';
          }}
        />
        {category && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-charcoal/80 text-white text-xs backdrop-blur-sm border-0">
              <Tag size={10} className="mr-1" />
              {category.name}
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          {inStock ? (
            <span className="flex items-center gap-1 bg-green-600/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              <CheckCircle size={10} />
              In Stock
            </span>
          ) : (
            <span className="flex items-center gap-1 bg-red-600/90 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              <XCircle size={10} />
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
          {product.brand} · {product.model}
        </div>
        <h3 className="font-semibold text-foreground text-sm leading-snug mb-3 line-clamp-2 group-hover:text-amber transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-charcoal dark:text-amber">
            ${product.price.toFixed(2)}
          </span>
          <button
            className="flex items-center gap-1.5 bg-amber text-amber-foreground text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-amber-dark transition-all duration-200"
            onClick={(e) => {
              e.stopPropagation();
              navigate({ to: '/products/$id', params: { id: product.id.toString() } });
            }}
          >
            <ShoppingBag size={12} />
            View
          </button>
        </div>
      </div>
    </div>
  );
}
