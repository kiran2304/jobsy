const API_URL = '/api';

export const getJobs = async () => {
    const response = await fetch(`${API_URL}/jobs`);
    if (!response.ok) throw new Error('Failed to fetch jobs');
    return response.json();
};

export const addJob = async (jobData) => {
    const response = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
    });
    if (!response.ok) throw new Error('Failed to add job');
    return response.json();
};

export const deleteJob = async (id) => {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete job');
    return response.json();
};

export const loginAdmin = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Invalid credentials');
    return response.json();
};
