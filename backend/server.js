const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const initRoutes = require("./app/routes/savethedate.routes");
// var corsOptions = {
//   origin: "http://172.104.182.77:8081"
// };
// app.use(cors(corsOptions));
app.use(cors())
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

initRoutes(app);

// simple route
app.get("/", cors(), (req, res) => {
  res.json({ message: "Welcome to Vic application." });
});
// flipbook
// app.use(express.static("public"));
// app.get("/flipbook", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
// require("./app/routes/ticket.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}.`);
});