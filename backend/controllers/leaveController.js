const Leave = require('../models/Leave');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllLeaves = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.user.role !== 'manager') {
    filter.employee = req.user.id;
  }

  const leaves = await Leave.find(filter).populate('employee', 'name email');

  res.status(200).json({
    status: 'success',
    results: leaves.length,
    data: { leaves },
  });
});

exports.getMyLeaves = catchAsync(async (req, res, next) => {
  const leaves = await Leave.find({ employee: req.user.id }).populate('employee', 'name email');

  res.status(200).json({
    status: 'success',
    results: leaves.length,
    data: { leaves },
  });
});

exports.getLeave = catchAsync(async (req, res, next) => {
  const leave = await Leave.findById(req.params.id).populate('employee', 'name email');

  if (!leave) return next(new AppError('No leave found with that ID', 404));

  if (req.user.role !== 'manager' && req.user.id !== leave.employee._id.toString()) {
    return next(new AppError('You do not have permission to view this leave', 403));
  }

  res.status(200).json({
    status: 'success',
    data: { leave },
  });
});

exports.createLeave = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'employee') {
    return next(new AppError('Only employees can apply for leaves', 403));
  }

  const { startDate, endDate, reason, leaveType } = req.body;

  if (new Date(startDate) > new Date(endDate)) {
    return next(new AppError('Start date must be before end date', 400));
  }

  if (new Date(startDate) < new Date()) {
    return next(new AppError('Leave must be for future dates', 400));
  }

  const leave = await Leave.create({
    employee: req.user.id,
    startDate,
    endDate,
    reason,
    leaveType,
  });

  res.status(201).json({
    status: 'success',
    data: { leave },
  });
});

exports.updateLeaveStatus = catchAsync(async (req, res, next) => {
  if (req.user.role !== 'manager') {
    return next(new AppError('Only managers can update leave status', 403));
  }

  const { status } = req.body;

  if (!['approved', 'rejected'].includes(status)) {
    return next(new AppError('Status must be approved or rejected', 400));
  }

  const leave = await Leave.findById(req.params.id);
  if (!leave) return next(new AppError('No leave found with that ID', 404));

  if (leave.status !== 'pending') {
    return next(new AppError('Leave already processed', 400));
  }

  leave.status = status;

  // ✅ Save without validation (since we only update status)
  await leave.save({ validateBeforeSave: false });

  if (status === 'approved') {
    const employee = await User.findById(leave.employee);
    employee.leavesTaken += leave.days || 0;
    await employee.save();
  }

  res.status(200).json({
    status: 'success',
    data: { leave },
  });
});


exports.deleteLeave = catchAsync(async (req, res, next) => {
  const leave = await Leave.findByIdAndDelete(req.params.id);

  if (!leave) return next(new AppError('No leave found with that ID', 404));

  if (req.user.role !== 'manager' && req.user.id !== leave.employee.toString()) {
    return next(new AppError('You do not have permission to delete this leave', 403));
  }

  if (leave.status === 'approved') {
    const employee = await User.findById(leave.employee);
    employee.leavesTaken = Math.max(0, employee.leavesTaken - leave.days);
    await employee.save();
  }

  res.status(204).json({ status: 'success', data: null });
});
