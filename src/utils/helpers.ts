export const debounce = <Params extends any[]>(
  func: (...args: Params) => any,
  timeout = 400
) => {
  let timer: NodeJS.Timeout;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

export const searchOnKeys = <T>(
  arr: T[],
  keys: (keyof T)[],
  keyword: string | undefined,
  onEmpty: T[] = []
): T[] => {
  if (!keyword) return onEmpty;
  const lowerKeyword = keyword.toLowerCase();

  return arr.filter((item) => {
    return keys.some((key) => {
      const value = item[key];
      return (
        typeof value === 'string' && value.toLowerCase().includes(lowerKeyword)
      );
    });
  });
};

export const delay = () => {
  return new Promise((resolve) => setTimeout(resolve, 1000));
};
