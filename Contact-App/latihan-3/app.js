// const {writeQuestions, saveQuestions} = require(`./contacts`)

// async function startQuestions() {
//   const nama = await writeQuestions(`Masukkan Nama Anda :`);
//   const email = await writeQuestions(`Masukkan Email Anda :`);
//   const noHp = await writeQuestions(`Masukkan No Hp Anda :`)

//   saveQuestions(nama, email, noHp);
// };

// startQuestions()

const yargs = require('yargs');
const { saveQuestions } = require('./contacts');

yargs.command({
  command: `add`,
  describe: `Menambahkan Contact Baru`,
  builder: {
    nama: {
      describe: `Nama Lengkap`,
      demandOption: true,
      type: `string`
    },
    email: {
      describe: `Email`,
      demandOption: true,
      type: `string`
    },
    noHp: {
      describe: `No Handphone`,
      demandOption: false,
      type: `string`
    }
  },
  handler(argv) {
    saveQuestions(argv.nama, argv.email, argv.noHp)
  }
})

yargs.parse();
