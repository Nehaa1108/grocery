import { Router } from 'express'
import { loginController , logoutController, registerUserController, updateUserDetails, uploadAvatar, verifyEmailController } from '../controller/user.controller.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'
const userRouter = Router()


// registration API--
userRouter.post('/register',registerUserController)

export default userRouter


// Verify Email API--
userRouter.post('/verify-email',verifyEmailController)



// Login API--
userRouter.post('/login',loginController)

//Logout API--
userRouter.get('/logout',auth,logoutController)

//image--Avatar API--
userRouter.put('/upload-avatar',auth,upload.single('avatar'),uploadAvatar)
//put-bcz update some fields
//auth --only auth access


//user update details API --
userRouter.put('/update-user',auth,updateUserDetails)