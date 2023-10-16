const handlerMongooseError = require('../helpers/handlerMongooseError')
const {Schema, model} = require('mongoose')

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema(
    {
        password: {
          type: String,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          match: emailRegexp,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        avatarURL: String,
        token: String
      }, {versionKey: false})

userSchema.post("save", handlerMongooseError)     

const User = model("user", userSchema)

module.exports = User