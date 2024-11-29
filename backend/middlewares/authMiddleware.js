const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};
exports.checkAuthStatus = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.status(401).json({ message: 'Not authenticated' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded token info to the request object
        next(); // Call next() to proceed to the next middleware or route handler
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authenticated' });
    }
};