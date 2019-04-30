const express = require('express');
const router = express.Router();
var passport = require('passport');
const User = require('../../models/user');

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({user: req.user});
});
module.exports = router;