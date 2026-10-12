import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy } from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PdfPreview({ file }: { file: File }) {
  const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState('');
  const [size, setSize] = useState({ width: 0, height: 0 });
  const observer = useRef<ResizeObserver | null>(null);
  const observeArea = useCallback((element: HTMLDivElement | null) => {
    observer.current?.disconnect();
    if (!element) return;
    observer.current = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.current.observe(element);
  }, []);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let active = true;
    let task: ReturnType<typeof getDocument> | undefined;
    setPdf(null);
    setPageNumber(1);
    setZoom(1);
    setBusy(true);
    setError('');
    file
      .arrayBuffer()
      .then((data) => {
        if (!active) return;
        task = getDocument({ data });
        return task.promise;
      })
      .then((document) => {
        if (active && document) setPdf(document);
      })
      .catch(() => {
        if (active) {
          setBusy(false);
          setError(
            'The preview could not be loaded. Download the PDF to view it.'
          );
        }
      });
    return () => {
      active = false;
      void task?.destroy();
    };
  }, [file]);

  useEffect(() => {
    if (!pdf || !size.width || !size.height) return;
    let active = true;
    let renderTask:
      | ReturnType<Awaited<ReturnType<PDFDocumentProxy['getPage']>>['render']>
      | undefined;
    setBusy(true);
    setError('');
    // Each render gets its own canvas so cancelled renders never share a surface.
    const target = canvas.current;
    if (!target) return;
    pdf
      .getPage(pageNumber)
      .then(async (page) => {
        if (!active) return;
        const base = page.getViewport({ scale: 1 });
        const fit = Math.min(
          Math.max(1, size.width - 24) / base.width,
          Math.max(1, size.height - 24) / base.height
        );
        const viewport = page.getViewport({ scale: fit * zoom });
        const pixelRatio = Math.min(
          window.devicePixelRatio || 1,
          2,
          Math.sqrt(16000000 / (viewport.width * viewport.height))
        );
        target.width = Math.max(1, Math.round(viewport.width * pixelRatio));
        target.height = Math.max(1, Math.round(viewport.height * pixelRatio));
        target.style.width = `${viewport.width}px`;
        target.style.height = `${viewport.height}px`;
        const context = target.getContext('2d');
        if (!context) throw new Error('Canvas unavailable');
        renderTask = page.render({
          canvas: target,
          canvasContext: context,
          viewport,
          transform: [pixelRatio, 0, 0, pixelRatio, 0, 0]
        });
        await renderTask.promise;
        if (active) setBusy(false);
      })
      .catch(() => {
        if (active) {
          setBusy(false);
          setError(
            'This page could not be displayed. Download the PDF to view it.'
          );
        }
      });
    return () => {
      active = false;
      renderTask?.cancel();
    };
  }, [pdf, pageNumber, zoom, size, expanded]);

  const viewer = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0
      }}
    >
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        gap={0.5}
        sx={{
          p: 0.5,
          borderBottom: '1px solid #DDE2EF',
          background: '#FFFFFF',
          flexShrink: 0
        }}
      >
        <IconButton
          aria-label="Previous PDF page"
          size="small"
          disabled={!pdf || pageNumber <= 1}
          onClick={() => {
            setPageNumber((page) => page - 1);
            setZoom(1);
          }}
        >
          <Icon icon="ph:caret-left-bold" />
        </IconButton>
        <Typography aria-live="polite" sx={{ fontSize: 13 }}>
          Page {pageNumber} of {pdf?.numPages ?? '...'}
        </Typography>
        <IconButton
          aria-label="Next PDF page"
          size="small"
          disabled={!pdf || pageNumber >= pdf.numPages}
          onClick={() => {
            setPageNumber((page) => page + 1);
            setZoom(1);
          }}
        >
          <Icon icon="ph:caret-right-bold" />
        </IconButton>
        <IconButton
          aria-label="Zoom out PDF"
          size="small"
          disabled={!pdf || zoom <= 1}
          onClick={() => setZoom((value) => Math.max(1, value - 0.25))}
        >
          <Icon icon="ph:minus-bold" />
        </IconButton>
        <Button size="small" onClick={() => setZoom(1)} disabled={!pdf}>
          Fit page
        </Button>
        <IconButton
          aria-label="Zoom in PDF"
          size="small"
          disabled={!pdf || zoom >= 3}
          onClick={() => setZoom((value) => Math.min(3, value + 0.25))}
        >
          <Icon icon="ph:plus-bold" />
        </IconButton>
        <IconButton
          aria-label={
            expanded ? 'Close expanded PDF preview' : 'Expand PDF preview'
          }
          size="small"
          onClick={() => setExpanded(!expanded)}
        >
          <Icon icon={expanded ? 'ph:x-bold' : 'ph:arrows-out-bold'} />
        </IconButton>
      </Stack>
      <Box
        ref={observeArea}
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          background: '#EDF0F6',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            minWidth: '100%',
            minHeight: '100%',
            width: 'max-content',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: '12px'
          }}
        >
          <canvas
            key={`${pageNumber}-${zoom}-${expanded}-${size.width}-${size.height}`}
            ref={canvas}
            role="img"
            aria-label={`PDF preview page ${pageNumber}`}
            style={{
              background: '#FFFFFF',
              boxShadow: '0 2px 10px #28376D26',
              visibility: busy || error ? 'hidden' : 'visible'
            }}
          />
        </Box>
        {busy && !error && (
          <Box
            role="status"
            aria-label="Loading PDF preview"
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <CircularProgress size={28} />
          </Box>
        )}
        {error && (
          <Typography
            role="alert"
            sx={{
              position: 'absolute',
              inset: 0,
              p: 3,
              background: '#EDF0F6',
              fontSize: 14
            }}
          >
            {error}
          </Typography>
        )}
      </Box>
      <Typography
        title={file.name}
        noWrap
        sx={{
          px: 2,
          py: 0.5,
          fontSize: 12,
          textAlign: 'center',
          background: '#FFFFFF',
          flexShrink: 0
        }}
      >
        {file.name}
      </Typography>
    </Box>
  );

  return expanded ? (
    <Dialog
      sx={{ zIndex: 10002 }}
      open
      onClose={() => setExpanded(false)}
      fullWidth
      maxWidth="lg"
      aria-label="Expanded PDF preview"
      PaperProps={{
        sx: {
          height: '85vh',
          borderRadius: 3,
          m: { xs: 1, sm: 4 },
          width: { xs: 'calc(100% - 16px)', sm: '100%' }
        }
      }}
    >
      {viewer}
    </Dialog>
  ) : (
    viewer
  );
}
