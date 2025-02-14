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
    if (timeout != null) {
      return clearTimeout(timeout);
    }

    const mostRecent = Array.from(timeouts).pop();

    return clearTimeout(mostRecent);
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
