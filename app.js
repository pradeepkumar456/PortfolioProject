const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const { log } = require("console");
const { long } = require("webidl-conversions");
const { type } = require("os");
const path = require("path");
const mehtodOverride = require("method-override");
const Person = require("./models/person.js");
const ejsMate = require("ejs-mate");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const Review = require("./models/review.js");
const axios = require("axios");


const Mongo_URL = "mongodb+srv://Pradeepkumar:y5YymhGkTf35PMmu@cluster0.lq5lqe6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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

const sessionOptions = {
  secret : "mysupersecret",
  resave : false ,
  saveUninitialized : true,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpsOnly : true
  },
};

app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static(path.join(__dirname,"public")));
app.set("views", path.join(__dirname, "views"));
app.set("view-engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mehtodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(session(sessionOptions));
app.use(flash());  // for flash messages 



app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});



// For review 
app.get("/review",async(req,res)=>{
 let allReview =  await Review.find({});
 res.render("routes/review.ejs",{allReview});
});

// Post Review
app.post("/review",async(req,res)=>{
  const { name, email, phoneNo, message } = req.body;
  let newReview = new Review({
    name: name,
    email: email,
    phoneNo : phoneNo,
    message: message,
});
await newReview.save();
console.log(newReview);
req.flash("success","Review sent successfully");
if(!newReview){
req.flash("error","Review is not sent ");
res.redirect("/");
}
res.redirect("/");
});

app.get("/contact", (req, res) => {
  res.render("contact/contact.ejs");
});
   
   

// app.post("/send-message", async (req, res) => {
//   const { name, email, message } = req.body;

//   try {
//       // Save to MongoDB
//       const newContact = new Contact({ name, email, message });
//       await newContact.save();

//       // WhatsApp API URL (Replace with your API)
//       const phone = "917452861837";  // Example: "91XXXXXXXXXX"
//       const text = `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
//       const whatsappApiUrl = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodeURIComponent(text)}&apikey=YOUR_API_KEY`;

//       // Send message to WhatsApp
//       await axios.get(whatsappApiUrl);

//       res.send("Message sent to WhatsApp!");
//   } catch (error) {
//       console.error(error);
//       res.status(500).send("Failed to send message.");
//   }
// });

// For abotut
app.get("/about",(req,res)=>{
  res.render("routes/about.ejs");
});


// My Projects Route
app.get("/project",(req,res)=>{
  res.render("routes/project.ejs");
});

// Get Resume Route
app.get("/getresume", (req, res) => {
  res.render("routes/resume.ejs");
});

// Get Hire me Details 
app.get("/hireme",(req,res)=>{
  res.render("routes/hireme.ejs");
});

// Show msg route 
// app.get("/message",async(req,res)=>{
//   let allperson =  await Person.find({});
//    res.render("routes/message.ejs",{allperson});
// });

// Contact me Route 
app.post("/message", async (req, res) =>{
  try {
    const { name, email, message } = req.body;
    let newPerson = new Person({
      name: name,
      email: email,
      message: message,
      created_at: Date.now(),
    });

    await newPerson.save();
    req.flash("success","Message sent successfully");
     res.redirect("/"); // Redirect to a valid route
  } catch (err) {
    console.error("Error saving message:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Home Route
app.get("/",(req, res) => {
  res.render("routes/home.ejs");
});

app.listen("8080", () => {
  console.log("Server is listening at the port 8080.");
});
