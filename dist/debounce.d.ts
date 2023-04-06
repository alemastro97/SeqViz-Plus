/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * from: https://davidwalsh.name/javascript-debounce-function
 */
declare const _default: (func: any, wait: any, immediate?: boolean) => (...args: any[]) => void;
export default _default;
