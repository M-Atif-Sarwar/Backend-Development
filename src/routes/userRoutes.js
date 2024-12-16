import {Router} from "express"
import {RegisterUser} from "../controllers/UserController.js"
import {upload} from "../middlewares/multeMiddleware.js"
const router=Router();
// use file middle multer

router.route('/register').post(
    // use file middle ware using multer package 
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },

        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    RegisterUser) // Register user is user controller
export default router