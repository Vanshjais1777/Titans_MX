import dotenv from 'dotenv';
dotenv.config(); // Load environment variables

export const adminLogin = (req, res) => {
    const { adminKey } = req.body; // Extract the admin key from the request body

    // Check if the admin key is provided
    if (!adminKey) {
        return res.status(400).json({ message: "Admin key is required" });
    }

    // Validate the admin key
    if (adminKey === process.env.ADMIN_AUTH_KEY) {
        // Key matches, grant access
        return res.status(200).json({ message: "Admin authenticated successfully" });
    } else {
        // Key doesn't match
        return res.status(401).json({ message: "Invalid admin key" });
    }
};
