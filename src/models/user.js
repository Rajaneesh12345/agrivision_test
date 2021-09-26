const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: [{
        type: String,
        required: true,
    }],
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String
    },
    provider:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    randString:{
        type:String
    },
    coursesEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],

    // provider:{
    //     type:String
    // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;