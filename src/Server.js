import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
const port = 3001;
app.use(cors({ origin: "*" }));

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "saint_deposit",
});
connection.connect();

app.get("/depo", function (req, res, next) {
  connection.query("SELECT * FROM depo", function (error, results, fields) {
    res.send(results);
  });
});
app.post("/depo", function (req, res) {
  let saint = req.body.saint;
  let type = req.body.type;
  let content = req.body.content;
  let reference = req.body.reference;
  connection.query(
    "INSERT INTO depo(Saint,Type,Reference,Content) VALUES(?,?,?,?)",
    [saint, type, reference, content],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send("POSTED");
      }
    }
  );
});
app.delete("/delete", function (req, res, next) {
  let id = req.body.content;
  connection.query(
    "DELETE FROM depo WHERE Content = ?",
    [id],
    function (error, rows, fields) {
      if (!error) {
      } else {
        console.log("Error in deleting");
      }
    }
  );
});
app.post("/public", function (req, res) {
  let saint = req.body.Saint;
  let type = req.body.Type;
  let content = req.body.Content;
  let reference = req.body.Reference;
  connection.query(
    "INSERT INTO public(Saint,Type,Reference,Content) VALUES(?,?,?,?)",
    [saint, type, content, reference],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send("POSTED");
      }
    }
  );
});

app.get("/public", function (req, res, next) {
  connection.query("SELECT * FROM public", function (error, results, fields) {
    res.send(results);
  });
});