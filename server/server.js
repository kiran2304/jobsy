const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read/write DB
const readDB = () => {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return { jobs: [], applications: [] };
    }
};

const writeDB = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- Routes ---

// GET /api/jobs
app.get('/api/jobs', (req, res) => {
    const db = readDB();
    res.json(db.jobs);
});

// POST /api/jobs (Admin only - simplified)
app.post('/api/jobs', (req, res) => {
    const { title, company, location, salary, type, description } = req.body;
    if (!title || !company) {
        return res.status(400).json({ error: 'Title and Company are required' });
    }

    const db = readDB();
    const newJob = {
        id: Date.now(), // Simple ID generation
        title,
        company,
        location,
        salary,
        type: type || 'Full-time',
        description: description || ''
    };

    db.jobs.push(newJob);
    writeDB(db);
    res.status(201).json(newJob);
});

// DELETE /api/jobs/:id (Admin only)
app.delete('/api/jobs/:id', (req, res) => {
    const { id } = req.params;
    const db = readDB();
    const initialLength = db.jobs.length;

    db.jobs = db.jobs.filter(job => job.id != id);

    if (db.jobs.length === initialLength) {
        return res.status(404).json({ error: 'Job not found' });
    }

    writeDB(db);
    res.json({ message: 'Job deleted successfully' });
});

// POST /api/login (Mock Admin Auth)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    // Hardcoded credentials for Demo
    if (username === 'admin' && password === 'admin123') {
        res.json({ token: 'mock-admin-token-123', user: { username: 'admin', role: 'admin' } });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
