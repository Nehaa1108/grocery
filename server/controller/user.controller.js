

import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';
import uploadImageClodinary from '../utils/uploadImageCloudinary.js'

//Regisetr 
export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Provide name, email, and password",
        error: true,
        success: false
        // data:save
      });
    }

    const User = await UserModel.findOne({ email });

    if (User) {
      return res.json({
        message: "Email already registered",
        error: true,
        success: false
      });
    }

    const salt = await bcryptjs.genSalt(10)
    // FIXED: genSalt not getSalt
    const hashPassword = await bcryptjs.hash(password, salt);

    const payload = {
      name,
      email,
      password: hashPassword
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save(); // FIXED: 'constsave' typo

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`;

    const verifyEmail =  await sendEmail({
      sendTo: email,
      subject: "Verification Email from Grocify",
      html: verifyEmailTemplate({
        name,
        url: verifyEmailUrl
      })
    });

    return res.json({
      message: "User registered successfully",
      error: false,
      success: true,
      data : save
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}


// Email Verification
export async function verifyEmailController(req,res){
  try{
      const { code } = req.body
      const user = await UserModel.findOne({_id : code })

      if(!user){
        return res.status(400).json({
          message:"Invalid code",
          error : true,
          success : false
        })
      }

      const updateUser = await UserModel.updateOne({_id  : code },{
        verify_email : true
      })

      return res.json({
        message : "Verify email done ",
        error : fales,
        success: true
      })
  }
  catch (error)
  {
    //500- for server error
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

//Login controller
export async function loginController(req,res) {
  try{
    const { email, password } =req.body


    if(!email || !password)
    {
      return res.status(400).json({
        message:"provide email ,password",
        error:true,
        success:false
      })
    }

    const user =  await UserModel.findOne({email})

    if(!user)
    {
      return res.status(400).json({
        message:"User is not register",
        error : true,
        success: false
      })
    }

    if(user.status !== "Active")
    {
      return res.status(400).json({
        message:"Contact to Admin",
        error:true,
        success:false
      })
    }

    const checkPassword = await bcryptjs.compare(password,user.password)
    if (!checkPassword)
    {
      return res.status(400).json({
        message:"Check Your  Password",
        error:true,
        success:false
      })
    }

    //access token
    const accessToken = await generatedAccessToken(user._id)
    const refreshToken = await generatedRefreshToken(user._id)

    const cookiesOption={
      httpOnly:true,
      secure:true,
      //use both frontend and backend site
      sameSite:"None"
    }
    res.cookie('accessToken',accessToken,cookiesOption)
    res.cookie('refreshToken',refreshToken,cookiesOption)

    return res.json({
      message:"Login Successfully",
      error:false,
      success:true,
      data:{
        accessToken,
        refreshToken
      }
    })
  }
  catch (error)
  {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    })
  }
}

//Logout Controller
export async function logoutController(req,res)
{
  try{

    const userid = req.userId //come from middleware


    const cookiesOption={
      httpOnly:true,
      secure:true,
      //use both frontend and backend site
      sameSite:"None"
    }

    res.clearCookie("accessToken",cookiesOption)
    res.clearCookie("refreshToken",cookiesOption)

//identify the user
//login refresh token show 
//logout refresh token empty
const removeRefreshToken = await UserModel.findByIdAndUpdate(userid,{
  refresh_token: ""
})


    return res.json(
      {
        message:"Logout Successfully",
        error:false,
        success:true
      }
    )
  }
  catch(error)
  {
    return res.status(500).json({
      message:error.message || error,
      error:true,
      success:false
    })
  }
}

//upload user avatar
export async  function uploadAvatar(request,response){
  try {
    //save avatar in db --userId
      const userId = request.userId // auth middlware
      const image = request.file  // multer middleware

      const upload = await uploadImageClodinary(image)
      //help of userid --find user
      const updateUser = await UserModel.findByIdAndUpdate(userId,{
          avatar : upload.url
      })

      return response.json({
          message : "upload profile",
          success : true,
          error : false,
          data : {
              _id : userId,
              avatar : upload.url
          }
      })

  } catch (error) {
      return response.status(500).json({
          message : error.message || error,
          error : true,
          success : false
      })
  }
}

//Update User Details API
export async function updateUserDetails(req,res)
{
  try {
    //user login only they can update
    const userId= req.userId //come from auth middleware
    const { name , email, mobile, password }= req.body
//using userId --uppadte user details

let hashPassword= ""
if(password){
  const salt = await bcryptjs.genSalt(10)
  hashPassword = await bcryptjs.hash(password, salt);
}
const updateUser = await UserModel.updateOne({_id : userId},{
  ...(name && {name : name }),
  ...(email && {email : email }),
  ...(mobile && {mobile : mobile }),
  ...(password && {password : hashPassword})
})

return res.json({
  message:"updated user successfully",
  error:false,
  success:true,
  data:updateUser
})

  } catch (error) {
    return res.status(500).json({
      message:error.message || error,
      error:true,
      success:false
    })
  }
}

//forgot Password API--
