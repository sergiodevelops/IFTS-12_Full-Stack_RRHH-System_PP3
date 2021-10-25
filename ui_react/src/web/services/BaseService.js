type ApiResponse = {
    name: string;
    message: string;
}

export default class BaseService {
    static #API_HOST = process.env.REACT_APP_API_HOST || "http://localhost:4005";
    #api_url;
    #headers;
    #resource;

    constructor(resource) {
        this.#resource = resource;
        this.#api_url = `${BaseService.#API_HOST}`;
        this.#headers = new Headers();
        this.#headers.set('Content-Type', 'application/json');
    }

    getApiUrl() {
        return this.#api_url;
    }

    getResource() {
        return this.#resource;
    }

    getHeaders() {
        return this.#headers;
    }

    async create(baseModel) {
        const url = `${this.#api_url}/api/${this.getResource()}/create`;

        const params = {
            method: "POST",
            headers: this.#headers,
            body: JSON.stringify(baseModel)
        };

        const checkResp = (resp: Response) => {
            if (resp.status !== 201) throw resp.json();
        }

        const throwError = (err: ApiResponse) => {
            throw err;
        }

        const results = await fetch(url, params)
            .then((resp: Response) => {
                checkResp(resp);
                return resp.json();
            })
            .catch(throwError);

        if (typeof results === 'undefined' || results.errors) {
            if (typeof results === 'undefined') throw Error(`La API REST se encunetra fuera de servicio, puede comprobar su funcionamiento ingresando a ${this.#api_url}`);
            return null;
        }

        return results;
    }

    async login(baseModel) {
        const url = `${this.#api_url}/api/${this.getResource()}/login`;

        const params = {
            method: "POST",
            headers: this.#headers,
            body: JSON.stringify(baseModel)
        };

        const checkResp = (resp: Response) => {
            if (resp.status !== 200) throw resp.json();
        }

        const throwError = (err: ApiResponse) => {
            throw err;
        }

        const results = await fetch(url, params)
            .then((resp: Response) => {
                checkResp(resp);
                return resp.json();
            })
            .catch(throwError);

        if (typeof results === 'undefined' || results.errors) {
            if (typeof results === 'undefined') throw Error(`La API REST se encunetra fuera de servicio, puede comprobar su funcionamiento ingresando a ${this.#api_url}`);
            return null;
        }

        return results;
    }
}
