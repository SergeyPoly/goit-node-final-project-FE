import { useEffect } from 'react';

export function useDocumentEventHandler(type, handler) {
  useEffect(() => {
    document.addEventListener(type, handler);

    return () => {
      document.removeEventListener(type, handler);
    };
  }, [type, handler]);
}
