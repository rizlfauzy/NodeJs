const { MongoClient, ObjectId } = require("mongodb");
// const ObjectId = require("mongodb").ObjectId;

const uri = `mongodb://localhost:27017`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const dbName = "wpu";
const main = async () => {
  await client.connect();
  const db = client.db(dbName);
  const mhs = db.collection("mahasiswa");
  // insert satu
  // const insertResult = await mhs.insertOne({
  //   nama: "Erik",
  //   email: "erik211@gmail.com",
  // });
  // insert banyak
  // const insertManyResult = await mhs.insertMany([
  //   {
  //     nama: "Erik",
  //     email: "erik211@gmail.com",
  //   },
  //   {
  //     nama: "Avip",
  //     email:"avipp@gmail.com"
  //   }
  // ],{ordered:true});
  // update satu data atau banyak data
  // const updateResult = await mhs.updateMany(
  //   {
  //     _id: ObjectId("616ab4e1e92f42b1d22a48ed")
  //   },
  //   {
  //     $set: {
  //       nama: "Erika Sugeng",
  //     },
  //   },
  //   {
  //     upsert: true,
  //   }
  // );
  //  update data dengan regex
  // const updateResultRegex = await mhs.updateMany(
  //   {
  //     nama: { $regex: "Can" },
  //   },
  //   {
  //     $set: {
  //       nama: "Erika Sugeng",
  //     },
  //   },
  //   {
  //     upsert: true,
  //   }
  // );
  // replace satu data sesuai spesifik
  // const replaceResult = await mhs.replaceOne({
  //   nama: { $regex: "Er" }
  // }, {
  //   nama: "Cantik",
  //   email:"cantika122@gmail.com"
  // });
  // delete data satu atau banyak dengan regex
  // const deleteResult = await mhs.deleteMany({
  //   nama: { $regex: 'Er' }
  // });
  // if (deleteResult.deletedCount > 0) {
  //   console.log("Successfully deleted one document.");
  // } else {
  //   console.log("No documents matched the query. Deleted 0 documents.");
  // }
  //cari data sesuai spesifik
  // const findSpesificData = await mhs.find({
  //   _id: ObjectId("616d150052d7b9218635c01a")
  // }).toArray();
  // cara data dengan regex
  // const findResult = await mhs.find({ nama: { $regex: "Er" } }).toArray();
  //cari semua data
  const findResult = await mhs.find({}).toArray();

  console.log("Connected successfully to server");
  console.log("Found documents =>", findResult);
  // console.log("Inserted documents =>", insertManyResult);
  // console.log("Updated documents =>", updateResult);
  // console.log(`Modified ${replaceResult.modifiedCount} document(s)`);
};

main().finally(()=>client.close())
