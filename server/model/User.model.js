const mongoose =require('mongoose')
const UserSchema=new mongoose.Schema({
    'username':{
            type:String,
            require:[true,'please provide a unique username'],
            unique:[true],

    },
    'password':{
        type:String,
        require:[true,'please provide a password'],
            unique:[true],
    },
    'email':{
        type:String,
        require:[true,'please provide a email'],
            unique:[true],
    },
    'fisrtName':{
        type:String,
    },
    'lastName':{
        type:String,
    },
    'mobile':{type:String},
    'address':{type:String},
    'profile':{type:String},




})

module.exports=mongoose.model.Users ||mongoose.model('Users',UserSchema);