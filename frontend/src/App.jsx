import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLogin from "./pages/User/UserLogin"
import UserSignup from "./pages/User/UserSignup"
import ResetPassword from './pages/User/ResetPassword';
import FormResetPassword from './pages/User/FormResetPassword';
import EmailVerification from './pages/User/EmailVerification';
import AdminLogin from './pages/Admin/AdminLogin';
import ContactUs from './pages/User/ContactUs';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import Home from './pages/Home';
import EmployeeProfile from './pages/Employee/EmployeeProfile';
import EmployeeResume from './pages/Employee/EmployeeResume';
import EmployeeAppliedJobs from './pages/Employee/EmployeeAppliedJobs';
import EmployeeAppliedInternships from './pages/Employee/EmployeeAppliedInternships';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import EmployerProfile from './pages/Employer/EmployerProfile';
import EmployerJobs from './pages/Employer/EmployerJobs';
import EmployerPostJobs from './pages/Employer/EmployerPostJobs';
import EmployerPostTrainings from './pages/Employer/EmployerPostTrainings';
import EmployerShortlistedCandidates from './pages/Employer/EmployerShortlistedCandidates';
import EmployerInternships from './pages/Employer/EmployerInternships';
import EmployerTrainings from './pages/Employer/EmployerTrainings';
import EmployerCertifications from './pages/Employer/EmployerCertifications';
import Internship from './pages/Internship';
import Training from './pages/Training';
import Certification from './pages/Certification';
import ChatPage from './pages/ChatPage';
import SingleInternship from './pages/SingleInternship';
import SingleJob from './pages/SingleJob';
import Opportunities from './pages/Opportunities';
import Counselling from './pages/Counselling';
import ViewCandidates from './pages/Employer/ViewCandidates';
import ViewCompanies from './pages/Employer/ViewCompanies';
import PrivateCompanyRequests from './pages/PrivateRequestes';
import SendRequest from './components/SendRequest';
import CounsellingPage from './components/CounsellingPage';
import WebCertificate from './pages/Employee/SingleCertification';
import TrainingPage from './pages/Employee/Trainingpage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/internships" element={<Internship />} />
        <Route path="/employee/single-internship/:id" element={<SingleInternship />} />
        <Route path="/employee/single-job/:id" element={<SingleJob />} />
        <Route path="/employee/opportunities" element={<Opportunities />} />
        <Route path="/employee/trainings" element={<Training />} />
        <Route path="/employee/single-training" element={<TrainingPage />} />
        <Route path="/employee/certifications" element={<Certification />} />
        <Route path="/employee/single-certification" element={<WebCertificate />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/reset-pass" element={<ResetPassword />} />
        <Route path="/user/form-reset-pass" element={<FormResetPassword />} />
        <Route path="/user/verify-email" element={<EmailVerification />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/user/contact" element={<ContactUs />} />
        <Route path="/employee/counselling" element={<Counselling />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee/profile" element={<EmployeeProfile />} />
        <Route path="/employee/resume" element={<EmployeeResume />} />
        <Route path="/employee/appliedjobs" element={<EmployeeAppliedJobs />} />
        <Route path="/employee/appliedinternships" element={<EmployeeAppliedInternships />} />


        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/employer/profile" element={<EmployerProfile />} />
        <Route path="/employer/jobs" element={<EmployerJobs />} />
        <Route path="/employer/internships" element={<EmployerInternships />} />
        <Route path="/employer/trainings" element={<EmployerTrainings />} />
        <Route path="/employer/certifications" element={<EmployerCertifications />} />
        <Route path="/employer/postjobs" element={<EmployerPostJobs />} />
        <Route path="/employer/posttrainings" element={<EmployerPostTrainings />} />
        <Route path="/employer/shortlisted-candidates" element={<EmployerShortlistedCandidates />} />


        <Route path="/govt/dashboard" element={<EmployerDashboard />} />
        <Route path="/govt/profile" element={<EmployerProfile />} />
        <Route path="/govt/jobs" element={<EmployerJobs />} />
        <Route path="/govt/internships" element={<EmployerInternships />} />
        <Route path="/govt/trainings" element={<EmployerTrainings />} />
        <Route path="/govt/certifications" element={<EmployerCertifications />} />
        <Route path="/govt/postjobs" element={<EmployerPostJobs />} />
        <Route path="/govt/posttrainings" element={<EmployerPostTrainings />} />
        <Route path="/govt/shortlisted-candidates" element={<EmployerShortlistedCandidates />} />
        <Route path="/govt/all-candidates" element={<ViewCandidates />} />
        <Route path="/govt/all-companies" element={<ViewCompanies />} />
        <Route path="/private-requests" element={<PrivateCompanyRequests />} />
        <Route path="/send-request" element={<SendRequest />} />
        <Route path="/all-mentors" element={<CounsellingPage />} />

      </Routes>
    </Router>
  )
}

export default App;