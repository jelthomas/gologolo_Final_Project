var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportConfig = require('../../passport');
var User = require('../models/User');
var JWT = require('jsonwebtoken');


const signToken = userID =>{
  return JWT.sign({
    iss: "User",
    sub: userID
  }, "superDuperSecret", {expiresIn: "1h"});
}

router.post('/register', (req,res)=>{
  const {username, email, password} = req.body;
  User.findOne({username},(err,user)=>{
    if(err){
      res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
    }
    if(user){
      res.status(400).json({message: {msgBody: "Username already exists!", msgError: true}});
    }
    else{
      const newUser = new User({username, password, email});
      newUser.save(err=>{
        if(err){
          res.status(500).json({message: {msgBody: "Error has occurred", msgError: true}});
        }
        else{
          res.status(201).json({message: {msgBody: "New account has been created", msgError: false}});
        }
      });
    }
  });
});

router.post('/login', passport.authenticate('local', {session:false}), (req,res)=>{
  if(req.isAuthenticated()){
    const {_id, username, email} = req.user;
    const token = signToken(_id);
    res.cookie('access_token', token, {httpOnly: true, sameSite:true});
    res.status(200).json({isAuthenticated: true, user: {username, email}});
  }
});

router.get('/logout', passport.authenticate('jwt', {session:false}), (req,res)=>{
  console.log("here");
  res.clearCookie('access_token');
  res.json({user:{username: "", email: ""}, sucess: true});
});

router.get('/authenicated', passport.authenticate('jwt', {session:false}), (req,res)=>{
 const {username, email} = req.user;
 res.status(200).json({isAuthenticated: true, user: {username, email}});
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
