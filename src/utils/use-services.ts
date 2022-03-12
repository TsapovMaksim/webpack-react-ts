import { useContext } from 'react';
import { ServicesContext } from '../provider';
import Services from '../services';

/**
 * Хук для доступа к объекту сервисов
 *
 */
export default function useServices(): Services {
  return useContext(ServicesContext) as Services;
}
