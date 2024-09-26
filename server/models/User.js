const mongoose = require('mongoose')

const newUser = new mongoose.Schema({

    email:{
        type:String

    },
    password:{
        type:String
    },
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    phone:{
        type:String
    },
    state:{
        type:String
    },
    delegation:{
        type:String
    },
    bio:{
        type:String
    },
    cDate:{
        type:Date,
        default: Date.now
    },
    report:{
        type:Number,
        default: 0
    },
    profilePicture: { // New field for profile picture
        type: String
    }

 })

 module.exports = mongoose.model('users', newUser)
 // first param its the collection name in mongoDB atals
