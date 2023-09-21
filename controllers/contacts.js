const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts")

const { ctrlWrapper, HttpError } = require('../helpers');

const listContactsCont = async (req, res) => {
      const result = await listContacts();
      res.json(result)
  }

const getContactByIdCont = async (req, res) => {
      const {contactId} = req.params;
      const result = await getContactById(contactId)
      if(!result){
        throw HttpError(404, "Not found")}
      res.json(result)
  }

const addContactCont = async (req, res) => {
      const result = await addContact(req.body)
      res.status(201).json(result) 
  }  

const removeContactCont = async (req, res) => {
     const {contactId} = req.params
     const result = await removeContact(contactId)
     if(!result){
       throw HttpError(404, "Not found")
     }
     res.json({
       message: "contact deleted"
     })
   }  

const updateContactCont = async (req, res) => {
      const {contactId} = req.params;
      const result = await  updateContact(contactId, req.body)
      if(!result){
        throw HttpError(400, "Not found")
      }
      res.json(result)
  }   

module.exports = {
    listContacts: ctrlWrapper(listContactsCont),
    getContactById: ctrlWrapper(getContactByIdCont),
    addContact: ctrlWrapper(addContactCont),
    removeContact: ctrlWrapper(removeContactCont),
    updateContact: ctrlWrapper(updateContactCont),
}  