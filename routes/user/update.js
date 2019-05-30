const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const env = require('../../config/environment');

router.post('/update', (req, res) => {
    User.findOne({where: {email: req.body.current_email}})
        .then(user => {
            let updateObj = {}
            if(user.first_name != req.body.first_name)
                updateObj.first_name = req.body.first_name
            if(user.last_name != req.body.last_name)
                updateObj.last_name = req.body.last_name
            // else if(user.email != req.body.email)
            //     updateObj.email = req.body.email
            if(!updateObj.first_name && !updateObj.last_name)
                res.json({ success:false, msg:'Nothing to update' });

            User.update(updateObj, { where: { id: user.id } })
                .then(() => {
                    let token = jwt.sign({email:user.get('email')}, env.dbSecret, {
                        expiresIn : '4h'
                    });
                    res.json({ success: true, 
                        msg:'Update successfully completed',
                        token: token,
                        user: {
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email                            
                        }
                    });
                })
                .catch((err) => { 
                    console.log('Update error: '+err);
                    res.json({ success: false, msg:'Failed to update' })
                });
        })
        .catch((err) => {res.json({success:false, msg:'Unknown email address'})});
});
module.exports = router;