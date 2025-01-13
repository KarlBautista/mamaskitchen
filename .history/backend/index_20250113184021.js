import express from "express";
import mysql2 from "mysql2/promise"; 
import cors from "cors";
import multer from "multer";
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
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
app.use("/Menu", express.static(path.join(__dirname, "Menu")));



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
  const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
  const values = [
    id,
    req.body.first_name || "",
    req.body.last_name || "",
    req.body.email || "",
    hashedPassword, // Store the hashed password
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


// Fetch orders by user ID and status
app.get('/orders/:user_id/status/:status', async (req, res) => {
  const { user_id, status } = req.params;

  if (!['Pending', 'Shipped', 'Received', 'Cancelled'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status.' });
  }

  const query = `
    SELECT orders.id, orders.total_price, orders.order_date, orders.status,
           order_items.food_name, order_items.quantity, order_items.price,
           foods.image_url
    FROM orders
    INNER JOIN order_items ON orders.id = order_items.order_id
    INNER JOIN foods ON order_items.food_name = foods.name
    WHERE orders.user_id = ? AND orders.status = ?
    ORDER BY orders.order_date DESC
  `;

  try {
    const [orders] = await db.query(query, [user_id, status]);
    // Group and format orders for response
    const groupedOrders = orders.reduce((acc, curr) => {
      const existingOrder = acc.find(order => order.id === curr.id);
      if (existingOrder) {
        existingOrder.items.push({
          food_name: curr.food_name,
          quantity: curr.quantity,
          price: curr.price,
          image_url: curr.image_url,
        });
      } else {
        acc.push({
          id: curr.id,
          total_price: curr.total_price,
          order_date: curr.order_date,
          status: curr.status,
          items: [{
            food_name: curr.food_name,
            quantity: curr.quantity,
            price: curr.price,
            image_url: curr.image_url,
          }],
        });
      }
      return acc;
    }, []);

    res.json({ success: true, orders: groupedOrders });
  } catch (err) {
    console.error('Error fetching orders by status:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
  }
});



app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM registered_account WHERE email = ?', [email]);
    if (rows.length > 0) {
      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password); // Compare hashed password
      if (isPasswordValid) {
        res.json({ success: true, user }); // Includes `user_type`
      } else {
        res.json({ success: false, message: "Invalid email or password." });
      }
    } else {
      res.json({ success: false, message: "Invalid email or password." });
    }
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});



app.post('/change_password', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM registered_account WHERE id = ?', [userId]);
    if (rows.length > 0) {
      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password); // Compare current password
      if (isPasswordValid) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
        await db.query('UPDATE registered_account SET password = ? WHERE id = ?', [hashedNewPassword, userId]);
        res.json({ success: true, message: "Password changed successfully." });
      } else {
        res.json({ success: false, message: "Current password is incorrect." });
      }
    } else {
      res.json({ success: false, message: "User not found." });
    }
  } catch (err) {
    console.error("Error changing password:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

app.delete('/delete_user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM registered_account WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'User account deleted successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'User not found.' });
    }
  } catch (err) {
    console.error('Error deleting user account:', err);
    res.status(500).json({ success: false, message: 'Failed to delete user account.' });
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
// Add item to cart
app.post('/add_to_cart', async (req, res) => {
  const { user_id, food_name, price, image_url, quantity } = req.body;

  if (!user_id) {
    return res.status(400).json({ success: false, message: 'User ID is required.' });
  }

  const query = `
    INSERT INTO cart (user_id, food_name, price, image_url, quantity)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);
  `;

  try {
    await db.query(query, [user_id, food_name, price, image_url, quantity]);
    res.json({ success: true, message: 'Item added to cart.' });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ success: false, message: 'Failed to add item to cart.' });
  }
});

