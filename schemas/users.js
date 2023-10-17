const Joi = require("joi")
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/


const registerLoginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
      "any.required": "missing required email field",
    }),
    password: Joi.string().min(6).required().messages({
      "any.required": "missing required password field",
    }),
  });

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
  })
})

module.exports = {registerLoginSchema, emailSchema}  
// module.exports = registerLoginSchema  