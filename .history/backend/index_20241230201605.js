import express from "express";
import mysql2 from "mysql2/promise"; 
import cors from "cors";
import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "qwerty123",
  database: "marketplace",
});


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(8800, () => {
    console.log("Connected to backend");
});

// Routes
app.get("/", (req, res) => {
  res.json("This is the backend");
});

app.get("/registered_account", (req, res) => {
  const query = "SELECT * FROM registered_account";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/registered_account", async (req, res) => {
  const query =
    "INSERT INTO registered_account (`id`, `first_name`, `last_name`, `email`, `password`, `image`, `user_type`) VALUES (?)";
  
  const id = `FO-${Math.floor(1000 + Math.random() * 9000)}`;
  const values = [
    id,
    req.body.first_name || "",
    req.body.last_name || "",
    req.body.email,
    req.body.password,
    req.body.image || "",
    'FO',
  ];

  try {
    await db.query(query, [values]);
    res.json({ message: "Successfully registered", id });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Failed to register user." });
  }
});
c


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const [rows] = await db.query('SELECT * FROM registered_account WHERE email = ? AND password = ?', [email, password]);
      if (rows.length > 0) {
          res.json({ success: true, user: rows[0] }); // Return the first matched user
      } else {
          res.json({ success: false, message: "Invalid email or password." });
      }
  } catch (err) {
      console.error("Error logging in:", err);
      res.status(500).json({ success: false, message: "Server error." });
  }
});






app.use("/uploads", express.static("uploads"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

  const upload = multer({ storage });





  app.get('/users', async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM registered_account');
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users." });
    }
  });
  

  
  
  
  // Route to add food items
// Route to add food items
