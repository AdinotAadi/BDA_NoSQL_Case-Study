import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ['submitted', 'received'], default: 'submitted' },
  createdAt: { type: Date, default: Date.now },
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);
