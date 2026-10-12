import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import ToolDiffResult from './ToolDiffResult';
import { CustomSnackBarContext } from '../../contexts/CustomSnackBarContext';
vi.mock('react-i18next', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  useTranslation: () => ({ t: (key: string) => key })
}));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});
it('copies a diff with explicit additions and removals', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal('navigator', { clipboard: { writeText } });
  render(
    <CustomSnackBarContext.Provider value={{ showSnackBar: vi.fn() }}>
      <ToolDiffResult
        value={
          'Hello <span class="diff-removed">world</span><span class="diff-added">tools</span>'
        }
        copyValue="Hello [-world-][+tools+]"
      />
    </CustomSnackBarContext.Provider>
  );
  fireEvent.click(screen.getByRole('button', { name: 'Copy Diff' }));
  await waitFor(() =>
    expect(writeText).toHaveBeenCalledWith('Hello [-world-][+tools+]')
  );
});
