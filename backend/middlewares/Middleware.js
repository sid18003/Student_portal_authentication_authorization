const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    try {
        console.log("Cookies:", req.cookies);
        // console.log("Body:", req.body);
        console.log("Authorization Header:", req.header("Authorization"));
            
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token Missing',
            });
        }

        // Verify the token
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while verifying the token',
            error: error.message,
        });
    }
};

exports.authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied." });
        }
        next();
    };
};
