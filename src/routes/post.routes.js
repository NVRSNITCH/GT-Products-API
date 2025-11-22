import { Router } from "express";
import { validatePost } from "../middlewares/validator.middleware.js";
import { validateComment } from "../middlewares/validator.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import * as postController from "../controllers/post.controller.js";
import * as commentController from "../controllers/comment.controller.js";

const router = Router();

/**
 * @openapi
 * /api/v1/posts:
 *   get:
 *     summary: Retrieve all posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: A list of posts wrapped in an ApiResponse
 */
router.get("/", postController.getAllPosts);

/**
 * @openapi
 * /api/v1/posts:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created post
 */
router.post("/", authMiddleware, validatePost, postController.createPost);

/**
 * @openapi
 * /api/v1/posts/{postId}/comments:
 *   post:
 *     summary: Create a comment for a specific post
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
 *         description: Created comment
 */
router.post(
  "/:postId/comments",
  validateComment,
  commentController.createComment
);

/**
 * @openapi
 * /api/v1/posts/{postId}/comments:
 *   get:
 *     summary: Retrieve comments for a specific post
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
 *         description: Comments retrieved
 */
router.get("/:postId/comments", commentController.getCommentsByPostId);

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   get:
 *     summary: Retrieve a single post
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post retrieved
 */
router.get("/:id", postController.getPostById);

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   put:
 *     summary: Update a post (full update)
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated post
 */
router.put("/:id", authMiddleware, validatePost, postController.updatePost);

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   patch:
 *     summary: Partially update a post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post partially updated
 */
router.patch("/:id", authMiddleware, postController.partiallyUpdatePost);

/**
 * @openapi
 * /api/v1/posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deleted successfully
 */
router.delete("/:id", authMiddleware, postController.deletePost);

export default router;
