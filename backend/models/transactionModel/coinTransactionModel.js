import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    amount: { type: Number, required: true },  // Amount of coins spent or received
    transactionType: { type: String, enum: ['earn', 'spend'], required: true }, // Whether coins were earned or spent
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },  // Optional, only for course purchases
}, { timestamps: true });

const coinTransaction = mongoose.model('coinTransaction', transactionSchema);

export default coinTransaction;
