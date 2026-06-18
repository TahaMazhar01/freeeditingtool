declare module 'nerdamer-prime' {
  export interface NerdamerExpression {
    sub(variable: string, value: string): NerdamerExpression;
    solveFor(variable: string): NerdamerExpression | NerdamerExpression[];
    evaluate(): NerdamerExpression;
    toDecimal(): string;
  }

  function nerdamer(expression: string): NerdamerExpression;

  export default nerdamer;
}

declare module 'nerdamer-prime/Algebra';
declare module 'nerdamer-prime/Solve';
declare module 'nerdamer-prime/Calculus';
