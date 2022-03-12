// import Sosckets from "./sockets";
import API from './api';
import Store from './store';
// import StoreRedux from "./store-redux/store-redux";
import * as modules from './store/exports';
// import config from "./config";

export type IModules = typeof modules;

class Services {
  //@ts-ignore
  private store: Store;
  //@ts-ignore
  private api: API;

  getApi() {
    if (!this.api) {
      this.api = new API(this);
    }

    return this.api;
  }

  getStore() {
    if (!this.store) {
      this.store = new Store(this, modules);
    }
    return this.store;
  }

  // getRedux() {
  //   if (!this.redux) {
  //     this.redux = new StoreRedux(this);
  //   }
  //   return this.redux;
  // }

  // getSockets() {
  //   if (!this.sockets) {
  //     this.sockets = new Sosckets(this, config["sockets"]);
  //   }
  //   return this.sockets;
  // }
}

export default Services;
