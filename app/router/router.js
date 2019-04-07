const verifyToken = require('./verifyJwtToken');
 
module.exports = function(app) {
    const controller = require('../controller/controller.js');
    app.post('/api/auth', controller.signin);
    app.post('/api/profile/update', [verifyToken], controller.updateProfile);
    app.get('/api/user', [verifyToken], controller.userContent);
}