// Update item quantity in cart
app.put('/cart/:user_id/item/:item_id', async (req, res) => {
  const { user_id, item_id } = req.params;
  const { quantity } = req.body;

  if (!user_id || !item_id || !quantity) {
    return res.status(400).json({ success: false, message: 'User ID, Item ID, and Quantity are required.' });
  }

  const query = 'UPDATE cart SET quantity = ? WHERE user_id = ? AND id = ?';

  try {
    const [result] = await db.query(query, [quantity, user_id, item_id]);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Item quantity updated successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Item not found in cart.' });
    }
  } catch (err) {
    console.error('Error updating item quantity:', err);
    res.status(500).json({ success: false, message: 'Failed to update item quantity.' });
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



// Route to add food items


// Route to add food
app.post('/add_food', upload.single('image'), async (req, res) => {
  const { name, price, category } = req.body;
  const image = req.file;

  if (!image) {
    return res.status(400).json({ success: false, message: 'Please upload an image.' });
  }

  // You can save the image path in the database or use a file service to upload the image
  const imageUrl = `/uploads/${image.filename}`;

  try {
    const newDish = await db.query('INSERT INTO foods (name, price, category, image_url) VALUES (?, ?, ?, ?)', [name, price, category, imageUrl]);

    res.json({ success: true, newDish });
  } catch (error) {
    console.error('Error adding dish:', error);
    res.status(500).json({ success: false, message: 'Failed to add dish.' });
  }
});

// Delete a food item
// Route to delete a food item
app.delete('/foods/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM foods WHERE id = ?', [id]);
    if (result.affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Food item not found." });
    }
  } catch (err) {
    console.error('Error deleting dish:', err);
    res.status(500).json({ success: false, message: "Failed to delete dish." });
  }
});


// Update a food item
app.put('/update_food/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  const image = req.file;

  const imageUrl = image ? `/uploads/${image.filename}` : null;

  try {
    const updatedDish = await db.query('UPDATE foods SET name = ?, price = ?, category = ?, image_url = ? WHERE id = ?', [
      name, price, category, imageUrl, id
    ]);

    res.json({ success: true, updatedDish });
  } catch (error) {
    console.error('Error updating dish:', error);
    res.status(500).json({ success: false, message: 'Failed to update dish.' });
  }
});


// Other imports and middleware...

// Route to fetch a single food item by ID
// Other imports and middleware...

// Route to fetch a single food item by ID
app.get('/foods/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [food] = await db.query('SELECT * FROM foods WHERE id = ?', [id]);

    if (food.length === 0) {
      return res.status(404).json({ success: false, message: 'Food item not found.' });
    }

    res.json({ success: true, food: food[0] });
  } catch (error) {
    console.error('Error fetching food item:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch food item.' });
  }
});

// Other routes...
// Other routes...

// Backend Route: Handle Checkout and Store Order Data
app.post('/checkout', async (req, res) => {
  const { user_id, total_price, items } = req.body;

  if (!user_id || !total_price || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid order data.' });
  }

  // Insert the order into the 'orders' table
  const query = `INSERT INTO orders (user_id, total_price, order_date) VALUES (?, ?, NOW());`;
  const values = [user_id, total_price];

  try {
      const [result] = await db.query(query, values);
      const order_id = result.insertId;

      // Insert order items into the 'order_items' table
      const orderItemsQuery = `INSERT INTO order_items (order_id, food_name, quantity, price) VALUES (?, ?, ?, ?);`;

      const orderItemsPromises = items.map(item =>
          db.query(orderItemsQuery, [order_id, item.food_name, item.quantity, item.price])
      );

      await Promise.all(orderItemsPromises);

      // Optionally, clear the cart for the user
      await db.query('DELETE FROM cart WHERE user_id = ?', [user_id]);

      // Create a notification for the admin
      const userQuery = `SELECT first_name, last_name FROM registered_account WHERE id = ?`;
      const [userData] = await db.query(userQuery, [user_id]);
      const customerName = `${userData[0].first_name} ${userData[0].last_name}`;
      const notificationMessage = `${customerName} placed an order. Items: ${items.map(item => item.food_name).join(', ')}`;

      const notificationQuery = `INSERT INTO notifications (user_id, message) VALUES (?, ?)`;
      await db.query(notificationQuery, [user_id, notificationMessage]);

      res.json({ success: true, message: 'Order placed successfully.' });
  } catch (err) {
      console.error('Error during checkout:', err);
      res.status(500).json({ success: false, message: 'Failed to place order.' });
  }
});



