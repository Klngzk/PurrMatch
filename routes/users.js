const express           = require('express');
const router            = express.Router();
const User              = require("../models/user");
const passport            = require('passport');
const users            =require('../controllers/users.js')



router.get("/register", users.registerForm)

router.post('/register', users.registerUser)

router.get('/login', users.loginForm)

router.post('/login',passport.authenticate('local',{failureFlash:true,
     failureRedirect: '/login'}) , users.loginUser)

router.get('/logout',  users.logoutUser)


module.exports = router;