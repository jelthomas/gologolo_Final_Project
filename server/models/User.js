var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  id: String,
  username: String,
  email: String,
  password: String,
  logos: [{
         id: String, 
         name: String,
         height: {type: Number, min: 0, max: 700},
         width: {type: Number, min: 0, max: 700},
         backgroundColor: String,
         borderColor: String,
         borderRadius: {type: Number, min: 0, max: 150},
         borderWidth: {type: Number, min: 0, max: 150},
         margin: {type: Number, min: 0, max: 200},
         padding: {type: Number, min: 0, max: 200},
         texts: [{id: String,
              text: String,
              color: String
           }],
           images: [{id: String,
              imageURL: String,
              imageHeight: {type: Number, min: 0, max: 100},
              imageWidth: {type: Number, min: 0, max: 100}
         }]      
  }]
}, {collection: "Users"}, );


UserSchema.pre('save', function(next){
  if(!this.isModified('password')){
    return next();
  }
  bcrypt.hash(this.password, 10,(err,passwordHash) =>{
    if(err){
      return next(err);
    }
    this.password = passwordHash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password, cb){
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if(err){
      return cb(err);
    }
    else{
      if(!isMatch){
        return cb(null, isMatch);
      }
      return cb(null, this);
    }
  })
}

module.exports = mongoose.model('User', UserSchema);