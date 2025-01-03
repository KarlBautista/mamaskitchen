  import express from "express";
  import mysql2 from "mysql2";
  import cors from "cors";
  import multer from "multer";
  import { fileURLToPath } from 'url';
  import path from 'path';

  const app = express();
  const db = mysql2.createConnection({
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

  app.post("/registered_account", (req, res) => {
    const query =
      "INSERT INTO registered_account (`id`, `first_name`, `last_name`, `email`, `password`, `image`, `user_type`) VALUES (?)";
    
    // Generate unique ID
    const id = `FO-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const values = [
      id,
      req.body.first_name || "",
      req.body.last_name || "",
      req.body.email,
      req.body.password,
      req.body.image || "",
      'FO', // Fixed user type for customers
    ];
  
    db.query(query, [values], (err) => {
      if (err) return res.json(err);
      res.json({ message: "Successfully registered", id });
    });
  });
  
dadadadadadadadadwdadhafhasodhajdhalsdjhaljedha

  app.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Query to check in registered_account table (customers)
    const customerQuery = `
        SELECT id, first_name, 'Customer' AS user_type 
        FROM registered_account 
        WHERE email = ? AND password = ?
    `;

    // Query to check in stores_account table (store owners)
    const storeOwnerQuery = `
        SELECT stores_id AS id, business_name AS first_name, 'Store Owner' AS user_type 
        FROM stores_account 
        WHERE stores_email = ? AND business_password = ?
    `;

    // Check for customers
    db.query(customerQuery, [email, password], (err, customerResults) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }

        if (customerResults.length > 0) {
            const { id, first_name, user_type } = customerResults[0];
            return res.status(200).json({ success: true, id, first_name, user_type });
        }

        // If not a customer, check for store owners
        db.query(storeOwnerQuery, [email, password], (err, storeResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: "Internal server error" });
            }

            if (storeResults.length > 0) {
                const { id, first_name, user_type } = storeResults[0];
                return res.status(200).json({ success: true, id, first_name, user_type });
            }

            // If neither, return invalid credentials error
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        });
    });
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


    app.post("/stores_account", upload.fields([{ name: "business_logo" }, { name: "business_background" }]), (req, res) => {
      const { businessName, password, email, businessCategory } = req.body;
    
      if (!req.files || !req.files.business_logo || !req.files.business_background) {
        return res.status(400).json({ message: "File upload failed" });
      }
    
      const business_logo = req.files.business_logo[0].filename;
      const business_background = req.files.business_background[0].filename;
    
      // Generate unique ID
      const id = `SO-${Math.floor(1000 + Math.random() * 9000)}`;
    
      const query = `
        INSERT INTO stores_account 
        (stores_id, business_name, business_password, stores_email, business_category, business_logo, business_background, user_type) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
    
      const values = [
        id,
        businessName,
        password,
        email,
        businessCategory,
        `/uploads/${business_logo}`,
        `/uploads/${business_background}`,
        'SO', // Fixed user type for store owners
      ];
    
   db.query(query, values, (err, data) => {
  if (err) {
    console.error("Error inserting store:", err);
    return res.status(500).json({ error: "Database error", details: err });
  }
  res.status(200).json({ message: "Store registered successfully", storeId: id });

      });
    });

  
    
    
    
    // Route to add food items
  // Route to add food items
app.post("/add_food/:storeId", upload.single("image"), (req, res) => {
  const { name, category, price } = req.body;
  const storeId = req.params.storeId; // Extracting storeId from URL

  // Validate inputs
  if (!storeId) {
    return res.status(400).json({ message: "Store ID is required in the URL" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Food image is required" });
  }

  if (!name || !category || !price) {
    return res.status(400).json({ message: "All food details must be provided" });
  }

  const image = `/uploads/${req.file.filename}`;

  // Validate if store exists
  const checkStoreQuery = "SELECT * FROM stores_account WHERE stores_id = ?";
  db.query(checkStoreQuery, [storeId], (err, storeResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error", details: err });
    }

    if (storeResults.length === 0) {
      return res.status(404).json({ message: "Store not found" });
    }

    // Insert food item into the database
    const insertFoodQuery = `
      INSERT INTO foods (store_id, name, category, price, image) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const values = [storeId, name, category, price, image];

    db.query(insertFoodQuery, values, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error adding food item", details: err });
      }

      res.status(200).json({ message: "Food item added successfully" });
    });
  });
});
