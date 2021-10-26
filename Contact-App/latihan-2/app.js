const yargs = require('yargs');
const { saveQuestions} = require('./contacts');

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
}).demandCommand();//untuk menandakan harus ada perintahnya saat di jalankan node app


yargs.parse();
