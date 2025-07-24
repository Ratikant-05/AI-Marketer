import User from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const Signup = async (req,res) => {
  try {
    const userName = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;
    console.log(userName,email,password)

     if(!userName || !email || !password){
        return res.status(400).json({
        message:"Please Enter All Fields"
       })
    }

    if(password.length<6){
      return res.status(400).json({
        message:"Password must be atlest of 6 characters"
      })
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
      return res.status(400).json({
        message:"This Email already exists"
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    console.log(hashedPassword);
    const user = new User({
      userName,
      email,
      password:hashedPassword
    })

    await user.save();
    console.log("User Saved Successfully");
    res.status(200).json({
      message:"Signup Successfull",
      data:{
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password
      }
    })
    console.log("Signup Successfull");
  } 
  catch (error) {
    res.status(500).json({
      message:"Internal Server Error",
      error:error.message
    })
    console.log(error.message)
  }
}

const Login = async (req,res) => {
  try {
    const {email,password} = req.body;
    
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({
        message:"User not found"
      })
    }

    if(user){
      const isPasswordCorrect = await bcrypt.compare(password,user.password);
      if(isPasswordCorrect){
        const token = jwt.sign({email:user.email},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 3600000 // 1 hour in milliseconds
        });
        return res.status(200).json({
          message:"Login Successfull",
          data:{
            userName:user.userName,
            email:user.email
          }
        })
      }else{
        return res.status(400).json({
          message:"Password is incorrect"
        })
      }
    }
    console.log("Login Successfull");
  } catch (error) {
    console.log(error);
  }
}

const Logout = (req,res) => {
  try {
    const token = req.cookies.token;
    if(!token){
      return res.status(400).json({
        message:"Token not found"
      })
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,user) => {
      if(err){
        return res.status(400).json({
          message:"Invalid token"
        })
      }
    })
    res.clearCookie("token");
    res.status(200).json({
      message:"Logout Successfull"
    })
  } catch (error) {
    console.log(error);
  }
}

export {Signup,Login,Logout};