import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Inquiry {
    id: bigint;
    name: string;
    productId: bigint;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Product {
    id: bigint;
    model: string;
    inStock: bigint;
    name: string;
    description: string;
    imageUrl: string;
    category: bigint;
    brand: string;
    price: number;
}
export interface Category {
    id: bigint;
    name: string;
    description: string;
}
export interface backendInterface {
    addCategory(name: string, description: string): Promise<bigint>;
    addInquiry(name: string, email: string, phone: string, message: string, productId: bigint): Promise<bigint>;
    addProduct(name: string, description: string, price: number, category: bigint, imageUrl: string, inStock: bigint, brand: string, model: string): Promise<bigint>;
    deleteCategory(id: bigint): Promise<void>;
    deleteProduct(id: bigint): Promise<void>;
    filterProductsByPrice(minPrice: number, maxPrice: number): Promise<Array<Product>>;
    getAllAvailableProducts(): Promise<Array<Product>>;
    getAllCategories(): Promise<Array<Category>>;
    getAllProducts(): Promise<Array<Product>>;
    getAllProductsPaged(page: bigint, pageSize: bigint): Promise<Array<Product>>;
    getCategory(id: bigint): Promise<Category>;
    getInquiriesForProduct(productId: bigint): Promise<Array<Inquiry>>;
    getProduct(id: bigint): Promise<Product>;
    getProductsByCategory(categoryId: bigint): Promise<Array<Product>>;
    getProductsByCategoryName(categoryName: string): Promise<Array<Product>>;
    getTotalProducts(): Promise<bigint>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
    updateCategory(id: bigint, name: string, description: string): Promise<void>;
    updateProduct(id: bigint, name: string, description: string, price: number, category: bigint, imageUrl: string, inStock: bigint, brand: string, model: string): Promise<void>;
}
