const mongoose = require('mongoose')

const newBarber = new mongoose.Schema({

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
    adress:{
        type:String
    },
    rating:{
        type: Number
    },
    role:{
        type:String,
        default:'barber'
    },
    sname:{
        type:String
    },
    patente:{
        type:String
    },
    verified:{
        type:Boolean,
        default: false
    },
    req:{
        type:Boolean,
        default: false
    },
     worktime:{
        mon:String,
        tue:String,
        wed:String,
        thu:String,
        fri:String,
        sat:String,
        sun:String
    },
    bio:{
        type:String
    },
    cDate:{
        type:Date,
        default: Date.now
    },
    profilePicture: { // New field for profile picture
        type: String
    },
    maps:{
        type: String
    }
    
 })

 module.exports = mongoose.model('barbers', newBarber)
 // first param its the collection name in mongoDB atals
