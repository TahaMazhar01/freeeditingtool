import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import ToolTextResult from './ToolTextResult';
import { CustomSnackBarContext } from '../../contexts/CustomSnackBarContext';
vi.mock('react-i18next', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  useTranslation: () => ({ t: (key: string) => key })
}));
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it('displays and copies exactly the same JSON without interpreting escape sequences', async () => {
  const value = JSON.stringify({
    path: 'C:\\new\\test',
    literal: '\\n',
    quote: '"'
  });
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal('navigator', { clipboard: { writeText } });
  render(
    <CustomSnackBarContext.Provider value={{ showSnackBar: vi.fn() }}>
      <ToolTextResult title="JSON" value={value} extension="json" />
    </CustomSnackBarContext.Provider>
  );
  expect(screen.getByRole('textbox')).toHaveValue(value);
  fireEvent.click(screen.getByRole('button', { name: 'resultFooter.copy' }));
  await waitFor(() => expect(writeText).toHaveBeenCalledWith(value));
});
