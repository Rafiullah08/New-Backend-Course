import { Router } from "express";
import { getUserChannel,
     getWatchedHistory,
      logOutUser,
       registerUser,
        userLogin
     } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount: 1

        },
        // {
        //     name : "coverImage",
        //     maxCount: 1
        // }
    ]),
    registerUser)

router.route("/login").post(userLogin)

// secured routes
router.route("/logOut").post(jwtVerify, logOutUser)
router.route("/c/:userName").get(jwtVerify, getUserChannel)
router.route("/watchHistory").get(jwtVerify, getWatchedHistory)

export default router;



