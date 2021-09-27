import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from './components/pages/Home';
import Product from './components/pages/Product';
import Users from './components/pages/Users';
import Navbar from './Navbar';
import  NotFound from './components/pages/NotFound';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AddProduct from './products/AddProduct';
import EditProduct from './products/EditProduct';

const App = () => {
  return (
    <Router>
    <div className="App">
    <Navbar />
    <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/products' component={Product} />
    <Route exact path='/products/add' component={AddProduct} />
    <Route exact path='/products/edit/:id' component={EditProduct}/>
    <Route exact path='/users' component={Users} />
    <Route path='*' component={NotFound}/>
    </Switch>
    </div>
    </Router>
  );
}




// function App() {
//   const [product, setProduct] = useState([]);

//   // + adding the use
//   useEffect(() => {
//     getData();

//     // we will use async/await to fetch this data
//     async function getData() {
//      // const response = await fetch("http://localhost:800/product",{mode:"no-cors"})


//     await  fetch('http://localhost:800/product').then(response => response.json()).then(res =>
//     {const newRes = res;  
//       setProduct(newRes)
//     console.log("New Res",res)})

//     }
//   }, [setProduct]); // <- you may need to put the setBooks function in this array


//   const delFunc =async(id)=>{
//   // console.log(`This is product${id}`);
//     await  fetch(`http://localhost:800/product/delete/${id}`, {
//     method : "POST"
//     }).then(console.log(`deleted id ${id}`))
//   }


//   return (
//     <div>
//       <table><thead><tr><th>Name:</th><th>Image:</th><th>Title:</th><th>Description</th></tr></thead>
//       {product.map(products =>
//       <tbody key={products._id}><tr>
//         <td>{products.name}</td>
//         <td><img src={`http://localhost:800/uploads/${products.image}`} alt="img" width="120px" height="120px"/></td>
//         <td>{products.title}</td>
//         <td>{products.description}</td>
//         <td><button style={{background:"aqua"}}>Edit</button></td>
//         <td><button style={{background:"red"}} onClick={()=>delFunc(products._id)} >Delete</button></td>
//         </tr></tbody>
//       )}
//       </table>
//     </div>
//     )}



export default App;
