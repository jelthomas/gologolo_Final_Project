var mongoose = require('mongoose');

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
         texts: [{id: String,
              text: String,
              color: String,
              backgroundColor: String,
              borderColor: String,
              fontSize: {type: Number, min: 2, max: 100},
              borderRadius: {type: Number, min: 0, max: 100},
              borderWidth: {type: Number, min: 0, max: 100}
           }],
           images: [{id: String,
              imageUrl: String,
              imageHeight: {type: Number, min: 0, max: 100},
              imageWidth: {type: Number, min: 0, max: 100}
         }]      
  }]
}, {collection: "Users"}, );

module.exports = mongoose.model('User', UserSchema);