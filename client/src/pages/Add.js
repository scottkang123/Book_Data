import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {
    const [book,setBook]  = useState({
        title:"",
        desc:"",
        price:null,
        cover:""
    }) 

    //want to navigate back to home page after adding a book
    const navigate = useNavigate()


    //whenever we change input, set our book 
    const handleChange = (e) =>{
        setBook(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    //if press add then refresh the page by default everything disappears
    //prevent default
    //async function for api request
    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:8800/books", book)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    console.log(book)

    //name should be same as above
    return (
        <div className = 'form'>
            <h1>Add New Book</h1>
            <input type = "text" placeholder = "title" onChange={handleChange} name = "title"/>
            <input type = "text" placeholder = "description" onChange={handleChange} name = "description"/>
            <input type = "number" placeholder = "price" onChange={handleChange} name = "price"/>
            <input type = "text" placeholder = "cover" onChange={handleChange} name = "cover"/>
            <button className = "formButton" onClick = {handleClick}>Add</button>
        </div>
    )
}

export default Add