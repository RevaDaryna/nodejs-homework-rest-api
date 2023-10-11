const express = require('express')
const router = express.Router()

const {validateBody, isValidId, authenticate} = require("../../middlewares")
const {addSchema, updateFavoriteContSchema} = require('../../schemas/contacts')

const ctrl = require('../../controllers/contacts')

router.get('/', authenticate, ctrl.listContacts)

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById)

router.post('/', authenticate, validateBody(addSchema), ctrl.addContact)

router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact)

router.put('/:contactId', authenticate, isValidId, validateBody(addSchema), ctrl.updateContact)

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(updateFavoriteContSchema), ctrl.updateStatusContact)

module.exports = router
