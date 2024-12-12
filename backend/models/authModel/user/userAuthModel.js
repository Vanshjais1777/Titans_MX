import mongoose from 'mongoose';

const userAuthSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String
    },
    profilePicture: {
        type: String
    },
    location: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ["employee", "employer", "mentor"]
    },
    password: {
        type: String,
        required: true
    },
    student: { type: Boolean, default: false }
    ,
    otp: { type: String }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const userAuthModel = mongoose.model('users', userAuthSchema);

export default userAuthModel;
