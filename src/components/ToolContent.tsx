import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { Box, Alert, Typography } from '@mui/material';
import { Formik, FormikValues, useFormikContext } from 'formik';
import ToolOptions, { GetGroupsType } from '@components/options/ToolOptions';
import ToolInputAndResult from '@components/ToolInputAndResult';
import ToolInfo from '@components/ToolInfo';
import Separator from '@components/Separator';
import ToolExamples, {
  CardExampleType
} from '@components/examples/ToolExamples';
import { ToolComponentProps } from '@tools/defineTool';
import { CustomSnackBarContext } from '../contexts/CustomSnackBarContext';
import ToolWorkspace from './ToolWorkspace';

function validationMessages(errors: unknown): string[] {
  if (typeof errors === 'string') return [errors];
  if (errors && typeof errors === 'object') {
    return Object.values(errors).flatMap(validationMessages);
  }
  return [];
}

const FormikListenerComponent = <T,>({
  input,
  compute,
  onValuesChange,
  debounceMs,
  inputComponent,
  resultComponent
}: {
  input: any;
  compute: (optionsValues: T, input: any) => void | Promise<void>;
  onValuesChange?: (values: T) => void;
  debounceMs: number;
  inputComponent?: ReactNode;
  resultComponent?: ReactNode;
}) => {
  const { values, validateForm } = useFormikContext<T>();
  const { showSnackBar } = useContext(CustomSnackBarContext);
  const callbacks = useRef({ compute, validateForm, showSnackBar });
  callbacks.current = { compute, validateForm, showSnackBar };
  const queue = useRef<Promise<void>>(Promise.resolve());
  // A fresh request identity also distinguishes A → B → A input changes.
  const request = useMemo(
    () => ({ values, input }),
    [values, input, debounceMs]
  );
  const [completed, setCompleted] = useState<{ values: T; input: any } | null>(
    null
  );
  const [failure, setFailure] = useState<{
    request: typeof request;
    message: string;
  } | null>(null);
  const emptyInput =
    input === null ||
    input === '' ||
    (Array.isArray(input) && input.length === 0);

  React.useEffect(() => {
    let cancelled = false;
    if (emptyInput) return;
    const timer = setTimeout(() => {
      // One job at a time: legacy tools update their own React result state.
      // Waiting for that job prevents it from overwriting a newer result.
      queue.current = queue.current.then(async () => {
        if (cancelled) return;
        const job = callbacks.current;
        try {
          const errors = await job.validateForm(values);
          if (cancelled) return;
          if (Object.keys(errors).length > 0) {
            setFailure({
              request,
              message: `Check the tool options: ${validationMessages(
                errors
              ).join(' ')}`
            });
            return;
          }
          await job.compute(values, input);
          if (!cancelled) {
            setFailure(null);
            setCompleted(request);
          }
        } catch (exception: unknown) {
          if (cancelled) return;
          const message =
            exception instanceof Error ? exception.message : String(exception);
          setFailure({ request, message });
          job.showSnackBar(message, 'error');
        }
      });
    }, debounceMs);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [request, values, input, emptyInput, debounceMs]);

  useEffect(() => {
    onValuesChange?.(values);
  }, [onValuesChange, values]);
  const error = failure?.request === request ? failure.message : null;
  const current = !emptyInput && completed === request && !error;
  return (
    <ToolInputAndResult
      input={inputComponent}
      result={
        resultComponent ? (
          current ? (
            resultComponent
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <Box role="status" aria-busy={!emptyInput} sx={{ p: 3 }}>
              <Typography color="text.secondary">
                {emptyInput ? 'Enter input to see a result.' : 'Processing…'}
              </Typography>
            </Box>
          )
        ) : undefined
      }
    />
  );
};

interface ToolContentProps<Options, Input> extends ToolComponentProps {
  inputComponent?: ReactNode;
  resultComponent?: ReactNode;
  renderCustomInput?: (
    values: Options,
    setFieldValue: (fieldName: string, value: any) => void
  ) => ReactNode;
  initialValues: Options;
  /**
   * should return non-empty array or null
   */
  getGroups: GetGroupsType<Options> | null;
  compute: (optionsValues: Options, input: Input) => void | Promise<void>;
  computeDebounceMs?: number;
  toolInfo?: {
    title: string;
    description?: string;
  };
  input?: Input;
  exampleCards?: CardExampleType<Options>[];
  setInput?: React.Dispatch<React.SetStateAction<Input>>;
  validationSchema?: any;
  onValuesChange?: (values: Options) => void;
  verticalGroups?: boolean;
  startExpanded?: boolean;
}

export default function ToolContent<T extends FormikValues, I>({
  title,
  inputComponent,
  resultComponent,
  initialValues,
  getGroups,
  compute,
  computeDebounceMs = 0,
  toolInfo,
  exampleCards,
  input,
  setInput,
  validationSchema,
  renderCustomInput,
  onValuesChange,
  verticalGroups,
  startExpanded
}: ToolContentProps<T, I>) {
  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {}}
      >
        {({ values, setFieldValue }) => {
          return (
            <>
              <ToolWorkspace title={title} startExpanded={startExpanded}>
                <ToolOptions
                  getGroups={getGroups}
                  vertical={verticalGroups}
                  compact
                />
                <FormikListenerComponent<T>
                  compute={compute}
                  input={input}
                  debounceMs={computeDebounceMs}
                  onValuesChange={onValuesChange}
                  inputComponent={
                    inputComponent ??
                    (renderCustomInput &&
                      renderCustomInput(values, setFieldValue))
                  }
                  resultComponent={resultComponent}
                />
              </ToolWorkspace>

              {toolInfo && toolInfo.title && toolInfo.description && (
                <ToolInfo
                  title={toolInfo.title}
                  description={toolInfo.description}
                />
              )}

              {exampleCards && exampleCards.length > 0 && (
                <>
                  <Separator margin="50px" />
                  <ToolExamples
                    title={title}
                    exampleCards={exampleCards}
                    getGroups={getGroups}
                    setInput={setInput}
                  />
                </>
              )}
            </>
          );
        }}
      </Formik>
    </Box>
  );
}
