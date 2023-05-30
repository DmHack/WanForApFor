const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getMe, getMeSer, renewAccessToken, setGitVk,
    restPass, restPassEm, deleteAkk, getUserAkk, deleteAkkEm, cod, newName,
    newNameEm, newPhMan, newEmail, newEmailEm } = require('../controllers/userController');

const { protect } = require('../middleware/authMiddleware');

// routes
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.post('/meSer', protect, getMeSer)
router.post('/updrefresh', renewAccessToken)
router.post('/sendRestPass', restPass)
router.post('/sendRestPassEm', restPassEm)
router.post('/deleteAkk', protect, deleteAkk)
router.post('/deleteAkkEm', protect, deleteAkkEm)
router.post('/newName', protect, newName)
router.post('/newNameEm', protect, newNameEm)
router.post('/newPhMan', protect, newPhMan)
router.post('/newEmail', protect, newEmail)
router.post('/newEmailEm', protect, newEmailEm)
router.post('/cod', cod)
router.post('/getUserAkk', protect, getUserAkk)
router.post('/setGitVk', protect, setGitVk)

module.exports = router;
