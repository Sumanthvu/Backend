import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//below line is when user comes to this route i.e //users then the user will be automatically taken to /register route
//using upload we we are able to get theuser files and temporarily store in the backend  using multer 
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

//similar to register we can also implement many other routes too like login

export default router;
