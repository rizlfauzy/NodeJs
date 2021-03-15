const nama = 'Rizal Fauzi';
const umur = 18;
const email = `rizalfauzi774@gmail.com`


function highlight(strings, ...values) {
  // untuk mengambil semua argumen menggunakan
  // ...values
  // let result = ``;
  // strings.forEach((string,i) => {
    //   result += `${string}${values[i] || ``}`
    //   // `${string}${values[i] || ``}`
    //   // sama saja dengan fungsi ternary
    //   // `${string}${values[i] ? values[i] : `}`
    // });
  // return result

  // Cara Panjang
  console.log(strings);
  return strings.reduce((result, string, i) =>
    `${result}${string}<span class="hl">${values[i] || ``}</span>`, ``)
}


const str = highlight`Halo nama saya ${nama}, saya ${umur} tahun, email saya adalah ${email}`;



