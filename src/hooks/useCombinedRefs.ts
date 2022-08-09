import React, { MutableRefObject, Ref } from 'react';

const useCombinedRefs = <T>(...refs: Ref<T>[]): MutableRefObject<T | null> => {
  const targetRef = React.useRef<T>(null);

  React.useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }

      if (typeof ref === 'function') {
        ref(targetRef.current!);
        return;
      }

      (ref as any).current = targetRef.current!;
    });
  }, [refs]);

  return targetRef;
};

export default useCombinedRefs;
