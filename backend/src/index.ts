import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import router from './router.js';
import { errorHandler } from './shared/middleware/error.middleware.js';
import { startJobIngestion } from './modules/jobs/job.ingestion.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', router);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start Background Services
startJobIngestion();

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Modular Monolith Backend running at http://localhost:${PORT}`);
});
