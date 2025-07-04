import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, Briefcase, Plus, Edit3, Trash2 } from 'lucide-react';
import { ShimmerContentBlock } from "shimmer-effects-react";
import './output.css';




// Preloaded jobs
const preloadedJobs = [
  {
    jobTitle: 'Full Stack Developer',
    companyName: 'T',
    location: 'Onsite',
    jobType: 'Full Time',
    salaryMin: 1200000,
    salaryMax: 1200000,
    jobDescription: 'A user-friendly interface lets you browse stunning photos and videos.',
    experience: '+1-3 yr Exp',
    applicationDeadline: '2025-08-15',
    postedDate: '24h Ago'
  },
  {
    jobTitle: 'Node Js Developer',
    companyName: 'a',
    location: 'Onsite',
    jobType: 'Full Time',
    salaryMin: 1200000,
    salaryMax: 1200000,
    jobDescription: 'A user-friendly interface lets you browse stunning photos and videos.',
    experience: '+1-3 yr Exp',
    applicationDeadline: '2025-08-20',
    postedDate: '24h Ago'
  },
  {
    jobTitle: 'UX/UI Designer',
    companyName: 'a',
    location: 'Onsite',
    jobType: 'Full Time',
    salaryMin: 1200000,
    salaryMax: 1200000,
    jobDescription: 'A user-friendly interface lets you browse stunning photos and videos.',
    experience: '+1-3 yr Exp',
    applicationDeadline: '2025-08-25',
    postedDate: '24h Ago'
  }
];

function isDuplicate(job, list) {
  return list.some(
    j =>
      j.jobTitle === job.jobTitle &&
      j.companyName === job.companyName &&
      j.applicationDeadline === job.applicationDeadline
  );
}

