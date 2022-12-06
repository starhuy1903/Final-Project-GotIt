import { renderHook, act } from '@testing-library/react-hooks'
import { usePagination } from '../usePagination'

test('should return correctly', async () => {
  // const {promise, resolve} = deferred()
  //this is how we can render the hook using the library
  const {result} = renderHook(() => usePagination({
  totalCount: 100,
  pageSize: 20,
  siblingCount: 1,
  currentPage: 1,
}))
  //try console logging result.current and see what exactly is the result object
  console.log(result);
})
