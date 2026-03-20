import { useCallback } from 'react';
import { useDocumentEventHandler } from './use-document-event-handler';

export function useEscapePressHandler(handler) {
  const keydownHandler = useCallback(
    (event) => {
      if (event.code === 'Escape') {
        event.stopPropagation();
        handler();
      }
    },
    [handler]
  );

  useDocumentEventHandler('keydown', keydownHandler);
}
