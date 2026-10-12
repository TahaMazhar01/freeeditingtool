import React, { StrictMode, useState } from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as Yup from 'yup';
import ToolContent from './ToolContent';
import { CustomSnackBarContext } from '../contexts/CustomSnackBarContext';

const initialValues = { width: 1 };
const showSnackBar = vi.fn();
const context = { showSnackBar };
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function Harness({
  input,
  compute,
  debounceMs = 0,
  schema
}: {
  input?: string | null;
  compute: (
    input: string | null | undefined,
    width: number
  ) => string | Promise<string>;
  debounceMs?: number;
  schema?: any;
}) {
  const [result, setResult] = useState('');
  return (
    <CustomSnackBarContext.Provider value={context}>
      <ToolContent
        title="Test"
        input={input}
        initialValues={initialValues}
        getGroups={null}
        validationSchema={schema}
        computeDebounceMs={debounceMs}
        renderCustomInput={(values, setFieldValue) => (
          <>
            <button onClick={() => setFieldValue('width', -1)}>
              Invalid width
            </button>
            <button onClick={() => setFieldValue('width', 2)}>
              Valid width
            </button>
            <span data-testid="width">{values.width}</span>
          </>
        )}
        resultComponent={<output data-testid="result">{result}</output>}
        compute={async (values, currentInput) => {
          setResult(await compute(currentInput, values.width));
        }}
      />
    </CustomSnackBarContext.Provider>
  );
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe('shared tool computation', () => {
  it('blocks invalid options and recovers when corrected', async () => {
    const compute = vi.fn(async (_, width) => String(width));
    render(
      <Harness
        input="text"
        compute={compute}
        schema={Yup.object({ width: Yup.number().min(1) })}
      />
    );
    expect(await screen.findByTestId('result')).toHaveTextContent('1');
    fireEvent.click(screen.getByText('Invalid width'));
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Check the tool options'
    );
    expect(screen.queryByTestId('result')).not.toBeInTheDocument();
    expect(compute).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText('Valid width'));
    expect(await screen.findByTestId('result')).toHaveTextContent('2');
  });

  it('waits for an active job, skips obsolete queued work, and only reveals the latest result', async () => {
    const first = deferred<string>();
    const latest = deferred<string>();
    const compute = vi.fn((input) =>
      input === 'old' ? first.promise : latest.promise
    );
    const view = render(<Harness input="old" compute={compute} />);
    await waitFor(() => expect(compute).toHaveBeenCalledTimes(1));
    view.rerender(<Harness input="middle" compute={compute} />);
    view.rerender(<Harness input="new" compute={compute} />);
    expect(screen.queryByTestId('result')).not.toBeInTheDocument();
    await act(async () => {
      first.resolve('old result');
    });
    await waitFor(() => expect(compute).toHaveBeenCalledTimes(2));
    expect(compute.mock.calls[1][0]).toBe('new');
    expect(screen.queryByTestId('result')).not.toBeInTheDocument();
    await act(async () => {
      latest.resolve('new result');
    });
    expect(await screen.findByTestId('result')).toHaveTextContent('new result');
  });

  it.each(['sync', 'async'])(
    'reports %s errors and continues with later input',
    async (kind) => {
      const compute = vi.fn((input) => {
        if (input === 'bad') {
          if (kind === 'sync') throw new Error('Conversion failed');
          return Promise.reject(new Error('Conversion failed'));
        }
        return 'recovered';
      });
      const view = render(<Harness input="bad" compute={compute} />);
      expect(await screen.findByRole('alert')).toHaveTextContent(
        'Conversion failed'
      );
      expect(showSnackBar).toHaveBeenCalledWith('Conversion failed', 'error');
      view.rerender(<Harness input="good" compute={compute} />);
      expect(await screen.findByTestId('result')).toHaveTextContent(
        'recovered'
      );
    }
  );

  it('hides output immediately on clear, including a job that finishes after clear', async () => {
    const pending = deferred<string>();
    const compute = vi.fn(() => pending.promise);
    const view = render(<Harness input="old" compute={compute} />);
    await waitFor(() => expect(compute).toHaveBeenCalledTimes(1));
    view.rerender(<Harness input="" compute={compute} />);
    await act(async () => {
      pending.resolve('obsolete');
    });
    expect(screen.queryByTestId('result')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Enter input');
    expect(compute).toHaveBeenCalledTimes(1);
  });

  it('does not reuse completion when returning to a previous input during another job', async () => {
    const middle = deferred<string>();
    const repeated = deferred<string>();
    let callsToA = 0;
    const compute = vi.fn((input) => {
      if (input === 'A')
        return ++callsToA === 1 ? Promise.resolve('first A') : repeated.promise;
      return middle.promise;
    });
    const view = render(<Harness input="A" compute={compute} />);
    expect(await screen.findByTestId('result')).toHaveTextContent('first A');
    view.rerender(<Harness input="B" compute={compute} />);
    await waitFor(() => expect(compute).toHaveBeenCalledTimes(2));
    view.rerender(<Harness input="A" compute={compute} />);
    expect(screen.queryByTestId('result')).not.toBeInTheDocument();
    await act(async () => {
      middle.resolve('obsolete B');
    });
    await waitFor(() => expect(compute).toHaveBeenCalledTimes(3));
    expect(screen.queryByTestId('result')).not.toBeInTheDocument();
    await act(async () => {
      repeated.resolve('latest A');
    });
    expect(await screen.findByTestId('result')).toHaveTextContent('latest A');
  });

  it('debounces changes and cancels pending work when unmounted', async () => {
    const compute = vi.fn(() => 'done');
    const view = render(
      <Harness input="old" compute={compute} debounceMs={30} />
    );
    view.rerender(<Harness input="new" compute={compute} debounceMs={30} />);
    expect(await screen.findByTestId('result')).toHaveTextContent('done');
    expect(compute).toHaveBeenCalledTimes(1);
    expect(compute).toHaveBeenCalledWith('new', 1);
    view.rerender(<Harness input="never" compute={compute} debounceMs={30} />);
    view.unmount();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });
    expect(compute).toHaveBeenCalledTimes(1);
  });

  it('ignores errors from superseded work', async () => {
    const first = deferred<string>();
    const compute = vi.fn((input) =>
      input === 'old' ? first.promise : Promise.resolve('new')
    );
    const view = render(<Harness input="old" compute={compute} />);
    await waitFor(() => expect(compute).toHaveBeenCalledTimes(1));
    view.rerender(<Harness input="new" compute={compute} />);
    await act(async () => {
      first.reject(new Error('Old failure'));
    });
    expect(await screen.findByTestId('result')).toHaveTextContent('new');
    expect(showSnackBar).not.toHaveBeenCalled();
  });

  it('supports generators without file/text input and does not repeat work on callback rerenders', async () => {
    const compute = vi.fn(
      (_input?: string | null, _width?: number) => 'generated'
    );
    const view = render(
      <StrictMode>
        <Harness compute={compute} />
      </StrictMode>
    );
    expect(await screen.findByTestId('result')).toHaveTextContent('generated');
    view.rerender(
      <StrictMode>
        <Harness compute={(input, width) => compute(input, width)} />
      </StrictMode>
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
    });
    expect(compute).toHaveBeenCalledTimes(1);
  });

  it('preserves whitespace-only text input', async () => {
    const compute = vi.fn((input) => JSON.stringify(input));
    render(<Harness input="   " compute={compute} />);
    expect(await screen.findByTestId('result')).toHaveTextContent('"   "', {
      normalizeWhitespace: false
    });
    expect(compute).toHaveBeenCalledWith('   ', 1);
  });
});
