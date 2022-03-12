// import  from '../store';
import useServices from './use-services';

/**
 * Хук для доступа к объекту хранилища
 * 
 */
export default function useStore() {
  return useServices().getStore();
}
