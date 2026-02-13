import cron from 'node-cron';
import prisma from '../../shared/database.js';

const JOB_TEMPLATES = [
    { title: 'Frontend Engineer', skills: ['React', 'Redux', 'CSS'], salaryBase: 15 },
    { title: 'Backend Developer', skills: ['Node.js', 'Express', 'MongoDB'], salaryBase: 18 },
    { title: 'Full Stack Developer', skills: ['MERN', 'JavaScript', 'AWS'], salaryBase: 20 },
    { title: 'Data Analyst', skills: ['SQL', 'Excel', 'Python'], salaryBase: 12 },
    { title: 'Product Manager', skills: ['Agile', 'Jira', 'Strategy'], salaryBase: 25 },
    { title: 'UI/UX Designer', skills: ['Figma', 'Prototyping'], salaryBase: 14 }
];

const COMPANIES = [
    { name: 'Google', loc: 'Bangalore, KA', link: 'https://careers.google.com/' },
    { name: 'Microsoft', loc: 'Noida, UP', link: 'https://careers.microsoft.com/' },
    { name: 'Amazon', loc: 'Hyderabad, TS', link: 'https://www.amazon.jobs/' },
    { name: 'Swiggy', loc: 'Remote', link: 'https://www.swiggy.com/careers' },
    { name: 'Zomato', loc: 'Gurgaon, HR', link: 'https://www.zomato.com/careers' }
];

export const startJobIngestion = () => {
    // Schedule to run every hour
    cron.schedule('0 * * * *', async () => {
        console.log('🤖 Starting automated job ingestion...');

        try {
            const count = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < count; i++) {
                const template = JOB_TEMPLATES[Math.floor(Math.random() * JOB_TEMPLATES.length)];
                const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
                const salaryMin = template.salaryBase + Math.floor(Math.random() * 5);
                const salaryMax = salaryMin + 5 + Math.floor(Math.random() * 10);

                // Check for duplicates (Simple check on title + company)
                const existing = await prisma.job.findFirst({
                    where: { title: template.title, company: company.name }
                });

                if (!existing) {
                    await prisma.job.create({
                        data: {
                            title: template.title,
                            company: company.name,
                            location: company.loc,
                            type: Math.random() > 0.3 ? 'Full-time' : 'Contract',
                            salary: `₹${salaryMin}L - ₹${salaryMax}L`,
                            salaryMin: salaryMin,
                            salaryMax: salaryMax,
                            skills: template.skills,
                            applyLink: company.link,
                            posted: 'Just now'

                        }
                    });
                    console.log(`✅ Ingested new job: ${template.title} at ${company.name}`);
                }
            }
        } catch (error) {
            console.error('❌ Job ingestion failed:', error);
        }
    });
};
