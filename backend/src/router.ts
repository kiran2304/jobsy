import { Router } from 'express';
import authRouter from './modules/auth/auth.router.js';
import jobsRouter from './modules/jobs/jobs.router.js';
import applicationsRouter from './modules/applications/applications.router.js';
import readinessRouter from './modules/readiness/readiness.router.js';
import { authenticateToken } from './shared/middleware/auth.middleware.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/jobs', jobsRouter);
router.use('/applications', authenticateToken, applicationsRouter);
router.use('/readiness', authenticateToken, readinessRouter);

export default router;
