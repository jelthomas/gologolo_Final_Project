var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var userModel = require('../models/User');
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;

var ImageType = new GraphQLObjectType({  
    name: 'image',
    fields: function () {
      return {
        _id: {
            type: GraphQLString
        },
        imageURL: {
            type: GraphQLString
        },
        imageHeight: {
            type: GraphQLInt
        },
        imageWidth: {
            type: GraphQLInt
          }
      }
    }
  });

  var ImageInput = new GraphQLInputObjectType({  
    name: 'imageInput',
    fields: function () {
      return {
        _id: {
            type: GraphQLString
        },
        imageURL: {
            type: GraphQLString
        },
        imageHeight: {
            type: GraphQLInt
        },
        imageWidth: {
            type: GraphQLInt
          }
      }
    }
  });

  
 
var TextType = new GraphQLObjectType({  
    name: 'text',
    fields: function () {
      return {
        _id: {
            type: GraphQLString
        },
        text: {
            type: GraphQLString
        }, 
        color: {
            type: GraphQLString
        },
        fontSize: {
            type: GraphQLInt
        }
      }
    }
  });

  var TextInput = new GraphQLInputObjectType({  
    name: 'textInput',
    fields: function () {
      return {
        _id: {
            type: GraphQLString
        },
        text: {
            type: GraphQLString
        }, 
        color: {
            type: GraphQLString
        },
        fontSize: {
            type: GraphQLInt
        }
      }
    }
  });

var LogoType = new GraphQLObjectType({  
    name: 'logo',
    fields: function () {
      return {
        _id: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        height: {
            type: GraphQLInt
        },
        width: {
            type: GraphQLInt
          },
        backgroundColor: {
            type: GraphQLString
        },
        borderColor: {
            type: GraphQLString
        },
        borderRadius: {
            type: GraphQLInt
        },
        borderWidth: {
            type: GraphQLInt
        },
        margin: {
            type: GraphQLInt
        },
        padding: {
            type: GraphQLInt
        },
        texts: {
            type: GraphQLList(TextType)
        },
        images: {
            type: GraphQLList(ImageType)
          }
      }
    }
  });


  var LogoInput = new GraphQLInputObjectType({  
    name: 'logoInput',
    fields: function () {
      return {
        _id: {
            type:GraphQLString
        },
        name: {
            type: GraphQLString
        },
        height: {
            type: GraphQLInt
        },
        width: {
            type: GraphQLInt
        },
        backgroundColor: {
            type: GraphQLString
        },
        borderColor: {
            type: GraphQLString
        },
        borderRadius: {
            type: GraphQLInt
        },
        borderWidth: {
            type: GraphQLInt
        },
        margin: {
            type: GraphQLInt
        },
        padding: {
            type: GraphQLInt
        },
        texts: {
            type: GraphQLList(TextInput)
        },
        images: {
            type: GraphQLList(ImageInput)
          }
      }
    }
  });

  
//userSchemas.js UserType definition

var UserType = new GraphQLObjectType({  
    name: 'user',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        username: {
          type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        logos:{
            type: GraphQLList(LogoType)
        }  
      }
    }
  });

  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            Users: {
                type: new GraphQLList(UserType),
                resolve: function () {
                    const users = userModel.find().exec()
                    if (!users) {
                        throw new Error('Error')
                    }
                    return users
                }
            },
            user: {
                type: UserType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const userDetails = userModel.findById(params.id).exec()
                    if (!userDetails) {
                        throw new Error('Error')
                    }
                    return userDetails
                }
            },
            logo: {
                type: UserType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    },
                    logoId: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logo = userModel.findOne({ '_id': params.id, 'logos._id': params.logoId}, { 'logos.$': 1});
                    if (!logo) {
                        throw new Error('Error')
                    }
                    return logo;
                }
            },
            text: {
                type: UserType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    },
                    logoId: {
                        name: '_id',
                        type: GraphQLString
                    },
                    textId: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const text = userModel.findOne({ '_id': params.id, 'logos._id': params.logoId, 'logos.texts._id': params.textId }, { 'logos.$': 1},{ 'logos.texts.$': 1 });
                    if (!text) {
                        throw new Error('Error')
                    }
                    return text;
                }
            }
        }
    }
})


