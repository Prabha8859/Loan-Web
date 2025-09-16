import React, { useState, useEffect } from 'react';

const BusinessEMI = () => {
  const [loanAmount, setLoanAmount] = useState(600000);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTenure, setLoanTenure] = useState(6);
  const [emi, setEmi] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const testimonials = [
    {
      name: "Rajesh Kumar",
      company: "Kumar Textiles",
      comment: "This calculator helped me plan my business expansion perfectly. The detailed breakdown made it easy to understand my financial commitments.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Priya Sharma",
      company: "Sharma Foods",
      comment: "As a first-time business loan applicant, this calculator simplified complex financial terms. I could compare different tenure options easily.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Vikram Singh",
      company: "Singh Automobiles",
      comment: "The payment schedule feature is incredibly detailed. It helped me visualize my repayment journey and plan my cash flow accordingly.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
    }
  ];

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const numberOfMonths = parseFloat(loanTenure) * 12;

    if (principal > 0 && monthlyInterestRate > 0 && numberOfMonths > 0) {
      const calculatedEmi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
      const calculatedTotalPayable = calculatedEmi * numberOfMonths;
      const calculatedTotalInterest = calculatedTotalPayable - principal;

      setEmi(calculatedEmi.toFixed(2));
      setTotalPayable(calculatedTotalPayable.toFixed(2));
      setTotalInterest(calculatedTotalInterest.toFixed(2));
      generateAmortizationSchedule(principal, monthlyInterestRate, numberOfMonths, calculatedEmi);
    } else {
      setEmi(0);
      setTotalPayable(0);
      setTotalInterest(0);
      setAmortizationSchedule([]);
    }
  };

  const generateAmortizationSchedule = (principal, monthlyInterestRate, numberOfMonths, monthlyEmi) => {
    let currentBalance = principal;
    const schedule = [];
    let year = 1;
    let totalPaidInYear = 0;
    let totalPrincipalPaidInYear = 0;
    let totalInterestPaidInYear = 0;
    let monthsInYear = 0;

    for (let month = 1; month <= numberOfMonths; month++) {
      const interestPayment = currentBalance * monthlyInterestRate;
      const principalPayment = monthlyEmi - interestPayment;
      currentBalance -= principalPayment;
      
      totalPrincipalPaidInYear += principalPayment;
      totalInterestPaidInYear += interestPayment;
      totalPaidInYear += monthlyEmi;
      // monthsInYear++;

      if (month % 12 === 0 || month === numberOfMonths) {
        schedule.push({
          year,
          principal: totalPrincipalPaidInYear,
          interest: totalInterestPaidInYear,
          totalPayment: totalPaidInYear,
          balance: currentBalance > 0 ? currentBalance : 0,
          loanPaid: ((principal - currentBalance) / principal) * 100
        });
        
        year++;
        totalPaidInYear = 0;
        totalPrincipalPaidInYear = 0;
        totalInterestPaidInYear = 0;
        // monthsInYear = 0;
      }
    }
    setAmortizationSchedule(schedule);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value}%`;
  };

  const nextTestimonial = () => {
    setTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Calculate loan-to-value ratio (for demonstration, assuming property value is 1.5x loan amount)
  const propertyValue = loanAmount * 1.5;
  const ltvRatio = (loanAmount / propertyValue) * 100;

  // Circular progress component
  const CircularProgress = ({ percentage, label, value }) => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="#F5A623"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">{value}</span>
            <span className="text-sm text-gray-600">{label}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-[#FBF8EF] to-[#F5F2E8] min-h-screen font-sans">
      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Business Loan EMI Calculator</h1>
          <div className="w-24 h-1 bg-[#F5A623] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Entrepreneurs and small business owners drive innovation and economic progress, often requiring timely financial support to fuel their endeavours. Our Business Loan EMI Calculator helps you plan your finances better.
          </p>
        </div>
        
        {/* Header */}
        <div className="shadow-sm mb-8">
          <div className="mx-auto px-4 py-4">
            <div className="text-sm text-gray-500">
              <span className="text-gray-400">Home / Loan EMI Calculator /</span> <span className="font-semibold text-gray-800">Business Loan EMI Calculator</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-3 px-6 font-medium text-lg ${activeTab === 'calculator' ? 'border-b-2 border-[#F5A623] text-[#F5A623]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculator
          </button>
          <button
            className={`py-3 px-6 font-medium text-lg ${activeTab === 'schedule' ? 'border-b-2 border-[#F5A623] text-[#F5A623]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('schedule')}
          >
            Payment Schedule
          </button>
          <button
            className={`py-3 px-6 font-medium text-lg ${activeTab === 'info' ? 'border-b-2 border-[#F5A623] text-[#F5A623]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('info')}
          >
            Information
          </button>
        </div>

        {activeTab === 'calculator' && (
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* EMI Calculator Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Loan Details</h2>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 font-semibold">Loan Amount</label>
                  <span className="text-lg font-bold text-[#F5A623]">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="100000"
                    max="5000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F5A623]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>₹1 Lakh</span>
                    <span>₹50 Lakh</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 font-semibold">Rate of Interest</label>
                  <span className="text-lg font-bold text-[#F5A623]">{formatPercentage(interestRate)}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F5A623]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 font-semibold">Loan Tenure (Years)</label>
                  <span className="text-lg font-bold text-[#F5A623]">{loanTenure} Years</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(e.target.value)}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#F5A623]"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1 Year</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>

              {/* Circular Progress Indicators */}
              <div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-gray-200">
                <CircularProgress 
                  percentage={ltvRatio} 
                  label="Loan-to-Value" 
                  value={`${ltvRatio.toFixed(0)}%`} 
                />
                <CircularProgress 
                  percentage={(loanTenure / 30) * 100} 
                  label="Tenure Used" 
                  value={`${loanTenure} Years`} 
                />
              </div>
            </div>
            
            {/* Results Section */}
            <div className="bg-gradient-to-br from-[#2D2D2D] to-[#1F1F1F] p-8 rounded-xl shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-6">Loan Summary</h2>
              
              <div className="bg-[#3A3A3A] p-6 rounded-lg mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-300">Monthly EMI</span>
                  <span className="text-3xl font-bold text-[#F5A623]">₹{emi.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-sm text-gray-400">Your equated monthly installment</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#3A3A3A] p-4 rounded-lg">
                  <div className="text-gray-300 text-sm mb-1">Principal Amount</div>
                  <div className="text-xl font-bold">{formatCurrency(loanAmount)}</div>
                </div>
                <div className="bg-[#3A3A3A] p-4 rounded-lg">
                  <div className="text-gray-300 text-sm mb-1">Total Interest</div>
                  <div className="text-xl font-bold">{formatCurrency(totalInterest)}</div>
                </div>
                <div className="bg-[#3A3A3A] p-4 rounded-lg col-span-2">
                  <div className="text-gray-300 text-sm mb-1">Total Amount Payable</div>
                  <div className="text-xl font-bold">{formatCurrency(totalPayable)}</div>
                </div>
              </div>

              {/* Interest vs Principal Visualization */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Interest vs Principal</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-[#F5A623] h-3 rounded-full" 
                    style={{ 
                      width: `${(totalInterest / totalPayable) * 100}%`,
                      backgroundImage: `linear-gradient(to right, #F5A623 ${(totalInterest / totalPayable) * 100}%, #4ADE80 ${(totalInterest / totalPayable) * 100}%)`
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>Principal: {formatCurrency(loanAmount)}</span>
                  <span>Interest: {formatCurrency(totalInterest)}</span>
                </div>
              </div>
              
              <button className="w-full py-4 bg-[#F5A623] text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300 shadow-md">
                Apply For Business Loan
              </button>
              
              <div className="text-center text-xs text-gray-400 mt-4">
                Get instant approval with minimal documentation
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">EMI Payments' Schedule</h2>
            <div className="w-24 h-1 bg-[#F5A623] mb-6"></div>
            
            {amortizationSchedule.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Year</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-[#F9E9B0]">Principal (A)</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-[#C8DAE2]">Interest (B)</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Total Payment (A + B)</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider bg-[#FF6A6A] text-white">Balance</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Loan Paid to date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {amortizationSchedule.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{item.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap bg-[#FFFBEA]">{formatCurrency(item.principal)}</td>
                        <td className="px-6 py-4 whitespace-nowrap bg-[#EAF2F6]">{formatCurrency(item.interest)}</td>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{formatCurrency(item.totalPayment)}</td>
                        <td className="px-6 py-4 whitespace-nowrap bg-[#FFE6E6]">{formatCurrency(item.balance)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-[#F5A623] h-2.5 rounded-full" 
                              style={{width: `${item.loanPaid > 100 ? 100 : item.loanPaid}%`}}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">{item.loanPaid.toFixed(2)}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Please adjust the loan parameters to generate a payment schedule
              </div>
            )}
          </div>
        )}

        {activeTab === 'info' && (
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* "What Is" and "How To" section */}
            <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">What Is A Business Loan EMI Calculator?</h2>
              <div className="w-24 h-1 bg-[#F5A623] mb-4"></div>
              <p className="text-gray-600 mb-6">
                A Business Loan EMI Calculator is a financial utility that assists entrepreneurs and small business owners in estimating their monthly loan repayments. By inputting the loan amount, interest rate, and tenure, users can instantly calculate their Equated Monthly Installment (EMI), helping them plan their finances effectively and make informed borrowing decisions.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-2">How To Use The Calculator?</h2>
              <div className="w-24 h-1 bg-[#F5A623] mb-4"></div>
              <ol className="list-decimal pl-5 text-gray-600 space-y-4">
                <li>
                  <span className="font-medium">Enter Your Loan Details:</span> Input essential loan details such as the loan amount, interest rate, and tenure accurately into the calculator using the sliders or input fields.
                </li>
                <li>
                  <span className="font-medium">View Your EMI:</span> Instantly see your business loan EMI on the right side of the screen and gain clarity on your repayment schedule, total interest payable, and overall cost of the loan.
                </li>
                <li>
                  <span className="font-medium">Explore Loan Options:</span> Adjust variables like loan amount, interest rate, and tenure to understand how they affect your EMI and choose the most suitable loan option for your business needs.
                </li>
              </ol>
              
              <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-2">Benefits of Using Our EMI Calculator</h2>
              <div className="w-24 h-1 bg-[#F5A623] mb-4"></div>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Instant calculation of monthly installments</li>
                <li>Clear visualization of principal and interest components</li>
                <li>Ability to compare different loan scenarios</li>
                <li>Better financial planning and budgeting</li>
                <li>Time-saving compared to manual calculations</li>
              </ul>
            </div>
            
            {/* Other Calculators Sidebar */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Other Calculators</h3>
              <ul className="space-y-3">
                <li className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Personal Loan EMI Calculator</span>
                </li>
                <li className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Home Loan EMI Calculator</span>
                </li>
                <li className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Gold Loan EMI Calculator</span>
                </li>
                <li className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Compound Interest Calculator</span>
                </li>
                <li className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
                    </svg>
                  </div>
                  <span className="text-gray-700">Mortgage loan EMI Calculator</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Testimonials Section */}
             <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">What Our Customers Say</h2>
          <div className="w-24 h-1 bg-[#F5A623] mb-6"></div>
          
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-50 p-6 rounded-lg transition-all duration-300 transform ${
                    index === testimonialIndex 
                      ? 'scale-105 shadow-lg border-2 border-[#F5A623]' 
                      : 'scale-95 opacity-80'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mb-4"
                    />
                    <div className="mb-4">
                      <div className="flex items-center justify-center text-[#F5A623] mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-5 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors"
              onClick={prevTestimonial}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            
            <button 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-5 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-colors"
              onClick={nextTestimonial}
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
            
            <div className="flex justify-center mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full mx-1 transition-all ${
                    index === testimonialIndex 
                      ? 'bg-[#F5A623] scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setTestimonialIndex(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Improved Business Loan Benefits Section */}
        <div className="bg-gradient-to-r from-[#2D2D2D] to-[#1F1F1F] p-8 rounded-xl shadow-lg text-white mb-12 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 opacity-10">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <path fill="#F5A623" d="M45.2,-58.3C63.4,-47.2,85.5,-41.9,94.2,-27.2C102.9,-12.4,98.3,11.9,86.6,30.5C74.9,49.1,56.2,62.1,36.8,70.4C17.4,78.7,-2.7,82.4,-19.8,76.8C-36.9,71.2,-51.1,56.4,-61.8,38.7C-72.5,21,-79.7,0.5,-76.3,-17.6C-72.9,-35.7,-58.9,-51.4,-42.5,-62.9C-26.1,-74.4,-7.3,-81.7,5.8,-79.3C18.9,-76.9,27,-64.7,45.2,-58.3Z" transform="translate(100 100)" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold mb-6 relative z-10">Why Choose Our Business Loans?</h2>
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            <div className="text-center p-6 bg-[#3A3A3A] rounded-lg hover:bg-[#454545] transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-[#F5A623] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="font-bold mb-2 text-lg">Competitive Interest Rates</h3>
              <p className="text-sm text-gray-300">Get business loans at industry-leading interest rates with flexible repayment options.</p>
            </div>
            
            <div className="text-center p-6 bg-[#3A3A3A] rounded-lg hover:bg-[#454545] transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-[#F5A623] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="font-bold mb-2 text-lg">Quick Approval</h3>
              <p className="text-sm text-gray-300">Fast processing and approval with minimal documentation required for business loans.</p>
            </div>
            
            <div className="text-center p-6 bg-[#3A3A3A] rounded-lg hover:bg-[#454545] transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="w-16 h-16 bg-[#F5A623] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
              <h3 className="font-bold mb-2 text-lg">Flexible Tenure</h3>
              <p className="text-sm text-gray-300">Choose repayment tenures from 1 to 30 years based on your business cash flow.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action Section */}
      <div className="bg-[#F5A623] py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Grow Your Business?</h2>
          <p className="text-gray-800 mb-8 max-w-2xl mx-auto">Get the financial support you need with our flexible business loan options. Quick approval, competitive rates, and personalized service.</p>
          <button className="bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-gray-900 transition-colors duration-300">
            Apply for Business Loan Now
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">This calculator is for illustrative purposes only and actual loan terms may vary based on the lender's policies and your credit profile.</p>
        </div>
      </div>
    </div>
  );
};

export default BusinessEMI;