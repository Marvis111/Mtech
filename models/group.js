const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect("mongodb://localhost:27017/MTech",{useNewUrlParser:true});

const db = mongoose.connection;

db.once('open', ()=>{
    console.log("Successfully connected to Database");
})

 const groupSchema = mongoose.Schema({
    name:{
        type:String
    }
});

const group = mongoose.model('groups',groupSchema);


module.exports = group;