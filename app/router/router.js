const verifyToken = require('./verifyJwtToken');
 
module.exports = function(app) {
    const controller = require('../controller/controller.js');
    app.post('/api/auth', controller.signin);
    app.post('/api/profile/update', [verifyToken], controller.updateProfile);
    app.post('/api/user/poke',  controller.createPoke);
    app.get('/api/user', [verifyToken], controller.userContent);
    app.get('/api/user/list', controller.userList);
}