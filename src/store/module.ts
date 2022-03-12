import API from '../api';
import Services from '../services';
import Store from './index';

/**
 * Базовый класс модуля хранилища
 */
class StoreModule<S = void> {
  protected services: Services;
  protected store: Store;
  protected api: API;
  protected name: string;
  /**
   * @param store {Store} Ссылка на хранилище
   * @param name {String} Навзание модуля (ключ данных в state)
   */
  constructor(store: Store, name: string) {
    this.services = store.services;
    this.store = store;
    // const test: OfUnion<typeof name> = name as OfUnion<typeof name>;
    this.name = name;
    this.api = this.services.getApi();
    // this.sockets = this.services.getSockets();
  }

  /**
   * Начальное состояние
   *
   */
  initState(): S {
    return {} as S;
  }

  /**
   * Текущее своё состояние
   * @return {*}
   */
  getState(): S {
    //@ts-ignore
    return this.store.getState()[this.name];
  }

  /**
   * Установка своего состояния
   * @param state {*}
   */
  setState(state: S) {
    this.store.setState({
      ...this.store.getState(),
      [this.name]: state,
    });
  }

  /**
   * Обновление состояния
   * @param patch
   */
  updateState(patch: S) {
    this.setState({
      ...this.getState(),
      ...patch,
    });
  }
}

export default StoreModule;
