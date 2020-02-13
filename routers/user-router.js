const express = require('express');

const db = require('./user-model.js');
const restricted = require('./auth/restricted')

const router = express.Router();

router.get('/', restricted, async (req, res) => {
    try {
       const users = await db.getUsers()
       res.status(201).json(users)
    }
    catch(err) {
        res.status(501).json({message: 'could not retrieve users', error: err})
    }
  });

module.exports = router