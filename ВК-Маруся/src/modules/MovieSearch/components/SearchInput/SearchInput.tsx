import React, { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchInput.module.scss';
import { useDebounce } from '../../hooks/useDebounce';
import { useSearch } from '../../hooks/useSearch';

import { SearchDropdown } from './SearchDropdown';
import SpriteIcon from '../../../../shared/ui/SpriteIcon/SpriteIcon';

interface SearchInputProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onClose?: () => void;
}

const SearchInputComponent: React.FC<SearchInputProps> = React.memo(
  ({ placeholder = 'Поиск', onSearch, className, autoFocus = false, onClose }) => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const { movies, shouldShowDropdown, searchMovies, clearResults, setShouldShowDropdown } =
      useSearch();

    const debouncedQuery = useDebounce(query, 300);

    React.useEffect(() => {
      if (debouncedQuery.trim()) {
        searchMovies(debouncedQuery);
      } else {
        clearResults();
      }
    }, [debouncedQuery, searchMovies, clearResults]);

    React.useEffect(() => {
      if (movies.length > 0 && debouncedQuery.trim()) {
        setShouldShowDropdown(true);
      }
    }, [movies.length, debouncedQuery, setShouldShowDropdown]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setQuery(value);

        // Если поле очищено, скрываем dropdown
        if (!value.trim()) {
          setShouldShowDropdown(false);
        }
      },
      [setShouldShowDropdown],
    );

    const handleResultClick = useCallback(
      (id: number): void => {
        setShouldShowDropdown(false);
        setQuery('');
        if (onClose) onClose();
        navigate(`/movie/${id}`);
      },
      [setShouldShowDropdown, onClose, navigate],
    );

    const handleBlur = useCallback((): void => {
      setTimeout(() => {
        setShouldShowDropdown(false);
        if (onClose) onClose();
      }, 100);
    }, [setShouldShowDropdown, onClose]);

    const handleSubmit = useCallback(
      (e: React.FormEvent): void => {
        e.preventDefault();
        if (query.trim()) {
          if (onSearch) onSearch(query.trim());
          setShouldShowDropdown(false);
        }
      },
      [query, onSearch, setShouldShowDropdown],
    );

    const handleFocus = useCallback((): void => {
      if (query && movies.length > 0) {
        setShouldShowDropdown(true);
      }
    }, [query, movies.length, setShouldShowDropdown]);

    return (
      <div className={`${styles.search} ${className || ''}`} data-mobile-search>
        <form onSubmit={handleSubmit}>
          <div className={styles['search__wrapper']}>
            <SpriteIcon id="search" className={styles['search__icon']} />
            <input
              ref={inputRef}
              className={styles['search__input']}
              type="text"
              value={query}
              onChange={handleChange}
              placeholder={placeholder}
              autoFocus={autoFocus}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoComplete="off"
            />
          </div>
        </form>

        <SearchDropdown
          movies={movies}
          onItemClick={handleResultClick}
          isVisible={shouldShowDropdown}
        />
      </div>
    );
  },
);

SearchInputComponent.displayName = 'SearchInput';

export const SearchInput: React.FC<SearchInputProps> = SearchInputComponent;