// Route to get user's orders
// Route to get all orders for admin
app.get('/admin/orders', async (req, res) => {
  const query = `
    SELECT orders.id AS order_id, orders.user_id, orders.total_price, orders.order_date, orders.status,
           registered_account.first_name, registered_account.last_name,
           order_items.food_name, order_items.quantity
    FROM orders
    INNER JOIN registered_account ON orders.user_id = registered_account.id
    INNER JOIN order_items ON orders.id = order_items.order_id
    ORDER BY orders.order_date DESC
  `;

  try {
    const [orders] = await db.query(query);
    if (orders.length > 0) {
      const groupedOrders = orders.reduce((acc, curr) => {
        const existingOrder = acc.find(order => order.order_id === curr.order_id);
        if (existingOrder) {
          existingOrder.items.push({
            food_name: curr.food_name,
            quantity: curr.quantity
          });
        } else {
          acc.push({
            order_id: curr.order_id,
            user_id: curr.user_id,
            first_name: curr.first_name,
            last_name: curr.last_name,
            total_price: curr.total_price,
            order_date: curr.order_date,
            status: curr.status,
            items: [{
              food_name: curr.food_name,
              quantity: curr.quantity
            }]
          });
        }
        return acc;
      }, []);

      res.json({ success: true, orders: groupedOrders });
    } else {
      res.json({ success: false, message: 'No orders found.' });
    }
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
  }
});



// Fetch all orders for admin
app.get('/all_orders', async (req, res) => {
  const query = `
    SELECT orders.id, orders.total_price, orders.order_date, 
           order_items.food_name, order_items.quantity, order_items.price,
           foods.image_url
    FROM orders
    INNER JOIN order_items ON orders.id = order_items.order_id
    INNER JOIN foods ON order_items.food_name = foods.name
    ORDER BY orders.order_date DESC
  `;

  try {
    const [orders] = await db.query(query);

    if (orders.length > 0) {
      const groupedOrders = orders.reduce((acc, order) => {
        const existingOrder = acc.find(o => o.id === order.id);
        const item = {
          food_name: order.food_name,
          quantity: order.quantity,
          price: order.price,
          image_url: order.image_url,
        };

        if (existingOrder) {
          existingOrder.items.push(item);
        } else {
          acc.push({
            id: order.id,
            total_price: order.total_price,
            order_date: order.order_date,
            items: [item],
          });
        }

        return acc;
      }, []);

      res.json({ success: true, orders: groupedOrders });
    } else {
      res.json({ success: false, orders: [] });
    }
  } catch (err) {
    console.error("Error fetching orders for admin:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders." });
  }
});


// Admin route to get all orders
app.get('/admin/orders', async (req, res) => {
  const query = `
    SELECT orders.id AS order_id, orders.user_id, orders.total_price, orders.order_date, 
           registered_account.first_name, registered_account.last_name, 
           order_items.food_name, order_items.quantity
    FROM orders
    INNER JOIN registered_account ON orders.user_id = registered_account.id
    INNER JOIN order_items ON orders.id = order_items.order_id
    ORDER BY orders.order_date DESC;
  `;

  try {
    const [orders] = await db.query(query);

    // Group orders by `order_id`
    const groupedOrders = orders.reduce((acc, curr) => {
      const existingOrder = acc.find(order => order.order_id === curr.order_id);
      if (existingOrder) {
        existingOrder.items.push({
          food_name: curr.food_name,
          quantity: curr.quantity,
        });
      } else {
        acc.push({
          order_id: curr.order_id,
          user_id: curr.user_id,
          first_name: curr.first_name,
          last_name: curr.last_name,
          total_price: curr.total_price,
          order_date: curr.order_date,
          items: [
            {
              food_name: curr.food_name,
              quantity: curr.quantity,
            },
          ],
        });
      }
      return acc;
    }, []);

    res.json({ success: true, orders: groupedOrders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ success: false, message: "Failed to fetch orders." });
  }
});



// Backend Route to get total sales per month
app.get("/monthly_sales", async (req, res) => {
  try {
    const query = `
      SELECT MONTH(order_date) AS month, YEAR(order_date) AS year, 
             SUM(total_price) AS total_sales, 
             SUM(total_price) * 0.10 AS total_revenue 
      FROM orders
      GROUP BY MONTH(order_date), YEAR(order_date)
      ORDER BY year DESC, month DESC;
    `;
    const [salesData] = await db.query(query);
    res.json({ success: true, salesData });
  } catch (err) {
    console.error("Error fetching monthly sales:", err);
    res.status(500).json({ success: false, message: "Failed to fetch sales data." });
  }
});



