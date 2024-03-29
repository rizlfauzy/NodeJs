const fs = require('fs');
const readline = require('readline');
const validator = require('validator');

const rl = readline.createInterface({
  input: process.stdin,//apa yang dilakukan di cmd
  output: process.stdout, //apa yang kita kirim
});

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
  const contacts = JSON.parse(file); //diubah jadi json karena awalnyya bntuk string
  return contacts;
}

//rl.question() isi pertanyaanya bisa kita ubah sndiri
function writeQuestions(questions) {
  return new Promise((resolve, reject) => {
    rl.question(questions, question => {
      resolve(question)
    })
  })
}

function saveQuestions(nama, email, noHp) {
  const contact = { nama, email, noHp };
  const contacts = loadContact();
  //cek duplikat
  const duplicateName = contacts.find(contact => contact.nama === nama);
  const duplicateEmail = contacts.find(contact => contact.email === email);
  if (duplicateName) {
    console.log(`Maaf nama yang dimaksud sudah ada`);
    rl.close();
    return false
  }
  // cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(`Maaf email yang dimaksud tidak benar`);
      rl.close();
      return false;
    }
  }
  if (duplicateEmail) {
    console.log(`Maaf Email ${email} sudah ada`);
    rl.close();
    return false;
  }
  //cek no hp
  if (!validator.isMobilePhone(noHp, `id-ID`)) {
    console.log(`Maaf no handphone anda tidak valid`);
    rl.close();
    return false;
  }


  contacts.push(contact)
  fs.writeFileSync(`data/contacts.json`, JSON.stringify(contacts));//untuk write harus dari string
  console.log(`Terima Kasih sudah memasukkan data`);

  rl.close();
}

module.exports = {writeQuestions,saveQuestions}