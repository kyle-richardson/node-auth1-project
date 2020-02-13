const express = require('express');

const Users = require('../models/user-model.js');
const bcrypt = require('bcryptjs')
const restricted = require('../auth/restricted')

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

router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    Users.findBy({username})
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
          res.status(401).json({ message: 'You shall not pass!' });
        }
      })
      .catch(err => {
        res.status(500).json({message: 'could not find user', error: err});
      });
  }); 

router.post('/register', async (req, res) => {
    const {username, password} = req.body
    try {
        const hash = await bcrypt.hashSync(password, 14)
        const newUser = await Users.add({username: username, password: hash})
        res.status(200).json(newUser)
    }
    catch(err) {
        res.status(501).json({message: 'could not add user', error: err})
    }
})

module.exports = router