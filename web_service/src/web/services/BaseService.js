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

    async list() {
        const url = `${this.#api_url}/${this.getResource()}`;

        const params = {
            method: "GET",                
            headers: this.#headers,
        };

        const results = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => { 
            console.log(error);
        });
        
        if (typeof results === 'undefined' || results.errors) {
            console.log(results);
            return [];
        }

        return results.data;
    }

    async create(baseModel) {
        const url = `${this.#api_url}/api/${this.getResource()}`;

        const params = {
            method: "POST",
            headers: this.#headers,
            body: JSON.stringify(baseModel)
        };

        const results = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => { 
            console.log(error);
        });

        if (typeof results === 'undefined' || results.errors) {
            console.log(results);
            return null;
        }

        return results.data;
    }

    async read(baseModelId) {
        const url = `${this.#api_url}/${this.getResource()}/${baseModelId}`;

        const params = {
            method: "GET",                
            headers: this.#headers,
        };

        const results = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => { 
            console.log(error);
        });

        if (typeof results === 'undefined' || results.errors) {
            console.log(results);
            return null;
        }
        
        return results.data;
    }

    async delete(baseModelId) {
        const url = `${this.#api_url}/${this.getResource()}/${baseModelId}`;

        const params = {
            method: "DELETE",                
            headers: this.#headers,
        };

        const results = await fetch(url, params)
        .catch((error) => { 
            console.log(error);
        });
        
        if (results.status >= 400) throw Error("Error");

        return results;
    }

    async update(baseModelId, baseModel) {
        const url = `${this.#api_url}/${this.getResource()}/${baseModelId}`;

        const params = {
            method: "PUT",                
            headers: this.#headers,
            body: JSON.stringify(baseModel)
        };

        const results = await fetch(url, params)
        .then((resp) => resp.json())
        .catch((error) => { 
            console.log(error);
        });

        if (typeof results === 'undefined' || results.errors) {
            console.log(results);
            return null;
        }
        
        return results.data;
    }
}
