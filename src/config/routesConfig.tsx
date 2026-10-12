import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('../pages/home'));
const About = lazy(() => import('../pages/about'));
const ToolsByCategory = lazy(() => import('../pages/tools-by-category'));
const Privacy = lazy(() => import('../pages/legal/Privacy'));
const Terms = lazy(() => import('../pages/legal/Terms'));
const Contact = lazy(() => import('../pages/legal/Contact'));
const NotFound = lazy(() => import('../pages/not-found'));
const Blog = lazy(() => import('../pages/blog'));
const BlogArticle = lazy(() => import('../pages/blog/Article'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/categories/:categoryName',
    element: <ToolsByCategory />
  },
  {
    path: '/privacy',
    element: <Privacy />
  },
  {
    path: '/terms',
    element: <Terms />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/blog',
    element: <Blog />
  },
  {
    path: '/blog/:slug',
    element: <BlogArticle />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
