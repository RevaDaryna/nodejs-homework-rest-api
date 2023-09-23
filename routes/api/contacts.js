const express = require('express')
const router = express.Router()


const {validateBody} = require("../../middlewares")
const {addSchema} = require('../../schemas/contacts')

const ctrl = require('../../controllers/contacts')

router.get('/', ctrl.listContacts)

router.get('/:contactId', ctrl.getContactById)

router.post('/', validateBody(addSchema), ctrl.addContact)
// router.post('/', ctrl.addContact)

router.delete('/:contactId', ctrl.removeContact)

router.put('/:contactId',  validateBody(addSchema), ctrl.updateContact)
// router.put('/:contactId', ctrl.updateContact)

module.exports = router
