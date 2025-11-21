// src/routes/user.routes.js
import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
// We should also add validation for user creation
// import { validateUser } from '../middlewares/validator.middleware.js';

const router = Router();

router.post('/', userController.createUser); // Add validateUser here later as a challenge
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

export default router;