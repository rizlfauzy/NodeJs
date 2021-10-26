// file system secara ESM
import * as fs from "fs";
// readline secara ESM
import * as readline from "readline";

// write file secara syncronous
// try {
//   fs.writeFileSync('text.txt', 'Hello World Secara Syncronous');
// } catch (e) {
//   console.log(e);
// }

// writefile secara async
// fs.writeFile('text.txt', 'Hello World Secara async', e => console.log(e));

//readfile secara sync
// const data = fs.readFileSync('./text.txt','utf-8');
// console.log(data);

//readfile secara async
// fs.readFile('./text.txt', 'utf-8', (e, isi) => {
//   if (e) throw e;
//   console.log(isi);
// })

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//menginput di readline satu pertanyaan
// rl.question('Siapa nama Anda : ', nama => {
//   console.log(`Terima kasih ${nama}`);
//   rl.close();
// })

//menulis di readline multiple pertnyaan
const writeQuestions = (questions) => {
  return new Promise((resolve, rejects) => rl.question(questions, (answer) => resolve(answer)));
};

const saveQuestion = (...answer) => {
  const [nama,email] = answer
  const contact = { nama, email:`${email}@gmail.com` };
  const file = fs.readFileSync(dataPath, 'utf-8');
  const contacts = JSON.parse(file);
  contacts.push(contact);
  console.log(contact);
  fs.writeFileSync(dataPath, JSON.stringify(contacts), 'utf-8');

  rl.close()
}

const startQuestion = async () => {
  const nama = await writeQuestions("Siapa nama Anda : ");
  const email = await writeQuestions("Email Anda : ");

  saveQuestion(nama,email)
}

const path = './data';
fs.exists(path, isi => {
  if (!isi) {
    fs.mkdir(path,e=>console.log(e));
  }
})

const dataPath = "./data/contacts.json";
fs.exists(dataPath, isiData => {
  if (!isiData) {
    fs.writeFile(dataPath, '[]',"utf-8", e => console.log(e));
  }
})

startQuestion()
