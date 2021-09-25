const express = require('express')
const mongoose = require('mongoose')  
const jwt = require('jsonwebtoken')
const {jwtkey} = require("../keys") //getting random keys form './keys'
const router = express.Router()
const User = mongoose.model('User') //importing modelUser For Getting Structure

// this postSignUp Will Be Called After Pre method in models/User.js
router.post('/signUp' , async(req,res)=>{
    // console.log(req.body);
    const {email , password} = req.body; //Getting Parameter From FrontEnd And Destructuring It...
    try {
        const user = new User({email,password}) //Putting userDetail in model that we have created
        await user.save(); //Mongo Command to Save in Db
        const token = jwt.sign({userId:user._id} , jwtkey) //Creating JWT Token userId is name we r giving 
        res.send({token}) //sending Token FrontEnd
    } catch (err) {
        res.status(422).send(err.message)
    }
})

router.post('/signIn', async(req, res) =>{
  const {email , password} = req.body;
  if(!email || !password){
      return res.status(422).send({error : " Please Enter Both field1"})
  }
  const user = await User.findOne({email})
  if (!user) {
    return res.status(422).send({error : " Please Enter Both field2"})
  }
  try {
      await user.comparePassword(password) //coming from user.js userSchema.method.comparePassword
      const token = jwt.sign({userId:user._id} , jwtkey)  //if user is valid new Token will be given
      res.send({token})
    } catch (error) {
        return res.status(422).send({error : " Please Enter Both field3"})
  }
})

module.exports= router