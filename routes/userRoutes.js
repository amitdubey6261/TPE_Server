const { registerUser, loginUser, logout, getAllUsers, getOneUser } = require('../controllers/userControllers');
const { isAuthenticateduser } = require('../middleware/auth');

const router = require('express').Router();

router.route('/users/signup').post(registerUser);
router.route('/users/login').post(loginUser);
router.route('/users/logout').get(logout);
router.route('/users/all').get( isAuthenticateduser , getAllUsers );
router.route('/users/:id').get( isAuthenticateduser , getOneUser  );

module.exports = router ; 