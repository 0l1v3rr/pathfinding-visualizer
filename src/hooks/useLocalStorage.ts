import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;

      return JSON.parse(item);
    } catch {
      return defaultValue;
    }
  });

  useEffect(
    () => localStorage.setItem(key, JSON.stringify(value)),
    [value, key]
  );

  return [value, setValue] as const;
};
