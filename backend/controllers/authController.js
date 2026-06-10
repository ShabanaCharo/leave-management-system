const User = require('../models/User');
const { generateToken } = require('../config/jwt');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

 // Only managers can create other managers
  // if (role === 'manager' && (!req.user || req.user.role !== 'manager')) {
  //   return next(new AppError('Only managers can create manager accounts', 403));
  // }

  const newUser = await User.create({
    name,
    email,
    password,
    role: role || 'employee',
  });

  const token = generateToken(newUser._id, newUser.role);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        totalLeaves: newUser.totalLeaves,
        leavesTaken: newUser.leavesTaken,
      },
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  const token = generateToken(user._id, user.role);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        totalLeaves: user.totalLeaves,
        leavesTaken: user.leavesTaken,
      },
    },
  });
});