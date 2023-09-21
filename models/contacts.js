const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
    const contacts = await fs.readFile(contactsPath, "utf-8")
    const contactsParse = JSON.parse(contacts)
    return contactsParse
  }
  
async function getContactById(contactId) {
    const contacts = await listContacts()
    const result = contacts.find(contact => contact.id === contactId)
    return result || null
  }
  
async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === contactId) 
    if(index === -1){
        return null
    }
    const [result] = contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result
  }
  
async function addContact({name, email, phone}) {
    const contacts = await listContacts();
    const addedContact = {
        "id": nanoid(), name, email,  phone
    }
    contacts.push(addedContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return addedContact
  }

async function updateContact (contactId, body) {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id === contactId)
  if(index === -1){
    return null
  }
  contacts[index] = {id: contactId, ...body}
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[index]
}


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
