import * as fs from "fs";
import * as readline from "readline";
import validator from "validator";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirPath = "./data";
fs.exists(dirPath, (ada) => {
  if (!ada) fs.mkdirSync(dirPath);
});

const dataPath = "./data/contacts.json";
fs.exists(dataPath, (ada) => {
  if (!ada) fs.writeFileSync(dataPath,'[]','utf-8');
});

const loadContact = () => {
  const file = fs.readFileSync(dataPath, "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

export const writeQuestions = (questions) => new Promise((resolve, reject) => rl.question(questions, (answer) => resolve(answer)));

export const saveQuestions = (nama, email, noHp) => {
  const contact = { nama, email, noHp };
  const contacts = loadContact();
  const dupName = contacts.find((contact) => contact.name === nama);
  const dupEmail = contacts.find((contact) => contact.email === email);
  const dupNoHp = contacts.find((contact) => contact.noHp === noHp);
  if (dupName) {
    console.log("Maaf nama yang dimaksud sudah ada");
    rl.close();
    return false;
  } else if (!email.length < 1) {
    if (!validator.isEmail(email)) {
      console.log(`Maaf email yang dimaksud tidak benar`);
      rl.close();
      return false;
    }
  } else if (!noHp.length < 1) {
    if (!validator.isMobilePhone(noHp, "id-ID")) {
      console.log(`Maaf no handphone anda tidak valid`);
      rl.close();
      return false;
    }
  } else if (dupEmail) {
    console.log(`Maaf Email ${email} sudah ada`);
    rl.close();
    return false;
  } else if (dupNoHp) {
    console.log(`Maaf no Hp ${noHp} sudah ada`);
    rl.close();
    return false;
  }

  contacts.push(contact);
  try {
    fs.writeFileSync(dataPath, JSON.stringify(contacts));
    console.log('Terima kasih sudah memasukkan data');
  } catch (e) {
    console.log(e);
  }
  rl.close();
};
