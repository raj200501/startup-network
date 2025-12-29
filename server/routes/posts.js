const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

const userRepository = require('../repositories/users');
const postRepository = require('../repositories/posts');
const asyncHandler = require('../middleware/asyncHandler');
const { ApiError } = require('../lib/apiError');
const { ensureValid } = require('../utils/validation');

// @route    POST api/posts
// @desc     Create a post
// @access   Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  asyncHandler(async (req, res) => {
    ensureValid(req);

    const user = await userRepository.findById(req.user.id);

    if (!user) {
      throw new ApiError(404, 'user_not_found', 'User not found');
    }

    const post = await postRepository.createPost({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    res.json(post);
  })
);

// @route    GET api/posts
// @desc     Get all posts
// @access   Private
router.get(
  '/',
  auth,
  asyncHandler(async (req, res) => {
    const posts = await postRepository.findAll();
    res.json(posts);
  })
);

// @route    GET api/posts/:id
// @desc     Get post by ID
// @access   Private
router.get(
  '/:id',
  auth,
  asyncHandler(async (req, res) => {
    const post = await postRepository.findById(req.params.id);

    if (!post) {
      throw new ApiError(404, 'post_not_found', 'Post not found');
    }

    res.json(post);
  })
);

// @route    DELETE api/posts/:id
// @desc     Delete a post
// @access   Private
router.delete(
  '/:id',
  auth,
  asyncHandler(async (req, res) => {
    const post = await postRepository.findById(req.params.id);

    if (!post) {
      throw new ApiError(404, 'post_not_found', 'Post not found');
    }

    if (String(post.user) !== req.user.id) {
      throw new ApiError(403, 'not_authorized', 'User not authorized');
    }

    await postRepository.remove(post);

    res.json({ msg: 'Post removed' });
  })
);

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put(
  '/like/:id',
  auth,
  asyncHandler(async (req, res) => {
    const post = await postRepository.findById(req.params.id);

    if (!post) {
      throw new ApiError(404, 'post_not_found', 'Post not found');
    }

    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      throw new ApiError(400, 'already_liked', 'Post already liked');
    }

    post.likes.unshift({ user: req.user.id });

    await postRepository.save(post);

    res.json(post.likes);
  })
);

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put(
  '/unlike/:id',
  auth,
  asyncHandler(async (req, res) => {
    const post = await postRepository.findById(req.params.id);

    if (!post) {
      throw new ApiError(404, 'post_not_found', 'Post not found');
    }

    if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
      throw new ApiError(400, 'not_liked', 'Post has not yet been liked');
    }

    post.likes = post.likes.filter(
      ({ user }) => String(user) !== req.user.id
    );

    await postRepository.save(post);

    res.json(post.likes);
  })
);

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  asyncHandler(async (req, res) => {
    ensureValid(req);

    const user = await userRepository.findById(req.user.id);
    const post = await postRepository.findById(req.params.id);

    if (!user) {
      throw new ApiError(404, 'user_not_found', 'User not found');
    }

    if (!post) {
      throw new ApiError(404, 'post_not_found', 'Post not found');
    }

    const newComment = {
      id: crypto.randomUUID(),
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);

    await postRepository.save(post);

    res.json(post.comments);
  })
);

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete(
  '/comment/:id/:comment_id',
  auth,
  asyncHandler(async (req, res) => {
    const post = await postRepository.findById(req.params.id);

    if (!post) {
      throw new ApiError(404, 'post_not_found', 'Post not found');
    }

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      throw new ApiError(404, 'comment_not_found', 'Comment does not exist');
    }

    if (String(comment.user) !== req.user.id) {
      throw new ApiError(403, 'not_authorized', 'User not authorized');
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await postRepository.save(post);

    res.json(post.comments);
  })
);

module.exports = router;
