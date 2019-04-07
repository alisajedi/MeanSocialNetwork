var cors = require('cors');
var express = require('express');
var app = express();
app.use(cors())
var bodyParser = require('body-parser');
app.use(bodyParser.json())
 
require('./app/router/router.js')(app);
 
const db = require('./app/config/db.config.js');
 
// // force: true will drop the table if it already exists
 db.sequelize.sync({force: true}).then(() => {
   console.log('Drop and Resync with { force: true }');
 });
// using   $2b$10$GAr7E38xZ0.pIq8SgwoYpuqWKepsGA1HgejbZXmm0dOlHbPzOSB9q    for password 123456789 in all user record

 
// Create a Server
var server = app.listen(3000, function () {
 
  var host = 'localhost'
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
})
