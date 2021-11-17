module.exports = (app) => {
    const PostulanteController = require("../controllers/postulantes");
    const router = require("express").Router();

    router.get("/", PostulanteController.findAllByFilters);

    app.use('/api/applicants', router);
};
