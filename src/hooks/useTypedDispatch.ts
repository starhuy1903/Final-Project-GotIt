import { useDispatch } from 'react-redux';
import type { TypedDispatch } from '../store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
const useTypedDispatch: () => TypedDispatch = useDispatch;
export default useTypedDispatch;
