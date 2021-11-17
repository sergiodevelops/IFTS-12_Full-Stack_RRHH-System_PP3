module.exports = (app) => {
    const AnuncioController = require("../controllers/anuncios");
    const router = require("express").Router();

    router.get("/", AnuncioController.findAllByFilters);

    app.use('/api/jobads', router);
};