app.get('/top_products', async (req, res) => {
  const query = `
    SELECT foods.name, foods.image_url, SUM(order_items.quantity) AS total_sold
    FROM order_items
    INNER JOIN foods ON order_items.food_name = foods.name
    GROUP BY foods.name, foods.image_url
    ORDER BY total_sold DESC
    LIMIT 5; -- Fetch top 5 products
  `;

  try {
    const [topProducts] = await db.query(query);
    res.json({ success: true, topProducts });
  } catch (err) {
    console.error('Error fetching top products:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch top products.' });
  }
});



app.get('/admin/top_products', async (req, res) => {
  try {
    const query = `
      SELECT food_name, SUM(quantity) AS total_quantity
      FROM order_items
      GROUP BY food_name
      ORDER BY total_quantity DESC
      LIMIT 5;
    `;
    const [topProducts] = await db.query(query);
    res.json({ success: true, topProducts });
  } catch (err) {
    console.error("Error fetching top products:", err);
    res.status(500).json({ success: false, message: 'Failed to fetch top products.' });
  }
});

app.post('/admin/notifications', async (req, res) => {
  const { user_id, message } = req.body;

  if (!user_id || !message) {
    return res.status(400).json({ success: false, message: 'User ID and message are required.' });
  }

  const query = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';

  try {
    await db.query(query, [user_id, message]);
    res.json({ success: true, message: 'Notification created successfully.' });
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(500).json({ success: false, message: 'Failed to create notification.' });
  }
});

app.get('/admin/notifications', async (req, res) => {
  const query = `SELECT notifications.id, registered_account.first_name, registered_account.last_name, notifications.message, notifications.created_at
                 FROM notifications
                 INNER JOIN registered_account ON notifications.user_id = registered_account.id
                 ORDER BY notifications.created_at DESC`;

  try {
    const [notifications] = await db.query(query);

    res.json({ success: true, notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ success: false, message: "Failed to fetch notifications." });
  }
});

app.put('/admin/orders/ship/:order_id', async (req, res) => {
  const { order_id } = req.params;

  try {
    const result = await db.query(
      'UPDATE orders SET status = ? WHERE order_id = ?',
      ['Shipped', order_id]
    );

    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Order marked as shipped.' });
    } else {
      res.status(404).json({ success: false, message: 'Order not found.' });
    }
  } catch (error) {
    console.error('Error marking order as shipped:', error);
    res.status(500).json({ success: false, message: 'Error updating order status.' });
  }
});



// Fetch orders by status
// Route to cancel an order
app.delete('/orders/:id', async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM orders WHERE id = ?';
  try {
    const [result] = await db.query(query, [id]);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Order removed successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Order not found.' });
    }
  } catch (err) {
    console.error('Error removing order:', err);
    res.status(500).json({ success: false, message: 'Failed to remove order.' });
  }
});

