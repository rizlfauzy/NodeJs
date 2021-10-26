const getUser = (id, callback) => {
  const time = id === 1 ? 3000 : 2000;
  setTimeout(() => {
    const name = id === 1 ? "Rizal" : "Fauzi";
    callback({ id, name });
  }, time);
};

getUser(1, hasil => console.log(hasil));

getUser(2, hasil => console.log(hasil));

console.log("Hello World");