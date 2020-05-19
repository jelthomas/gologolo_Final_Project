const express = require('express');
const router = express.Router();
const passport = require('passport');
const cors = require('cors');
const passportConfig = require('../../passport');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

router.use(cors());

process.env.SECRET_KEY = 'secret';

router.post('/register', (req,res)=>{
  const userData = {
    username : req.body.username,
    email : req.body.email,
    password : req.body.password
  }

  User.findOne({
    email : req.body.email
  })
  .then(user => {
    if(!user){
      bcrypt.hash(req.body.password, 10, (err,hash) =>{
        userData.password = hash;
        User.create(userData)
        .then(user => {
          res.json({status: user.email + " registered!"})
        })
        .catch(err =>{
          res.send("Error: " + err);
        })
      })
    }
    else{
      res.json({error: "User already exists"})
    }
  })
  .catch(err =>{
    res.send("Error: " + err);
  })
});

router.post('/login', (req,res)=>{
  User.findOne({
    email: req.body.email
  })
  .then(user => {
    if(user){
      if(bcrypt.compareSync(req.body.password, user.password)){
        const payload = {
          _id: user._id,
          username: user.username,
          email: user.email
        }
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.send(token)
      }
      else{
        res.json({error: "Incorrect Password"})
      }
    }
    else{
      res.status(401).send({
        success: false,
        msg: "Failed to login: User does not exist"
      })
      res.json({error: "User does not exist"})
    }
  })
  .catch(err => {
    res.send("Error: " + err);
  })
});

router.get('/profile', (req, res) =>{
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    _id: decoded._id
  })
  .then(user =>{
    if(user){
      res.json(user)
    }
    else{
      res.send("User does not exist")
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })
})

// router.get('/authenicated', passport.authenticate('jwt', {session:false}), (req,res)=>{
//  const {username, email} = req.user;
//  res.status(200).json({isAuthenticated: true, user: {username, email}});
// });
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
