const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { uploadImg } = require('../../../config/imageUpload');

const { registerUser, login, googleOauth, confirmEmail, resetPassword, forgotPassword, getCart, deleteProductInCart, addToCart, getReminder, courseProgress, userProgress, markCompleted, addReminder,userProfile ,getProfile,updateProfile} = require('../controllers/userController');


router.post('/register', registerUser);

router.post('/login', login);
router.post('/oauth/google', passport.authenticate(
    'google-token', { session: false }), googleOauth);
router.get('/confirmEmail', confirmEmail);
router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword', resetPassword);
router.get('/userProgress', passport.authenticate('jwt', { session:false }), userProgress);
router.get('/profile', passport.authenticate('jwt', { session:false }), userProfile);
router.get('/getReminder', passport.authenticate('jwt', { session:false }), getReminder);
router.post('/addReminder', passport.authenticate('jwt', { session:false }), addReminder);
router.get('/cart/:id', passport.authenticate('jwt', { session:false }), getCart);
router.delete('/cart/:id', passport.authenticate('jwt', { session:false }), deleteProductInCart);
router.post('/cart/:id', passport.authenticate('jwt', { session:false }), addToCart);
router.get('/profile', passport.authenticate('jwt'), getProfile);
router.post('/profile', passport.authenticate('jwt', { session:false }), uploadImg.single('image'), updateProfile);
module.exports = router;
