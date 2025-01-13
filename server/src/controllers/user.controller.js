import asyncHandler from "../utils/asyncHndler.js"
import user from "../model/user.model.js"
import { ApiError } from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import uplodOnCloudinary from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req, res) => {
 const { userName, email,fullName, password } = req.body

 if (!userName || !email ||  !password || !fullName) {
 
  throw new ApiError(400, "all fields are required")
 }
 
const existedUser = await user.findOne({
    $or: [{userName}, {email}]  
 })

 console.log(existedUser);
 

 if (existedUser) {
    throw new ApiError(409, "user with this email or name is already exist")
 }
 const coverImageLocalPath = req.files?.coverImage[0]?.path;

 const avatarLocalPath = req.files?.avatar[0]?.path;

 const avatar = await uplodOnCloudinary(avatarLocalPath)
 const coverImage = await uplodOnCloudinary(avatarLocalPath)

//  if (!avatarLocalPath) {
//     throw new ApiError(400, "avatar is required")
//  }

console.log(avatar, coverImage);


 const createUser = await user.create({
    userName,
    email,
    password,
    fullName,
    avatar,
    coverImage
 })

 


const createdUser =await user.findOne(user._id).select("-password -refreshToken")
 if(!createdUser){
        throw new ApiError(500, "user not created")
    }   
return res.status(201).json( 
    new ApiResponse(200, "user created successfully", createdUser)

)

})

export { registerUser }