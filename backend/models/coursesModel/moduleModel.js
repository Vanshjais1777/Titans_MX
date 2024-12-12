import mongoose from 'mongoose';

const { Schema } = mongoose;

const moduleSchema = new Schema({
  title: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  description: { type: String },
  sequenceOrder: { type: Number, required: true },
}, { timestamps: true });

const Module = mongoose.model('Module', moduleSchema);

export default Module;
