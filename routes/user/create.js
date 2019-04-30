const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt');

/**
 * Create a new user with the one given in parameter
 * The password is hashed and salted
 */
router.post('/create', (req, res) => {
    let user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password
    }
    User.sync().then(() => {
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) throw err;
                user.password = hash;
                User.create(user)
                    .then(()=> res.json({success: true, msg:'Registration completed'}))
                    .catch((err) => { 
                        console.log('Registration error: '+err);
                        res.json({success: false, msg:'Registration failed'})
                    });
            });
        });
    });
});
module.exports = router;