const User = require('../models/user')
const { ctrlWrapper, HttpError } = require('../helpers');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const {TOKEN_KEY} = process.env

const registerCont = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if (user){
        throw HttpError(409, "Email in use")
    }
    const hashPassword = bcrypt.hashSync(password, 10)
    const newUser = await User.create({...req.body, password: hashPassword})
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
    }})
}

const loginCont = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(401, "Email or password is wrong")
    }
    const passwordCompare = await bcrypt.compareSync(password, user.password)
    if(!passwordCompare){
        throw HttpError(401, "Email or password is wrong")
    }
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, TOKEN_KEY, {expiresIn: "23h"})
    await User.findByIdAndUpdate(user._id, { token });
    const subscription = user.subscription;

    res.json({
        token,
        user: { email, subscription },
    })
}

const getCurrentCont = async(req, res) => {
    const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
}

const logoutCont = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json()
}

module.exports = {
    register: ctrlWrapper(registerCont),
    login: ctrlWrapper(loginCont),
    getCurrent: ctrlWrapper(getCurrentCont),
    logout: ctrlWrapper(logoutCont)

}