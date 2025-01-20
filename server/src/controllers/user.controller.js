import asyncHandler from "../utils/asyncHndler.js"
import user from "../model/user.model.js"
import { ApiError } from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import uplodOnCloudinary from "../utils/cloudinary.js"





const createAccessAndRefreshToken = async (userId)=>

 {
    
     try {
        
        const users = await user.find(userId)
        console.log(users, "user");
    
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
//  const coverImageLocalPath = req.files?.coverImage[0]?.path;

 const avatarLocalPath = req.files?.avatar[0]?.path;

 const avatar = await uplodOnCloudinary(avatarLocalPath)
//  const coverImage = await uplodOnCloudinary(avatarLocalPath)

//  if (!avatarLocalPath) {
//     throw new ApiError(400, "avatar is required")
//  }

console.log(avatar, );


 const createUser = await user.create({
    userName,
    email,
    password,
    fullName,
    avatar,
    // coverImage
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

    

    if(!(userName || email)){
        throw new ApiError(400, "username or email is required")
    }


    const chekUser = await user.findOne({$or : [{userName}, {email}]})


    console.log(chekUser._id.toString(), "userdata");
    if(!chekUser){
    throw new ApiError(404, "User does not exits")
    }

    // const isPasswordValid = await bcrypt.compare(password, chekUser.password)
    

    if(chekUser.password !== password){
        throw new ApiError(401, "Invalid User credentials")
    }

    const {accessToken, refreshToken} = await createAccessAndRefreshToken(chekUser._id)

    const logedInUser = await chekUser.findOne({_id:chekUser._id})
    console.log(logedInUser, "logedInUser");
    
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
    $unset: {
        refreshToken : 1
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
   

const getUserChannel = asyncHandler(async (req,res)=>{
    const {userName} = req.params

    if(!userName?.trim()){
        throw new ApiError(400, "username is required")
    }
const channel = await user.aggregate([
    {
        $match : {
            userName : userName?.toLowerCase()
        },
        $lookup:{
            from : "subscriptions",
            localField : "_id",
            foreignField : "channel",
            as : "subscribers"
        }
    },
    {
        $lookup : {
            from : "videos",
            localField : "_id",
            foreignField : "subscriber",
            as : "subscribedTo"
        }
    },
    {
        $addFields : {
          subscribers : {
              $size : "$subscribers"
          },
          channelSubscribeToCount : {
                $size : "$subscribedTo"
          }  ,
          isSubscribed : {
              $cond : {
                  if : {
                      $in : [req.user._id, "$subscribers.subscriber"]
                  },
                  then : true,
                  else : false
              }
          }
        }
    },
    {
        $project : {
            userName : 1,
            subscribers : 0,
            channelSubscribeToCount : 1,
            channelSubscribeToCount : 1,
            isSubscribed : 1,
            avatar : 1, 
            coverImage : 1,
            createdAt : 1
        
        }
    }
])
console.log(channel, "channel");

if(!channel?.length){
    throw new ApiError(404, "channel not found")
}

res.status(200).json(new ApiResponse(200, channel[0], "channel"))
})

const getWatchedHistory = asyncHandler(async (req,res)=>{

    const user = await user.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
           $lookup: {
            from: "videos",
                localField : "watchHistory",
                foreignField: "_id",
                as : "watchHistory",
                pipeline : [
                    {
                        $lookup : {
                            from : "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [
                                {
                                    $project : {
                                        fullName : 1,
                                        userName : 1,
                                        avatar : 1
                                    }
                                }
                            ]
                        }
                    }
                ]
           }
        }
    ])

   return res.status(200)
   .json(
    new ApiResponse(
        200,
        user[0],
        "watch history fetched successfully"
    )
   ) 
})


export { 
    registerUser , 
    userLogin,
    logOutUser,
    getUserChannel,
    getWatchedHistory
}
