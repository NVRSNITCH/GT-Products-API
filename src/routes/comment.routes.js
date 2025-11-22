import { Router } from "express";
import { validateComment } from "../middlewares/validator.middleware.js";
import * as commentController from "../controllers/comment.controller.js";

const router = Router();

/**
 * @openapi
 * /api/v1/comments:
 *   get:
 *     summary: Retrieve all comments
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 */
router.get("/", commentController.getAllComments);

/**
 * @openapi
 * /api/v1/comments/{postId}:
 *   get:
 *     summary: Get comments belonging to a single post
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 */
router.get("/:postId", commentController.getCommentsByPostId);

/**
 * @openapi
 * /api/v1/comments/{postId}:
 *   post:
 *     summary: Create a comment for a post
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - authorId
 *             properties:
 *               text:
 *                 type: string
 *               authorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Comment created successfully
 */
router.post("/:postId", validateComment, commentController.createComment);

export default router;
