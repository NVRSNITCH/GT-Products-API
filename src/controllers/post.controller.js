// src/controllers/post.controller.js
import { validationResult } from 'express-validator';
import * as postService from '../services/post.service.js';

export const getAllPosts = (req, res) => {
    const posts = postService.getAllPosts();
    res.json(posts);
};

export const getPostById = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = postService.getPostById(postId);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
};

// src/controllers/post.controller.js

export const createPost = (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // This part only runs if validation passes
    const { title, content } = req.body;
    // We can remove the manual check because the validator handles it
    // if (!title || !content) { ... }
    const newPost = postService.createPost({ title, content });
    res.status(201).json(newPost);
};

export const updatePost = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = postService.updatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
};

export const deletePost = (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const success = postService.deletePost(postId);
    if (!success) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(204).send();
};