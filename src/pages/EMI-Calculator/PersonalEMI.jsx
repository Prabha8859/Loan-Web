import React, { useState, useEffect } from 'react';
import { FaBolt, FaPercent, FaFileAlt, FaTimes } from 'react-icons/fa';

const PersonalLoanCalculator = () => {
  // State for calculator inputs
  const [loanAmount, setLoanAmount] = useState(60000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(6);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [activeLoanType, setActiveLoanType] = useState('Instant Loan');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState(false);
  
  // Loan types
  const loanTypes = [
    'Instant Loan',
    'Fast Cash Loan',
    'EMI without Credit Card',
    'Low Credit Score Loan'
  ];
  
  // Cities
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'];
  
  // Loan purposes
  const loanPurposes = [
    { icon: '✈️', name: 'Travel' },
    { icon: '🎓', name: 'Education' },
    { icon: '🆘', name: 'Emergency' },
    { icon: '🛍️', name: 'Shopping' },
    { icon: '💒', name: 'Wedding' },
    { icon: '👶', name: 'Maternity' }
  ];
  
  // Calculate EMI and related values
  useEffect(() => {
    const calculateEMI = () => {
      const monthlyRate = interestRate / 12 / 100;
      const emiValue = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / 
                       (Math.pow(1 + monthlyRate, tenure) - 1);
      const totalAmountValue = emiValue * tenure;
      const totalInterestValue = totalAmountValue - loanAmount;
      
      setEmi(emiValue);
      setTotalInterest(totalInterestValue);
      setTotalAmount(totalAmountValue);
    };
    
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);
  
  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="min-h-screen font-['Poppins'] bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Personal Loan EMI Calculator</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Calculate your Equated Monthly Installments (EMI) and plan your finances better with our easy-to-use calculator
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-primary font-bold py-3 px-6 rounded-lg hover:bg-indigo-100 transition duration-300">
              Calculate EMI
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-primary transition duration-300">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-4">Why Choose Our Personal Loans?</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">Get instant approval with minimal documentation and enjoy flexible repayment options</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 card-shadow feature-card text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <FaBolt className="text-2xl text-primary" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">Instant Approval</h3>
            <p className="text-gray-600">Get loan approval within minutes with our streamlined digital process</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 card-shadow feature-card text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <FaPercent className="text-2xl text-primary" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">Low Interest Rates</h3>
            <p className="text-gray-600">Enjoy competitive interest rates starting from 10.25% per annum</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 card-shadow feature-card text-center">
            <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <FaFileAlt className="text-2xl text-primary" />
            </div>
            <h3 className="text-xl font-bold text-dark mb-2">Minimal Documentation</h3>
            <p className="text-gray-600">Simple documentation process with just basic KYC and income proof</p>
          </div>
        </div>
      </div>

      {/* Main Calculator */}
      <div className="max-w-6xl mx-auto py-8 px-4 -mt-10">
        <div className="bg-white rounded-xl card-shadow p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Loan Type Selection */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Loan Type</h2>
                <div className="space-y-3">
                  {loanTypes.map((type) => (
                    <div 
                      key={type}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        activeLoanType === type 
                          ? 'bg-indigo-100 border-2 border-indigo-500' 
                          : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
                      }`}
                      onClick={() => setActiveLoanType(type)}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                          activeLoanType === type ? 'border-indigo-500 bg-indigo-500' : 'border-gray-400'
                        }`}>
                          {activeLoanType === type && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        <span className="font-medium">{type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cities We Serve */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Cities We Serve</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="mb-3">
                    <label className="block text-gray-700 font-medium mb-2">Select City</label>
                    <select 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-600">Maximum Loan Amount in {selectedCity}</p>
                    <p className="text-xl font-bold text-indigo-600">Up to ₹5 Lakhs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculator Inputs */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Loan Amount Input */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Loan Amount</label>
                    <div className="text-2xl font-bold text-indigo-600">{formatCurrency(loanAmount)}</div>
                    <input 
                      type="range" 
                      min="1000" 
                      max="1000000" 
                      step="1000" 
                      value={loanAmount} 
                      onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                      className="range-slider w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1K</span>
                      <span>2L</span>
                      <span>4L</span>
                      <span>6L</span>
                      <span>8L</span>
                      <span>10L</span>
                    </div>
                  </div>

                  {/* Interest Rate Input */}
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Rate Of Interest</label>
                    <div className="text-2xl font-bold text-indigo-600">{interestRate}%</div>
                    <input 
                      type="range" 
                      min="0" 
                      max="28.5" 
                      step="0.1" 
                      value={interestRate} 
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                      className="range-slider w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0</span>
                      <span>5</span>
                      <span>10</span>
                      <span>15</span>
                      <span>20</span>
                      <span>25</span>
                      <span>28.5</span>
                    </div>
                  </div>
                </div>

                {/* Tenure Input and Results */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Tenure (Months)</label>
                    <div className="text-2xl font-bold text-indigo-600">{tenure} months</div>
                    <input 
                      type="range" 
                      min="6" 
                      max="60" 
                      step="6" 
                      value={tenure} 
                      onChange={(e) => setTenure(parseInt(e.target.value))}
                      className="range-slider w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>6</span>
                      <span>12</span>
                      <span>24</span>
                      <span>36</span>
                      <span>48</span>
                      <span>60</span>
                    </div>
                  </div>

                  {/* EMI Result */}
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Monthly EMI</span>
                      <span className="text-2xl font-bold text-indigo-600">{formatCurrency(emi)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Total Interest</span>
                      <span className="text-xl font-bold text-indigo-600">{formatCurrency(totalInterest)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Total Amount</span>
                      <span className="text-xl font-bold text-indigo-600">{formatCurrency(totalAmount)}</span>
                    </div>
                    <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button 
                  className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-4 rounded-lg transition duration-300"
                  onClick={() => setShowEmiModal(true)}
                >
                  View EMI Schedule
                </button>
                <button 
                  className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-4 rounded-lg transition duration-300"
                  onClick={() => setShowCreditModal(true)}
                >
                  Check Credit Score
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Purpose and Uses Section */}
        <div className="bg-white rounded-xl card-shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Purpose And Uses</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {loanPurposes.map((purpose, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg loan-purpose cursor-pointer">
                <div className="text-3xl mb-2">{purpose.icon}</div>
                <div className="text-sm font-medium text-center text-gray-800">{purpose.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl card-shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">What is an EMI?</h3>
              <p className="text-gray-600 text-sm">EMI stands for Equated Monthly Installment. It is the fixed amount you pay each month towards your loan until the loan is fully repaid.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">How is EMI calculated?</h3>
              <p className="text-gray-600 text-sm">EMI is calculated using the formula: [P x R x (1+R)^N]/[(1+R)^N-1], where P is the principal amount, R is the monthly interest rate, and N is the number of installments.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Can I prepay my loan?</h3>
              <p className="text-gray-600 text-sm">Yes, most lenders allow prepayment either partially or in full, though some may charge a prepayment penalty. Check with your lender for specific terms.</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-2">What factors affect my loan eligibility?</h3>
              <p className="text-gray-600 text-sm">Loan eligibility depends on factors like your income, credit score, employment history, existing debts, and the loan amount you're applying for.</p>
            </div>
          </div>
        </div>
      </div>

      {/* EMI Schedule Modal */}
      {showEmiModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">EMI Payment Schedule</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowEmiModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Loan Amount: <span className="font-bold text-indigo-600">{formatCurrency(loanAmount)}</span></p>
                    <p className="text-gray-600">Interest Rate: <span className="font-bold text-indigo-600">{interestRate}% per annum</span></p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tenure: <span className="font-bold text-indigo-600">{tenure} months</span></p>
                    <p className="text-gray-600">Monthly EMI: <span className="font-bold text-indigo-600">{formatCurrency(emi)}</span></p>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th className="px-4 py-3">Month</th>
                      <th className="px-4 py-3">EMI Amount</th>
                      <th className="px-4 py-3">Principal</th>
                      <th className="px-4 py-3">Interest</th>
                      <th className="px-4 py-3">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* EMI schedule rows would be generated here based on calculation */}
                    <tr className="bg-white border-b hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">1</td>
                      <td className="px-4 py-3">{formatCurrency(emi)}</td>
                      <td className="px-4 py-3">{formatCurrency(emi * 0.94)}</td>
                      <td className="px-4 py-3">{formatCurrency(emi * 0.06)}</td>
                      <td className="px-4 py-3">{formatCurrency(loanAmount - emi * 0.94)}</td>
                    </tr>
                    {/* More rows would be added dynamically based on tenure */}
                  </tbody>
                  <tfoot className="bg-gray-50 font-semibold text-gray-800">
                    <tr>
                      <td className="px-4 py-3">Total</td>
                      <td className="px-4 py-3">{formatCurrency(totalAmount)}</td>
                      <td className="px-4 py-3">{formatCurrency(loanAmount)}</td>
                      <td className="px-4 py-3">{formatCurrency(totalInterest)}</td>
                      <td className="px-4 py-3">-</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                  onClick={() => setShowEmiModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Credit Score Modal */}
      {showCreditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-11/12 max-w-md">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Check Your Credit Score</h3>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setShowCreditModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 mb-4">Check your credit score for free without impacting your credit rating.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your full name" />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Mobile Number</label>
                    <input type="tel" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your mobile number" />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                    <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your email address" />
                  </div>
                  
                  <div className="flex items-center">
                    <input type="checkbox" id="terms" className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-600">I agree to the terms and conditions</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button 
                  className="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-50"
                  onClick={() => setShowCreditModal(false)}
                >
                  Cancel
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300">
                  Check Score
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalLoanCalculator;