import { safeJSONParse, safeJSONStringify } from '../utils/storageUtils';

// Initial "Real" Data (Seed)
const INITIAL_JOBS = [
    {
        id: 101,
        title: 'Software Engineer II',
        company: 'Google',
        location: 'Bangalore, KA',
        type: 'Full-time',
        salary: '₹35L - ₹55L',
        salaryMin: 35,
        salaryMax: 55,
        skills: ['Python', 'C++', 'Algorithms', 'Distributed Systems'],
        posted: '2 days ago',
        applyLink: 'https://www.google.com/about/careers/applications/jobs/results/?location=Bangalore'
    },
    {
        id: 102,
        title: 'SDE-2 (Frontend)',
        company: 'Amazon',
        location: 'Hyderabad, TS',
        type: 'Full-time',
        salary: '₹40L - ₹60L',
        salaryMin: 40,
        salaryMax: 60,
        skills: ['React', 'JavaScript', 'AWS', 'CSS'],
        posted: '1 day ago',
        applyLink: 'https://www.amazon.jobs/en/search?base_query=Frontend&loc_query=Hyderabad'
    },
    {
        id: 103,
        title: 'Product Design Lead',
        company: 'Microsoft',
        location: 'Noida, UP',
        type: 'Full-time',
        salary: '₹45L - ₹70L',
        salaryMin: 45,
        salaryMax: 70,
        skills: ['Figma', 'UI/UX', 'Interaction Design'],
        posted: '3 days ago',
        applyLink: 'https://careers.microsoft.com/us/en/search-results?keywords=Design&location=Noida'
    },
    {
        id: 104,
        title: 'Backend Developer',
        company: 'Zomato',
        location: 'Gurgaon, HR',
        type: 'Full-time',
        salary: '₹20L - ₹35L',
        salaryMin: 20,
        salaryMax: 35,
        skills: ['Node.js', 'PostgreSQL', 'Redis'],
        posted: '2 days ago',
        applyLink: 'https://www.linkedin.com/jobs/search/?keywords=Zomato&location=Gurgaon'
    },
    {
        id: 105,
        title: 'Senior Data Scientist',
        company: 'Flipkart',
        location: 'Bangalore, KA',
        type: 'Full-time',
        salary: '₹30L - ₹50L',
        salaryMin: 30,
        salaryMax: 50,
        skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
        posted: '4 days ago',
        applyLink: 'https://www.naukri.com/flipkart-jobs'
    },
    {
        id: 106,
        title: 'Full Stack Engineer',
        company: 'Swiggy',
        location: 'Remote',
        type: 'Full-time',
        salary: '₹25L - ₹45L',
        salaryMin: 25,
        salaryMax: 45,
        skills: ['Go', 'React', 'Microservices'],
        posted: '5 days ago',
        applyLink: 'https://www.linkedin.com/jobs/search/?keywords=Swiggy&location=Remote'
    },
    {
        id: 107,
        title: 'System Engineer',
        company: 'TCS',
        location: 'Mumbai, MH',
        type: 'Full-time',
        salary: '₹4L - ₹8L',
        salaryMin: 4,
        salaryMax: 8,
        skills: ['Java', 'SQL', 'Unix'],
        posted: '1 week ago',
        applyLink: 'https://www.tcs.com/careers'
    },
    {
        id: 108,
        title: 'Technology Analyst',
        company: 'Infosys',
        location: 'Pune, MH',
        type: 'Full-time',
        salary: '₹5L - ₹9L',
        salaryMin: 5,
        salaryMax: 9,
        skills: ['C#', '.NET', 'Azure'],
        posted: '1 week ago',
        applyLink: 'https://www.infosys.com/careers/'
    },
    {
        id: 111,
        title: 'DevOps Engineer',
        company: 'Razorpay',
        location: 'Bangalore, KA',
        type: 'Full-time',
        salary: '₹25L - ₹40L',
        salaryMin: 25,
        salaryMax: 40,
        skills: ['AWS', 'Kubernetes', 'Terraform'],
        posted: '1 day ago',
        applyLink: 'https://razorpay.com/jobs/'
    },
    {
        id: 112,
        title: 'React Native Developer',
        company: 'PhonePe',
        location: 'Bangalore, KA',
        type: 'Full-time',
        salary: '₹28L - ₹45L',
        salaryMin: 28,
        salaryMax: 45,
        skills: ['React Native', 'JavaScript', 'Redux'],
        posted: '2 days ago',
        applyLink: 'https://www.phonepe.com/careers/'
    }
];

// Templates for generating "New" jobs
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
    { name: 'Zomato', loc: 'Gurgaon, HR', link: 'https://www.zomato.com/careers' },
    { name: 'Cred', loc: 'Bangalore, KA', link: 'https://careers.cred.club/' },
    { name: 'Meesho', loc: 'Bangalore, KA', link: 'https://www.meesho.io/careers' },
    { name: 'Udaan', loc: 'Bangalore, KA', link: 'https://udaan.com/careers' }
];

const JobService = {
    // Initialize data if empty
    init: () => {
        if (!localStorage.getItem('kodnest_jobs')) {
            safeJSONStringify('kodnest_jobs', INITIAL_JOBS);
            localStorage.setItem('kodnest_last_sync', new Date().toISOString());
        }
    },

    // Get all jobs (sorted by newest first)
    getAll: () => {
        const jobs = safeJSONParse('kodnest_jobs', []);
        return jobs.sort((a, b) => {
            // Simple sort logic: "Just now" > "Today" > "Yesterday" > others
            const getScore = (posted) => {
                if (posted === 'Just now') return 4;
                if (posted === 'Today') return 3;
                if (posted === 'Yesterday') return 2;
                return 1;
            };
            return getScore(b.posted) - getScore(a.posted);
        });
    },

    // Get Last Sync Time
    getLastSync: () => {
        return localStorage.getItem('kodnest_last_sync');
    },

    // "Scrape" new jobs (Generate random ones)
    sync: () => {
        const count = Math.floor(Math.random() * 3) + 2; // Generate 2-4 new jobs
        const newJobs = [];

        for (let i = 0; i < count; i++) {
            const template = JOB_TEMPLATES[Math.floor(Math.random() * JOB_TEMPLATES.length)];
            const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
            const salaryMin = template.salaryBase + Math.floor(Math.random() * 5);
            const salaryMax = salaryMin + 5 + Math.floor(Math.random() * 10);

            newJobs.push({
                id: Date.now() + i,
                title: template.title,
                company: company.name,
                location: company.loc,
                type: Math.random() > 0.3 ? 'Full-time' : 'Contract',
                salary: `₹${salaryMin}L - ₹${salaryMax}L`,
                salaryMin,
                salaryMax,
                skills: template.skills,
                posted: 'Just now', // Mark as fresh
                applyLink: company.link
            });
            const existingJobs = safeJSONParse('kodnest_jobs', []);
            updatedJobs.length = 50;
        }

        safeJSONStringify('kodnest_jobs', updatedJobs);
        localStorage.setItem('kodnest_last_sync', new Date().toISOString());

        return newJobs.length;
    }
};

export default JobService;
