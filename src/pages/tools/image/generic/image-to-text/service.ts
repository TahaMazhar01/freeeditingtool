import { createWorker, PSM } from 'tesseract.js';
import { InitialValuesType, OcrLayoutMode } from './types';

/**
 * Preprocesses an image on an HTML5 canvas for optimal OCR recognition:
 * 1. Upscales low-resolution images so character edges are sharp.
 * 2. Applies grayscale luminance and contrast stretching when requested.
 */
export const preprocessImageForOcr = async (
  file: File,
  enhanceContrast: boolean
): Promise<{ url: string; cleanup: () => void }> => {
  if (typeof window === 'undefined') {
    const rawUrl = URL.createObjectURL(file);
    return { url: rawUrl, cleanup: () => URL.revokeObjectURL(rawUrl) };
  }

  return new Promise((resolve) => {
    const rawUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');

        // Optimal OCR resolution target: between 1600px and 2800px max dimension
        let scale = 1;
        const maxDim = Math.max(img.width, img.height);
        if (maxDim < 1400) {
          scale = Math.min(2.5, 1800 / maxDim);
        } else if (maxDim > 3000) {
          scale = 3000 / maxDim;
        }

        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) {
          resolve({ url: rawUrl, cleanup: () => URL.revokeObjectURL(rawUrl) });
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        if (enhanceContrast) {
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;

          // Perceived luminance & contrast stretching
          const contrast = 1.35;
          const factor =
            (259 * (contrast * 100 + 255)) / (255 * (259 - contrast * 100));

          for (let i = 0; i < data.length; i += 4) {
            const gray =
              0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            const adjusted = factor * (gray - 128) + 128;
            const val = adjusted < 0 ? 0 : adjusted > 255 ? 255 : adjusted;
            data[i] = val;
            data[i + 1] = val;
            data[i + 2] = val;
          }

          ctx.putImageData(imgData, 0, 0);
        }

        canvas.toBlob((blob) => {
          URL.revokeObjectURL(rawUrl);
          if (blob) {
            const processedUrl = URL.createObjectURL(blob);
            resolve({
              url: processedUrl,
              cleanup: () => URL.revokeObjectURL(processedUrl)
            });
          } else {
            resolve({
              url: rawUrl,
              cleanup: () => URL.revokeObjectURL(rawUrl)
            });
          }
        }, 'image/png');
      } catch (err) {
        console.warn('Preprocessing fallback to raw image:', err);
        resolve({ url: rawUrl, cleanup: () => URL.revokeObjectURL(rawUrl) });
      }
    };

    img.onerror = () => {
      resolve({ url: rawUrl, cleanup: () => URL.revokeObjectURL(rawUrl) });
    };

    img.src = rawUrl;
  });
};

export const extractTextFromImage = async (
  file: File,
  options: InitialValuesType
): Promise<string> => {
  let preprocessed: { url: string; cleanup: () => void } | null = null;
  let worker: any = null;

  try {
    const {
      language,
      detectParagraphs,
      layoutMode = 'sparse',
      enhanceContrast = true,
      filterNoise = true
    } = options;

    // Step 1: Preprocess on Canvas
    preprocessed = await preprocessImageForOcr(file, enhanceContrast);

    // Step 2: Initialize Tesseract worker
    worker = await createWorker(language);

    // Step 3: Configure Page Segmentation Mode (PSM)
    let psmValue: string = PSM.SPARSE_TEXT; // 11: Sparse text - best for posters, flyers, graphics
    if (layoutMode === 'auto') {
      psmValue = PSM.AUTO; // 3: Auto
    } else if (layoutMode === 'single_block') {
      psmValue = PSM.SINGLE_BLOCK; // 6: Single uniform block
    }

    await worker.setParameters({
      tessedit_pageseg_mode: psmValue
    });

    // Step 4: Run OCR with blocks output requested
    const { data } = (await worker.recognize(
      preprocessed.url,
      {},
      { blocks: true }
    )) as any;

    // Step 5: Clean noise artifacts
    if (filterNoise && data.blocks && data.blocks.length > 0) {
      const cleanLines: string[] = [];

      for (const block of data.blocks) {
        for (const para of block.paragraphs || []) {
          for (const line of para.lines || []) {
            const validWords = (line.words || []).filter((w: any) => {
              const txt = (w.text || '').trim();
              if (!txt) return false;

              // Filter out stray 1-2 character non-alphanumeric noise or low confidence glyphs
              if (txt.length <= 2 && w.confidence < 60) return false;
              if (w.confidence < 35) return false;

              // Filter out pure punctuation/symbols (arrows, icons, shapes converted to symbols)
              if (/^[^a-zA-Z0-9]+$/.test(txt)) return false;

              return true;
            });

            const lineText = validWords
              .map((w: any) => w.text.trim())
              .join(' ')
              .trim();

            if (lineText.length > 2) {
              cleanLines.push(lineText);
            }
          }
        }
      }

      const result = cleanLines
        .join(detectParagraphs ? '\n' : ' ')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      if (result.length > 0) {
        return result;
      }
    }

    // Default return if no noise filtering or fallback
    return (data.text || '').trim();
  } catch (error) {
    console.error('Error extracting text from image:', error);
    throw new Error(
      'Failed to extract text from image. Please try again with a clearer image.'
    );
  } finally {
    if (preprocessed) {
      preprocessed.cleanup();
    }
    if (worker) {
      await worker.terminate();
    }
  }
};

export const getAvailableLayoutModes = (): {
  value: OcrLayoutMode;
  label: string;
}[] => {
  return [
    {
      value: 'sparse',
      label: 'Poster / Flyer / Scattered Text (Best for Graphics & Ads)'
    },
    {
      value: 'auto',
      label: 'Standard Document (Auto Layout)'
    },
    {
      value: 'single_block',
      label: 'Single Uniform Text Block'
    }
  ];
};

export const getAvailableLanguages = (): {
  value: string;
  label: string;
}[] => {
  return [
    { value: 'eng', label: 'English' },
    { value: 'fra', label: 'French' },
    { value: 'deu', label: 'German' },
    { value: 'spa', label: 'Spanish' },
    { value: 'ita', label: 'Italian' },
    { value: 'por', label: 'Portuguese' },
    { value: 'rus', label: 'Russian' },
    { value: 'jpn', label: 'Japanese' },
    { value: 'chi_sim', label: 'Chinese (Simplified)' },
    { value: 'chi_tra', label: 'Chinese (Traditional)' },
    { value: 'kor', label: 'Korean' },
    { value: 'ara', label: 'Arabic' }
  ];
};
