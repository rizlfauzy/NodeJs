const fs = require('fs');
const validator = require('validator');

// mengecek apakah file direktorinya ada atau tidak
const dirPath = `./data`;
if (!fs.existsSync(dirPath)){
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
  const contacts = JSON.parse(file);//diubah jadi json karena awalnyya bntuk string
  return contacts;
}

function saveQuestions(nama, email, noHp) {
  const contact = { nama, email, noHp };
  const contacts = loadContact();

  //cek duplikat
  const duplicate = contacts.find(contact => contact.nama === nama);
  if (duplicate) {
    console.log(`Maaf nama yang dimaksud sudah ada`);
    return false
  }
  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(`Maaf email yang dimaksud tidak benar`);
      return false;
    }
  }
  //cek no hp
  if (!validator.isMobilePhone(noHp, `id-ID`)) {
    console.log(`Maaf no handphone anda tidak valid`);
    return false;
  }
  

  contacts.push(contact)
  fs.writeFileSync(`data/contacts.json`, JSON.stringify(contacts));//untuk write harus dari string
  console.log(`Terima Kasih sudah memasukkan data`);
}

function listContact() {
  const contacts = loadContact();
  console.log(`Daftar Kontak : `);
  contacts.forEach((contact, i) => {
    console.log(`${i+1}. ${contact.nama} - ${contact.noHp}`);
  });
}

function detailContact(nama) {
  const contacts = loadContact();
  const regex = new RegExp(nama, `i`);

  const contact = contacts.find(contact => contact.nama.toLowerCase() === nama.toLowerCase())

  if (!contact) {
    console.log(`${nama} tidak ditemukan`);
    return false;
  }

  console.log(contact.nama);
  console.log(contact.noHp);
  if (contact.email) {
    console.log(contact.email);
  }
}

function deleteContact(nama) {
  const contacts = loadContact();
  //menghasilkan array baru yang berisi data kecuali nama yang diketik
  const newContacts = contacts.filter(contact => contact.nama.toLowerCase() !== nama.toLowerCase());
  //jika nama tidak ada maka kasih perintah berikut
  if (contacts.length === newContacts.length) {
    console.log(`data contact dengan nama ${nama} tidak ditemukan`);
    return false
  }

  fs.writeFileSync(`data/contacts.json`, JSON.stringify(newContacts));
  console.log(`Contact dengan nama ${nama} sudah dihapus`);
}

module.exports = {saveQuestions, listContact, detailContact, deleteContact}