// Fetch orders by status
app.get('/orders/status/:status', async (req, res) => {
  const { status } = req.params;

  if (!['Pending', 'Shipped', 'Received', 'Cancelled'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status.' });
  }

  const query = `
    SELECT orders.id, orders.total_price, orders.order_date, orders.status,
           order_items.food_name, order_items.quantity, order_items.price,
           foods.image_url
    FROM orders
    INNER JOIN order_items ON orders.id = order_items.order_id
    INNER JOIN foods ON order_items.food_name = foods.name
    WHERE orders.status = ?
    ORDER BY orders.order_date DESC
  `;

  try {
    const [orders] = await db.query(query, [status]);
    // Group and format orders for response
    const groupedOrders = orders.reduce((acc, curr) => {
      const existingOrder = acc.find(order => order.id === curr.id);
      if (existingOrder) {
        existingOrder.items.push({
          food_name: curr.food_name,
          quantity: curr.quantity,
          price: curr.price,
          image_url: curr.image_url,
        });
      } else {
        acc.push({
          id: curr.id,
          total_price: curr.total_price,
          order_date: curr.order_date,
          status: curr.status,
          items: [{
            food_name: curr.food_name,
            quantity: curr.quantity,
            price: curr.price,
            image_url: curr.image_url,
          }],
        });
      }
      return acc;
    }, []);

    res.json({ success: true, orders: groupedOrders });
  } catch (err) {
    console.error('Error fetching orders by status:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
  }
});

// Update order status
app.put('/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Pending', 'Shipped', 'Received'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
  }

  const query = 'UPDATE orders SET status = ? WHERE id = ?';
  try {
      const [result] = await db.query(query, [status, id]);
      if (result.affectedRows > 0) {
          // If the status is "Received", create a notification for the admin
          if (status === 'Received') {
              const orderQuery = 'SELECT user_id FROM orders WHERE id = ?';
              const [orderResult] = await db.query(orderQuery, [id]);
              const userId = orderResult[0].user_id;

              const userQuery = 'SELECT first_name, last_name FROM registered_account WHERE id = ?';
              const [userResult] = await db.query(userQuery, [userId]);
              const customerName = `${userResult[0].first_name} ${userResult[0].last_name}`;

              const notificationMessage = `${customerName} has received their order with ID ${id}.`;
              const notificationQuery = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';
              await db.query(notificationQuery, [userId, notificationMessage]);
          }

          res.json({ success: true, message: 'Order status updated successfully.' });
      } else {
          res.status(404).json({ success: false, message: 'Order not found.' });
      }
  } catch (err) {
      console.error('Error updating order status:', err);
      res.status(500).json({ success: false, message: 'Failed to update order status.' });
  }
});

// Delete a single notification
app.delete('/admin/notifications/:id', async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM notifications WHERE id = ?';

  try {
    const [result] = await db.query(query, [id]);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Notification deleted successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Notification not found.' });
    }
  } catch (err) {
    console.error('Error deleting notification:', err);
    res.status(500).json({ success: false, message: 'Failed to delete notification.' });
  }
});

// Delete all notifications
app.delete('/admin/notifications', async (req, res) => {
  const query = 'DELETE FROM notifications';

  try {
    await db.query(query);
    res.json({ success: true, message: 'All notifications deleted successfully.' });
  } catch (err) {
    console.error('Error deleting all notifications:', err);
    res.status(500).json({ success: false, message: 'Failed to delete all notifications.' });
  }
});


// Route to cancel an order
app.put('/orders/:id/cancel', async (req, res) => {
  const { id } = req.params;

  const query = 'UPDATE orders SET status = ? WHERE id = ?';
  try {
    const [result] = await db.query(query, ['Cancelled', id]);
    if (result.affectedRows > 0) {
      res.json({ success: true, message: 'Order cancelled successfully.' });
    } else {
      res.status(404).json({ success: false, message: 'Order not found.' });
    }
  } catch (err) {
    console.error('Error cancelling order:', err);
    res.status(500).json({ success: false, message: 'Failed to cancel order.' });
  }
});


// Route to get user's orders
app.get('/orders/:user_id', async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).json({ success: false, message: 'User ID is required.' });
  }

  const query = `
    SELECT orders.id, orders.total_price, orders.order_date, orders.status,
           order_items.food_name, order_items.quantity, order_items.price,
           foods.image_url
    FROM orders
    INNER JOIN order_items ON orders.id = order_items.order_id
    INNER JOIN foods ON order_items.food_name = foods.name
    WHERE orders.user_id = ?
    ORDER BY orders.order_date DESC
  `;

  try {
    const [orders] = await db.query(query, [user_id]);
    if (orders.length > 0) {
      const groupedOrders = orders.reduce((acc, curr) => {
        const existingOrder = acc.find(order => order.id === curr.id);
        if (existingOrder) {
          existingOrder.items.push({
            food_name: curr.food_name,
            quantity: curr.quantity,
            price: curr.price,
            image_url: curr.image_url
          });
        } else {
          acc.push({
            id: curr.id,
            total_price: curr.total_price,
            order_date: curr.order_date,
            status: curr.status,
            items: [{
              food_name: curr.food_name,
              quantity: curr.quantity,
              price: curr.price,
              image_url: curr.image_url
            }]
          });
        }
        return acc;
      }, []);

      res.json({ success: true, orders: groupedOrders });
    } else {
      res.json({ success: false, message: 'No orders found for this user.' });
    }
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch orders.' });
  }
});