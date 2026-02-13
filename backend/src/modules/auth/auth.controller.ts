import { Request, Response } from 'express';
import * as authService from './auth.service.js';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        const existingUser = await authService.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const user = await authService.registerUser(email, password, name);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const targetEmail = email || username; // Support both for legacy/compatibility
        const result = await authService.validateLogin(targetEmail, password);

        if (result) {
            res.json(result);
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};
