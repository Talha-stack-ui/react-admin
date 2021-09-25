import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Product = () => {
    const[products,setProduct]=useState([]);

    useEffect(()=>{
        LoadProducts();
    },[]);

const LoadProducts = async () =>{
  const result = await axios.get("http://localhost:800/product");
   setProduct(result.data)
   console.log(setProduct);
}


    return (
        <div className="App">
    <h1 className="text-center">Products</h1>
    <div className="container">
    <table className="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Image</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   {products.map((product,index)=>(
       <tr key={product._id}>
           <th scope="row">{index+1}</th>
           <td>{product.name}</td>
           <td><img src={`http://localhost:800/uploads/${product.image}`} alt="img" width="120px" height="120px"/></td>
           <td>{product.title}</td>
           <td>{product.description}</td>
           <td>         
           <Link className="btn btn-outline-info btn-sm ">Edit</Link>
           <Link className="btn btn-outline-danger btn-sm mx-3" onClick={()=>{console.log(`Deleted : ${product._id}`)}}>Delete</Link>
          </td>
       </tr>
    ))}
  </tbody>
</table>
    </div>
    </div>
    )
}

export default Product;
