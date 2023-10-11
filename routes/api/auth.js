const express = require("express")
const {validateBody, authenticate} = require('../../middlewares')
const registerLoginSchema  = require('../../schemas/users')
const ctrl = require("../../controllers/auth")

const router = express.Router();

router.post('/register', validateBody(registerLoginSchema), ctrl.register )
router.post('/login', validateBody(registerLoginSchema), ctrl.login)
router.get('/current', authenticate, ctrl.getCurrent)
router.post('/logout', authenticate, ctrl.logout)

module.exports = router