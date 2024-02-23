const User = require('../models/user');
const asynchandler = require("express-async-handler")
const bcrypt = require('bcryptjs');



exports.create_User = asynchandler( async(req, res, next) => {

    const user = new User(req.body)
    console.log(user)
   
    try {
      
        await user.save()
        const token = await user.generateAuthToken();
        res.status(201).send({user, token})
         
    } catch (error) {
        res.status(400).send(error)
    }
});

exports.login_User = asynchandler(async(req, res, next) => {
    console.log(req.body)
    try {
        const user = await  findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});

    } catch (error) {
        res.status(400).send(error)
    }
});

const findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    // console.log(email, password)
    if (!user) {
        throw new Error('Unable to log in')
    }
        const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to login')
    }
        return user
};

exports.logout_user = asynchandler(async(req, res, next)=> {
    try {
        req.user.tokens =  req.user.tokens.filter((token) => {
       return token.token !== req.token
      })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
});

exports.logout_All = asynchandler(async(req, res, next)=> {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {  
        res.status(500).send()
    }
})


