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
         height: {type: Number, min: 0, max: 650},
         width: {type: Number, min: 0, max: 650},
         backgroundColor: String,
         borderColor: String,
         borderRadius: {type: Number, min: 0, max: 200},
         borderWidth: {type: Number, min: 0, max: 200},
         margin: {type: Number, min: 0, max: 200},
         padding: {type: Number, min: 0, max: 200},
         texts: [{id: String,
              text: String,
              color: String,
              fontSize: {type: Number, min: 4, max: 150}
           }],
           images: [{id: String,
              imageURL: String,
              imageHeight: {type: Number, min: 4, max: 200},
              imageWidth: {type: Number, min: 4, max: 200}
         }]      
  }]
}, {collection: "Users"}, );


module.exports = mongoose.model('User', UserSchema);