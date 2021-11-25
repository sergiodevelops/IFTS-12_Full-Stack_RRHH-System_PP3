import BaseService from "./BaseService";

export default class AnuncioService extends BaseService {
    private static API_RESOURCE = "jobads";

    constructor() {
        super(AnuncioService.API_RESOURCE);
    }
}
