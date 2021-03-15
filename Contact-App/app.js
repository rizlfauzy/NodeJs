const {writeQuestions, saveQuestions} = require(`./contacts`)

async function startQuestions() {
  const nama = await writeQuestions(`Masukkan Nama Anda :`);
  const email = await writeQuestions(`Masukkan Email Anda :`);
  const noHp = await writeQuestions(`Masukkan No Hp Anda :`)

  saveQuestions(nama, email, noHp);
};

startQuestions()


