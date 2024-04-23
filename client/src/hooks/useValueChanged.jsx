import { useRef, useEffect } from 'react';

export function useValueChanged(value, onChange) {
  const previousValueRef = useRef(value);

  useEffect(() => {
    if (previousValueRef.current !== value) {
      onChange(value);
    }

    previousValueRef.current = value;
  }, [value, onChange]);
}