var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addUser: {
                type: UserType,
                args: {
                    username: {
                        type: GraphQLString
                      },
                      email: {
                          type: GraphQLString
                      },
                      password: {
                          type: GraphQLString
                      },
                      logos: {
                          type: GraphQLList(LogoInput)
                      }
                },
                resolve: function (root, params) {
                    const model = new userModel(params);
                    const newUser = model.save();
                    if (!newUser) {
                        throw new Error('Error');
                    }
                    return newUser
                }
            },
            updateUser: {
                type: UserType,
                args: {
                    id: {
                        name:'id',
                        type: GraphQLString
                    },
                    username: {
                        type: GraphQLString
                    },
                    email: {
                        type: GraphQLString
                    },
                    password: {
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    return userModel.findByIdAndUpdate(params.id, { usernname: params.username, email: params.email, password: params.password}, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            addLogo: {
                type: UserType,
                args: {
                    id: {
                        type: GraphQLString
                    },
                    name: {
                        name: 'name',
                        type: GraphQLString
                    },
                    height: {
                        name: 'height',
                        type: GraphQLInt
                    },
                    width: {
                        name: 'width',
                        type: GraphQLInt
                    },
                    backgroundColor: {
                        name: 'backgroundColor',
                        type: GraphQLString
                    },
                    borderColor: {
                        name: 'borderColor',
                        type: GraphQLString
                    },
                    borderRadius: {
                        name: 'borderRadius',
                        type: GraphQLInt
                    },
                    borderWidth: {
                        name: 'borderRadius',
                        type: GraphQLInt
                    },
                    margin: {
                        name: 'margin',
                        type: GraphQLInt
                    },
                    padding: {
                        name: 'padding',
                        type: GraphQLInt
                    },
                    texts: {
                        name: "texts",
                        type: GraphQLList(TextInput)
                    },
                    images: {
                        name: "images",
                        type: GraphQLList(ImageInput)
                    }
                },
                resolve: function (root, params) {
                    const logo = userModel.findOneAndUpdate({ '_id': params.id}, { $push: { logos: {height: params.height, width: params.width, name: params.name, backgroundColor: params.backgroundColor, borderColor: params.borderColor, borderRadius: params.borderRadius, borderWidth: params.borderWidth, margin: params.margin, padding: params.padding, texts: params.texts, images: params.images}}});
                    if (!logo) {
                        throw new Error('Error')
                    }
                    return logo;
                }
            },
            addText: {
                type: UserType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    },
                    logoId: {
                        name: 'logos._id',
                        type: GraphQLString
                    },
                    text: {
                        name: 'text',
                        type: GraphQLString
                    },
                    color: {
                        name: 'color',
                        type: GraphQLString
                    },
                    fontSize: {
                        name: 'fontSize',
                        type: GraphQLInt
                    }
                },
                resolve: function (root, params) {
                    const text = userModel.update(
                        { "_id": params.id, "logos._id": params.logoId},
                        { "$push": 
                            {"logos.$.texts": 
                            {text: params.text, color: params.color, backgroundColor: params.backgroundColor,
                                borderColor: params.borderColor, fontSize: params.fontSize,
                                borderRadius: params.borderRadius, borderWidth: params.borderWidth}
                            }
                        }
                    );
                    if (!text) {
                            throw new Error('Error')
                        }
                        return text;
                }
            },
            addImage: {
                type: UserType,
                args: {
                    id:{
                        name: '_id',
                        type: GraphQLString
                    },
                    logoId: {
                        name: '_id',
                        type: GraphQLString
                    },
                    imageUrl: {
                        name: 'imageUrl',
                        type: GraphQLString
                    },
                    imageHeight: {
                        name: 'imageHeight',
                        type: GraphQLInt
                    },
                    imageWidth: {
                        name: 'imageWidth',
                        type: GraphQLInt
                    }
                },
                resolve: function (root, params) {
                    const image = userModel.update(
                        { "_id": params.id, "logos._id": params.logoId},
                        { "$push": 
                            {"logos.$.images": 
                            {imageURL: params.imageURL, imageHeight: params.imageHeight, imageWidth: params.imageWidth}
                            }
                        }
                    );
                    if (!image) {
                            throw new Error('Error')
                        }
                        return image;
                }
            },
            deleteLogo: {
                type: UserType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    },
                    logoId: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const logo = userModel.update(
                        { "_id": params.id},
                        { "$pull": {"logos": {"_id" : params.logoId}}
                        }
                    );
                    if (!logo) {
                            throw new Error('Error')
                        }
                        return logo;
                }
            },
            updateLogo: {
                type: UserType,
                args: {
                    id: {
                        type: GraphQLString
                    },
                    logoId: {
                        type: GraphQLString
                    },
                    name: {
                        name: 'name',
                        type: GraphQLString
                    },
                    height: {
                        name: 'height',
                        type: GraphQLInt
                    },
                    width: {
                        name: 'width',
                        type: GraphQLInt
                    },
                    backgroundColor: {
                        name: 'backgroundColor',
                        type: GraphQLString
                    },
                    borderColor: {
                        name: 'borderColor',
                        type: GraphQLString
                    },
                    borderRadius: {
                        name: 'borderRadius',
                        type: GraphQLInt
                    },
                    borderWidth: {
                        name: 'borderRadius',
                        type: GraphQLInt
                    },
                    margin: {
                        name: 'margin',
                        type: GraphQLInt
                    },
                    padding: {
                        name: 'padding',
                        type: GraphQLInt
                    },
                    texts: {
                        name: "texts",
                        type: GraphQLList(TextInput)
                    },
                    images: {
                        name: "images",
                        type: GraphQLList(ImageInput)
                    }
                },
                resolve: function (root, params) {
                    const logo = userModel.update({ '_id': params.id, 'logos._id': params.logoId}, {$set: {'logos.$.height': params.height, 'logos.$.width': params.width, 'logos.$.name': params.name, 'logos.$.backgroundColor': params.backgroundColor, 'logos.$.borderColor': params.borderColor, 'logos.$.borderRadius': params.borderRadius, 'logos.$.borderWidth': params.borderWidth, 'logos.$.margin': params.margin, 'logos.$.padding': params.padding, 'logos.$.texts': params.texts, 'logos.$.images': params.images}});
                    if (!logo) {
                        throw new Error('Error')
                    }
                    return logo;
                }
            }

        }
        //     removeLogo: {
        //         type: logoType,
        //         args: {
        //             id: {
        //                 type: new GraphQLNonNull(GraphQLString)
        //             }
        //         },
        //         resolve(root, params) {
        //             const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
        //             if (!remLogo) {
        //                 throw new Error('Error')
        //             }
        //             return remLogo;
        //         }
        //     }
    }
});


 
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });