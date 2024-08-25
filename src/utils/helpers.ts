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
  defaultReturn = []
): T[] => {
  if (!keyword) return defaultReturn;
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
