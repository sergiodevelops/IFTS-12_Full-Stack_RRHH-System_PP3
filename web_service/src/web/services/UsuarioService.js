import BaseService from "./BaseService";

export default class UsuarioService extends BaseService {
    static #API_RESOURCE = "users/create";

    constructor() {
        super(UsuarioService.#API_RESOURCE);
    }
}
