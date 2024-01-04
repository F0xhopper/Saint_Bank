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
  connection.query(
    "INSERT INTO depo(Saint,Type,Content) VALUES(?,?,?)",
    [saint, type, content],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send("POSTED");
      }
    }
  );
});
