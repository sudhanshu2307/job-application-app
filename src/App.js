import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// --- SVG ICON COMPONENTS ---

function NavbarLogo() {
  return (
    <svg width="44" height="46" viewBox="0 0 44 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2_110)">
        <mask id="mask0_2_110" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="46">
          <path d="M44 0.661621H0V45.3385H44V0.661621Z" fill="white"/>
        </mask>
        <g mask="url(#mask0_2_110)">
          <path d="M26.33 5.41968L26.8852 23.3961L41.6353 13.9324L26.33 5.41968Z" fill="#333333"/>
          <path d="M41.5308 32.7551V13.8619L20.395 27.4678V45.3387H21.1064" fill="#494949"/>
          <path d="M3.18878 32.0419L16.7153 23.3629L17.2245 39.8485L3.18878 32.0419Z" fill="url(#paint0_linear_2_110)"/>
          <path d="M3.18878 32.0419L16.7153 23.3629L17.2245 39.8485L3.18878 32.0419Z" fill="url(#paint1_linear_2_110)"/>
          <path d="M3.18878 32.0419L16.7153 23.3629L17.2245 39.8485L3.18878 32.0419Z" stroke="url(#paint2_linear_2_110)" strokeWidth="0.846154"/>
          <path d="M3.18878 32.0419L16.7153 23.3629L17.2245 39.8485L3.18878 32.0419Z" stroke="url(#paint3_linear_2_110)" strokeWidth="0.846154"/>
          <path d="M2.46906 13.2451V32.1381L23.6051 18.5501V0.661621H22.8936" fill="url(#paint4_linear_2_110)"/>
          <path d="M2.46906 13.2451V32.1381L23.6051 18.5501V0.661621H22.8936" fill="url(#paint5_linear_2_110)"/>
        </g>
      </g>
      <defs>
        <linearGradient id="paint0_linear_2_110" x1="2.36496" y1="31.5921" x2="17.6704" y2="31.5921" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00AAFF"/>
          <stop offset="1" stopColor="#8636F8"/>
        </linearGradient>
        <linearGradient id="paint1_linear_2_110" x1="10.0177" y1="40.5806" x2="10.0177" y2="22.6037" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.6"/>
          <stop offset="0.1085" stopColor="white" stopOpacity="0.455"/>
          <stop offset="0.4332" stopColor="white" stopOpacity="0.216"/>
          <stop offset="0.6639" stopColor="white" stopOpacity="0.06"/>
          <stop offset="0.775" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="paint2_linear_2_110" x1="2.36496" y1="31.5921" x2="17.6704" y2="31.5921" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00AAFF"/>
          <stop offset="1" stopColor="#8636F8"/>
        </linearGradient>
        <linearGradient id="paint3_linear_2_110" x1="10.0177" y1="40.5806" x2="10.0177" y2="22.6037" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.6"/>
          <stop offset="0.1085" stopColor="white" stopOpacity="0.455"/>
          <stop offset="0.4332" stopColor="white" stopOpacity="0.216"/>
          <stop offset="0.6639" stopColor="white" stopOpacity="0.06"/>
          <stop offset="0.775" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="paint4_linear_2_110" x1="1.5926" y1="20.0785" x2="24.8932" y2="18.3851" gradientUnits="userSpaceOnUse">
          <stop offset="0.0226" stopColor="#8636F8"/>
          <stop offset="0.3484" stopColor="#F020B3"/>
          <stop offset="0.6742" stopColor="#F8475E"/>
          <stop offset="1" stopColor="#FF9421"/>
        </linearGradient>
        <linearGradient id="paint5_linear_2_110" x1="13.0371" y1="32.1381" x2="13.0371" y2="0.661621" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.6"/>
          <stop offset="0.0842" stopColor="white" stopOpacity="0.455"/>
          <stop offset="0.367" stopColor="white" stopOpacity="0.216"/>
          <stop offset="0.568" stopColor="white" stopOpacity="0.06"/>
          <stop offset="0.6648" stopColor="white" stopOpacity="0"/>
        </linearGradient>
        <clipPath id="clip0_2_110">
          <rect width="44" height="44.6769" fill="white" transform="translate(0 0.661621)"/>
        </clipPath>
      </defs>
    </svg>
  );
}

