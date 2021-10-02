module.exports = app => {
    const UserController = require("../controllers/UserController");
    let router = require("express").Router();

    // Create a new User
    router.post("/", UserController.create);

    // Retrieve all Users
    // router.get("/", UserController.findAll);

    // Retrieve all published Users
    // router.get("/published", UserController.findAllPublished);

    // Retrieve a single User with id
    // router.get("/:id", UserController.findOne);

    // Update a User with id
    // router.put("/:id", UserController.update);

    // Delete a User with id
    // router.delete("/:id", UserController.delete);

    // Delete all Users
    // router.delete("/", UserController.deleteAll);

    app.use('/api/users', router);
};