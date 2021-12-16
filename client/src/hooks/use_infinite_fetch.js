import React from 'react';

const LIMIT = 10;

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {Array<T>} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 * @property {() => Promise<void>} fetchMore
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T[]>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useInfiniteFetch(apiPath, fetcher) {
  const internalRef = React.useRef({ isLoading: false, offset: 0 });

  const [result, setResult] = React.useState({
    data: [],
    error: null,
    isLoading: true,
  });

  const fetchMore = React.useCallback(() => {
    const { isLoading, offset } = internalRef.current;
    if (isLoading || offset % LIMIT !== 0) {
      return;
    }

    setResult((cur) => ({
      ...cur,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: true,
      offset,
    };

    const promise = fetcher(`${apiPath}/?limit=${LIMIT}&offset=${internalRef.current.offset}`);

    promise.then((data) => {
      setResult((cur) => ({
        ...cur,
        data: [...cur.data, ...data],
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset: offset + data.length,
      };
    });

    promise.catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        isLoading: false,
      }));
      internalRef.current = {
        isLoading: false,
        offset,
      };
    });
  }, [apiPath, fetcher]);

  React.useEffect(() => {
    setResult(() => ({
      data: [],
      error: null,
      isLoading: true,
    }));
    internalRef.current = {
      isLoading: false,
      offset: 0,
    };

    fetchMore();
  }, [fetchMore]);

  return {
    ...result,
    fetchMore,
  };
}
