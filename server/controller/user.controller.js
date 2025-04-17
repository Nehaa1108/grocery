// for new register user

import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
export async function registerUserController(req,res)
{
  try{
    // new user resgister
    const { name, email, password} = req.body

    if(!name || !email ||!password)
    {
      return res.status(400).json({
        message:"provide email, name, password",
        error:true,
        success: false
      })
    }
    // check email and all exist or not 
    const user = await UserModel.findOne({ email })

    if(user)
    {
      return Response.json({
        message: "Already register email",
        error:true,
        success:false
      })
    }
      // user provide password plain format --we can not store like that ---for that we convert data in hash
  const salt = await bcryptjs.getSalt(10)
  const hashPassword =  await bcryptjs.hash(password,salt)

  // store in db
  const payload = {
    name,
    email,
    password : hashPassword
  }

  //save this data in db 
  const newUser = new UserModel(payload)
  constsave = await newUser.save()


const VerifyEmailUrl= `${process.env.FRONTEND_URL }/verify-email?code=${save?._id}`

const verifyEmail = await sendEmail({
  sendTo: email,
  subject: "verification email from grocify",
  html: verifyEmailTemplate({
    name,
    url:VerifyEmailUrl
  })
})


return Response.json({
  message:"User register successfully",
  error:false,
  success:true,
  data:save
})
}



// re_f8QnCVim_9pfQuHz4qUDeeoZyu57dQhPQ

  catch (error)
  {
    return res.status(500).json({
      message:error.message || error,
      error:true,
      success: false
    })
  }
}