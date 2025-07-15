
import express from 'express'
const router = express.Router();
import { registerUser, loginUser } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';
import { validateBody } from '../middleware/validationMiddleware.js';
import { registerSchema, loginSchema } from '../schemas/authSchema.js';

router.post('/register', validateBody(registerSchema), registerUser);
router.post('/login', validateBody(loginSchema), loginUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/test", (req, res) => {
  res.send("Auth route is working");
});

router.get("/profile", protect, (req, res) => {
  res.json(req.user);
  
});
export default router;