import { Suspense } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation, useRoutes } from 'react-router-dom';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import routesConfig from './routesConfig';

function TestRoutes() {
  const location = useLocation();
  const routes = useRoutes(
    routesConfig.map((route) =>
      route.path === '/' ? { ...route, element: <h1>All tools</h1> } : route
    )
  );
  return (
    <>
      <output data-testid="current-path">{location.pathname}</output>
      <Suspense fallback={<p>Loading</p>}>{routes}</Suspense>
    </>
  );
}

describe('missing-page routing', () => {
  beforeAll(async () => {
    // Load the lazy page before assertions; cold MUI transforms can take seconds.
    await import('../pages/not-found');
  });
  afterEach(() => cleanup());

  it.each(['/404', '/missing-tool', '/nested/missing/tool'])(
    'renders a recovery page at %s without redirecting',
    async (path) => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <TestRoutes />
        </MemoryRouter>
      );
      expect(
        await screen.findByRole('heading', { name: 'Page not found' })
      ).toBeInTheDocument();
      expect(screen.getByTestId('current-path')).toHaveTextContent(path);

      fireEvent.click(screen.getByRole('link', { name: 'Browse all tools' }));
      expect(
        await screen.findByRole('heading', { name: 'All tools' })
      ).toBeInTheDocument();
      expect(screen.getByTestId('current-path').textContent).toBe('/');
    }
  );
});
