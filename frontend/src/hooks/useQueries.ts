import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Category } from '../backend';

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(id: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<Product>({
    queryKey: ['product', id.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('No actor');
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCategory(id: bigint | undefined) {
  const { actor, isFetching } = useActor();
  return useQuery<Category>({
    queryKey: ['category', id?.toString() ?? ''],
    queryFn: async () => {
      if (!actor || id === undefined) throw new Error('No actor or id');
      return actor.getCategory(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useProductsByCategory(categoryId: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ['products', 'category', categoryId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCategory(categoryId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchProducts(searchTerm: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ['products', 'search', searchTerm],
    queryFn: async () => {
      if (!actor || !searchTerm.trim()) return [];
      return actor.searchProducts(searchTerm);
    },
    enabled: !!actor && !isFetching && searchTerm.trim().length > 0,
  });
}

export function useAddInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      message,
      productId,
    }: {
      name: string;
      email: string;
      phone: string;
      message: string;
      productId: bigint;
    }) => {
      if (!actor) throw new Error('No actor');
      return actor.addInquiry(name, email, phone, message, productId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}
