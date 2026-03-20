import { useCallback, useEffect, useRef } from 'react';

import { useDocumentEventHandler } from './use-document-event-handler';
import { useEscapePressHandler } from './use-escape-press-handler';

import { closableStack } from './closable-stack';

const shouldClose = (name) => {
  return closableStack.getLast() === name;
};

export const useClosableElement = ({
  onClose,
  visible,
  closeOnClickOutside = true,
  closeOnEscape = true,
  name,
  whiteListClassNames,
  closableChildrenClassNames,
}) => {
  const closableElement = useRef(null);

  useEffect(() => {
    if (visible) {
      closableStack.add(name);
    }

    return () => {
      closableStack.remove(name);
    };
  }, [name, visible]);

  const handleClickOutside = useCallback(
    (event) => {
      if (
        (shouldClose(name) &&
          visible &&
          closeOnClickOutside &&
          closableElement.current &&
          !closableElement.current.contains(event.target) &&
          !whiteListClassNames?.some((cn) => event.target.classList.contains(cn))) ||
        closableChildrenClassNames?.some((className) => event.target.classList.contains(className))
      ) {
        onClose();
      }
    },
    [
      closeOnClickOutside,
      closableElement,
      onClose,
      visible,
      name,
      whiteListClassNames,
      closableChildrenClassNames,
    ]
  );

  const handleEscape = useCallback(() => {
    if (shouldClose(name) && visible && closeOnEscape) {
      onClose();
    }
  }, [closeOnEscape, onClose, visible, name]);

  useEscapePressHandler(handleEscape);

  useDocumentEventHandler('click', handleClickOutside);

  return closableElement;
};
