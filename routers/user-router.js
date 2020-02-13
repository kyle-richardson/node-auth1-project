const express = require('express');

const Users = require('./user-model.js');
const bcrypt = require('bcryptjs')
const restricted = require('./auth/restricted')

const router = express.Router();

router.get('/users', restricted, async (req, res) => {
    try {
       const users = await Users.getUsers()
       res.status(201).json(users)
    }
    catch(err) {
        res.status(501).json({message: 'could not retrieve users', error: err})
    }
  });

server.post('/login', (req, res) => {
    let { username, password } = req.body;
  
    Users.findBy({username})
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }); 

module.exports = router