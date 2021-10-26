const nama = `Rizal Fauzi`;
const printNama = (nama) => `Hai nama saya ${nama}`;
const items = [
  { name: "foo", val: 7 },
  { name: "bar", val: 3 },
];

const itemSort = items.sort((a, b) => {
  console.log(a.val,b.val);
  return a.val - b.val
});

const valItems = items.map(valItem => valItem.val)

// mengexport module dari script.js
// karena script.js memakai sistem module
module.exports = { printNama, itemSort, valItems };
