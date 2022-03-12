import React, { FC, PropsWithChildren } from 'react';
import Services from './services';

/**
 * Контекст для Services
 *
 */
export const ServicesContext = React.createContext({});

interface Props {
  services: Services;
}

/**
 * Провайдер Services.
 */
const ServicesProvider: FC<PropsWithChildren<Props>> = props => {
  return (
    <ServicesContext.Provider value={props.services}>
      {props.children}
    </ServicesContext.Provider>
  );
};

export default React.memo(ServicesProvider);
