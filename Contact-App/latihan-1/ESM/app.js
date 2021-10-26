import { writeQuestions,saveQuestions } from "./contacts.js";

const mainQuestions = async () => {
  const name = await writeQuestions("Siapa nama Anda : ");
  const email = await writeQuestions("Apa email Anda : ");
  const noHp = await writeQuestions("Berapa no hp Anda : ");

  saveQuestions(name, email, noHp);
}

mainQuestions();