const mongoose = require('mongoose')

const Review = new mongoose.Schema({

    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    subject:{
        type:String
    },
    msg:{
        type:String
    },
    cDate:{
        type:Date,
        default: Date.now
    }
    
 })

 module.exports = mongoose.model('reviews', Review)
  // first param its the collection name in mongoDB atals
