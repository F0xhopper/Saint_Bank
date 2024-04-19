import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
const port = 3001;

// Enable CORS
app.use(cors({ origin: "*" }));

// Parse JSON bodies
app.use(express.json());

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "Soul Nourishment",
});

connection.connect();

/**
 * Retrieves all entries from the "depo" table.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.get("/depo", function (req, res, next) {
  connection.query("SELECT * FROM depo", function (error, results, fields) {
    res.send(results);
  });
});

/**
 * Inserts a new entry into the "depo" table.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/depo", function (req, res) {
  const { saint, type, content, reference } = req.body;
  connection.query(
    "INSERT INTO depo(Saint, Type, Reference, Content) VALUES (?, ?, ?, ?)",
    [saint, type, reference, content],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      } else {
        res.send("POSTED");
      }
    }
  );
});

/**
 * Deletes an entry from the "depo" table.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.delete("/delete", function (req, res, next) {
  let id = req.body.content;
  connection.query(
    "DELETE FROM depo WHERE Content = ?",
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      } else {
        res.send("DELETED");
      }
    }
  );
});

/**
 * Inserts a new entry into the "public" table.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
app.post("/public", function (req, res) {
  const { saint, type, content, reference } = req.body;
  connection.query(
    "INSERT INTO public(Saint, Type, Reference, Content) VALUES (?, ?, ?, ?)",
    [saint, type, reference, content],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
      } else {
        res.send("POSTED");
      }
    }
  );
});

/**
 * Retrieves all entries from the "public" table.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
app.get("/public", function (req, res, next) {
  connection.query("SELECT * FROM public", function (error, results, fields) {
    res.send(results);
  });
});
