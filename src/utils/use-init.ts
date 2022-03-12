import { useEffect } from 'react';

/**
 * Хук для асинхронных расчётов, которые будут исполнены при первом рендере или изменении inputs.
 * Так же позволяет отреагирваот на перехода по истории
 * @param callback {Function} Пользовательская функция
 * @param inputs {Array} Значения при смене которых callback снова исполнится.
 * @param options {{backForward}}
 */
export default function useInit(
  callback: () => void,
  inputs: any[] = [],
  options = { backForward: false }
) {
  // Если в истории браузера меняются только query-параметры, то react-router не оповестит
  // компонент об изменениях, поэтому хук можно явно подписать на событие изменения истории
  // браузера (если нужно отреагировать на изменения query-параметров при переходе по истории)
  useEffect(() => {
    callback();
    if (options.backForward) {
      window.addEventListener('popstate', callback);
      return () => {
        window.removeEventListener('popstate', callback);
      };
    }
  }, inputs);
}
