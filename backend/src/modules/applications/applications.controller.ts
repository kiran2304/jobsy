import { Request, Response } from 'express';
import * as applicationsService from './applications.service.js';

export const submitApplication = async (req: Request, res: Response) => {
    try {
        const { userId, jobId } = req.body;
        const application = await applicationsService.applyToJob(userId, jobId);
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ error: 'Failed to submit application' });
    }
};

export const getUserApps = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const apps = await applicationsService.getApplicationsByUser(userId);
        res.json(apps);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};

export const cancelApp = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await applicationsService.withdrawApplication(id);
        res.json({ message: 'Application withdrawn' });
    } catch (error) {
        res.status(400).json({ error: 'Failed to withdraw application' });
    }
};
