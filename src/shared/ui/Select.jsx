import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { cn } from '@/shared/lib/clsx';
import { Icon } from '@/shared/ui/Icon';

export const Select = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select a category',
  className = '',
  name = '',
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyboardIndex, setKeyboardIndex] = useState(-1);
  const [dropUp, setDropUp] = useState(false);
  const rootRef = useRef(null);
  const listRef = useRef(null);

  const selectedIndex = useMemo(
    () => options.findIndex((opt) => opt.value === value),
    [options, value]
  );

  const calculatePosition = useCallback(() => {
    if (rootRef.current) {
      const rect = rootRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownMaxHeight = 260;
      const spaceBelow = viewportHeight - rect.bottom;
      return spaceBelow < dropdownMaxHeight && rect.top > dropdownMaxHeight;
    }
    return false;
  }, []);

  useEffect(() => {
    if (isOpen && selectedIndex !== -1 && listRef.current) {
      const activeElement = listRef.current.children[selectedIndex];
      const scrollTimeout = setTimeout(() => {
        activeElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 0);
      return () => clearTimeout(scrollTimeout);
    }
  }, [isOpen, selectedIndex]);

  const toggleDropdown = () => {
    const nextState = !isOpen;
    if (nextState) {
      setDropUp(calculatePosition());
      setKeyboardIndex(selectedIndex);
    }
    setIsOpen(nextState);
  };

  const handleOptionClick = (option) => {
    onChange?.(option);
    setIsOpen(false);
    setKeyboardIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setIsOpen(false);
    if (e.key === 'Tab' && isOpen) setIsOpen(false);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setDropUp(calculatePosition());
        setIsOpen(true);
        setKeyboardIndex(selectedIndex);
      } else {
        setKeyboardIndex((prev) => {
          const next = prev < options.length - 1 ? prev + 1 : prev;
          listRef.current?.children[next]?.scrollIntoView({ block: 'nearest' });
          return next;
        });
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setDropUp(calculatePosition());
        setIsOpen(true);
        setKeyboardIndex(selectedIndex);
      } else {
        setKeyboardIndex((prev) => {
          const next = prev > 0 ? prev - 1 : prev;
          listRef.current?.children[next]?.scrollIntoView({ block: 'nearest' });
          return next;
        });
      }
    }

    if (e.key === 'Enter') {
      if (isOpen && keyboardIndex >= 0) {
        e.preventDefault();
        handleOptionClick(options[keyboardIndex]);
      } else if (!isOpen) {
        setDropUp(calculatePosition());
        setIsOpen(true);
        setKeyboardIndex(selectedIndex);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleScrollAndResize = () => {
      if (isOpen) {
        setDropUp(calculatePosition());
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScrollAndResize, true);
    window.addEventListener('resize', handleScrollAndResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScrollAndResize, true);
      window.removeEventListener('resize', handleScrollAndResize);
    };
  }, [isOpen, calculatePosition]);

  const selectedOption = options[selectedIndex];

  return (
    <div className={cn('relative w-full', className)} ref={rootRef} onKeyDown={handleKeyDown}>
      <input type="hidden" name={name} value={value || ''} required={required} />

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${name}-dropdown-list`}
        id={`${name}-select-button`}
        onClick={toggleDropdown}
        className={cn(
          'shadow-border-grey tablet:px-4.5 tablet:py-4 tablet:text-base focus:shadow-border-main flex w-full items-center justify-between rounded-[1.875rem] bg-transparent p-3.5 text-sm font-medium transition-all outline-none'
        )}
      >
        <span className={cn(value ? 'text-main' : 'text-dark')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Icon
          name="chevron-down-icon"
          className={cn(
            'text-main h-4.5 w-4.5 transition-transform duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          id={`${name}-dropdown-list`}
          role="listbox"
          aria-labelledby={`${name}-select-button`}
          className={cn(
            'tablet:px-4.5 tablet:py-4 border-grey/10 absolute left-0 z-50 flex max-h-60 w-full flex-col gap-1.5 overflow-y-auto scroll-smooth rounded-[0.9375rem] border bg-white p-3.5 shadow-sm',
            dropUp ? 'bottom-full mb-2' : 'top-full mt-2'
          )}
        >
          {options.map((option, index) => (
            <li
              key={`${name}-opt-${option.value}`}
              role="option"
              id={`${name}-opt-${option.value}`}
              aria-selected={value === option.value}
            >
              <button
                type="button"
                data-label={option.label}
                onClick={() => handleOptionClick(option)}
                className={cn(
                  'tablet:text-base text-main relative flex w-full flex-col text-left text-sm outline-none after:invisible after:block after:h-0 after:overflow-hidden after:font-bold after:content-[attr(data-label)] after:select-none',
                  'transition-[font-variation-settings]!',
                  '[font-variation-settings:"wght"_500]',
                  'hover:[font-variation-settings:"wght"_800] focus:[font-variation-settings:"wght"_800]',
                  (value === option.value || keyboardIndex === index) &&
                    '[font-variation-settings:"wght"_800]'
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
