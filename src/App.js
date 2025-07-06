import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Briefcase, Plus, X, ChevronDown } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Logo URLs
const logoMap = {
  Amazon: "https://tse3.mm.bing.net/th/id/OIP.i3FKkO6v5JuGJ8dUOLUdrwHaHa?pid=Api&P=0&h=180",
  Tesla: "https://static.vecteezy.com/system/resources/previews/022/424/230/original/tesla-logo-editorial-free-vector.jpg",
  Swiggy: "https://tse2.mm.bing.net/th/id/OIP.q44vYMHXS9P3m9hTzgoaHQHaEK?pid=Api&P=0&h=180",
  Cybermind: "https://imgs.search.brave.com/qoaTVTBnmeXe_7DqFz3T2q48b26hBUpCKQyMHMRgtew/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZG4u/c2lnbmFsaGlyZS5j/by9zdG9yYWdlL2Nv/bXBhbnkvZTJmMC9k/N2M2LzE5N2MvN2Q4/NC9lMDBlLzY4ZWIv/NTA3Mi8yYmFjLndl/YnA",
  Default: "https://imgs.search.brave.com/qoaTVTBnmeXe_7DqFz3T2q48b26hBUpCKQyMHMRgtew/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zZG4u/c2lnbmFsaGlyZS5j/by9zdG9yYWdlL2Nv/bXBhbnkvZTJmMC9k/N2M2LzE5N2MvN2Q4/NC9lMDBlLzY4ZWIv/NTA3Mi8yYmFjLndl/YnA"
};

const preloadedJobs = [
  {
    jobTitle: 'Full Stack Developer',
    companyName: 'Amazon',
    location: 'Chennai',
    jobType: 'Full Time',
    salaryMin: 1200000,
    salaryMax: 1300000,
    jobDescription: 'A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized',
    applicationDeadline: '2025-08-15',
    postedDate: '24h Ago',
    logo: logoMap.Amazon
  },
  {
    jobTitle: 'Node Js Developer',
    companyName: 'Tesla',
    location: 'Bangalore',
    jobType: 'Full Time',
    salaryMin: 1000000,
    salaryMax: 1200000,
    jobDescription: 'A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized',
    applicationDeadline: '2025-08-20',
    postedDate: '24h Ago',
    logo: logoMap.Tesla
  },
  {
    jobTitle: 'UX/UI Designer',
    companyName: 'Swiggy',
    location: 'Hyderabad',
    jobType: 'Internship',
    salaryMin: 900000,
    salaryMax: 1100000,
    jobDescription: 'A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized',
    applicationDeadline: '2025-08-25',
    postedDate: '24h Ago',
    logo: logoMap.Swiggy
  },
  {
    jobTitle: 'AI Engineer',
    companyName: 'Cybermind',
    location: 'Mumbai',
    jobType: 'Part Time',
    salaryMin: 1500000,
    salaryMax: 2000000,
    jobDescription: 'A user-friendly interface lets you browse stunning photos and videos. Filter destinations based on interests and travel style, and create personalized',
    applicationDeadline: '2025-09-01',
    postedDate: '12h Ago',
    logo: logoMap.Cybermind
  }
];

const locationOptions = [
  "Chennai", "Bangalore", "Mumbai", "Delhi", "Hyderabad"
];

const jobTypeOptions = [
  "Full Time", "Part Time", "Internship"
];

const salaryMinLimit = 50000;
const salaryMaxLimit = 2000000;

function isDuplicate(job, list) {
  return list.some(
    j =>
      j.jobTitle === job.jobTitle &&
      j.companyName === job.companyName &&
      j.applicationDeadline === job.applicationDeadline
  );
}

const getCompanyLogo = (company) => logoMap[company] || logoMap.Default;

