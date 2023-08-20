const router = require('express').Router();
const cookieParser = require('cookie-parser');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const {
  login,
  createUser,
  logout,
} = require('../controllers/users');

router.post('/signup', createUser);
router.use(cookieParser());
router.post('/signin', login);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.get('/signout', logout);

router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует'));
});

module.exports = router;
