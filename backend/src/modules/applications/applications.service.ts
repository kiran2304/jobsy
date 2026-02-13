import prisma from '../../shared/database.js';

export const applyToJob = async (userId: string, jobId: string) => {
    return await prisma.application.create({
        data: {
            userId,
            jobId,
            status: 'PENDING',
        },
        include: {
            job: true
        }
    });
};

export const getApplicationsByUser = async (userId: string) => {
    return await prisma.application.findMany({
        where: { userId },
        include: { job: true },
        orderBy: { date: 'desc' },
    });
};

export const withdrawApplication = async (id: string) => {
    return await prisma.application.update({
        where: { id },
        data: { status: 'WITHDRAWN' },
    });
};
