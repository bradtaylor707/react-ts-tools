import { useCallback, useEffect, useMemo } from "react";
import { Nullable } from "../../utils";

export type Timeout = ReturnType<typeof setTimeout>;

export function useSetTimeout() {
  const timeouts = useMemo(() => new Set<Timeout>(), []);

  const addTimeout = useCallback((fn: () => void, ms?: number) => {
    const timeout = setTimeout(fn, ms);

    timeouts.add(timeout);

    return timeout;
  }, []);

  const removeTimeout = useCallback((timeout?: Nullable<Timeout>) => {
    const actual = timeout ?? Array.from(timeouts).pop();

    if (actual != null) {
      clearTimeout(actual);
      timeouts.delete(actual);
    }
  }, []);

  useEffect(() => {
    return () => {
      for (const timeout of timeouts) {
        clearTimeout(timeout);
      }

      timeouts.clear();
    };
  }, []);

  return {
    addTimeout,
    removeTimeout,
  };
}
