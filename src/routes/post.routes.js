// src/routes/post.routes.js
import { Router } from 'express';
import { body } from 'express-validator'; // <-- ADD THIS IMPORT
import * as postController from '../controllers/post.controller.js';

const router = Router();

// Validation rules for creating a post
const createPostRules = [
    body('title')
        .trim() // Sanitizer to remove leading/trailing whitespace
        .notEmpty().withMessage('Title is required.')
        .isString().withMessage('Title must be a string.'),
    body('content')
        .trim()
        .notEmpty().withMessage('Content is required.')
        .isString().withMessage('Content must be a string.')
];

// Apply the rules as middleware to the POST route
router.post('/', createPostRules, postController.createPost);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost); // We will update this later
router.delete('/:id', postController.deletePost);

export default router;