import prisma from '../../shared/database.js';

export const getAllJobs = async () => {
    return await prisma.job.findMany({
        orderBy: { createdAt: 'desc' },
    });
};

export const createJob = async (data: any) => {
    return await prisma.job.create({
        data: {
            title: data.title,
            company: data.company,
            location: data.location,
            salary: data.salary || null,
            type: data.type || "Full-time",
            description: data.description || null,
            skills: data.skills || [],
            applyLink: data.applyLink || null,
            posted: data.posted || "Just now"
        },
    });
};

export const deleteJob = async (id: string) => {
    return await prisma.job.delete({
        where: { id },
    });
};
