require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Job Schema
const jobSchema = new mongoose.Schema({
  jobTitle: String,
  companyName: String,
  location: String,
  jobType: String,
  salaryMin: Number,
  salaryMax: Number,
  jobDescription: String,
  requirements: String,
  responsibilities: String,
  applicationDeadline: String,
  postedDate: String,
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

// Routes

// Get all jobs
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Create a job
app.post('/jobs', async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      postedDate: req.body.postedDate || 'Just now',
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create job', details: err });
  }
});

// (Optional) Health check endpoint
app.get('/', (req, res) => {
  res.send('Job Management API is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
