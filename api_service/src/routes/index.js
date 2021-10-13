/* Controllers */
const usuarioController = require('../controllers/UsuarioController');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Example project did not give you access to the api web services',
    }));
    // app.get("/check", (req, res) => {
    //     res.json({message: "API its OK"});
    // });

    //usuarioController
    app.post('/api/users/create', usuarioController.create);

    // otherController
};