import { Router } from 'express';
import * as readinessController from './readiness.controller.js';

const router = Router();

router.get('/assessments', readinessController.getAssessments);
router.post('/assessments', readinessController.saveAssessment);
router.get('/roadmap', readinessController.getRoadmap);
router.post('/roadmap', readinessController.updateRoadmap);

export default router;
