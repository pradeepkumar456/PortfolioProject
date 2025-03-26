const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
      type : String,
      required : true
    },
    message : {
      type : String,
      required : true
    },
    created_at :  { type: Date,
    default: Date.now },
});

const Person = mongoose.model("Person",personSchema,"persons");

module.exports = Person;