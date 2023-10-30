const express = require('express');
const { addMessages, getAllMessages } = require('../controllers/messagesController');
const router = express.Router();

router.post('/api/addmsg',addMessages);
router.post('/api/getallmsg',getAllMessages);

module.exports = router;
