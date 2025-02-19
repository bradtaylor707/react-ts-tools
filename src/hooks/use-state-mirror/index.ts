import { useEffect, useState } from "react";

export function useStateMirror<PropT>(prop: PropT) {
  const [state, setState] = useState(prop);

  useEffect(() => {
    if (prop !== state) {
      setState(prop);
    }
  }, [prop]);

  return [state, setState] as const;
}
