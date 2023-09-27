const handlerMongooseError = require('../helpers/handlerMongooseError')
const {Schema, model} = require('mongoose')

const contactSchema = new Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }, {versionKey: false})

contactSchema.post("save", handlerMongooseError)  

const Contact = model("contact", contactSchema)

module.exports = Contact