const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { Timestamp } = require('mongodb');

mongoose.connect("mongodb://localhost:27017/MTech",{useNewUrlParser:true});

const db = mongoose.connection;

db.once('open', ()=>{
    console.log("Successfully connected to Database");
})

const roomSchema = mongoose.Schema({
    groupId:{
        type:String
    },
    userId:{
        type:String
    },
    username:{
        type:String
    },
    user_message:{
        type:String
    },
    msg_time:{
        type:String
    }
})
const room = mongoose.model('room',roomSchema);

module.exports = room;