const JobManagementApp = () => {
  const [jobs, setJobs] = useState(preloadedJobs);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    jobType: '',
    salaryRange: [0, 100000]
  });
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    jobDescription: '',
    requirements: '',
    responsibilities: '',
    applicationDeadline: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Merge backend jobs with preloaded jobs, show shimmer while loading
  useEffect(() => {
    setLoading(true);
    axios.get('https://job-application-app-sgo9.onrender.com/jobs')
      .then(res => {
        const backendJobs = res.data || [];
        let merged = [...preloadedJobs];
        backendJobs.forEach(job => {
          if (!isDuplicate(job, merged)) {
            merged.push(job);
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

  const handleSubmit = () => {
    if (validateForm()) {
      const newJob = {
        ...formData,
        salaryMin: parseInt(formData.salaryMin) || 0,
        salaryMax: parseInt(formData.salaryMax) || 0,
        postedDate: 'Just now'
      };
      axios.post('https://job-application-app-sgo9.onrender.com/jobs', newJob)
        .then(res => {
          setJobs(prev => [...prev, res.data]);
          setFormData({
            jobTitle: '',
            companyName: '',
            location: '',
            jobType: '',
            salaryMin: '',
            salaryMax: '',
            jobDescription: '',
            requirements: '',
            responsibilities: '',
            applicationDeadline: ''
          });
          setShowCreateForm(false);
        })
        .catch(err => console.error(err));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesTitle = job.jobTitle?.toLowerCase().includes(filters.title.toLowerCase());
    const matchesLocation = job.location?.toLowerCase().includes(filters.location.toLowerCase());
    const matchesJobType = !filters.jobType || job.jobType === filters.jobType;
    const matchesSalary = job.salaryMin >= filters.salaryRange[0] && job.salaryMax <= filters.salaryRange[1];
    return matchesTitle && matchesLocation && matchesJobType && matchesSalary;
  });

  const getCompanyIcon = (company) => {
    const icons = {
      'Amazon': '🅰️',
      'Tesla': '🚗',
      'Google': '🔍',
      'Microsoft': '🪟',
      'Meta': '📘'
    };
    return icons[company] || '🏢';
  };

  if (showCreateForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Job Management</h1>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              ← Back to Jobs
            </button>
          </div>
          {/* Create Job Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Create Job Opening</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
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
                {/* Company Name */}
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange('companyName', e.target.value)}
                    className={`w-full px-4 py-4 border rounded-xl text-lg ${
                      formErrors.companyName ? 'border-red-500' : 'border-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Amazon, Microsoft, Google"
                  />
                  {formErrors.companyName && <p className="text-red-500 text-sm mt-1">{formErrors.companyName}</p>}
                </div>
                {/* Location */}
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
                    <option value="Chennai">Chennai</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Hyderabad">Hyderabad</option>
                  </select>
                  {formErrors.location && <p className="text-red-500 text-sm mt-1">{formErrors.location}</p>}
                </div>
                {/* Job Type */}
                <div>
                  <label className="block text-lg font-semibold text-gray-600 mb-2">Job Type</label>
                  <select
                    value={formData.jobType}
                    onChange={(e) => handleInputChange('jobType', e.target.value)}
                    className={`w-full px-4 py-4 border rounded-xl text-lg ${
                      formErrors.jobType ? 'border-red-500' : 'border-gray-900'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="">Full Time</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                  {formErrors.jobType && <p className="text-red-500 text-sm mt-1">{formErrors.jobType}</p>}
                </div>
              </div>
              {/* Salary Range */}
              <div>
                <label className="block text-lg font-semibold text-gray-600 mb-2">Salary Range</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="number"
                      value={formData.salaryMin}
                      onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                      placeholder="₹0"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      value={formData.salaryMax}
                      onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                      placeholder="₹12,00,000"
                      className="w-full px-4 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              {/* Application Deadline */}
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
              {/* Job Description */}
              <div>
                <label className="block text-lg font-semibold text-gray-600 mb-2">Job Description</label>
                <textarea
                  value={formData.jobDescription}
                  onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                  rows={6}
                  className={`w-full px-4 py-4 border rounded-xl text-lg ${
                    formErrors.jobDescription ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                  placeholder="Please share a description to let the candidate know more about the job role"
                />
                {formErrors.jobDescription && <p className="text-red-500 text-sm mt-1">{formErrors.jobDescription}</p>}
              </div>
              {/* Requirements */}
              <div>
                <label className="block text-lg font-semibold text-gray-600 mb-2">Requirements</label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => handleInputChange('requirements', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="List the key requirements and qualifications"
                />
              </div>
              {/* Responsibilities */}
              <div>
                <label className="block text-lg font-semibold text-gray-600 mb-2">Responsibilities</label>
                <textarea
                  value={formData.responsibilities}
                  onChange={(e) => handleInputChange('responsibilities', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Describe the key responsibilities and duties"
                />
              </div>
              {/* Action Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-16 py-4 bg-white border-2 border-gray-900 text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-md"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-16 py-4 bg-blue-500 text-white rounded-xl font-semibold text-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  Publish
                  <span className="text-sm">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg"></div>
              </div>
              <nav className="ml-10 flex space-x-8">
                <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium">Home</a>
                <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium">Find Jobs</a>
                <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium">Find Talents</a>
                <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium">About us</a>
                <a href="#" className="text-gray-900 hover:text-gray-700 px-3 py-2 text-sm font-medium">Testimonials</a>
              </nav>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all"
            >
              Create Jobs
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search By Job Title, Role"
                value={filters.title}
                onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Preferred Location"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1 relative">
              <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filters.jobType}
                onChange={(e) => setFilters(prev => ({ ...prev, jobType: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Job type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl">
              <div className="text-sm font-medium text-gray-600 mb-2">Salary Per Month</div>
              <div className="text-lg font-semibold">₹{filters.salaryRange[0]/1000}k - ₹{filters.salaryRange[1]/1000}k</div>
            </div>
          </div>
        </div>
        {/* Shimmer while loading */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg p-6">
                <ShimmerContentBlock
                  title
                  text
                  cta
                  thumbnailWidth={80}
                  thumbnailHeight={80}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredJobs.map((job, idx) => (
              <div key={job._id || idx} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {getCompanyIcon(job.companyName)}
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {job.postedDate}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{job.jobTitle}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="text-sm">👥 {job.jobType}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">🏢 {job.companyName}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm">📍 {job.location}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="text-sm">💰 ₹{job.salaryMin/100000}L - ₹{job.salaryMax/100000}L</span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {job.jobDescription}
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors">
                    Apply Now
                  </button>
                  <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Floating Action Button */}
        <button
          onClick={() => setShowCreateForm(true)}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-full shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all hover:scale-110"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default JobManagementApp;
