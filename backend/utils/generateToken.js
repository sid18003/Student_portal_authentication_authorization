const jwt = require("jsonwebtoken");


exports.generateToken =(res,user_id) => {
    const token = jwt.sign({user_id},process.env.JWT_SECRETE,{
        expiresIn:"7d",
    });
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV !== "development",
        sameSite:"strict",
        maxAge : 30 * 24 * 60 * 60 * 1000,
    });
}

