const mongoose = require('mongoose')




const Notification = new mongoose.Schema({
    type:{ 
        type: String, 
        enum: ['success', 'error', 'info'] 
    },
    message:{
        type:String
    },
    userID:{
        type:String,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    read:{
        type: Boolean,
        default: false
    }
  });



module.exports = mongoose.model('notifications', Notification)
