import { useParams, useNavigate, Link } from '@tanstack/react-router';
import {
  ArrowLeft,
  Tag,
  CheckCircle,
  XCircle,
  MessageSquare,
  Package,
  Star,
  Truck,
  Shield,
} from 'lucide-react';
import { useProduct, useCategory } from '../hooks/useQueries';
import { getProductImage } from '../components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function ProductDetail() {
  const { id } = useParams({ from: '/products/$id' });
  const navigate = useNavigate();
  const productId = BigInt(id);

  const { data: product, isLoading: productLoading, error: productError } = useProduct(productId);
  const { data: category } = useCategory(product?.category);

  const inStock = product ? Number(product.inStock) > 0 : false;
  const imageUrl = product ? getProductImage(product, category) : '';

  if (productError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <Package size={28} className="text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">Product Not Found</h2>
        <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate({ to: '/products' })}
          className="bg-amber text-amber-foreground font-semibold px-6 py-3 rounded-md hover:bg-amber-dark transition-all duration-200"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-amber transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-amber transition-colors">Products</Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate max-w-xs">
          {productLoading ? <Skeleton className="h-4 w-32 inline-block" /> : product?.name}
        </span>
      </nav>

      {productLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="h-96 rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-12 w-40 mt-6" />
          </div>
        </div>
      ) : product ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden bg-muted aspect-square lg:aspect-auto lg:h-[480px]">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80';
              }}
            />
            {category && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-charcoal/80 text-white backdrop-blur-sm border-0 text-sm px-3 py-1">
                  <Tag size={12} className="mr-1.5" />
                  {category.name}
                </Badge>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber text-sm font-semibold uppercase tracking-wider">{product.brand}</span>
              <span className="text-muted-foreground text-sm">·</span>
              <span className="text-muted-foreground text-sm">{product.model}</span>
            </div>

            <h1 className="font-display text-3xl font-bold text-foreground mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-charcoal dark:text-amber">
                ${product.price.toFixed(2)}
              </span>
              {inStock ? (
                <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                  <CheckCircle size={14} />
                  In Stock ({Number(product.inStock)} units)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-red-600 text-sm font-medium bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
                  <XCircle size={14} />
                  Out of Stock
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8 text-base">
              {product.description}
            </p>

            {/* Product Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-muted/50 rounded-lg border border-border">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Brand</div>
                <div className="font-semibold text-foreground">{product.brand}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Model</div>
                <div className="font-semibold text-foreground">{product.model}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Category</div>
                <div className="font-semibold text-foreground">{category?.name ?? '—'}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Availability</div>
                <div className={`font-semibold ${inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {inStock ? `${Number(product.inStock)} in stock` : 'Unavailable'}
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield size={16} className="text-amber" />
                Manufacturer Warranty
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck size={16} className="text-amber" />
                Worldwide Shipping
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star size={16} className="text-amber" />
                Genuine Product
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-auto">
              <Link
                to="/contact"
                search={{ productId: product.id.toString() }}
                className="flex items-center gap-2 bg-amber text-amber-foreground font-semibold px-6 py-3 rounded-md hover:bg-amber-dark transition-all duration-200 shadow-amber"
              >
                <MessageSquare size={18} />
                Make an Inquiry
              </Link>
              <button
                onClick={() => navigate({ to: '/products' })}
                className="flex items-center gap-2 border border-border text-foreground font-semibold px-6 py-3 rounded-md hover:bg-muted transition-all duration-200"
              >
                <ArrowLeft size={18} />
                Back to Products
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
