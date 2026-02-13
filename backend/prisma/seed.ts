import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

async function main() {
    console.log('🌱 Seeding jobs...');
    for (const template of JOB_TEMPLATES) {
        for (const company of COMPANIES) {
            const salaryMin = template.salaryBase + Math.floor(Math.random() * 5);
            const salaryMax = salaryMin + 5 + Math.floor(Math.random() * 10);

            await prisma.job.upsert({
                where: {
                    id: `${template.title}-${company.name}`.toLowerCase().replace(/[^a-z0-t]/g, '-')
                },
                update: {
                    salaryMin: salaryMin,
                    salaryMax: salaryMax,
                    skills: template.skills,
                },
                create: {
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
        }
    }
    console.log('✅ Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
