module.exports = (app) => {
    const UsuarioController = require("../controllers/usuarios");
    const router = require("express").Router();

    router.post("/create", UsuarioController.create);
    router.post("/login", UsuarioController.login);
    router.get("/", UsuarioController.findAllByUserType);
    router.put("/", UsuarioController.replace);
    router.delete("/", UsuarioController.delete);

    app.use('/api/users', router);
};
