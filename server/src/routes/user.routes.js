import { Router } from "express";
import { logOutUser, registerUser, userLogin } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount: 1

        },{
            name : "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

router.route("/login").post(userLogin )

// secured routes
router.route("/logOut").post(jwtVerify, logOutUser)

export default router;