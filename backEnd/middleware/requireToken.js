const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const { jwtkey } = require('../keys');
const User = mongoose.model('User')

// Client will Send JSON WebToke in Header 
module.exports = (req,res,next) =>{
        const {authorization} = req.headers; //Getting token from frontEnd in Header
        // Chking if Authorization Token is there...
        if(!authorization){ //Chking if we Found Token...
            return res.status(401).send({error:"You Must be Logged In Token Not Found"})
        }
        const token = authorization.replace("Bearer ", "") // JWT token attaches Bearer in token by default we have to remove it by default to chk only token
        jwt.verify(token , jwtkey , async(err,payload)=>{ //Here We Will Verify That Token We Got is valid or Invalid {verify} is BUILT IN METHOD in JWT Token
            if(err){
                return res.status(401).send({error:"Wrong Token"})
            }
        const {userId} = payload; //if the token above is valid we will get that in payload...This should be same as we gave in authRoute
        const user = await User.findById(userId) //findById is mongoDB command to search user in DB
        req.user = user;
        next() //This is middleware 
    })
}