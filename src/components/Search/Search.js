import { useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';
import styles from './Search.module.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import useDebounce from '~/hooks/useDebounce';
import useFetch from '~/hooks/useFetch';
import ProductItem from './ProductItem/ProductItem';
import * as searchService from '~/services/searchService';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Search() {
  const { data } = useFetch(`/products?populate=*`);

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loadinged, setLoadinged] = useState(false);
  const [selectedItem, setSelectedItem] = useState(-1);

  const debouncedValue = useDebounce(searchValue, 400);

  const { mode } = useSelector((state) => state.darkMode);

  const inputRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoadinged(true);

      const result = await searchService.search(debouncedValue);
      setSearchResult(result);

      setLoadinged(false);
    };
    fetchApi();
  }, [debouncedValue]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;

    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp' && selectedItem > 0) {
      setSelectedItem((prev) => prev - 1);
    } else if (
      e.key === 'ArrowDown' &&
      selectedItem < searchResult.length - 1
    ) {
      setSelectedItem((prev) => prev + 1);
    } else if (e.key === 'Enter') {
    }
  };

  return (
    <div className={cx('wrapper')}>
      <HeadlessTippy
        appendTo={() => document.body}
        interactive
        visible={showResult && searchResult.length > 0}
        onClickOutside={handleHideResult}
        render={(attrs) => (
          <div
            className={cx(mode ? 'search-result-dark' : 'search-result')}
            tabIndex="-1"
            {...attrs}
          >
            <PopperWrapper>
              {data
                ?.filter((result) =>
                  result?.attributes?.title.toLowerCase().includes(searchValue),
                )
                ?.map((result, index) => (
                  <ProductItem
                    key={result.id}
                    result={result}
                    index={index}
                    selectedItem={selectedItem}
                  />
                ))
                .splice(0, 5)}

              <h5>Xem t???t c??? s???n ph???m</h5>
            </PopperWrapper>
          </div>
        )}
      >
        <div className={cx(mode ? 'search-dark' : 'search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="B???n mu???n t??m g??"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
            onKeyDown={handleKeyDown}
          />

          {!!searchValue && !loadinged && (
            <button className={cx('clear')} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {loadinged && (
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
          )}

          {searchValue ? (
            <button
              className={cx('search-btn')}
              onMouseDown={(e) => e.preventDefault()}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          ) : (
            <button
              disabled
              className={cx('search-btn-dis')}
              onMouseDown={(e) => e.preventDefault()}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          )}
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
