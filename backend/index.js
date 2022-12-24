//need to put type: "module" in package.json to use import statement outside a module
//need to put start : "nodemon index.js" so dont have to start again and again whenever making changes
//nodemon allows us to not restart everytime
import express from 'express' 
import mysql from 'mysql'

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1212wkr!",  //authentication prob might happen because creating a password can sometime give problems
    database:"test"
})

//authentication didn't work for me for some reason had to do
//ALTER USER 'root'@'localhost' IDENTIFIED BY '1212wkr!' in mysql




app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

//return all books in our db
app.get("/books", (req,res) =>{
    const q = "SELECT * FROM books"
    db.query(q,(err, data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (title, description, cover) VALUES (?)"; // can use req.title and do one by one but doing ? provide security
    const values = [
        "title from backend", 
        "desc from backend", 
        "cover pic from backend",
    ];
    
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json('book has been created')
    });
})

//8800 is the port number
app.listen(8800, ()=>{
    console.log("Connected to backend!!")
}) 