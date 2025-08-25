// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // ✅ Router import
import Header from './components/Header';
import Banner from './components/Banner';
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from './components/Footer';
import InstantLoanSection from './components/InstantLoanSection';
import CreditScoreSection from './components/CreditScoreSection';
import AboutUsSection from './components/AboutUsSection';
import ServiceCards from './components/ServiceCards';
import StatsSection from './components/StatsSection';
import ChooseSection from './components/ChooseSection';

// ✅ New Page Import
import BusinessLoan from './pages/BusinessL';
import PersonalLoan from './pages/PersonalLoan';
import AgainstLoan from './pages/AgainstL'


import PersonalEMI from './pages/EMI-Calculator/PersonalEMI';
import BusinessEMI from './pages/EMI-Calculator/BusinessEMI';
// Now This EMI import 


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Default Homepage */}
        <Route
          path="/"
          element={
            <>
              <Banner />
              <InstantLoanSection />
              <CreditScoreSection />
              <AboutUsSection />
              <ServiceCards />
              <ChooseSection />
              <StatsSection />
            </>
          }
        />
        <Route path="/personal-loan" element={<PersonalLoan />} />
        <Route path="/business-loan" element={<BusinessLoan />} />
        <Route path='/against-Loan' element={<AgainstLoan />} />

        <Route path='/personal-emi' element={<PersonalEMI/>}/>
        <Route path='/business-emi' element={<BusinessEMI/>}/>
          
      </Routes>
       <div className="h-100">
                <h1>Next Section</h1>
                <Footer />
              </div>
    </Router>
  );
}

export default App;
