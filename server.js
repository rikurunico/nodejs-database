const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
  host: "localhost",
  database: "db_node",
  user: "root",
  password: "",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");

  // get data
  app.get("/", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      console.log(users);
      res.render("index", { users: users, title: "Daftar User" });
    });
  });

  // Insert Data
  app.post("/tambah", (req, res) => {
    const insertsql = `INSERT INTO user (nama, kelas) VALUES ('${req.body.nama}', '${req.body.kelas}')`;
    db.query(insertsql, (err, result) => {
      if (err) throw err;
      res.redirect("/");
    });
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
