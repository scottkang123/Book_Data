//need to put type: "module" in package.json to use import statement outside a module
//need to put start : "nodemon index.js" so dont have to start again and again whenever making changes
//nodemon allows us to not restart everytime
import express from 'express' 
import mysql from 'mysql'
import cors from "cors"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1212wkr!",  //authentication prob might happen because creating a password can sometime give problems
    database:"test"
})

//authentication didn't work for me for some reason had to do
//ALTER USER 'root'@'localhost' IDENTIFIED BY '1212wkr!' 
//in mysql

//to allow json format request
app.use(express.json())

// to allow your frontend file to have access to backend
app.use(cors())
  

app.get("/", (req,res)=>{
    res.json("hello this is the backend!")
})

//return all books in our db
app.get("/books", (req,res) =>{
    const q = "SELECT * FROM books"
    db.query(q,(err, data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//i put "" for each title, description, cover did not work
//used mysql workbench to check how my query was wrong
app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (title, description, price, cover) VALUES (?)"; // can use req.title and do one by one but doing ? provide security
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ];
    
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json('book has been created')
    });
})

//give specfic id to delete
// put question mark then do error thing to check if it works
app.delete("/books/:id", (req,res)=>{
    const bookID = req.params.id //parmas represent id, id is the specific id
    const q = "DELETE FROM books WHERE id = ?";
    db.query(q, [bookID], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully..");
    })
})

app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id //parmas represent id, id is the specific id
    const q = "UPDATE books SET `title` = ?, `description` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
    ]
    db.query(q, [...values, bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated successfully..");
    });
});

//8800 is the port number
app.listen(8800, ()=>{
    console.log("Connected to backend!!")
}) 