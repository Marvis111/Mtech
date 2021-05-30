const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect("mongodb://localhost:27017/MTech",{useNewUrlParser:true});

const db = mongoose.connection;

db.once('open', ()=>{
    console.log("Successfully connected to Database");
})

userSchema = mongoose.Schema({
    username:{
        required:true,
        unique:true,
        type:String
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});

const user = mongoose.model('users',userSchema);


module.exports = user;