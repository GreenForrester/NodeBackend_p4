// src/presentation/routes/UserRoutes.ts
import { Router } from 'express';
import { OrderController } from '../controllers/ordercontroller';
import passport from 'passport';

const authenticateJwt = passport.authenticate('jwt', { session: false });

const router = Router();
const orderController = new OrderController();

router.get('/:id', authenticateJwt, async (req, res) => orderController.getOrderById(req, res));
router.get('/name/:name', authenticateJwt,async (req, res) => orderController.getOrderByCustomerId(req, res));
router.get('/', authenticateJwt, async (req, res) => orderController.getAllOrders(req, res));
router.post('/', authenticateJwt, async (req, res) => orderController.createOrder(req, res));
router.put('/:id', authenticateJwt, async (req, res) => orderController.updateOrder(req, res));
router.delete('/:id',authenticateJwt,async (req, res) => orderController.deleteOrder(req, res));

export default router;