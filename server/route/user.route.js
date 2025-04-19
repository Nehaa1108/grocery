import { Router } from 'express'
import { loginController , logoutController, registerUserController, verifyEmailController } from '../controller/user.controller.js'
import auth from '../middleware/auth.js'
const userRouter = Router()


// registration API--
userRouter.post('/register',registerUserController)

export default userRouter
console.log("k")

// Verify Email API--
userRouter.post('/verify-email',verifyEmailController)



// Login API--
userRouter.post('/login',loginController)

//Logout API--
userRouter.get('/logout',auth,logoutController)