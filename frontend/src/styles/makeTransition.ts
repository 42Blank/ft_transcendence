interface Params {
  attrs: string;
  duration?: number;
  method?: 'ease-in' | 'ease-in-out' | 'linear';
}

export function makeTransition({ attrs, duration = 0.2, method = 'ease-in' }: Params) {
  return `${attrs} ${duration}s ${method}`;
}
