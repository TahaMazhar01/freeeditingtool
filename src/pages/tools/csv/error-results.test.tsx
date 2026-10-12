import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import CsvToJson from './csv-to-json';
import CsvToXml from './csv-to-xml';
import { CustomSnackBarContext } from '../../../contexts/CustomSnackBarContext';

vi.mock('react-i18next', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  useTranslation: () => ({ t: (key: string) => key })
}));
afterEach(cleanup);
it.each([CsvToJson, CsvToXml])(
  'blocks error exports and recovers after corrected CSV',
  async (Component) => {
    render(
      <CustomSnackBarContext.Provider value={{ showSnackBar: vi.fn() }}>
        <Component title="CSV" />
      </CustomSnackBarContext.Provider>
    );
    const input = screen
      .getAllByRole('textbox')
      .find(
        (element) =>
          element.tagName === 'TEXTAREA' &&
          !(element as HTMLTextAreaElement).disabled
      )!;
    fireEvent.change(input, { target: { value: 'name,age\nAlice,30' } });
    expect(
      await screen.findByRole('button', { name: 'resultFooter.download' })
    ).toBeEnabled();
    fireEvent.change(input, { target: { value: 'name,name\nAlice,Bob' } });
    expect(await screen.findByRole('alert')).toHaveTextContent('duplicate');
    expect(
      screen.queryByRole('button', { name: 'resultFooter.download' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'resultFooter.copy' })
    ).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'name,age\nBob,40' } });
    await waitFor(() =>
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    );
    expect(
      await screen.findByRole('button', { name: 'resultFooter.download' })
    ).toBeEnabled();
  }
);
