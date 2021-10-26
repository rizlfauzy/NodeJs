const fs = require("fs");

// mengecek apakah file direktorinya ada atau tidak
const dirPath = `./data`;
if (!fs.existsSync(dirPath)) {
  //fs.existsSync mengecek apakah dirPathnya sudah ada atau tidak) ;
  fs.mkdirSync(dirPath);
}

// mengecek apakah nama file nya ada atau tidak
const dataPath = `./data/contacts.json`;
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, `[]`, `utf-8`);
}

function loadContact() {
  const file = fs.readFileSync(`data/contacts.json`, `utf-8`);
  const contacts = JSON.parse(file); //diubah jadi json karena awalnyya bntuk string
  return contacts;
}

function findContact(nama) {
  const contacts = loadContact()
  const contact = contacts.find((contact) => nama.toLowerCase() === contact.nama.toLowerCase());
  return contact;
}

function saveContact(contacts) {
  fs.writeFile('./data/contacts.json', JSON.stringify(contacts), err => {
    if (err) throw err;
    console.log('The file has been save');
  })
}

function addContact(data) {
  const contacts = loadContact();
  contacts.push(data);
  saveContact(contacts);
}

function checkDuplicate(nama) {
  const contacts = loadContact();
  const duplicate = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
  return duplicate
}

module.exports = {
  loadContact,findContact,addContact,checkDuplicate
}
