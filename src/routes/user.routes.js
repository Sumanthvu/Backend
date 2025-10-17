import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

//below line is when user comes to this route i.e //users then the user will be automatically taken to /register route
router.route("/register").post(registerUser)

//similar to register we can also implement many other routes too like login



export default router;
