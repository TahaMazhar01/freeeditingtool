import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { CustomSnackBarContext } from '../contexts/CustomSnackBarContext';

const captured = vi.hoisted(() => ({ props: null as any }));
vi.mock('react-i18next', async (importOriginal) => ({
  ...(await importOriginal<Record<string, unknown>>()),
  useTranslation: () => ({ t: (key: string) => key })
}));
vi.mock('./ToolContent', () => ({
  default: (props: any) => {
    captured.props = props;
    return null;
  }
}));
vi.mock('../pages/tools/converters/convert-to-webp/service', () => ({
  convertToWebp: vi.fn()
}));
vi.mock('./input/ToolMultipleImageInput', () => ({ default: () => null }));
import JoinText from '../pages/tools/string/join';
import ConvertToWebp from '../pages/tools/converters/convert-to-webp';
import WrapList from '../pages/tools/list/wrap';

afterEach(() => {
  cleanup();
  captured.props = null;
});
it.each([JoinText, ConvertToWebp])(
  'accepts the tool’s initial options after enabling validation',
  async (Component) => {
    render(
      <CustomSnackBarContext.Provider value={{ showSnackBar: vi.fn() }}>
        <Component title="Test" />
      </CustomSnackBarContext.Provider>
    );
    await expect(
      captured.props.validationSchema.validate(captured.props.initialValues)
    ).resolves.toBeDefined();
  }
);
it('allows empty list separators supported by the list service', async () => {
  render(<WrapList title="Test" />);
  await expect(
    captured.props.validationSchema.validate({
      ...captured.props.initialValues,
      splitSeparator: '',
      joinSeparator: ''
    })
  ).resolves.toBeDefined();
});
