const express = require("express")  //For Running Server 
const bodyParser = require('body-parser') // For conversion of JSON coming from Front To backend
const mongoose = require('mongoose') //importing Mongoose
const PORT = 800
const app = express()
const {mongoUrl} = require('./keys') //Loading Mongo URL we got from Cluster
require("./models/User") //importion User 
const Product = require("./models/Product") //importion Products
const cors = require("cors");

//multer is used for image uploading using express 
const multer = require("multer");

//where to store and by which name
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename : function(req,file,cb){
        cb(null, file.originalname);
    }
});
//manual filter for saving image depending on its types
const fileFilter = function(req,file,cb){
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
//an instance of multer
const upload = multer({storage:storage,fileFilter:fileFilter ,limits:{
    fileSize:1024*1024*5
}});

const requireToken = require('./middleware/requireToken') //Chking Token is available to give access to specific route
const authRoutes = require('./routes/authRoutes') //importing routes *This should be done after User Bcoz we are using UserModel in authRoutes*
app.use(bodyParser.json()) // Creating MiddleWare
app.use(authRoutes) //middleWare for Routes


//static path where image will be uploaded which will be sent using front end
app.use('/uploads',express.static("uploads"));

app.use(bodyParser.urlencoded({extended: true}));
// app.use(cors);


//Database connection
mongoose.connect(mongoUrl) 
mongoose.connection.on('connected' , ()=>{
    console.log(" MongoDb Connected SuccesFully ");
});

mongoose.connection.on('error' , (err)=>{
    console.log(" SomeThing Went Wrong  " , err);
});





//Cors Error solving middleware route
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); //allows request coming from front end i.e react js(localhost:3000)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');  //allows to use all four methods using front end i.e react js 
    res.header('Access-Control-Allow-Headers', 'Content-Type'); 

    next();
});













app.get('/', requireToken , (req , res)=>{ //requireToken is middleWare for chking jwtToken is Present & correct or not...
    res.send("Your Are Logged In & Your Email is "+ req.user.email + " And Password is "+req.user.password)
    
})

// app.get('/', requireToken , async(req , res)=>{ //requireToken is middleWare for chking jwtToken is Present & correct or not...
//     const prdcts = await Product.find();
//     res.send("Your Are Logged In & Your Email is "+ req.user.email + " And Password is "+req.user.password + prdcts)
    
// })



//PRODUCT//


//Add Product for Admin Panel {upload is a middleware used for uploading images}
app.post('/productAdd',upload.single('image'),async(req,res)=>{
    console.log("console kara raha hu form data",req.file);
    const product = new Product({
        name : req.body.name,
        image : req.file.filename,
        description : req.body.description,
        title : req.body.title,
        price : req.body.price
    })
    try{
    await product.save().then(console.log("Product added successfully")).then(res.send(product))
    }catch(err){
        res.send(err);
    }
})

//Get Product for Admin Panel
app.get('/product',async(req,res)=>{
   const prdcts = await Product.find();
   res.send(prdcts);
})

//Get Product by ID for Admin Panel
app.get('/product/:id',async(req,res)=>{
    const id = req.params.id;
    const isThere = await Product.findById(id);
    if(isThere){
        res.send(isThere)
    }else{
        res.send(`No such Product with id ${id}`)
    }
})

//Update Product for Admin Panel
app.put('/product/update/:id',async(req,res)=>{
    const id = req.params.id;
    const UpdateProduct = await Product.findByIdAndUpdate(id,req.body,{new:true});
    if(UpdateProduct){
        res.send(`Product is Updated as ${UpdateProduct} `);
    }else{
        res.send(`No product with id ${id} is found to Update`);
    }
})

//Delete Product for Admin Panel
app.delete('/product/delete/:id',async(req,res)=>{
    const id = req.params.id;
    const DelProduct = await Product.findByIdAndRemove(id);
    if(DelProduct){
       return res.send(`${DelProduct} deleted Successfuly`)
    }else{
        return res.send(err);
    }
})


//Amin
app.get('/admin',(req,res)=>{
    res.redirect('http://localhost:3000/products');
})


app.listen(PORT, ()=>{
    console.log(`Running on Port :${PORT}`);
})
























//Product locally

// let product =  Product({
//     name : "Product 2",
//     image : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpaniwalaindia.com%2Fproduct%2Ftest-product%2F&psig=AOvVaw0f0T5eaMNUg4GM5aU3kEFh&ust=1631859667927000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCPir253tgvMCFQAAAAAdAAAAABAD",
//     description : "This is Product.",
//     title : "Product"
// })
// product.save().then(console.log("Product added locally"));

