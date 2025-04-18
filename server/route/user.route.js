import { Router } from 'express'
import { registerUserController, verifyEmailController } from '../controller/user.controller.js'
const userRouter = Router()


// registration API--
userRouter.post('/register',registerUserController)

export default userRouter


// Verify Email API--
userRouter.post('/verify-email',verifyEmailController)



// Login API--
