function isAdmin(req, res, next) {

    // Pehle check karo ki authenticateJWT
    // ne req.user set kiya hai ya nahi
    if (!req.user) {
        return res.status(401).json({
            status: "N",
            message: "Authentication required"
        });
    }

    // Check karo user admin hai ya nahi
    if (!req.user.isAdmin) {
        return res.status(403).json({
            status: "N",
            message: "Access denied. Admin only."
        });
    }

    // User admin hai
    next();
}

module.exports = isAdmin;