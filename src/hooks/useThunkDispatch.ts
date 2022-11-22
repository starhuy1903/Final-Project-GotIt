import { useDispatch } from "react-redux";
import type { TypedDispatch } from "../store/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useThunkDispatch: () => TypedDispatch = useDispatch;
