const express = require('express');
const router = express.Router(); // new instance of Router
const userRoutes = require('./src/routes/user-routes');
const chatRoutes = require('./src/routes/chat-routes');

/* GET home page */
router.get('/', (req, res) => {
    res.send('Servidor corriendo');
});

router.use('/user', userRoutes);
router.use('/chat', chatRoutes);

module.exports = router; // You export the intance