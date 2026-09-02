const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {

    // Authorization header get karo
    const authHeader = req.header("Authorization");
    console.log("Authorization Header:", authHeader);
    
    // Bearer token se actual token nikalo
    const token = authHeader && authHeader.split(" ")[1];
    // Token nahi mila
    if (!token) {
        return res.status(401).json({
            error: "Access denied, token missing",
            message: "Session expired, please login again"
        });
    }
    try {
        // Token verify karo
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        // Decoded user information request me store karo
        req.user = decoded;
        // Controller ko allow karo
        next();
    } catch (error) {
        console.log("JWT token verification error:", error.message);
        return res.status(401).json({
            error: "Invalid Token",
            message: "Session expired, please login again"
        });
    }
}

module.exports = authenticateJWT;