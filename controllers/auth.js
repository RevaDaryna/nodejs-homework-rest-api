const User = require('../models/user')
const { ctrlWrapper, HttpError } = require('../helpers');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")
const {TOKEN_KEY} = process.env
const gravatar = require("gravatar");
const path = require('path');
const fs = require('fs/promises');
const avatarDir = path.join(__dirname, "../", "public", "avatars")
const jimp = require("jimp");

const registerCont = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if (user){
        throw HttpError(409, "Email in use")
    }
    const hashPassword = bcrypt.hashSync(password, 10)
    const avatarURL = gravatar.url(email)
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL})
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

const updateAvatarCont = async(req, res) => {
    const {_id} = req.user
    const {path: tempUpload, originalname} = req.file
    const filename = `${_id}_${originalname}`
    const resultUpload = path.join(avatarDir, filename)

    const image = await jimp.read(tempUpload);
    await image.resize(250, 250);
    await image.writeAsync(tempUpload);
    
    await fs.rename(tempUpload, resultUpload)
    const avatarURL = path.join("avatars", filename)
    await User.findByIdAndUpdate(_id, {avatarURL})

    res.json({
        avatarURL
    })
}

module.exports = {
    register: ctrlWrapper(registerCont),
    login: ctrlWrapper(loginCont),
    getCurrent: ctrlWrapper(getCurrentCont),
    logout: ctrlWrapper(logoutCont),
    updateAvatar: ctrlWrapper(updateAvatarCont)

}