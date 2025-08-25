import React, { useState, useEffect } from 'react';

const BusinessEMI = () => {
  const [loanAmount, setLoanAmount] = useState(600000);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTenure, setLoanTenure] = useState(6);
  const [emi, setEmi] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const numberOfMonths = parseFloat(loanTenure) * 12;

    if (principal > 0 && monthlyInterestRate > 0 && numberOfMonths > 0) {
      const calculatedEmi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
      const calculatedTotalPayable = calculatedEmi * numberOfMonths;

      setEmi(calculatedEmi.toFixed(2));
      setTotalPayable(calculatedTotalPayable.toFixed(2));
      generateAmortizationSchedule(principal, monthlyInterestRate, numberOfMonths, calculatedEmi);
    } else {
      setEmi(0);
      setTotalPayable(0);
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
      monthsInYear++;

      if (month % 12 === 0 || month === numberOfMonths) {
        schedule.push({
          year,
          principal: totalPrincipalPaidInYear,
          interest: totalInterestPaidInYear,
          totalPayment: totalPaidInYear,
          balance: currentBalance > 0 ? currentBalance : 0,
          loanPaid: (totalPrincipalPaidInYear / principal) * 100
        });
        
        year++;
        totalPaidInYear = 0;
        totalPrincipalPaidInYear = 0;
        totalInterestPaidInYear = 0;
        monthsInYear = 0;
      }
    }
    setAmortizationSchedule(schedule);
  };

  return (
    <div className="bg-[#FBF8EF] min-h-screen font-sans">
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-8">
        <div className="text-sm text-gray-500">
          <span className="text-gray-400">Home / Loan EMI Calculator /</span> <span className="font-semibold text-gray-800">Business Loan EMI Calculator</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Business Loan EMI Calculator</h1>
        <div className="w-24 h-1 bg-[#F5A623] mb-8"></div>
        <p className="text-gray-600 mb-12 max-w-4xl">
          Entrepreneurs and small business owners drive innovation and economic progress, often requiring timely financial support to fuel their endeavours...
        </p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* EMI Calculator Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Loan Amount</label>
              <div className="relative">
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-[#F5A623] [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1.5"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹1 Lakh</span>
                  <span>₹{loanAmount.toLocaleString('en-IN')}</span>
                  <span>₹50 Lakh</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Rate of Interest</label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-[#F5A623] [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1.5"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1%</span>
                  <span>{interestRate}%</span>
                  <span>20%</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Loan Tenure (Years)</label>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-[#F5A623] [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-1.5"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1 Year</span>
                  <span>{loanTenure} Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="bg-[#2D2D2D] p-8 rounded-lg shadow-lg text-white">
            <h3 className="text-xl font-bold mb-4">Equated Monthly Installments (EMI)</h3>
            <div className="text-3xl font-bold mb-2">₹{emi.toLocaleString('en-IN')}</div>
            
            <h3 className="text-xl font-bold mt-6 mb-4">Total Amount Payable</h3>
            <div className="text-3xl font-bold mb-6">₹{totalPayable.toLocaleString('en-IN')}</div>
            
            <button className="w-full py-3 bg-[#F5A623] text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors duration-300">
              Apply Now
            </button>
          </div>
        </div>

        {/* EMI Payments' Schedule Table */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">EMI Payments' Schedule</h2>
          <div className="w-24 h-1 bg-[#F5A623] mb-6"></div>
          
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
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap bg-[#FFFBEA]">₹{item.principal.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap bg-[#EAF2F6]">₹{item.interest.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₹{item.totalPayment.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap bg-[#FFE6E6]">₹{item.balance.toLocaleString('en-IN')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.loanPaid.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Informational and Other Products Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* "What Is" and "How To" section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">What Is A Business Loan EMI Calculator?</h2>
            <div className="w-24 h-1 bg-[#F5A623] mb-4"></div>
            <p className="text-gray-600 mb-6">A Business Loan EMI Calculator is a financial utility that assists entrepreneurs and small business owners in estimating their monthly loan repayments...</p>
            
            <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-2">How To Use The Calculator?</h2>
            <div className="w-24 h-1 bg-[#F5A623] mb-4"></div>
            <ol className="list-decimal pl-5 text-gray-600 space-y-2">
              <li>Enter Your Loan Details on Our Business Loan EMI Calculator: Input essential loan details such as the loan amount, interest rate, and tenure accurately into the calculator.</li>
              <li>View Your EMI: You can see your business loan EMI on the right side of the screen and gain clarity on your repayment schedule.</li>
              <li>Explore Loan Options: Explore different loan scenarios by adjusting variables like loan amount, interest rate, and tenure to understand how they affect your EMI.</li>
            </ol>
          </div>
          
          {/* Other Calculators Sidebar */}
          <div className="bg-white p-8 rounded-lg shadow-lg h-fit">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Other Calculators</h3>
            <ul className="text-gray-600 space-y-2">
              <li>Personal Loan EMI Calculator</li>
              <li>Home Loan EMI Calculator</li>
              <li>Gold Loan EMI Calculator</li>
              <li>Compound Interest Calculator</li>
              <li>Mortgage loan EMI Calculator</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessEMI;