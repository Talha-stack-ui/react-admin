const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
// Defining The Fields That Will Store UserNAme & PassWord We Can Create more if we Want ....
const userSchema = new mongoose.Schema({
    email :{
        type:String,
        unique :true,
        required :true
    },
    password :{
        type:String,
        unique :false,
        required :true
    }
})

//This pre method will be called befor authRouth.js SignUp
// The argument that is 'Save' bcoz we want to do it before Saving ...same as user.save() in authRoute
userSchema.pre('save' ,function(next){ //(next) is use bcoz we are using middleWare
  const user = this; //it use to get current user
  if(!user.isModified('password')){ // password is written bcoz we dont want to call this middleware everytime save() method is call we want only when password is changed or created isModified is inbuilt
        return next()
  }
//   Same from mongoDB documnetation https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1 , 
  bcrypt.genSalt(12, (err , salt)=>{
    if(err){
        return next(err)
    }
    bcrypt.hash(user.password , salt , (err , hash)=>{
        if(err){
            return next(err)
        }
        user.password = hash;
        next()
    });
  });
});

userSchema.methods.comparePassword = function(candidatePasswd){
    const user = this;
    return new Promise((resolve , reject)=>{
        bcrypt.compare(candidatePasswd , user.password , (err , isMatch)=>{
            if(err){
                return reject(err)
            }
            if(!isMatch){
                return reject(err)
            }
            resolve(true)
        })
    })
}

mongoose.model('User', userSchema) //We Can Use module.export also but when we use require() where we want it will give Error