const { MongoClient,ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const dbName = 'wpu';

client.connect((err, client) => {
  if (err) {
    return console.log('Koneksi Gagal');
  }
  const db = client.db(dbName);
  const mhs = db.collection("mahasiswa");
  //cari sesuai id nya
  // mhs.find({ _id: ObjectId("616ab4e1e92f42b1d22a48ee") }).toArray((e, data) => {
  //   if (e) {
  //     return console.log("gagal menampilkan data");
  //   }
  //   console.log(data);
  // });
  //tambah 1 data
  // mhs.insertOne({
  //   nama: 'Erik',
  //   email:'erika211@gmail.com'
  // }, (e, result) => {
  //   if (e) {
  //     return console.log('Gagal nambah data');
  //   }
  //   console.log(result);
  // })
  //tambah banyak data
  // mhs.insertMany(
  //   [
  //     {
  //       nama: "Erik",
  //       email: "erika211@gmail.com",
  //     },
  //     {
  //       nama: "Jonson",
  //       email:'jonson211@gmail.com'
  //     },
  //   ],
  //   (e, result) => {
  //     if (e) {
  //       return console.log("Gagal nambah data");
  //     }
  //     console.log(result);
  //   }
  // );
  //ubah data
  const updateResult = mhs.updateOne({
    _id: ObjectId("616d150052d7b9218635c01a"),
  }, {
    $set: {
      nama:"Ajeng Gentri"
    }
  }, {
    upsert:true
  });
  updateResult.then(result => console.log(result)).catch(err => console.log(err));
  //menampilkan semua data
  mhs.find({}).toArray((e, data) => {
    if (e) {
      return console.log("gagal menampilkan data");
    }
    console.log(data);
  });
  
})