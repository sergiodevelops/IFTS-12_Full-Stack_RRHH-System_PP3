module.exports = (app) => {
    const UsuarioController = require("../controllers/UsuarioController");
    let router = require("express").Router();

    // Create a new User
    router.post("/create", UsuarioController.create);

    // Retrieve all Users
    router.get("/list", UsuarioController.list);

    // Delete a User with id
    router.delete("/delete:id", UsuarioController.delete);

    app.use('/api/users', router);
};