const generalRoutes = require('../routes/api');
const userRoutes = require('../routes/usuarios');

module.exports = (app) => {
    generalRoutes(app)
    userRoutes(app)
};
