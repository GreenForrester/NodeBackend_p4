// src/presentation/routes/UserRoutes.ts
import { Router } from 'express';
import { ProductController } from '../controllers/productcontroller';
import passport from 'passport';

const router = Router();
const productcontroller = new ProductController();
const authenticateJwt = passport.authenticate('jwt', { session: false });

router.get('/:id', authenticateJwt, async (req, res) => productcontroller.getProductById(req, res));
router.get('/name/:name', authenticateJwt, async (req, res) => productcontroller.getProductByName(req, res));
router.get('/', authenticateJwt, async (req, res) => productcontroller.getAllProduct(req, res));
router.post('/', authenticateJwt, async (req, res) => productcontroller.createProduct(req, res));
router.put('/:id', authenticateJwt, async (req, res) => productcontroller.updateProduct(req, res));
router.delete('/:id', authenticateJwt, async (req, res) => productcontroller.deleteProduct(req, res));

export default router;