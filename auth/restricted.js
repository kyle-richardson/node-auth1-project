const Users = require('../models/user-model.js');
const bcrypt = require('bcryptjs');

const restricted = (req, res, next) => {

    /*PART 1 MVP*/

    // const { username, password } = req.headers
    // if (!(username && password)) {
    //     res.status(401).json({ message: "You shall not pass!" });
    // } else {
    //     Users.findBy({username})
    //         .first()
    //         .then(_user => {
    //             if (_user && bcrypt.compareSync(password, _user.password)) {
    //                 next()
    //             } else {
    //                 res.status(401).json({ message: "You shall not pass!" })
    //             }
    //         })
    //         .catch((err) => { res.status(500).json({ message: err }) })
    // }

    /*PART 2 MVP*/

    if(req.session && req.session.user)
        if(req.params.id) {
            if(req.session.user.id == req.params.id) //the user logged in can only operate on their own account (delete, access content)
                next()
            else
                res.status(401).json({ message: 'You do not have priviledge to access or edit this user.'})
        }
        else 
            next()
    else
        res.status(401).json({ message: "You shall not pass!" })
}

module.exports = restricted