const Contact = require('../models/contact')

const { ctrlWrapper, HttpError } = require('../helpers');

const listContactsCont = async (req, res) => {
      const result = await Contact.find();
      res.json(result)
  }

const getContactByIdCont = async (req, res) => {
      const {contactId} = req.params;
      const result = await Contact.findById(contactId)
      if(!result){
        throw HttpError(404, "Not found")}
      res.json(result)
  }

const addContactCont = async (req, res) => {
      const result = await Contact.create(req.body)
      console.log(req.body)
      res.status(201).json(result) 
  }  

const removeContactCont = async (req, res) => {
     const {contactId} = req.params
     const result = await Contact.findByIdAndRemove(contactId)
     if(!result){
       throw HttpError(404, "Not found")
     }
     res.json({
       message: "contact deleted"
     })
   }  

const updateContactCont = async (req, res) => {
      const {contactId} = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
      if(!result){
        throw HttpError(400, "Not found")
      }
      res.json(result)
  }  

const updateFavoriteCont = async (req, res) => {
      const {contactId} = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
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
    updateStatusContact: ctrlWrapper(updateFavoriteCont)
}  