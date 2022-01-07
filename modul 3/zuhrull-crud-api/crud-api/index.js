const express = require("express");
const app = express();
app.use(express.json());

const express = require("express");
const app = express();
require("dotenv").config();
 
app.use(express.json());
 
const PORT = process.env.PORT || 5000;
 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/testing", require("./routes/testing.routes.js"));
 
app.use("/students", require("./routes/students.routes.js"));
 
app.listen(process.env.PORT, () => {
  console.log(`App is currently running at http://localhost:${PORT}`);
 
});

// create connection for Harper DB
const harperive = require("harperive");
const configuration = {
  username: process.env.HARPER_INSTANCE_USERNAME,
  password: process.env.HARPER_INSTANCE_PASSWORD,
  schema: process.env.HARPER_INSTANCE_SCHEMA,
  harperHost: process.env.HARPER_HOST_INSTANCE_URL,
};
const db = new harperive.Client(configuration);
module.exports = db;

const controller = require("../controllers/testing.controllers.js");
const router = require("express").Router();
router.get("/appinfo", controller.getAppInfo);
module.exports = router;

const router = require("express").Router();
const controller = require("../controllers/" + "students" + ".controllers");
router
  .get("/", controller.getAllStudent)
  .get("/:id", controller.getOneStudent)
  .post("/", controller.createOneStudent)
  .put("/:id", controller.updateOneStudent)
  .delete("/:id", controller.deleteOneStudent);
module.exports = router;

exports.getAppInfo = (req, res, next) => {
    return res.status(200).json({ "Zuhrull CRUD API Testing": "v1.0.0" });
  };
  
  const client = require("../util/db");
const DB_SCHEMA = process.env.HARPER_INSTANCE_SCHEMA;
const TABLE = "students";

//Get all the student
exports.getAllStudent = async (req, res, next) => {
  try {
    const qry = `SELECT * FROM ${DB_SCHEMA}.${TABLE}`;
    const students = await client.query(qry);
    res.json(students);
  } catch (error) {
    console.error("ERROR while fetching all student " + "Student:", error);
    return res.status(500).json(error)}};

