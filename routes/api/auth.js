const express = require("express")
const {validateBody, authenticate, upload} = require('../../middlewares')
const registerLoginSchema  = require('../../schemas/users')
const ctrl = require("../../controllers/auth")

const router = express.Router();

router.post('/register', validateBody(registerLoginSchema), ctrl.register )
router.post('/login', validateBody(registerLoginSchema), ctrl.login)
router.get('/current', authenticate, ctrl.getCurrent)
router.post('/logout', authenticate, ctrl.logout)
router.patch('/avatars', authenticate, upload.single("avatar"), ctrl.updateAvatar)

module.exports = router