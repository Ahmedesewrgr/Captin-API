import {
  registerUserService,
  loginUserService
} from '../services/authService.js';

export const registerUser = async (req, res) => {
  console.log('📥 registerUser called', req.body);
  try {
    const data = await registerUserService(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const data = await loginUserService(req.body);
    res.json(data);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};