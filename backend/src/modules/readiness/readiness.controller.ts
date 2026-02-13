import { Response } from 'express';
import * as readinessService from './readiness.service.js';

export const saveAssessment = async (req: any, res: Response) => {
    try {
        const result = await readinessService.saveAssessmentResult(req.user.id, req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save assessment' });
    }
};

export const getAssessments = async (req: any, res: Response) => {
    try {
        const results = await readinessService.getAssessmentResults(req.user.id);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assessments' });
    }
};

export const updateRoadmap = async (req: any, res: Response) => {
    try {
        const { stepId, status } = req.body;
        const result = await readinessService.updateRoadmapProgress(req.user.id, stepId, status);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update roadmap' });
    }
};

export const getRoadmap = async (req: any, res: Response) => {
    try {
        const results = await readinessService.getRoadmapProgress(req.user.id);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch roadmap' });
    }
};
