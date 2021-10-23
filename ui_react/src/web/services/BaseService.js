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

    /*
    async list() {
        const url = `${this.#api_url}/${this.getResource()}`;

        const params = {
            method: "GET",
            headers: this.#headers,
        };

        const checkResp = (resp: Response) => {
            if (resp.status !== 200) throw Error(`Error code: ${resp.status}`);
        }
        const throwError = (error: any) => {
            throw Error(error)
        }

        const results = await fetch(url, params)
            .then((resp) => {
                checkResp(resp);
                return resp.json();
            })
            .catch(throwError);

        if (typeof results === 'undefined' || results.errors) {
            console.log(results);
            return [];
        }

        return results.data;
    }
    */

    async create(baseModel) {
        const url = `${this.#api_url}/api/${this.getResource()}`;

        const params = {
            method: "POST",
            headers: this.#headers,
            body: JSON.stringify(baseModel)
        };

        const checkResp = (resp: Response) => {
            if (resp.status !== 201) throw Error("El usuario ya existe, intente con otro");
            // Crea un objeto tipo de UserException
            /*function UserCreateException(message) {
                this.message = message;
                this.name = 'UserException';
            }*/
            // Hacer que la excepción se convierta en una bonita cadena cuando se usa como cadena
            // (por ejemplo, por la consola de errores)
            /*UserCreateException.prototype.toString = function () {
                return `${this.name}: "${this.message}"`;
            }*/
            // Crea una instancia del tipo de objeto y tírala
        }

        const throwError = (error: any) => {
            throw Error(error);
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

        return results.data;
    }

    /*
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
    */
}
