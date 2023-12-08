export const compose = (fn1: (a: any) => any, ...fns: Array<(a: any) => any>) =>
  fns.reduce((prevFn, nextFn) => value => prevFn(nextFn(value)), fn1);
