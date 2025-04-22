import type { Dispatch, RootState } from 'src/redux/store';

import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<Dispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();
