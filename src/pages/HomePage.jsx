// src/pages/HomePage.jsx
import React from 'react';
import Banner from '../components/Banner';
import InstantLoanSection from '../components/InstantLoanSection';
import CreditScoreSection from '../components/CreditScoreSection';
import AboutUsSection from '../components/AboutUsSection';
import ServiceCards from '../components/ServiceCards';
import ChooseSection from '../components/ChooseSection';
import StatsSection from '../components/StatsSection';

function HomePage() {
  return (
    <>
      <Banner />
      <InstantLoanSection />
      <CreditScoreSection />
      <AboutUsSection />
      <ServiceCards />
      <ChooseSection />
      <StatsSection />
    </>
  );
}

export default HomePage;
