import * as express from 'express';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Placeholder route
// @ts-ignore
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Reports API - coming soon',
  });
});

export default router; 