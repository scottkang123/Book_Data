//npm install axios allow us to make API requests using React app
import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Books = () => {

    //create usestate store our books in this books state
    const [books,setBooks] = useState([])

    //dependency empty array -> only run once
    //create fetching function 
    //async() for the api request
    //whenever we run Books component, it will run useEffect. and inside this it has fetchallbooks function
    //getting all the information
    useEffect(()=>{
        const fetchAllBooks = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/books")
                setBooks(res.data)
                //console.log(res) to show if it works by checking console in inspect element
            }catch(err){
                console.log(err)
            }
        }
        fetchAllBooks()
    },[])

    const handleDelete = async (id) =>{
        try{
            await axios.delete("http://localhost:8800/books/"+id)
            window.location.reload()
        }catch(err){
            console.log(err)
        }
    }
    
    return (
        <div>
            <h1>Scott's Book Shot</h1>
            <div className = "books">
                {books.map(book=>(
                    <div className = "book" key = {book.id}>
                        {book.cover && <img src = {book.cover} alt = ""/>}
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <span>{book.price}</span>
                        <button className = "delete" onClick = {()=>handleDelete(book.id)}>Delete</button>
                        <button className = "update"><Link to ={`/update/${book.id}`}>Update</Link></button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/add">ADD NEW BOOK</Link>
            </button>
        </div>
    )
}

export default Books