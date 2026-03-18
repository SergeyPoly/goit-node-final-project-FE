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
  error = false,
  searchable = false,
  noOptionsText = 'No matches',
  clearable = true,
  clearIconName = 'x-icon',
  clearAriaLabel = 'Clear selection',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [keyboardIndex, setKeyboardIndex] = useState(-1);
  const [dropUp, setDropUp] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const searchInputRef = useRef(null);

  const selectedIndex = useMemo(
    () => options.findIndex((opt) => opt.value === value),
    [options, value]
  );

  const filteredOptions = useMemo(() => {
    if (!searchable) return options;
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) =>
      String(opt?.label ?? '')
        .toLowerCase()
        .includes(q)
    );
  }, [options, query, searchable]);

  const filteredSelectedIndex = useMemo(
    () => filteredOptions.findIndex((opt) => opt.value === value),
    [filteredOptions, value]
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
    if (isOpen && filteredSelectedIndex !== -1 && listRef.current) {
      const activeElement = listRef.current.children[filteredSelectedIndex];
      const scrollTimeout = setTimeout(() => {
        activeElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }, 0);
      return () => clearTimeout(scrollTimeout);
    }
  }, [isOpen, filteredSelectedIndex]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => {
        if (searchable) searchInputRef.current?.focus();
      }, 0);
      return () => clearTimeout(t);
    }
  }, [isOpen, searchable]);

  const toggleDropdown = () => {
    const nextState = !isOpen;
    if (nextState) {
      setDropUp(calculatePosition());
      setKeyboardIndex(filteredSelectedIndex);
      setIsOpen(true);
      return;
    }

    setIsOpen(false);
    setQuery('');
    setKeyboardIndex(-1);
  };

  const handleOptionClick = (option) => {
    onChange?.(option);
    setIsOpen(false);
    setQuery('');
    setKeyboardIndex(-1);
  };

  const handleClear = (e) => {
    e?.preventDefault?.();
    e?.stopPropagation?.();

    onChange?.(null);
    setIsOpen(false);
    setQuery('');
    setKeyboardIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setIsOpen(false);
    if (e.key === 'Tab' && isOpen) setIsOpen(false);

    if (clearable && value && (e.key === 'Backspace' || e.key === 'Delete')) {
      if (!isOpen) {
        e.preventDefault();
        handleClear(e);
        return;
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setDropUp(calculatePosition());
        setIsOpen(true);
        setKeyboardIndex(filteredSelectedIndex);
      } else {
        setKeyboardIndex((prev) => {
          const next = prev < filteredOptions.length - 1 ? prev + 1 : prev;
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
        setKeyboardIndex(filteredSelectedIndex);
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
        handleOptionClick(filteredOptions[keyboardIndex]);
      } else if (!isOpen) {
        setDropUp(calculatePosition());
        setIsOpen(true);
        setKeyboardIndex(filteredSelectedIndex);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
        setQuery('');
        setKeyboardIndex(-1);
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
          'shadow-border-grey tablet:px-4.5 tablet:py-4 tablet:text-base focus:shadow-border-main flex w-full items-center justify-between rounded-[1.875rem] bg-transparent p-3.5 text-sm font-medium transition-all outline-none',
          error && '!shadow-[inset_0_0_0_2px_var(--color-error)]'
        )}
      >
        <span className={cn(value ? 'text-main' : 'text-grey')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span className="flex items-center gap-2">
          {clearable && value && (
            <span
              role="button"
              tabIndex={0}
              aria-label={clearAriaLabel}
              onClick={handleClear}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleClear(e);
              }}
              className={cn(
                'text-main inline-flex h-6 w-6 items-center justify-center rounded-full outline-none',
                'hover:bg-grey/10 focus:bg-grey/10'
              )}
            >
              <Icon name={clearIconName} className="h-4 w-4" />
            </span>
          )}

          <Icon
            name="chevron-down-icon"
            className={cn(
              'text-main h-4.5 w-4.5 transition-transform duration-300',
              isOpen && 'rotate-180'
            )}
          />
        </span>
      </button>

      {isOpen && (
        <div
          className={cn(
            'tablet:px-4.5 tablet:py-4 border-grey/10 absolute left-0 z-50 flex max-h-80 w-full flex-col gap-2 overflow-hidden rounded-[0.9375rem] border bg-white p-3.5 shadow-sm',
            dropUp ? 'bottom-full mb-2' : 'top-full mt-2'
          )}
        >
          {searchable && (
            <input
              ref={searchInputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setKeyboardIndex(-1);
              }}
              placeholder={placeholder}
              className={cn(
                'shadow-border-grey focus:shadow-border-main w-full rounded-[0.9375rem] bg-transparent px-3 py-2 text-sm outline-none'
              )}
            />
          )}

          <ul
            ref={listRef}
            id={`${name}-dropdown-list`}
            role="listbox"
            aria-labelledby={`${name}-select-button`}
            className={cn('flex w-full flex-col gap-1.5 overflow-y-auto scroll-smooth')}
          >
            {filteredOptions.length === 0 ? (
              <li className="text-grey px-1 text-sm">{noOptionsText}</li>
            ) : (
              filteredOptions.map((option, index) => (
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
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
