const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
 
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
 
exports.signin = (req, res) => {
  console.log("Sign-In");
  
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      return res.status(404).send('User Not Found.');
    }
 
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" });
    }
    
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    
    res.status(200).send({ auth: true, accessToken: token });
    
  }).catch(err => {
    res.status(500).send('Error -> ' + err);
  });
}
 
exports.userContent = (req, res) => {
    User.findOne({
      where: {id: req.userId},
      attributes: ['name', 'username', 'email']
    }).then(user => {
      res.status(200).json({
        "description": "User Content Page",
        "user": user
      });
    }).catch(err => {
      res.status(500).json({
        "description": "Can not access User Page",
        "error": err
      });
    })
  }
 