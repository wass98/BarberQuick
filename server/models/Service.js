// const { Mongoose } = require("mongoose")


const mongoose = require('mongoose')

const newService = new mongoose.Schema({

    barberID:{
        type:String
    },
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:String
    },
    duration:{
        type:String
    }
    
 })

 module.exports = mongoose.model('services', newService)
  // first param its the collection name in mongoDB atals
