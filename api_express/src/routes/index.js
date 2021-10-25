const usuarioController = require('../controllers/UsuarioController');

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Example project did not give you access to the api web services',
    }));
    //usuarioController
    app.post('/api/users/create', usuarioController.create);
    app.post('/api/users/login', usuarioController.login);
};