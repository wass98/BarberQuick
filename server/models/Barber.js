const mongoose = require('mongoose')

const newBarber = new mongoose.Schema({

    email:{
        type:String

    },
    password:{
        type:String
    },
    name:{
        type:String
    },
    phone:{
        type:String
    },
    state:{
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
    worktime:{
        mon:String,
        tue:String,
        wed:String,
        thu:String,
        fri:String,
        sat:String,
        sun:String
    }
    
 })

 module.exports = mongoose.model('barbers', newBarber)
 // first param its the collection name in mongoDB atals