export default function JobManagementApp() {
  const [jobs, setJobs] = useState(preloadedJobs);
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

  useEffect(() => {
    setLoading(true);
    axios.get('https://job-application-app-sgo9.onrender.com/jobs')
      .then(res => {
        const backendJobs = res.data || [];
        let merged = [...preloadedJobs];
        backendJobs.forEach(job => {
          if (!isDuplicate(job, merged)) {
            merged.push({
              ...job,
              logo: getCompanyLogo(job.companyName)
            });
          }
        });
        setJobs(merged);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
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
      axios.post('https://job-application-app-sgo9.onrender.com/jobs', newJob)
        .then(res => {
          setJobs(prev => [...prev, { ...res.data, logo: getCompanyLogo(res.data.companyName) }]);
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
          setShowCreateForm(false);
        })
        .catch(() => alert("Failed to create job!"));
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesTitle = job.jobTitle?.toLowerCase().includes(filters.title.toLowerCase());
    const matchesLocation = !filters.location || job.location === filters.location;
    const matchesJobType = !filters.jobType || job.jobType === filters.jobType;
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
          width: 890,
          height: 80,
          left: '50%',
          top: 21,
          transform: 'translateX(-50%)',
          background: '#fff',
          border: '1px solid #FCFCFC',
          boxShadow: '0px 0px 20px rgba(127,127,127,0.15)',
          borderRadius: 122,
          display: 'flex',
          alignItems: 'center',
          zIndex: 50,
          padding: '0 36px'
        }}
      >
        <button style={{ background: 'none', border: 'none', marginRight: 40 }}>
          <img src={logoMap.Cybermind} alt="Logo" style={{ width: 44, height: 44.68 }} />
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
          width: 1440,
          height: 214,
          left: '50%',
          top: 120,
          transform: 'translateX(-50%)',
          background: '#fff',
          boxShadow: '0px 0px 14px rgba(198,191,191,0.25)',
          borderRadius: 32,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 40
        }}
      >
        <div
          style={{
            width: '90%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 2fr',
            gap: 40,
            alignItems: 'center',
            height: 120
          }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search By Job Title, Role"
              value={filters.title}
              onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
              className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
          {/* Preferred Location with dropdown icon at right */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filters.location}
              onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
              className="w-full pl-10 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-lg"
              style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}
            >
              <option value="">Preferred Location</option>
              {locationOptions.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute"
              style={{
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                width: 20,
                height: 20
              }}
            />
          </div>
          {/* Job Type with dropdown icon at right */}
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filters.jobType}
              onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value }))}
              className="w-full pl-10 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-lg"
              style={{ appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none' }}
            >
              <option value="">Job type</option>
              {jobTypeOptions.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute"
              style={{
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                width: 20,
                height: 20
              }}
            />
          </div>
          {/* Salary Per Month and Range above, slider below */}
          <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="text-sm font-medium text-gray-600" style={{ fontSize: 18, fontWeight: 600 }}>
                Salary Per Month
              </span>
              <span className="font-semibold text-gray-900 text-lg" style={{ minWidth: 130, textAlign: 'right' }}>
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
              trackStyle={[{ backgroundColor: '#000', height: 4 }]}
              handleStyle={[
                { backgroundColor: '#000', border: '2px solid #000', width: 20, height: 20, marginTop: -8 },
                { backgroundColor: '#000', border: '2px solid #000', width: 20, height: 20, marginTop: -8 }
              ]}
              railStyle={{ backgroundColor: '#e5e7eb', height: 4 }}
              style={{ width: '100%' }}
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
          top: 355,
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
                    <img src={job.logo} alt={job.companyName} className="w-10 h-10 object-contain rounded-full" />
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {job.postedDate}
                  </span>
                </div>
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{job.jobTitle}</h3>
                {/* Details */}
                <div className="flex flex-wrap items-center text-gray-600 mb-2 gap-2 text-sm">
                  <span>🏢 {job.companyName}</span>
                  <span>•</span>
                  <span>📍 {job.location}</span>
                  <span>•</span>
                  <span>📝 Onsite</span>
                  <span>•</span>
                  <span>💰 ₹{job.salaryMin/100000}L - ₹{job.salaryMax/100000}L</span>
                </div>
                {/* Description */}
                <ul className="list-disc ml-5 text-gray-600 text-sm mb-4">
                  <li>{job.jobDescription}</li>
                </ul>
                <div className="text-xs text-gray-500 mb-1"><b>Deadline:</b> {job.applicationDeadline}</div>
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
        <Plus className="w-6 h-6" />
      </button>

      {/* Create Job Modal */}
      {showCreateForm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            pointerEvents: 'auto',
            background: 'transparent', // No black overlay!
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
              height: 779,
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
                <X className="w-6 h-6" />
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
