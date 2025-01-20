import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


const userSchema = new Schema({
   userName :{
    type: String,
    required : true,
    unique: true,
    lowercase : true,
    trim : true,
    index: true,
   },
   email :{
    type: String,
    required : true,
    unique: true,
    lowercase : true,
    trim : true,
   },
   fullName :{
    type: String,
    required : true,
   index :true,
    trim : true,
   },
   avatar :{
    type: String,

   },
   coverImage :{
    type: String,
  
   },
   watchedHistory : [
    {
        type : Schema.Types.ObjectId,
        ref : "video"
   
    }
   ],
   password : {
    type : String,
    required : [true, "Password is required"]
   },
   refreshTokenn : {
    type :  String,
   }
} , {timestamps: true})


userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// userSchema.methods.isPasswordCorrect = async function (password) {
//     return bcrypt.compare(password,this.password)
// }

// userSchema.methods.generateAccessToken = async function () {
// const token =  jwt.sign(
//      {
//         _id : this._id,
//         email : this.email,
//      }, 
//         process.env.ACCESS_TOKEN_SECRET,
//     {
//         expiresIn : process.env.ACCESS_TOKEN_EXPIRE
//     }
// )
// console.log(token, "tikk");

// }

userSchema.methods.generateRefreshToken = async function () {
jwt.sign(
    {
        _id : this_id,
    }, 
        process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRE
    }
)
}

const user = mongoose.model('User',userSchema)

export default user;