const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Op = db.Op;
const sequelize = db.sequelize;
 
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
    
    res.status(200).send({ auth: true, accessToken: token});
    
  }).catch(err => {
    res.status(500).send('Error -> ' + err);
  });
}
 
exports.userContent = (req, res) => {
    User.findOne({
      where: {id: req.userId},
      attributes: ['name', 'username', 'email','pokedCount']
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

exports.updateProfile = (req, res) => {
  User.update(
    { name: req.body.name},
    { where: { id : req.userId }}
  ).then(updatedUser => {
    User.findOne({
      where: {id: req.userId},
      attributes: ['name', 'username', 'email']
    }).then(user => {
      res.status(200).json({
        "description": "User profile updated",
        "user": user
      });
    }).catch(err => {
      res.status(500).json({
        "description": "Can not find updated user",
        "error": err
      });
    })
}).catch(function(e) {
    console.log("profile update failed !");
})
}


exports.userList = (req, res) => {
  let search = req.query.search;
  User.findAll({
    where:{
      [Op.or]: [
        {
          name: {
            [Op.like]:`%${search}%`
          }
        },
        {
          username: {
            [Op.like]:`%${search}%`
          }
        }
      ]
    },
    attributes: ['name', 'username']
  }).then(users => {
    res.status(200).json({
      "description": "User Content Page",
      "users": users
    });
  }).catch(err => {
    res.status(500).json({
      "description": "cant load user list",
      "error": err
    });
  })
}

/* We must keep poke record in another table and save user poker,poked user,poking time and status in every record
number of poke  with unseen status must be show to user
in this part for Time limitation we save just poke number in one of user field :)
*/
exports.createPoke = (req, res) => {
  User.update(
    { pokedCount: sequelize.literal('pokedCount + 1')},
    { where: { username : req.body.username }}
  ).then(user => {
    res.status(200).json({
      "description": "User poked"
    });
  }).catch(err => {
    res.status(500).json({
      "description": "Can poked user",
      "error": err
    });
  })
}