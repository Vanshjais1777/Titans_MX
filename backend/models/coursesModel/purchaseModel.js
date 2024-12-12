import mongoose from 'mongoose';

const { Schema } = mongoose;

const purchaseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  purchaseDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['Paid', 'Pending', 'Refunded'], required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

const Purchase = mongoose.model('Purchase', purchaseSchema);

export default Purchase;
