import { Router } from 'express';
import * as applicationsController from './applications.controller.js';

const router = Router();

router.post('/', applicationsController.submitApplication);
router.get('/user/:userId', applicationsController.getUserApps);
router.patch('/:id/withdraw', applicationsController.cancelApp);

export default router;
