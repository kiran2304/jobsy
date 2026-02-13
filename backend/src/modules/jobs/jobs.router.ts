import { Router } from 'express';
import * as jobsController from './jobs.controller.js';
import { authenticateToken, authorizeRole } from '../../shared/middleware/auth.middleware.js';

const router = Router();

router.get('/', jobsController.getAllJobs);
router.post('/', authenticateToken, authorizeRole('ADMIN'), jobsController.createJob);
router.delete('/:id', authenticateToken, authorizeRole('ADMIN'), jobsController.deleteJob);

export default router;
