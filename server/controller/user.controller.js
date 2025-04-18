// // for new register user

// import sendEmail from '../config/sendEmail.js'
// import UserModel from '../models/user.model.js'
// import bcryptjs from 'bcryptjs'
// export async function registerUserController(req,res)
// {
//   try{
//     // new user resgister
//     const { name, email, password} = req.body

//     if(!name || !email ||!password)
//     {
//       return res.status(400).json({
//         message:"provide email, name, password",
//         error:true,
//         success: false
//       })
//     }
//     // check email and all exist or not 
//     const user = await UserModel.findOne({ email })

//     if(user)
//     {
//       return Response.json({
//         message: "Already register email",
//         error:true,
//         success:false
//       })
//     }
//       // user provide password plain format --we can not store like that ---for that we convert data in hash
//   const salt = await bcryptjs.getSalt(10)
//   const hashPassword =  await bcryptjs.hash(password,salt)

//   // store in db
//   const payload = {
//     name,
//     email,
//     password : hashPassword
//   }

//   //save this data in db 
//   const newUser = new UserModel(payload)
//   const save = await newUser.save()


// const VerifyEmailUrl= `${process.env.FRONTEND_URL }/verify-email?code=${save?._id}`

// const verifyEmail = await sendEmail({
//   sendTo: email,
//   subject: "verification email from grocify",
//   html: verifyEmailTemplate({
//     name,
//     url:VerifyEmailUrl
//   })
// })


// return Response.json({
//   message:"User register successfully",
//   error:false,
//   success:true,
// })
// }



// // re_f8QnCVim_9pfQuHz4qUDeeoZyu57dQhPQ

//   catch (error)
//   {
//     return res.status(500).json({
//       message:error.message || error,
//       error:true,
//       success: false
//     })
//   }
// }


import sendEmail from '../config/sendEmail.js'
import UserModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js';


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
