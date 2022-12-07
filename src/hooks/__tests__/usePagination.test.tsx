import { renderHook } from '@testing-library/react-hooks';
import usePagination from '../usePagination';

describe('usePagination', () => {
  /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
  it('should return case 1 of pagination', async () => {
    const { result } = renderHook(() => usePagination({
      totalCount: 100,
      pageSize: 20,
      siblingCount: 1,
      currentPage: 1,
    }));

    expect(result.current).toEqual([1, 2, 3, 4, 5]);
  });

  /*
    Case 2: No left dots to show, but rights dots to be shown
    */
  it('should return case 2 of pagination', async () => {
    const { result } = renderHook(() => usePagination({
      totalCount: 140,
      pageSize: 20,
      siblingCount: 1,
      currentPage: 1,
    }));

    expect(result.current).toEqual([1, 2, 3, 4, 5, '...', 7]);
  });

  /*
    Case 2: No left dots to show, but rights dots to be shown
    */
  it('should return case 2 of pagination', async () => {
    const { result } = renderHook(() => usePagination({
      totalCount: 140,
      pageSize: 20,
      siblingCount: 1,
      currentPage: 1,
    }));

    expect(result.current).toEqual([1, 2, 3, 4, 5, '...', 7]);
  });

  /*
    Case 3: No right dots to show, but left dots to be shown
    */
  it('should return case 3 of pagination', async () => {
    const { result } = renderHook(() => usePagination({
      totalCount: 140,
      pageSize: 20,
      siblingCount: 1,
      currentPage: 6,
    }));

    expect(result.current).toEqual([1, '...', 3, 4, 5, 6, 7]);
  });

  /*
    Case 4: Both left and right dots to be shown
    */
  it.only('should return case 4 of pagination', async () => {
    const { result } = renderHook(() => usePagination({
      totalCount: 200,
      pageSize: 20,
      siblingCount: 1,
      currentPage: 4,
    }));

    expect(result.current).toEqual([1, '...', 3, 4, 5, '...', 10]);
  });
});
