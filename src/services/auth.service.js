const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { userValidation } = require('../validator/validation');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

const createError = (status, message, details = null) => {
  const error = new Error(message);
  error.status = status;
  if (details) error.details = details;
  return error;
};

const register = async (body) => {
  const { error, value } = userValidation.register.validate(body);
  if (error) {
    throw createError(400, 'Validation error', error.details);
  }

  const { name, email, password } = value;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createError(400, 'User already exists with this email');
  }

  const user = new User({ name, email, password });
  await user.save();

  const token = generateToken(user._id);

  return {
    status: 201,
    body: {
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  };
};

const login = async (body) => {
  const { error, value } = userValidation.login.validate(body);
  if (error) {
    throw createError(400, 'Validation error', error.details);
  }

  const { email, password } = value;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw createError(400, 'Invalid email or password');
  }

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    throw createError(400, 'Invalid email or password');
  }

  const token = generateToken(user._id);

  return {
    status: 200,
    body: {
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  };
};

module.exports = {
  register,
  login,
};
