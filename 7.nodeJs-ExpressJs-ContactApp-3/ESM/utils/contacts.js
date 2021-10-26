import exp from "constants";
import * as fs from "fs";

const dirPath = './data';
fs.exists(dirPath, data => { if (!data) fs.mkdirSync(dirPath) });

const dataPath = './data/contacts.json';
fs.exists(dataPath, (data) => {
  if (!data) fs.writeFileSync(dataPath,'[]','utf-8');
});

export const loadContact = () => {
  // return fs.readFile(dataPath, 'utf-8', (e, data) => JSON.parse(data))
  const file = fs.readFileSync(`data/contacts.json`, `utf-8`);
  const contacts = JSON.parse(file); //diubah jadi json karena awalnyya bntuk string
  return contacts;
};

export const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find((cont) => cont.nama == nama);
  return contact;
}

export const checkDuplicate = (nama) => {
  const contacts = loadContact();
  return contacts.find((cont) => cont.nama === nama);
}

const saveContact = (contacts) => {
  fs.writeFileSync(dataPath, JSON.stringify(contacts));
}

export const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContact(contacts);
}

export const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((cont) => cont.nama.toLowerCase() !== nama.toLowerCase());
  saveContact(newContacts);
}

export const updateContact = (contact) => {
  const contacts = loadContact();
  const newContacts = contacts.filter((cont) => cont.nama.toLowerCase() !== contact.oldNama.toLowerCase());
  delete contact.oldNama;
  newContacts.push(contact);
  saveContact(newContacts);
}


