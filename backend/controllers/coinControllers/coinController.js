import Employee from '../../models/userProfileModel/employeeModel.js';
import Course from '../../models/coursesModel/courseModel.js';
import Transaction from '../../models/transactionModel/coinTransactionModel.js';
import jwt from "jsonwebtoken";
// Function to get the current coin balance of the user
export const getUserCoins = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(500).json({"message":"Token is missing"});
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decode.id;
        const employee = await Employee.findOne({userId}); // Assuming user is authenticated and their ID is available in req.user
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        return res.status(200).json({ coins: employee.coin.amount });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Function to add coins to the user's account
export const addCoins = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            return res.status(500).json({"message":"Token is missing"});
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const userId = decode.id;
        const employee = await Employee.findOne({userId}); // Assuming user is authenticated and their ID is available in req.user
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }        
        
        
        user.coins += amount;
        await user.save();

        // Create a transaction record
        const transaction = new Transaction({
            user: user._id,
            amount,
            transactionType: 'earn',
        });
        await transaction.save();

        return res.status(200).json({ message: "Coins added successfully", coins: user.coins });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};

// Function to purchase a course
export const purchaseCourse = async (req, res) => {
    const { courseId } = req.body;  // Course to be bought

    try {
        const user = await User.findById(req.user.id); // Assuming user is authenticated
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if the user has enough coins to buy the course
        if (user.coins < course.priceInCoins) {
            return res.status(400).json({ message: "Insufficient coins" });
        }

        // Deduct the coins from the user's balance
        user.coins -= course.priceInCoins;
        await user.save();

        // Create a transaction record for spending coins
        const transaction = new Transaction({
            user: user._id,
            amount: course.priceInCoins,
            transactionType: 'spend',
            course: course._id,
        });
        await transaction.save();

        return res.status(200).json({ message: "Course purchased successfully", coins: user.coins });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error });
    }
};
