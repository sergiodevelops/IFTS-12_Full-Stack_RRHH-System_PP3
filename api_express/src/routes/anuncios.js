const AnuncioController = require("../controllers/anuncios");
module.exports = (app) => {
    const UsuarioController = require("../controllers/anuncios");
    const router = require("express").Router();

    // URI Create a new User in DB if username not exist
    router.post("/create", UsuarioController.create);

    // URI Login a User in DB by username and password
    router.post("/login", UsuarioController.login);

    // URI Retrieve all Users by filters
    router.get("/", UsuarioController.findAllByUserType);

    // URI update Replace complete User by id
    // router.path("/", UsuarioController.update);
    // URI update Modify parcial User by id
    router.put("/", UsuarioController.replace);

    // URI Delete User by id
    router.delete("/", UsuarioController.delete);

    app.use('/api/applicants', router);
};
