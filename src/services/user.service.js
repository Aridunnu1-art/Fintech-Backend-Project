const User = require('../models/User');

const createError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

// SET OR UPDATE BUDGET
const setBudget = async (userId, budget) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createError(404, 'User not found');
  }

  user.budget = budget;
  await user.save();

  return {
    status: 200,
    body: {
      message: 'Budget updated successfully',
      budget: user.budget,
    },
  };
};

module.exports = {
  setBudget,
};