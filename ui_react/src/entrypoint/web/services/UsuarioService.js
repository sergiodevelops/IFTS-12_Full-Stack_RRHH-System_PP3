import BaseService from "./BaseService";

export default class UsuarioService extends BaseService {
    static #API_RESOURCE = "users";

    constructor() {
        super(UsuarioService.#API_RESOURCE);
    }
}
