import StoreModule from '../module';

interface ICountriesState {
  waiting: boolean;
  items: { code: string; title: string; _id: string }[];
}

class CountriesStore extends StoreModule<ICountriesState> {
  /**
   * Начальное состояние
   */
  initState(): ICountriesState {
    return {
      waiting: true,
      items: [],
    };
  }

  async load() {
    const result: any = {
      waiting: false,
    };

    const json = await this.api.GET(
      '/api/v1/countries?limit=*&fields=_id,title,code&sort=title.ru'
    );
    result.items = json.result.items;

    this.updateState(result);
  }
}

export default CountriesStore;
