import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { afterEach, expect, it } from 'vitest';
import ToolCard from './ToolCard';

function CardWithLocation() {
  const location = useLocation();
  return (
    <>
      <output data-testid="current-path">{location.pathname}</output>
      <ToolCard
        title="Resize Image"
        description="Resize your images"
        link="/image/resize"
        icon="ph:image"
      />
    </>
  );
}

afterEach(() => cleanup());

it('supports native link focus, modified clicks, and ordinary navigation', () => {
  render(
    <MemoryRouter>
      <CardWithLocation />
    </MemoryRouter>
  );
  const card = screen.getByRole('link', { name: /Resize Image/ });
  expect(card).toHaveAttribute('href', '/image/resize');
  card.focus();
  expect(card).toHaveFocus();

  fireEvent.click(card, { ctrlKey: true });
  expect(screen.getByTestId('current-path').textContent).toBe('/');
  fireEvent.click(card);
  expect(screen.getByTestId('current-path').textContent).toBe('/image/resize');
});
