const mongoose = require('mongoose')

const Admin = new mongoose.Schema({

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
    role:{
        type:String,
        enum: ['admin','superadmin'],
    }
 })

 module.exports = mongoose.model('admins', Admin)
 // first param its the collection name in mongoDB atals
