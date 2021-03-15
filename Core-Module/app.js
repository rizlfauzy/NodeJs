const fs = require('fs');

// Menuliskan string ke file secara syncronous
fs.writeFileSync(`test.txt`, `hello world secara syncronous!`);

// secara asyn
fs.writeFile(`test.txt`, `Hello world secara async`, err => {
  console.log(err);
})

// membaca isi file secara sync
const data = fs.readFileSync(`../Module-System/index.js`, `utf-8`);//optional encoding utf-8 untuk lngsng jadi string
// ubah dulu menjadi string


//membaca isi file secara async
fs.readFile(`../Module-System/script.js`, `utf-8`, (err, data) => {
  if (err) throw err;
});

const readline = require('readline');
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

rl.question(`Masukkan nama anda : `, nama => {
  rl.question(`Masukkan no hp :`, noHp => {
    //memasukkan ke file json
    const contact = { nama, noHp };
    const file = fs.readFileSync(`data/contacts.json`, `utf-8`);
    const contacts = JSON.parse(file);//diubah jadi json karena awalnyya bntuk string
    contacts.push(contact)
    fs.writeFileSync(`data/contacts.json`, JSON.stringify(contacts));//untuk write harus dari string

    rl.close()
  })
});

