const express = require('express');
const { login ,register, allUser, setAvatar } = require('../controllers/userController');
const router = express.Router();

router.post('/api/login',login);
router.post('/api/signup',register);
router.get('/api/alluser/:id', allUser);
router.post('/api/setAvatar/:id',setAvatar);
module.exports = router;