// Preferred Location SVG
function LocationIcon() {
  return (
    <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.7808 19.7005L11.1906 19.2377L11.7808 19.7005ZM6.21921 19.7005L5.62903 20.1633L6.21921 19.7005ZM9 22.0055V21.2555V22.0055ZM16.25 9.6087C16.25 10.8352 15.6104 12.4764 14.6037 14.256C13.6137 16.0063 12.3342 17.7794 11.1906 19.2377L12.371 20.1633C13.5371 18.6762 14.8672 16.837 15.9094 14.9945C16.9349 13.1814 17.75 11.2494 17.75 9.6087H16.25ZM6.80938 19.2377C5.66578 17.7794 4.38628 16.0063 3.39625 14.256C2.38962 12.4764 1.75 10.8352 1.75 9.6087H0.25C0.25 11.2494 1.06511 13.1814 2.09064 14.9945C3.13277 16.837 4.46288 18.6762 5.62903 20.1633L6.80938 19.2377ZM1.75 9.6087C1.75 5.21571 5.04678 1.75 9 1.75V0.25C4.11666 0.25 0.25 4.49277 0.25 9.6087H1.75ZM9 1.75C12.9532 1.75 16.25 5.21571 16.25 9.6087H17.75C17.75 4.49277 13.8833 0.25 9 0.25V1.75ZM11.1906 19.2377C10.5717 20.027 10.1641 20.5426 9.79918 20.8741C9.46635 21.1764 9.24418 21.2555 9 21.2555V22.7555C9.72906 22.7555 10.2948 22.4504 10.8078 21.9844C11.2886 21.5476 11.7849 20.9107 12.371 20.1633L11.1906 19.2377ZM5.62903 20.1633C6.21511 20.9107 6.71136 21.5476 7.19224 21.9844C7.70524 22.4504 8.27094 22.7555 9 22.7555V21.2555C8.75582 21.2555 8.53365 21.1764 8.20082 20.8741C7.83587 20.5426 7.42834 20.027 6.80938 19.2377L5.62903 20.1633ZM5.25 10C5.25 12.0711 6.92893 13.75 9 13.75V12.25C7.75736 12.25 6.75 11.2426 6.75 10H5.25ZM9 13.75C11.0711 13.75 12.75 12.0711 12.75 10H11.25C11.25 11.2426 10.2426 12.25 9 12.25V13.75ZM12.75 10C12.75 7.92893 11.0711 6.25 9 6.25V7.75C10.2426 7.75 11.25 8.75736 11.25 10H12.75ZM9 6.25C6.92893 6.25 5.25 7.92893 5.25 10H6.75C6.75 8.75736 7.75736 7.75 9 7.75V6.25Z" fill="#686868"/>
    </svg>
  );
}

// Job Type SVG
function JobTypeIcon() {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 17C13 14.7909 10.3137 13 7 13C3.68629 13 1 14.7909 1 17M14.8281 3.17188C15.1996 3.54331 15.4942 3.98427 15.6952 4.46957C15.8962 4.95487 15.9999 5.47533 15.9999 6.00062C15.9999 6.52591 15.8963 7.04497 15.6953 7.53027C15.4943 8.01558 15.1996 8.45705 14.8281 8.82848M17 1C17.6566 1.65661 18.1775 2.43612 18.5328 3.29402C18.8882 4.15192 19.0718 5.07127 19.0718 5.99985C19.0718 6.92844 18.8886 7.84815 18.5332 8.70605C18.1778 9.56396 17.6566 10.3435 17 11.0001M7 10C4.79086 10 3 8.20914 3 6C3 3.79086 4.79086 2 7 2C9.20914 2 11 3.79086 11 6C11 8.20914 9.20914 10 7 10Z" stroke="#686868" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SearchIcon() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 13L19 19M8 15C4.134 15 1 11.866 1 8C1 4.134 4.134 1 8 1C11.866 1 15 4.134 15 8C15 11.866 11.866 15 8 15Z" stroke="#686868" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function ExpIcon() { return (<svg width="19" height="16" viewBox="0 0 19 16" fill="none"><circle cx="8" cy="6" r="4" stroke="#5A5A5A" strokeWidth="1.6"/><path d="M14 14C14 11.7909 11.3137 10 8 10C4.68629 10 2 11.7909 2 14" stroke="#5A5A5A" strokeWidth="1.6" strokeLinecap="round"/></svg>);}
function OnsiteIcon() { return (<svg width="20" height="18" viewBox="0 0 20 18" fill="none"><rect x="3" y="3" width="14" height="12" rx="3" stroke="#5A5A5A" strokeWidth="1.6"/><circle cx="10" cy="9" r="2" fill="#5A5A5A"/></svg>);}
function LpaIcon() { return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" stroke="#5A5A5A" strokeWidth="1.6"/><text x="10" y="15" textAnchor="middle" fontSize="9" fill="#5A5A5A">₹</text></svg>);}
function ChevronDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ pointerEvents: 'none' }}>
      <path d="M6 8L10 12L14 8" stroke="#686868" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// --- LOGO MAP & OPTIONS ---

