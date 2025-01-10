import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'



const userSchema = new Schema({
   userName :{
    type: string,
    required : true,
    unique: true,
    lowercase : true,
    trim : true,
    index: true,
   },
   email :{
    type: string,
    required : true,
    unique: true,
    lowercase : true,
    trim : true,
   },
   fullName :{
    type: string,
    required : true,
   index :true,
    trim : true,
   },
   avatar :{
    type: string,
   required: true
   },
   coverImage :{
    type: string,
   required: true
   },
   watchedHistory : [
    {
        type : Schema.type.ObjectId,
        ref : "video"
    }
   ],
   password : {
    type : string,
    required : [true, "Password is required"]
   },
   refreshToken : {
    type : string,
   }
} , {timestamps: tru})


userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = async function () {
    jwt.sign({
        _id : this_id,
        email : this.email,
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRE
    }
)
}

userSchema.methods.refreshToken = async function () {
    jwt.sign({
        _id : this_id,
        
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRE
    }
)
}

export const User = mongoose.model('User',userSchema)