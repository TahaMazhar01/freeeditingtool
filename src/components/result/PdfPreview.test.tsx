import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import PdfPreview from './PdfPreview';

const mocks = vi.hoisted(() => ({
  getDocument: vi.fn(),
  destroy: vi.fn(),
  cancel: vi.fn()
}));
vi.mock('pdfjs-dist', () => ({
  GlobalWorkerOptions: {},
  getDocument: mocks.getDocument
}));

beforeEach(() => {
  Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
    configurable: true,
    value: vi.fn(() => ({}))
  });
  vi.stubGlobal(
    'ResizeObserver',
    class {
      constructor(private callback: (entries: unknown[]) => void) {}
      observe(element: HTMLElement) {
        const expanded = !!element.closest('[role="dialog"]');
        this.callback([
          {
            contentRect: {
              width: expanded ? 800 : 400,
              height: expanded ? 600 : 280
            }
          }
        ]);
      }
      disconnect() {}
    }
  );
  mocks.getDocument.mockReturnValue({
    destroy: mocks.destroy,
    promise: Promise.resolve({
      numPages: 2,
      getPage: async (number: number) => ({
        getViewport: ({ scale }: { scale: number }) => ({
          width: (number === 1 ? 1600 : 600) * scale,
          height: (number === 1 ? 900 : 800) * scale
        }),
        render: () => ({ promise: Promise.resolve(), cancel: mocks.cancel })
      })
    })
  });
});
afterEach(() => {
  cleanup();
  Reflect.deleteProperty(HTMLCanvasElement.prototype, 'getContext');
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});
function file(name = 'images.pdf') {
  return { name, arrayBuffer: async () => new ArrayBuffer(1) } as File;
}
async function canvasReady(page = 1) {
  await waitFor(() =>
    expect(
      screen.queryByRole('status', { name: 'Loading PDF preview' })
    ).not.toBeInTheDocument()
  );
  return screen.getByRole('img', {
    name: `PDF preview page ${page}`
  }) as HTMLCanvasElement;
}
it('fits landscape and portrait pages then supports zoom and reset', async () => {
  render(<PdfPreview file={file()} />);
  const first = await canvasReady();
  expect(parseFloat(first.style.width)).toBe(376);
  expect(parseFloat(first.style.height)).toBeLessThan(256);
  expect(
    screen.getByRole('button', { name: 'Previous PDF page' })
  ).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Next PDF page' }));
  const second = await canvasReady(2);
  expect(parseFloat(second.style.height)).toBe(256);
  expect(screen.getByRole('button', { name: 'Next PDF page' })).toBeDisabled();
  fireEvent.click(screen.getByRole('button', { name: 'Zoom in PDF' }));
  expect(parseFloat((await canvasReady(2)).style.height)).toBe(320);
  fireEvent.click(screen.getByRole('button', { name: 'Fit page' }));
  expect(parseFloat((await canvasReady(2)).style.height)).toBe(256);
});
it('renders in the expanded dialog and returns to the inline preview', async () => {
  render(<PdfPreview file={file()} />);
  await canvasReady();
  fireEvent.click(screen.getByRole('button', { name: 'Expand PDF preview' }));
  expect(parseFloat((await canvasReady()).style.width)).toBe(776);
  fireEvent.click(
    screen.getByRole('button', { name: 'Close expanded PDF preview' })
  );
  expect(parseFloat((await canvasReady()).style.width)).toBe(376);
});
it('resets pagination for a new file and cleans up the previous document', async () => {
  const view = render(<PdfPreview file={file()} />);
  await canvasReady();
  fireEvent.click(screen.getByRole('button', { name: 'Next PDF page' }));
  await canvasReady(2);
  view.rerender(<PdfPreview file={file('replacement.pdf')} />);
  await canvasReady();
  expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  expect(mocks.destroy).toHaveBeenCalled();
});
it('shows a useful fallback if the PDF cannot be loaded', async () => {
  mocks.getDocument.mockReturnValue({
    destroy: mocks.destroy,
    promise: Promise.reject(new Error('Invalid PDF'))
  });
  render(<PdfPreview file={file()} />);
  await waitFor(() =>
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Download the PDF to view it.'
    )
  );
});
