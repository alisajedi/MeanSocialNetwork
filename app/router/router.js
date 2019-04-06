const verifyToken = require('./verifyJwtToken');
 
module.exports = function(app) {
    const controller = require('../controller/controller.js');
    app.post('/api/auth', controller.signin);
    app.get('/api/user', [verifyToken], controller.userContent);
}