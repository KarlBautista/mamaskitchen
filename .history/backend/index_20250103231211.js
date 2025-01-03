import express from "express";
import mysql2 from "mysql2/promise"; 
import cors from "cors";
import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';
import moment from "moment"; // Add this line to import moment.js
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
  const query = `
    INSERT INTO registered_account 
    (id, first_name, last_name, email, password, phone_number, birthdate, gender, profile_picture, e_money, user_type) 
    VALUES (?)`;

  const id = `FO-${Math.floor(1000 + Math.random() * 9000)}`; // Generate a random ID
  const values = [
    id,
    req.body.first_name || "",
    req.body.last_name || "",
    req.body.email || "",
    req.body.password || "",
    req.body.phone_number || "",
    req.body.birthdate || null, // Ensure null is used for empty birthdate
    req.body.gender || "other",
    req.body.profile_picture || "",
    req.body.e_money || 0.0,
    "user", // Default user type is now "user"
  ];

  try {
    await db.query(query, [values]);
    res.json({ message: "Successfully registered", id });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Failed to register user." });
  }
});




app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM registered_account WHERE email = ? AND password = ?', [email, password]);
    if (rows.length > 0) {
      res.json({ success: true, user: rows[0] }); // Includes `user_type`
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


  app.post("/update_user", upload.single("profile_picture"), async (req, res) => {
    const { id, first_name, last_name, email, phone_number, birthdate, gender } = req.body;
    const profile_picture = req.file ? `/uploads/${req.file.filename}` : null;

    // Format birthdate to 'YYYY-MM-DD'
    const formattedBirthdate = birthdate ? moment(birthdate).format("YYYY-MM-DD") : null;

    const query = `
        UPDATE registered_account 
        SET first_name = ?, last_name = ?, email = ?, phone_number = ?, birthdate = ?, gender = ?, 
            profile_picture = COALESCE(?, profile_picture)
        WHERE id = ?
    `;
    const values = [
        first_name, 
        last_name, 
        email, 
        phone_number, 
        formattedBirthdate, 
        gender, 
        profile_picture, 
        id
    ];

    try {
        await db.query(query, values);
        const [updatedUser] = await db.query("SELECT * FROM registered_account WHERE id = ?", [id]);
        res.json({ success: true, user: updatedUser[0] });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ success: false, message: "Failed to update user." });
    }
});

  

  
  
  
  // Route to add food items
// Route to add food items





// Add item to cart
app.post('/add_to_cart', async (req, res) => {
  const { user_id, food_name, price, image_url } = req.body;

  if (!user_id) {
    return res.status(400).json({ success: false, message: 'User ID is required.' });
  }

  const query = `
    INSERT INTO cart (user_id, food_name, price, image_url, quantity)
    VALUES (?, ?, ?, ?, 1)
    ON DUPLICATE KEY UPDATE quantity = quantity + 1;
  `;

  try {
    await db.query(query, [user_id, food_name, price, image_url]);
    res.json({ success: true, message: 'Item added to cart.' });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ success: false, message: 'Failed to add item to cart.' });
  }
});


app.get('/cart/:user_id', async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ success: false, message: 'User ID is required.' });
  }

  const query = 'SELECT * FROM cart WHERE user_id = ?';

  try {
    const [items] = await db.query(query, [user_id]);
    res.json({ success: true, items });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch cart.' });
  }
});



app.delete('/cart/:user_id/item/:item_id', async (req, res) => {
  const { user_id, item_id } = req.params;

  if (!user_id || !item_id) {
      return res.status(400).json({ success: false, message: 'User ID and Item ID are required.' });
  }

  const query = 'DELETE FROM cart WHERE user_id = ? AND id = ?';

  try {
      const [result] = await db.query(query, [user_id, item_id]);
      if (result.affectedRows > 0) {
          res.json({ success: true, message: 'Item removed from cart.' });
      } else {
          res.status(404).json({ success: false, message: 'Item not found in cart.' });
      }
  } catch (err) {
      console.error('Error removing item from cart:', err);
      res.status(500).json({ success: false, message: 'Failed to remove item from cart.' });
  }
});



// Route to get all food items
app.get('/foods', async (req, res) => {
  try {
    const [foods] = await db.query('SELECT * FROM foods');
    res.status(200).json(foods);
  } catch (err) {
    console.error('Error fetching foods:', err);
    res.status(500).json({ error: 'Failed to fetch food items.' });
  }
});
