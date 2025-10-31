import express from 'express';
import { checkEmailHandler } from '../controllers/emailController';

const router = express.Router();

router.post('/check-email', checkEmailHandler);

export default router;