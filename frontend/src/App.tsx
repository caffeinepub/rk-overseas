import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import About from './pages/About';

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: Products,
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$id',
  component: ProductDetail,
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/categories',
  component: Categories,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  productDetailRoute,
  categoriesRoute,
  contactRoute,
  aboutRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
