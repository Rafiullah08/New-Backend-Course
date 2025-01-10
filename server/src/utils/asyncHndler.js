

const asyncHandler = (responseHandler)=>{
(req,res,next)=>{
    Promise.resolve(responseHandler(req,res,next)).catch((error)=>next(error))
}
}

export {asyncHandler}

// const asyncHandler = (func)=> async (req,res,next)=>{
// try {
    
//     await func(req,res,next)
// } catch (error) {
//     res.status(error.code || 500).json({
//         success : false,
//         message : error.message
//     })
// }
// }