import * as express from 'express';
import {
  getBudgets,
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
} from '../controllers/budget.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// Budget routes
router.route('/')
  .get(getBudgets)
  .post(createBudget);

router.route('/:id')
  .get(getBudget)
  .put(updateBudget)
  .delete(deleteBudget);

export default router; 