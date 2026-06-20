import { Navigate, RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('../pages/home'));
const About = lazy(() => import('../pages/about'));
const ToolsByCategory = lazy(() => import('../pages/tools-by-category'));
const Privacy = lazy(() => import('../pages/legal/Privacy'));
const Terms = lazy(() => import('../pages/legal/Terms'));
const Contact = lazy(() => import('../pages/legal/Contact'));

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
    path: '*',
    element: <Navigate to="404" />
  }
];

export default routes;
