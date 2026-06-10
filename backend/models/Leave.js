const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Leave must belong to an employee'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date'],
  },
  reason: {
    type: String,
    required: [true, 'Please provide a reason for leave'],
    trim: true,
  },
  leaveType: {
    type: String,
    required: [true, 'Please specify leave type'],
    enum: ['Vacation', 'Sick leave', 'Personal', 'Other'],
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  days: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate leave days
leaveSchema.pre('save', function (next) {
  const diffTime = Math.abs(this.endDate - this.startDate);
  this.days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  next();
});

const Leave = mongoose.model('Leave', leaveSchema);
module.exports = Leave;
