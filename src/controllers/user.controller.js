const userService = require('../services/user.service');

// SET BUDGET
const setBudget = async (req, res) => {
  try {
    const result = await userService.setBudget(
      req.userId,
      req.body.budget
    );

    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

module.exports = {
  setBudget,
};