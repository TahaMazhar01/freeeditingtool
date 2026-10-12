export type OcrLayoutMode = 'sparse' | 'auto' | 'single_block';

export type InitialValuesType = {
  language: string;
  detectParagraphs: boolean;
  layoutMode: OcrLayoutMode;
  enhanceContrast: boolean;
  filterNoise: boolean;
};
