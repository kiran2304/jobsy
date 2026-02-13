import { Request, Response } from 'express';
import * as jobsService from './jobs.service.js';

export const getAllJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await jobsService.getAllJobs();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};

export const createJob = async (req: Request, res: Response) => {
    try {
        const job = await jobsService.createJob(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
    }
};

export const deleteJob = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await jobsService.deleteJob(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job' });
    }
};
