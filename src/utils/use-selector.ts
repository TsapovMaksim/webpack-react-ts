import { IRootState } from './../store/index';
import React, { useEffect } from 'react';
import useStore from './use-store';
import shallowequal from 'shallowequal';

/**
 * Хук для выборки данных из store
 */
export default function useSelector<T>(selector: (state: IRootState) => T): T {
  const store = useStore();

  const [state, setState] = React.useState(selector(store.getState()));

  useEffect(() => {
    return store.subscribe((newState: IRootState) => {
      const result = selector(newState);
      if (!shallowequal(state, result)) {
        setState(result);
      }
    });
  }, [state]);

  return state;
}
