import asyncHandler from "../utils/asyncHndler.js"
import user from "../model/user.model.js"
import { ApiError } from "../utils/apiError.js"

const registerUser = asyncHandler(async (req, res) => {
 const { name, email, password } = req.body

 if (!name || !email || !password) {
 
  throw new ApiError(400, "all fields are required")
 }
 
const existedUser = user.findOne({
    $or: [{ email}, {name}]
 })

 if (existedUser) {
    throw new ApiError(409, "user with this email or name is already exist")
 }

 const avatarLocalPath = req.files?.avatar[0]?.path;
    
})




export {registerUser, }