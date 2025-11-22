import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const router = Router();

/**
 * @openapi
 * /api/v1/users/{id}:
 *   get:
 *     summary: Retrieve a single user profile
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User retrieved successfully
 */
router.get("/:id", userController.getUserById);

/**
 * @openapi
 * /api/v1/users:
 *   get:
 *     summary: Retrieve all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */
router.get("/", userController.getAllUsers);

/**
 * @openapi
 * /api/v1/users/{userId}/posts:
 *   get:
 *     summary: Retrieve all posts for a specific user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 */
router.get("/:userId/posts", userController.getPostsByUser);

/**
 * @openapi
 * /api/v1/users:
 *   post:
 *     summary: Create a user (non-authenticated)
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/", userController.createUser);

export default router;
