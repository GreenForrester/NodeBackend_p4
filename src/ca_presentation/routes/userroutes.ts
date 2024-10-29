// src/presentation/routes/UserRoutes.ts
import { Router } from 'express';
import { UserController } from '../controllers/usercontroller'
import passport from 'passport';

//middleware function
const authenticateJwt = passport.authenticate('jwt', { session: false });

const router = Router();
const userController = new UserController();

router.get('/', authenticateJwt, async (req, res) => userController.getAllUsers(req, res));
router.get('/id/:id', authenticateJwt, async (req, res) => userController.getUserById(req, res));
router.get('/name/:name', authenticateJwt, async (req, res) => userController.getUserByName(req, res));

router.delete('/:id', authenticateJwt, async (req, res) => userController.deleteUser(req, res));
router.put('/:id', authenticateJwt, async (req, res) => userController.updateUser(req, res));

//Put login route
router.post('/login',  async (req, res) => userController.login(req, res));
router.get('/logout/:id', authenticateJwt,async (req, res) => userController.logout(req, res));
router.post('/register', async (req, res) => userController.register(req, res));
router.post('/refreshtoken', authenticateJwt,async (req, res) => userController.refreshtoken(req, res));

export default router;