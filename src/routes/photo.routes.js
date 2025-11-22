import { Router } from "express";
import * as photoController from "../controllers/photo.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.use(authMiddleware);

/**
 * @openapi
 * /api/v1/photos:
 *   get:
 *     summary: Retrieve all photos for the authenticated user
 *     tags:
 *       - Photos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User photos retrieved successfully
 */
router.get("/", photoController.getUserPhotos);

/**
 * @openapi
 * /api/v1/photos/upload:
 *   post:
 *     summary: Upload a photo for the authenticated user
 *     tags:
 *       - Photos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *               caption:
 *                 type: string
 *     responses:
 *       201:
 *         description: Photo uploaded successfully
 */
router.post("/upload", upload.single("photo"), photoController.uploadPhoto);

/**
 * @openapi
 * /api/v1/photos/{id}:
 *   delete:
 *     summary: Delete a photo by ID
 *     tags:
 *       - Photos
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
 *         description: Photo deleted successfully
 */
router.delete("/:id", photoController.deleteUserPhoto);

export default router;
