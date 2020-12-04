export class ApiService {
  url: string;

  constructor() {
    this.url = 'http://localhost:3000/';
  }
  async post(route: string, data: any, token: string | null = null): Promise<KampaignApiResponse> {
    const headers = new Headers({'Content-Type': 'application/json'})
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    const config = { 
      method: 'POST',
      body: JSON.stringify(data),
      headers
    };
    const fullRoute = this.url + route;
    const resp: Response = await fetch(fullRoute, config)
    if (!resp.ok){
      const errorData = await resp.json();
      return { responseStatus: false, responseData: errorData }
    }
    const jsonResponse = await resp.json()
    return { responseStatus: true, responseData: jsonResponse };
  }
  async update(route: string, data: any, token: string | null = null): Promise<KampaignApiResponse> {
    const headers = new Headers({'Content-Type': 'application/json'})
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    const config = { 
      method: 'PUT',
      body: JSON.stringify(data),
      headers
    };
    const fullRoute = this.url + route;
    const resp: Response = await fetch(fullRoute, config)
    if (!resp.ok){
      const errorData = await resp.json();
      return { responseStatus: false, responseData: errorData }
    }
    const jsonResponse = await resp.json()
    return { responseStatus: true, responseData: jsonResponse };
  }
  async delete(route: string, data: any, token: string | null = null): Promise<KampaignApiResponse> {
    const headers = new Headers({'Content-Type': 'application/json'})
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    const config = { 
      method: 'DELETE',
      body: JSON.stringify(data),
      headers
    };
    const fullRoute = this.url + route;
    const resp: Response = await fetch(fullRoute, config)
    if (!resp.ok){
      const errorData = await resp.json();
      return { responseStatus: false, responseData: errorData }
    }
    const jsonResponse = await resp.json()
    return { responseStatus: true, responseData: jsonResponse };
  }
  async get(route: string, data: any, token: string | null = null): Promise<KampaignApiResponse> {
    const headers = new Headers({'Content-Type': 'application/json'})
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    const config = { 
      method: 'GET',
      headers
    };
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const fullRoute = `${this.url}${route}?${new URLSearchParams(data)}`;
    const resp: Response = await fetch(fullRoute, config)
    if (!resp.ok){
      const errorData = await resp.json();
      return { responseStatus: false, responseData: errorData }
    }
    const jsonResponse = await resp.json()
    return { responseStatus: true, responseData: jsonResponse }
  }
}


export interface KampaignApiResponse {
  responseStatus: boolean,
  responseData: any,
}