const logoMap = {
  amazon: "https://tse3.mm.bing.net/th/id/OIP.i3FKkO6v5JuGJ8dUOLUdrwHaHa?pid=Api&P=0&h=180",
  tesla: "https://static.vecteezy.com/system/resources/previews/022/424/230/original/tesla-logo-editorial-free-vector.jpg",
  swiggy: "https://tse2.mm.bing.net/th/id/OIP.q44vYMHXS9P3m9hTzgoaHQHaEK?pid=Api&P=0&h=180",
  cybermind: "https://imgs.search.brave.com/qoaTVTBnmeXe_7DqFz3T2q48b26hBUpCKQyMHMRgtew/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZG4u/c2lnbmFsaGlyZS5j/by9zdG9yYWdlL2Nv/bXBhbnkvZTJmMC9k/N2M2LzE5N2MvN2Q4/NC9lMDBlLzY4ZWIv/NTA3Mi8yYmFjLndl/YnA",
  default: "https://imgs.search.brave.com/qoaTVTBnmeXe_7DqFz3T2q48b26hBUpCKQyMHMRgtew/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZG4u/c2lnbmFsaGlyZS5j/by9zdG9yYWdlL2Nv/bXBhbnkvZTJmMC9k/N2M2LzE5N2MvN2Q4/NC9lMDBlLzY4ZWIv/NTA3Mi8yYmFjLndl/YnA"
};
const locationOptions = ["Chennai", "Bangalore", "Mumbai", "Delhi", "Hyderabad"];
const jobTypeOptions = ["Full Time", "Part Time", "Internship"];
const salaryMinLimit = 0;
const salaryMaxLimit = 2000000;

function normalize(str) {
  return (str || '').toLowerCase().trim();
}
function getCompanyLogo(companyName) {
  if (!companyName) return logoMap.default;
  let key = companyName.trim().toLowerCase();
  if (key.endsWith(' works')) key = key.replace(/ works$/, '');
  return logoMap[key] || logoMap.default;
}

// --- MAIN COMPONENT ---

