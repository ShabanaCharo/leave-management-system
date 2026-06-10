const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select('-password');

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  if (req.user.role !== 'manager' && req.user.id !== req.params.id) {
    return next(new AppError('You do not have permission to view this user', 403));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {

  const filteredBody = { ...req.body };
  const excludedFields = ['password', 'role'];
  excludedFields.forEach((el) => delete filteredBody[el]);
  const updatedUser = await User.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true,
  }).select('-password');

  if (!updatedUser) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('-password');

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});