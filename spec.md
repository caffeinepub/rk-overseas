# Specification

## Summary
**Goal:** Build a multi-page home appliances e-commerce store for "RK Overseas" with a product catalog, category browsing, product detail views, and a customer inquiry system.

**Planned changes:**
- Backend actor (Motoko) with data models for Product, Category, and Inquiry; CRUD for products/categories and addInquiry function; data persists across upgrades
- Seed data: at least 5 categories (Kitchen Appliances, Washing Machines, Air Conditioners, Refrigerators, Small Appliances) and at least 12 sample products with realistic brands, models, and prices
- Frontend pages: Home (hero banner, featured products), Shop (product grid, category filter, search), Product Detail (full info + inquiry button), Categories, Contact/Inquiry form, About
- Persistent navbar with RK Overseas logo and navigation links; footer with contact details
- Inquiry form with field validation (name, email, phone, message, optional product reference) that submits to backend
- Visual theme: deep charcoal, crisp white, amber/gold accent; card-based product layouts with shadows and hover effects; clean sans-serif typography; responsive for desktop and mobile
- Static assets served from `frontend/public/assets/generated`: hero banner, store logo, category tile background; consistent placeholder imagery for product cards

**User-visible outcome:** Visitors can browse home appliances by category or search by name/brand, view full product details, and submit inquiries — all within a cohesive, premium-feeling storefront.
