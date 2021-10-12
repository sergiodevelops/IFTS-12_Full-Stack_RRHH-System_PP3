module.exports = app => {
    const UsuarioController = require("../controllers/UsuarioController");
    let router = require("express").Router();

    // Create a new User
    router.post("/", UsuarioController.create);

    app.use('/api/users', router);
};