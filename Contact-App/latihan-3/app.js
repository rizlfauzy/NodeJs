const yargs = require('yargs');
const { saveQuestions, listContact, detailContact, deleteContact } = require('./contacts');

yargs.command({
  command: `add`,
  describe: `Menambahkan Contact Baru`,
  //builder untuk menambahkan parameter
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
  //handler berisi hal yang akan dijalankan
  handler(argv) {
    saveQuestions(argv.nama, argv.email, argv.noHp)
  }
}).demandCommand();

// membuat perintah untuk menampilkan daftar
yargs.command({
  command: `list`,
  describe: `Menampilkan nama dan no handphone contact`,
  handler() {
    listContact()
  }
})

yargs.command({
  command: `detail`,
  describe: `Menampilkan sebuah detail dari contact berdasarkan nama`,
  builder: {
    nama: {
      describe: `Nama Lengkap`,
      demandOption: true,
      type: `string`
    }
  },
  handler(argv) {
    detailContact(argv.nama)
  }
})

yargs.command({
  command: `delete`,
  describe: `Menghapus sebuah contact berdasarkan nama`,
  builder: {
    nama: {
      describe: `Nama Lengkap`,
      demandOption: true,
      type: `string`
    }
  },
  handler(argv) {
    deleteContact(argv.nama)
  }
})

yargs.parse();
