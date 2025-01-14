import asyncHandler from "../utils/asyncHndler.js"
import user from "../model/user.model.js"
import { ApiError } from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import uplodOnCloudinary from "../utils/cloudinary.js"


const createAccessAndRefreshToken = async (userId)=>
 {
     try {
        const user =await user.findOne(userId)
        const accessToken = generateAccessToken()
        const refreshToken = generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})

        return {accessToken, refreshToken}

     } catch (error) {
        throw new ApiError(500, "some thing went wrong while generating refresh and access token")
     }
 }

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

const userLogin = asyncHandler(async ( req,res)=>{
    const {userName, email,password} = req.body

    if(!userName || !email){
        throw new ApiError(400, "username or email is required")
    }

    const user = await user.findOne({
        $or : [{email}, {userName}]
    })

    if(!user){
    throw new ApiError(404, "User does not exits")
    }

    const isPasswordValid = await isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid User credentials")
    }

    const {accessToken, refreshToken} = await createAccessAndRefreshToken(user._id)

    const logedInUser = await user.findOne(user._id).select("-password -refreshToken")  
    
    const options = {
        httpOnly : true,
        sameSite : "none",
        secure : true
    }

   return res
   .status(200)
   .cookie("refreshToken", refreshToken, options)
   .cookie("accessToken", accessToken , options)
   .json(new ApiResponse(200, {
    user : logedInUser,
    accessToken,refreshToken
   }), "User loged in successfully")

})

const logOutUser = asyncHandler(async (req,res)=>{
await user.findByIdAndUpdate(req.user._id, {
    $set: {
        refreshToken : undefined
    }
},

    {new : true}
)
    const options = {
    httpOnly : true,
    sameSite : "none",
    secure : true
     }

     return res
     .status(200)
     .clearCookie("refreshToken", options)
     .clearCookie("accessToken", options)
     .json(new ApiResponse(200, {}, "User loged out successfully"))
})
   
export { 
    registerUser , 
    userLogin,
    logOutUser
}