import express from "express";
import mysql2 from "mysql2";    
import cors from "cors";                 

                        
                                       
const app= express();
const db= mysql2.createConnection({                                                               
    host: "localhost",                               
    user: "root",
    password: "qwerty123",
    database: "marketplace",              
});


app.listen(8800, () =>)

//middleware setup
app.use(express.json());  
app.use(cors());    



app.get("/", (req, res) => {
    res.json("this is the backend");
});

app.get("/registered_account", (req, res) => {  // Switch req and res
    const q = "SELECT * FROM registered_account";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json(data);
    });
});


app.post("/registered_account", (req, res) => {
    const q= "INSERT INTO registered_account (`first_name`, `last_name`, `email`, `password`, `image`) VALUES(?)";
    const values = [
      
        
       
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        req.body.password,
        req.body.image,
        
       
        
       
    ];
    db.query(q, [values], (err, data) => {
        if (err) {
            return res.json(err);
        }
        return res.json("Successfully Executed");
    })
});


app.post("/login", (req, res) => {
    const { email, password } = req.body; 
    const loginQuery = "SELECT * FROM registered_account WHERE email = ? AND password = ?";
    db.query(loginQuery, [email, password], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (data.length > 0) {
            const user = data[0];
            return res.json({ success: true, first_name: user.first_name });
        } else {
            return res.status(401).json({ success: "failed", message: "Invalid email or password" });
        }
    });
});
