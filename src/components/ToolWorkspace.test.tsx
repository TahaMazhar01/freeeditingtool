import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it } from 'vitest';
import { useState } from 'react';
import ToolWorkspace from './ToolWorkspace';
afterEach(cleanup);
function Input() {
  const [value, setValue] = useState('');
  return (
    <input
      aria-label="Workspace input"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
it('keeps the editor and its input when entering and leaving full screen', () => {
  render(
    <ToolWorkspace title="JSON">
      <Input />
    </ToolWorkspace>
  );
  const input = screen.getByRole('textbox', { name: 'Workspace input' });
  fireEvent.change(input, { target: { value: 'Keep this input' } });
  fireEvent.click(screen.getByRole('button', { name: 'Expand workspace' }));
  expect(
    screen.getByRole('dialog', { name: 'JSON workspace' })
  ).toHaveAttribute('aria-modal', 'true');
  expect(screen.getByRole('textbox')).toBe(input);
  expect(input).toHaveValue('Keep this input');
  expect(document.body.style.overflow).toBe('hidden');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(screen.getByRole('textbox')).toBe(input);
  expect(input).toHaveValue('Keep this input');
  expect(document.body.style.overflow).toBe('');
});
it('allows dedicated editors to start expanded then exit normally', () => {
  render(
    <ToolWorkspace title="Image editor" startExpanded>
      <Input />
    </ToolWorkspace>
  );
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Exit full screen' }));
  expect(screen.getByRole('region')).toBeInTheDocument();
});
