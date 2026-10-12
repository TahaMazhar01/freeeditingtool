import { Suspense } from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, useRoutes } from 'react-router-dom';
import { afterEach, beforeAll, describe, expect, it } from 'vitest';
import posts from '../../content/blogPosts.json';
import routes from '../../config/routesConfig';

function Pages() {
  return <Suspense fallback={<p>Loading</p>}>{useRoutes(routes)}</Suspense>;
}

describe('blog navigation and content', () => {
  beforeAll(async () => {
    await Promise.all([
      import('./index'),
      import('./Article'),
      import('../not-found')
    ]);
  });
  afterEach(cleanup);

  it('lists all six guides with article links and descriptive images', async () => {
    render(
      <MemoryRouter initialEntries={['/blog']}>
        <Pages />
      </MemoryRouter>
    );
    for (const post of posts) {
      expect(
        await screen.findByRole('link', { name: new RegExp(post.title) })
      ).toHaveAttribute('href', `/blog/${post.slug}`);
      expect(screen.getByRole('img', { name: post.imageAlt })).toHaveAttribute(
        'src',
        `/blog/${post.slug}-small.jpg`
      );
    }
  });

  it.each(posts)(
    'renders the complete $slug guide with sources and tool links',
    async (post) => {
      render(
        <MemoryRouter initialEntries={[`/blog/${post.slug}`]}>
          <Pages />
        </MemoryRouter>
      );
      expect(
        await screen.findByRole('heading', { level: 1, name: post.title })
      ).toBeInTheDocument();
      for (const section of post.sections) {
        expect(
          screen.getByRole('heading', { level: 2, name: section.heading })
        ).toBeInTheDocument();
        if (section.reference)
          expect(
            screen.getByRole('link', {
              name: new RegExp(section.reference.label)
            })
          ).toHaveAttribute('href', section.reference.url);
      }
      for (const tool of post.tools)
        expect(
          screen.getByRole('link', { name: `${tool.label} →` })
        ).toHaveAttribute('href', tool.path);
      expect(screen.getByRole('link', { name: post.license })).toHaveAttribute(
        'href',
        post.licenseUrl
      );
    }
  );

  it('shows a recovery page for an unknown article', async () => {
    render(
      <MemoryRouter initialEntries={['/blog/unknown-guide']}>
        <Pages />
      </MemoryRouter>
    );
    expect(
      await screen.findByRole('heading', { name: 'Page not found' })
    ).toBeInTheDocument();
  });

  it('keeps article prose free of commas and dash characters', () => {
    for (const post of posts) {
      const visible = [
        post.title,
        post.category,
        post.excerpt,
        post.intro,
        post.imageAlt,
        post.author,
        post.license,
        ...post.tools.map((tool) => tool.label),
        ...post.sections.flatMap((section) => [
          section.heading,
          ...section.paragraphs,
          section.reference?.label ?? ''
        ])
      ];
      expect(visible.join(' ')).not.toMatch(/[,\-\u2010-\u2015]/);
      expect(
        [post.intro, ...post.sections.flatMap((section) => section.paragraphs)]
          .join(' ')
          .split(/\s+/).length
      ).toBeGreaterThan(400);
    }
    expect(new Set(posts.map((post) => post.slug)).size).toBe(6);
  });
});
