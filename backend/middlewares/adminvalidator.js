// import User from '../models/userModel'; // Adjust the path to your actual User model

// Admin role validation middleware
export const isAdmin = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ","");

        if(!token){
            return res.status(200).json({"message":"Authorization token missing"});
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decode.id;
      
        if (!user===process.env.ADMIN_AUTH_KEY) {
            return res.status(404).json({ message: 'User not found' });
        }

        // User is admin, proceed to the next middleware/route handler
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
