const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const env = require('../../config/environment');

/**
 * Find a user with its email
 * Compare the password and return jwt if correct
 */
router.post('/authenticate', (req, res) => {
    User.findOne({where: {email: req.body.email}})
        .then(user => {            
            bcrypt.compare(req.body.password, user.get('password'), (err, isMatch) => {
                if(err) throw err;
                if(isMatch) {
                    let token = jwt.sign({email:user.get('email')}, env.dbSecret, {
                        expiresIn : "4h"
                    });
                    res.json({
                        success: true,
                        token: 'JWT '+token,
                        user: {
                            id: user._id,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email                            
                        }
                    });
                } else {
                    return res.json({success: false, msg: 'Wrong password'});
                }
            })
        })
        .catch((err) => {res.json({success:false, msg:'Unknown user'})});
});
module.exports = router;