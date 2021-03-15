const script = require('./script');
// script menjadi objek
// yang didalamnya terdapat property dan method

const classExample =  new script.Manusia(`Rizal`, `XIII`)
console.log(script.printName(`Rizal Fauzi`), script.PI, script.siswa.printNameDua(),classExample.kelas);