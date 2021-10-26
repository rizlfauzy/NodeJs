const getUserSync = id => {
  const nama = id === 1 ? "Rizal" : "Fauzi";
  return { id, nama };
}

console.log(getUserSync(1));

console.log(getUserSync(2));

const halo = "Hello World";
console.log(halo);