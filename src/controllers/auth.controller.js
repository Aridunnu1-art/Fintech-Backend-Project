const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, ...(error.details ? { details: error.details } : { error: error.message }) });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(result.status).json(result.body);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, ...(error.details ? { details: error.details } : { error: error.message }) });
  }
};

module.exports = {
  register,
  login,
};
