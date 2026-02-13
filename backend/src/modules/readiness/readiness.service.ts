import prisma from '../../shared/database.js';

export const saveAssessmentResult = async (userId: string, data: any) => {
    return await prisma.assessmentResult.create({
        data: {
            userId,
            score: data.score,
            total: data.total,
            type: data.type
        }
    });
};

export const getAssessmentResults = async (userId: string) => {
    return await prisma.assessmentResult.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
};

export const updateRoadmapProgress = async (userId: string, stepId: number, status: string) => {
    return await prisma.roadmapProgress.upsert({
        where: {
            id: `${userId}-${stepId}` // Using a deterministic ID for upsert or we'd need a unique constraint on userId+stepId
        },
        update: { status },
        create: {
            id: `${userId}-${stepId}`,
            userId,
            stepId,
            status
        }
    });
};

export const getRoadmapProgress = async (userId: string) => {
    return await prisma.roadmapProgress.findMany({
        where: { userId }
    });
};
