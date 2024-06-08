export interface IHttpClientService {
    get(url: string): Promise<string>;
    post(url: string, body: string): Promise<string>;
}

class HttpClientService implements IHttpClientService {
    async get(url: string) {
        // Perform GET request
        return "GET response";
    }

    async post(url: string, body: string) {
        // Perform POST request
        return "POST response";
    }
}

export default HttpClientService;