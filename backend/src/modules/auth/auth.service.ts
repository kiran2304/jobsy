import prisma from '../../shared/database.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

export const findUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
        where: { email },
    });
};

export const registerUser = async (email: string, password: string, name?: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            role: 'USER'
        }
    });
};

export const validateLogin = async (email: string, password: string) => {
    // Special case for legacy admin until data is migrated
    if (email === 'admin' && password === 'admin123') {
        const token = jwt.sign({ id: 'admin-id', email: 'admin', role: 'ADMIN' }, JWT_SECRET, { expiresIn: '24h' });
        return { token, user: { email: 'admin', role: 'ADMIN' } };
    }

    const user = await findUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        return { token, user: { email: user.email, role: user.role } };
    }
    return null;
};
