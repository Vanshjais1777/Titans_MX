import mongoose from 'mongoose';

const adminAuthSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const adminAuthModel = mongoose.model('adminAuth', adminAuthSchema);

export default adminAuthModel;
