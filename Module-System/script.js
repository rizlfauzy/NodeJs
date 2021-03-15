const nama = `Rizal Fauzi`

function printName(nama) {
  return `Hai nama saya saya ${nama}`;
}

const PI = Math.PI;

const siswa = {
  nama: `Rizal Fauzi`,
  umur: 18,
  printNameDua() {
    return `Halo semua gua ${this.nama} dan gua berumur ${this.umur}`
  }
};

class Manusia {
  constructor(nama, kelas) {
    this.nama = nama;
    this.kelas = kelas;
  }
}

// module.exports.printName = printName;
// module.exports.PI = PI;
// module.exports.siswa = siswa;
// module.exports.Manusia = Manusia;

// export juga bisa dengan cara seperti ini
module.exports = {
  printName,
  PI,
  siswa,
  Manusia
}