import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const AddProduct = () => {
    let history = useHistory();
    //states for different fields
    const [name, setName] = useState('');
    const [image, setImage] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');


    //function for storing files/images 
    const imgFunc = (e) => {
        setImage(e.target.files[0]);
        console.log(e.target.files[0]);
    }
    console.log("product image", image)




    const onSubmit = async (e) => {
        e.preventDefault();

        //formdata is an instance of FormData class which is used to send data with 'Content-Type':'multipart/formdata' by default and you dont need to send headers if youre using form data
        const formData = new FormData();
        formData.append('name', name); //append is used to insert data with its name field i.e 'name'
        formData.append('image', image)
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);


        await axios.post("http://localhost:800/productAdd", formData) //to post formdata 
        history.push('/products'); //to redirect to products page
    }









//Form for getting data from front end and storing it in states and then sending it to backend
    return (
        <div className="container m-5">
            <form onSubmit={e => onSubmit(e)}  >
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name" required />
                    <label htmlFor="image" className="text-danger"><small>*Image once upoaded cannot be updated</small></label>
                    <input type="file" className="form-control" name="image" value={image[0]} onChange={imgFunc} />
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter Title" required/>
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" name="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Enter Description" required/>
                    <label htmlFor="description">Price</label>
                    <input type="text" className="form-control" name="price" value={price} onChange={e => setPrice(e.target.value)} placeholder="Enter Price" required/>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Add Product</button>
            </form>
        </div>
    )
}

export default AddProduct
