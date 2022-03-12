import Services, { IModules } from '../services';

type IStoreModules = {
  [P in keyof IModules]: InstanceType<IModules[P]>;
};
export type IRootState = {
  [P in keyof IStoreModules]: ReturnType<IStoreModules[P]['initState']>;
};

/**
 * Хранилище состояния приложения
 */
class Store {
  public services: Services;
  private state: IRootState;
  private listners: any[];
  private modules: IStoreModules;

  /**
   * @param modules {Object} Классы StoreModule для создания экземпляров модулей хранилища
   */

  constructor(services: Services, modules: IModules) {
    this.services = services;
    // Состояние приложения (данные всех модулей)
    this.state = {} as IRootState;
    // Подписчики на изменение state
    this.listners = [];

    // Модули
    this.modules = {} as IStoreModules;
    const names = Object.keys(modules);
    for (const name of names) {
      //@ts-ignore
      this.modules[name] = new modules[name](this, name);
      // Состояние по умочланию от модуля
      //@ts-ignore
      this.state[name] = this.modules[name].initState();
    }
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   */
  subscribe(callback: Function) {
    this.listners.push(callback);
    // Возвращаем функцию для отписки
    return () => {
      this.listners = this.listners.filter(item => item !== callback);
    };
  }

  /**
   * Выбор state
   * @return {Object}
   */
  getState(): IRootState {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {Object}
   */
  setState(newState: IRootState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const lister of this.listners) {
      lister(this.state);
    }
  }

  /**
   * Доступ к модулю состояния
   * @param name {String} Название модуля
   * @return {StoreModule}
   */
  get<T extends keyof IStoreModules>(name: T): IStoreModules[T] {
    return this.modules[name];
  }

  get basket() {
    return this.get('basket');
  }

  get countries() {
    return this.get('countries');
  }
}

export default Store;
