const Users = require('../models/user-model.js');
const bcrypt = require('bcryptjs');

const restricted = (req, res, next) => {
    const { username, password } = req.headers
    if (!(username && password)) {
        res.status(401).json({ message: "You shall not pass!" });
    } else {
        Users.findBy({username})
            .first()
            .then(_user => {
                if (_user && bcrypt.compareSync(password, _user.password)) {
                    next()
                } else {
                    res.status(401).json({ message: "You shall not pass!" })
                }
            })
            .catch((err) => { res.status(500).json({ message: err }) })
    }
}

module.exports = restricted