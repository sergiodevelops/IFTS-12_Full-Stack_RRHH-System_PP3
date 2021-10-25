module.exports = (app) => {
    const UsuarioController = require("../controllers/UsuarioController");
    let router = require("express").Router();

    // Create a new User in DB
    router.post("/create", UsuarioController.create);
    // Find a User in DB
    router.post("/login", UsuarioController.login);
    // Delete a User with id
    /*router.delete("/delete:id", UsuarioController.delete);*/
    // Retrieve all Users
    /*router.get("/list", UsuarioController.list);*/

    app.use('/api/users', router);
};