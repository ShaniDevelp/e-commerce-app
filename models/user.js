const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name : {
        type : String,
        required : true,
        lowercase : true,
        trim : true 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate (value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        minLength : 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('password musn\'t contain password')
            }
        }
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
    
});



// Generate Auth Token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()},process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
};

// Login User
userSchema.statics.findByCredentials = async (email, password) => {
    console.log(email, password)
    const user = await User.findOne({ email })
    
    if (!user) {
        throw new Error('Unable to log in')
    }
        const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login')
    }
        return user
};

//Hash plain password before saving
userSchema.pre('save', async function(next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// {timestamps : true}


module.exports = mongoose.model('User', userSchema);