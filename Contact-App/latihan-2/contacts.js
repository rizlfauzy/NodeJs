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

function saveQuestions(nama, email, noHp) {
  const contact = { nama, email, noHp };
  const file = fs.readFileSync(`data/contacts.json`, `utf-8`);
  const contacts = JSON.parse(file);//diubah jadi json karena awalnyya bntuk string

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

module.exports = {saveQuestions}