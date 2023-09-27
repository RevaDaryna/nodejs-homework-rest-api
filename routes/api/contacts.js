const express = require('express')
const router = express.Router()

const {validateBody, isValidId} = require("../../middlewares")
const {addSchema, updateFavoriteContSchema} = require('../../schemas/contacts')

const ctrl = require('../../controllers/contacts')

router.get('/', ctrl.listContacts)

router.get('/:contactId', isValidId, ctrl.getContactById)

router.post('/', validateBody(addSchema), ctrl.addContact)

router.delete('/:contactId', isValidId, ctrl.removeContact)

router.put('/:contactId', isValidId, validateBody(addSchema), ctrl.updateContact)

router.patch('/:contactId/favorite', isValidId, validateBody(updateFavoriteContSchema), ctrl.updateStatusContact)

module.exports = router
