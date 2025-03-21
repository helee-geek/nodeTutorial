// const { Client } = require("pg");
// const express = require("express");
// const app = express();

// app.use(express.json());

// const con = new Client({
//   host: "localhost",
//   user: "postgres",
//   port: "5432",
//   password: "geek8685",
//   database: "demopostgre",
// });

// con.connect().then(() => console.log("Connected"));

// app.post("/postdata", (req, res) => {
//   const { name, id } = req.body;

//   const q = "insert into demotable (name, id) values ($1, $2)";
//   con.query(q, [name, id], (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       console.log("POSTED DATA");
//     }
//   });
// });

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// })

const { Client } = require("pg");
const express = require("express");
const app = express();

app.use(express.json());

const con = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "geek8685",
  database: "demopostgre",
});

// Connect to PostgreSQL with error handling
con
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Database Connection Error", err));

app.post("/postdata", async (req, res) => {
  const { name, id } = req.body;

  if (!name || !id) {
    return res.status(400).json({ error: "Name and ID are required" });
  }

  const q = "INSERT INTO demotable (name, id) VALUES ($1, $2)";

  try {
    await con.query(q, [name, id]);
    console.log("POSTED DATA:", name, id);
    res.status(201).json({ message: "Data Inserted Successfully" });
  } catch (err) {
    console.error("Error inserting data:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

app.get("/fetchdata", async (req, res) => {
    const q = "SELECT * FROM demotable";
  
    try {
      const result = await con.query(q); // Store query result
      res.status(200).json({ message: "Data Fetched Successfully", data: result.rows });
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});


app.get("/fetchdata/:id", async (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM demotable WHERE id = $1";

    try {
        const result = await con.query(q, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No data found for the given ID" });
        }

        res.status(200).json({ message: "Data Fetched Successfully", data: result.rows[0] });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});


  

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