export default function JobManagementApp() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salaryRange: [salaryMinLimit, salaryMaxLimit]
  });
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    jobDescription: '',
    applicationDeadline: ''
  });
  const [formErrors, setFormErrors] = useState({});

  const fetchJobs = () => {
    setLoading(true);
    axios.get('https://job-application-app-ncmp.onrender.com/jobs')
      .then(res => {
        setJobs(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { fetchJobs(); }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.jobTitle.trim()) errors.jobTitle = 'Job title is required';
    if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    if (!formData.jobType) errors.jobType = 'Job type is required';
    if (!formData.jobDescription.trim()) errors.jobDescription = 'Job description is required';
    if (!formData.applicationDeadline) errors.applicationDeadline = 'Application deadline is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newJob = {
        ...formData,
        salaryMin: parseInt(formData.salaryMin) || 0,
        salaryMax: parseInt(formData.salaryMax) || 0,
        postedDate: 'Just now',
        logo: getCompanyLogo(formData.companyName)
      };
      axios.post('https://job-application-app-ncmp.onrender.com/jobs', newJob)
        .then(() => {
          setShowCreateForm(false);
          setFormData({
            jobTitle: '',
            companyName: '',
            location: '',
            jobType: '',
            salaryMin: '',
            salaryMax: '',
            jobDescription: '',
            applicationDeadline: ''
          });
          fetchJobs();
        })
        .catch(() => alert("Failed to create job!"));
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesTitle = normalize(job.jobTitle).includes(normalize(filters.title));
    const matchesLocation = !filters.location || normalize(job.location) === normalize(filters.location);
    const matchesJobType = !filters.jobType || normalize(job.jobType) === normalize(filters.jobType);
    const matchesSalary =
      (Number(job.salaryMin) >= filters.salaryRange[0] && Number(job.salaryMin) <= filters.salaryRange[1]) ||
      (Number(job.salaryMax) >= filters.salaryRange[0] && Number(job.salaryMax) <= filters.salaryRange[1]);
    return matchesTitle && matchesLocation && matchesJobType && matchesSalary;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#F9FAFB", position: "relative" }}>
      {/* Navbar */}
      <header
        style={{
          boxSizing: 'border-box',
          position: 'absolute',
          width: '890px',
          height: '80px',
          left: 'calc(50% - 890px/2)',
          top: '21px',
          background: '#FFFFFF',
          border: '1px solid #FCFCFC',
          boxShadow: '0px 0px 20px rgba(127, 127, 127, 0.15)',
          borderRadius: '122px',
          display: 'flex',
          alignItems: 'center',
          zIndex: 50,
          padding: '0 36px'
        }}
      >
        <button style={{ background: 'none', border: 'none', marginRight: 40 }}>
          <NavbarLogo />
        </button>
        <nav style={{ display: 'flex', gap: 40 }}>
          <button className="font-semibold text-gray-900 bg-white rounded-xl px-6 py-2">Home</button>
          <button className="font-semibold text-gray-900 bg-white rounded-xl px-6 py-2">Find Jobs</button>
          <button className="font-semibold text-gray-900 bg-white rounded-xl px-6 py-2">Find Talents</button>
          <button className="font-semibold text-gray-900 bg-white rounded-xl px-6 py-2">About us</button>
          <button className="font-semibold text-gray-900 bg-white rounded-xl px-6 py-2">Testimonials</button>
        </nav>
        <button
          onClick={() => setShowCreateForm(true)}
          style={{
            background: 'linear-gradient(180deg, #A128FF 0%, #6100AD 113.79%)',
            color: '#fff',
            borderRadius: 30,
            padding: '7px 22px',
            fontWeight: 600,
            fontSize: 15,
            marginLeft: 'auto',
            border: 'none',
            minWidth: 100
          }}
        >
          Create Jobs
        </button>
      </header>

      {/* Filter/Search Bar */}
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: 56,
          left: 0,
          top: 101,
          background: '#fff',
          boxShadow: '0px 0px 14px rgba(198,191,191,0.15)',
          borderRadius: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 40,
          border: 'none'
        }}
      >
        <div
          style={{
            width: '96%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px',
            gap: 0,
            height: '70%',
          }}
        >
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <span style={{ marginRight: 8 }}><SearchIcon /></span>
            <input
              type="text"
              placeholder="Search By Job Title, Role"
              value={filters.title}
              onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: 15,
                background: 'transparent',
                width: '100%',
                minWidth: 0,
              }}
            />
          </div>
          {/* Divider */}
          <div style={{
            width: 1,
            height: '60%',
            background: '#E5E7EB',
            margin: '0 8px',
            borderRadius: 2,
            alignSelf: 'center'
          }} />
          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, position: 'relative' }}>
            <span style={{ marginRight: 8 }}><LocationIcon /></span>
            <select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: 15,
                background: 'transparent',
                width: '100%',
                minWidth: 0,
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                paddingRight: 24
              }}
            >
              <option value="">Preferred Location</option>
              {locationOptions.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <span style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <ChevronDownIcon />
            </span>
          </div>
          {/* Divider */}
          <div style={{
            width: 1,
            height: '60%',
            background: '#E5E7EB',
            margin: '0 8px',
            borderRadius: 2,
            alignSelf: 'center'
          }} />
          {/* Job Type */}
          <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, position: 'relative' }}>
            <span style={{ marginRight: 8 }}><JobTypeIcon /></span>
            <select
              value={filters.jobType}
              onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value }))}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: 15,
                background: 'transparent',
                width: '100%',
                minWidth: 0,
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                paddingRight: 24
              }}
            >
              <option value="">Job type</option>
              {jobTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <span style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <ChevronDownIcon />
            </span>
          </div>
          {/* Divider */}
          <div style={{
            width: 1,
            height: '60%',
            background: '#E5E7EB',
            margin: '0 8px',
            borderRadius: 2,
            alignSelf: 'center'
          }} />
          {/* Salary Range */}
          <div style={{ flex: 1, minWidth: 120, maxWidth: 180 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Salary Per Month</span>
              <span style={{ fontWeight: 600, fontSize: 13 }}>
                ₹{filters.salaryRange[0] / 1000}k - ₹{filters.salaryRange[1] / 1000}k
              </span>
            </div>
            <Slider
              range
              min={salaryMinLimit}
              max={salaryMaxLimit}
              step={10000}
              value={filters.salaryRange}
              onChange={range => setFilters(prev => ({ ...prev, salaryRange: range }))}
              trackStyle={[{ backgroundColor: '#000', height: 3 }]}
              handleStyle={[
                { backgroundColor: '#000', border: '2px solid #000', width: 11, height: 11, marginTop: -4 },
                { backgroundColor: '#000', border: '2px solid #000', width: 11, height: 11, marginTop: -4 }
              ]}
              railStyle={{ backgroundColor: '#e5e7eb', height: 3 }}
              style={{ width: 120, marginLeft: 0, marginRight: 0 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content (Job Cards) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: 0,
          gap: 16,
          position: 'absolute',
          width: 1312,
          minHeight: 360,
          left: 64,
          top: 181,
          zIndex: 10
        }}
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading ? (
            <div>Loading...</div>
          ) : (
            filteredJobs.length > 0 ? filteredJobs.map((job, idx) => (
              <div key={job._id || idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow flex flex-col">
                {/* Top: Logo + Posted date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center shadow overflow-hidden">
                    <img src={job.logo || getCompanyLogo(job.companyName)} alt={job.companyName} className="w-10 h-10 object-contain rounded-full" />
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {job.postedDate}
                  </span>
                </div>
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{job.jobTitle}</h3>
                {/* Details */}
                <div className="flex flex-wrap items-center text-gray-600 mb-2 gap-2 text-sm">
                  <span><ExpIcon /> {job.companyName}</span>
                  <span>•</span>
                  <span><LocationIcon /> {job.location}</span>
                  <span>•</span>
                  <span><JobTypeIcon /> {job.jobType}</span>
                  <span>•</span>
                  <span><LpaIcon /> ₹{job.salaryMin / 100000}L - ₹{job.salaryMax / 100000}L</span>
                </div>
                {/* Description */}
                <ul className="list-disc ml-5 text-gray-600 text-sm mb-4">
                  <li>{job.jobDescription}</li>
                </ul>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors mt-2">
                  Apply Now
                </button>
              </div>
            )) : (
              <div className="col-span-full text-center text-red-500 text-lg font-semibold py-8">
                No jobs found 😕
              </div>
            )
          )}
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowCreateForm(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all hover:scale-110 z-50"
        aria-label="Create Job"
      >
        +
      </button>

      {/* Create Job Modal */}
      {showCreateForm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            pointerEvents: 'auto',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <form
            style={{
              background: "#fff",
              boxShadow: "0px 0px 24px rgba(169, 169, 169, 0.25)",
              borderRadius: 16,
              width: 848,
              maxWidth: "90vw",
              height: 650,
              maxHeight: "90vh",
              position: "absolute",
              left: "50%",
              top: 117,
              transform: "translateX(-50%)",
              padding: 40,
              overflowY: "auto"
            }}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Create Job Opening</h2>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="space-y-6">
              {/* Job Title and Company Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className={`w-full px-4 py-4 border rounded-xl text-lg ${
                      formErrors.jobTitle ? 'border-red-500' : 'border-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Full Stack Developer"
                  />
                  {formErrors.jobTitle && <p className="text-red-500 text-sm mt-1">{formErrors.jobTitle}</p>}
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className={`w-full px-4 py-4 border rounded-xl text-lg ${
                      formErrors.companyName ? 'border-red-500' : 'border-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Amazon, Tesla, Swiggy, Cybermind"
                  />
                  {formErrors.companyName && <p className="text-red-500 text-sm mt-1">{formErrors.companyName}</p>}
                </div>
              </div>
              {/* Location and Job Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-600 mb-2">Location</label>
                  <select
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full px-4 py-4 border rounded-xl text-lg ${
                      formErrors.location ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Choose Preferred Location</option>
                    {locationOptions.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  {formErrors.location && <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>}
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-600 mb-2">Job Type</label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => handleInputChange('jobType', e.target.value)}
                    className={`w-full px-4 py-4 border rounded-xl text-lg ${
                      formErrors.jobType ? 'border-red-500' : 'border-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Job Type</option>
                    {jobTypeOptions.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {formErrors.jobType && <p className="text-red-500 text-sm mt-1">{formErrors.jobType}</p>}
                </div>
              </div>
              {/* Salary Range and Application Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-600 mb-2">Salary Range</label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                      placeholder="₹0"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                      placeholder="₹12,00,000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-600 mb-2">Application Deadline</label>
                  <input
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) => handleInputChange('applicationDeadline', e.target.value)}
                    className={`w-full px-4 py-4 border rounded-xl text-lg ${
                      formErrors.applicationDeadline ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {formErrors.applicationDeadline && <p className="text-red-500 text-sm mt-1">{formErrors.applicationDeadline}</p>}
                </div>
              </div>
              {/* Job Description */}
              <div>
                <label className="block text-lg font-semibold text-gray-600 mb-2">Job Description</label>
                <textarea
                  value={formData.jobDescription}
                  onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-4 border rounded-xl text-lg ${
                    formErrors.jobDescription ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                  placeholder="A user-friendly interface lets you browse stunning photos and videos."
                />
                {formErrors.jobDescription && <p className="text-red-500 text-sm mt-1">{formErrors.jobDescription}</p>}
              </div>
              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors"
                >
                  Publish ≫
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
