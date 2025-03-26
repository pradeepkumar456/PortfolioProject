const mongoose = require("mongoose");
const Person = require("../models/person.js");
// const initData = require("./data.js");
const Review = require("../models/review.js");
const initDb = require("./reviewData.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/portfolio";
main()
  .then(() => {
    console.log("Db connected successfully.");
  })
  .catch((err) => {
    console.log(err);
  });


async function main() {
  await mongoose.connect(Mongo_URL);
};

const initDB = async() =>{
//     await Person.deleteMany({});
  await Review.insertMany(initDb.data);
  // await Person.insertMany(initData.data);
 console.log("Data initailize successfully"); 
};

initDB();