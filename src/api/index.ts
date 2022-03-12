import Services from '../services';

class API {
  private services: Services;
  private token: string;

  constructor(services: Services) {
    this.services = services;
    this.token = '';
  }

  setToken(token: string) {
    this.token = token;
  }

  async GET(url: string, options: Partial<RequestInit> = {}) {
    const response = await fetch(url, {
      ...options,
      method: 'GET',
      headers: {
        'X-Token': this.token,
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }

  async POST(url: string, options: Partial<RequestInit> = {}) {
    const headers = {
      'X-Token': this.token,
      'Content-Type': 'application/json',
      ...(options.headers && { ...options.headers }),
    };
    if (options.body instanceof FormData) {
      //@ts-ignore
      delete headers['Content-Type'];
    }

    const response = await fetch(url, {
      ...options,
      method: 'POST',
      headers: headers,
    });

    return response.json();
  }

  async DELETE(url: string, options: Partial<RequestInit> = {}) {
    const response = await fetch(url, {
      ...options,
      method: 'DELETE',
      headers: {
        'X-Token': this.token,
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }

  async PUT(url: string, options: Partial<RequestInit> = {}) {
    const response = await fetch(url, {
      ...options,
      method: 'PUT',
      headers: {
        'X-Token': this.token,
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }
}

export default API;
