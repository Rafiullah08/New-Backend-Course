import user from "../model/user.model.js";
import { ApiError } from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHndler.js";
import jwt from "jsonwebtoken";
export const jwtVerify = asyncHandler(async (req, _, next) => {
   try {
     const token = req.cookies?.accessToken || req.header ("Authorization")?.replace("Bearer ", "")
 
     if(!token){
         throw new ApiError(401, "Unauthorized request")
     }
 
 
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
 
     const user = await user.findById(decodedToken?._id).select("-password -refreshToken")
 
     if(!user){
         throw new ApiError(401, "invaild access token")
     }
     req.user = user
     next()
   } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
   }
})