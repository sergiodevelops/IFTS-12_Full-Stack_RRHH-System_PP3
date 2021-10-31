const UsuarioController = require("../controllers/usuarios");
module.exports = (app) => {
    const UsuarioController = require("../controllers/usuarios");
    const router = require("express").Router();

    // Create a new User in DB if username not exist
    router.post("/create", UsuarioController.create);
    // Login a User in DB by username and password
    router.post("/login", UsuarioController.login);
    // Retrieve all Users
    router.get("/", UsuarioController.findAll);
    // Retrieve all published Users
    router.get("/published", UsuarioController.findAllByUserType);

    app.use('/api/users', router);
};
