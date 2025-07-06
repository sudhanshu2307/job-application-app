require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

// Job Schema & Model (NO experience or requirements)
const jobSchema = new mongoose.Schema({
  jobTitle: String,
  companyName: String,
  location: String,
  jobType: String,
  salaryMin: Number,
  salaryMax: Number,
  jobDescription: String,
  responsibilities: String,
  applicationDeadline: String,
  postedDate: String,
  logo: String
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

// Logo map for backend (all lowercase keys for robust mapping)
const logoMap = {
  amazon: "https://tse3.mm.bing.net/th/id/OIP.i3FKkO6v5JuGJ8dUOLUdrwHaHa?pid=Api&P=0&h=180",
  tesla: "https://static.vecteezy.com/system/resources/previews/022/424/230/original/tesla-logo-editorial-free-vector.jpg",
  swiggy: "https://tse2.mm.bing.net/th/id/OIP.q44vYMHXS9P3m9hTzgoaHQHaEK?pid=Api&P=0&h=180",
  cybermind: "https://imgs.search.brave.com/qoaTVTBnmeXe_7DqFz3T2q48b26hBUpCKQyMHMRgtew/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZG4u/c2lnbmFsaGlyZS5j/by9zdG9yYWdlL2Nv/bXBhbnkvZTJmMC9k/N2M2LzE5N2MvN2Q4/NC9lMDBlLzY4ZWIv/NTA3Mi8yYmFjLndl/YnA",
  default: "https://imgs.search.brave.com/qoaTVTBnmeXe_7DqFz3T2q48b26hBUpCKQyMHMRgtew/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZG4u/c2lnbmFsaGlyZS5j/by9zdG9yYWdlL2Nv/bXBhbnkvZTJmMC9k/N2M2LzE5N2MvN2Q4/NC9lMDBlLzY4ZWIv/NTA3Mi8yYmFjLndl/YnA"
};

// Helper to normalize company name for logo mapping
function getCompanyLogo(companyName) {
  if (!companyName) return logoMap.default;
  const key = companyName.trim().toLowerCase().replace(/\s+works$/, ''); // remove trailing "works"
  return logoMap[key] || logoMap.default;
}

// Routes
app.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.post('/jobs', async (req, res) => {
  try {
    const logo = req.body.logo || getCompanyLogo(req.body.companyName);
    const job = new Job({
      ...req.body,
      postedDate: req.body.postedDate || 'Just now',
      logo
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create job', details: err });
  }
});

app.get('/', (req, res) => {
  res.send('Job Management API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
