import { useEffect } from 'react';

/**
 *
 * @param {string} title
 * @returns
 */
export const useHeadTitle = (title) => {
  useEffect(() => {
    if (title != null) {
      document.title = title;
    }
  }, [title]);

  return null;
};
