import { useState, useEffect } from 'react';

// The main App component
const App = () => {
  // State for the three main inputs
  const [loanAmount, setLoanAmount] = useState(6000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(6);
  const [tenureType, setTenureType] = useState('Mo'); // 'Mo' for months, 'Yr' for years

  // State for the calculated values
  const [emi, setEmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  // Constants for the circular chart
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  // This effect runs whenever any of the input values change
  useEffect(() => {
    // Convert annual interest rate to monthly rate
    let monthlyRate = interestRate / 12 / 100;
    // Convert tenure to months
    const months = tenureType === 'Yr' ? tenure * 12 : tenure;

    // Calculate EMI using the standard formula
    let calculatedEmi;
    if (monthlyRate === 0) {
      calculatedEmi = loanAmount / months;
    } else {
      calculatedEmi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }
    
    // Calculate total payment and total interest
    const calculatedTotalPayment = calculatedEmi * months;
    const calculatedTotalInterest = calculatedTotalPayment - loanAmount;

    // Update the state with the new calculated values
    setEmi(calculatedEmi);
    setTotalPayment(calculatedTotalPayment);
    setTotalInterest(calculatedTotalInterest);
  }, [loanAmount, interestRate, tenure, tenureType]);

  // Function to format numbers as Indian Rupees
  const formatRupees = (amount) => {
    if (isNaN(amount) || !isFinite(amount)) return '0.00';
    return `₹${amount.toFixed(2)}`;
  };

  // Calculate percentages for the SVG chart
  const principalPercentage = (loanAmount / totalPayment) * 100;
  const interestPercentage = (totalInterest / totalPayment) * 100;
  
  // Calculate dash-offsets for the SVG arcs to create the pie chart effect
  const principalDashoffset = circumference - (principalPercentage / 100) * circumference;
  const interestDashoffset = circumference - (interestPercentage / 100) * circumference;

  return (
    <div className="bg-gray-50 py-6 px-4 font-sans">
      <section id="calc-emi" className="mt-20 scroll-m-20 laptop:scroll-m-32 container mx-auto">
        
        {/* Heading */}
        <h2 className="text-xl laptop:text-[26px] capitalize text-[#212529] flex flex-col items-center font-semibold text-center">
          Business Loan EMI Calculator: Plan Your Repayment with Ease
          <div className="w-16 mt-2 h-1 rounded-full bg-[#FDD335]"></div>
        </h2>
        
        {/* Description */}
        <div className="mt-2 max-w-2xl mx-auto  text-xs laptop:text-md desktop:text-base text-center font-medium container [&>p]:mb-4">
          <p>
            Taking a personal loan for business is a significant decision, and careful financial planning is crucial. Use KreditBee's
            <a href="/business-loan-emi-calculator" className="text-[#FDD335]">Business Loan EMI Calculator</a>
            to calculate your monthly EMIs instantly. Just enter the loan amount, interest rate, and tenure to make informed repayment decisions.
          </p>
        </div>


        {/* Main Layout - Grid for inputs and chart */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* LEFT SIDE (col-8 equivalent) - Input sliders */}
          <div className="md:col-span-8 flex flex-col gap-10">
            
            {/* Input Box */}
            <div className="w-full px-8 py-8 border border-gray-200 rounded-3xl laptop:px-12 space-y-8 bg-white shadow-xl">
              
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <label className="font-bold text-sm">Loan Amount</label>
                    <img src="https://placehold.co/16x16/000000/FFFFFF?text=?" alt="info" />
                  </div>
                  <div className="flex items-center rounded-md bg-gray-100 p-2">
                    <input
                      id="loan-amount-input"
                      className=" pr-1 text-right rounded-md bg-transparent outline-none w-18 font-semibold text-gray-800"
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                    />
                    <span className="text-gray-500">₹</span>
                  </div>
                </div>
                <input
                  id="loan-amount-slider"
                  type="range"
                  min="1000"
                  max="500000"
                  step="1000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  style={{ accentColor: '#f2b100' }}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500 font-medium">
                  <span>1K</span>
                  <span>1L</span>
                  <span>2L</span>
                  <span>3L</span>
                  <span>4L</span>
                  <span>5L</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="-mt-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <label className="font-bold text-sm">Rate Of Interest</label>
                    <img src="https://placehold.co/16x16/000000/FFFFFF?text=?" alt="info" />
                  </div>
                  <div className="flex items-center rounded-md bg-gray-100 p-2">
                    <input
                      id="interest-rate-input"
                      className=" pr-1 text-right rounded-md bg-transparent outline-none w-15 font-semibold text-gray-800"
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                    />
                    <span className="text-gray-500">%</span>
                  </div>
                </div>
                <input
                  id="interest-rate-slider"
                  type="range"
                  min="1"
                  max="28.5"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  style={{ accentColor: '#f2b100' }}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500 font-medium">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                  <span>15</span>
                  <span>20</span>
                  <span>25</span>
                  <span>28.5</span>
                </div>
              </div>

              {/* Tenure */}
              <div className="-mt-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-2">
                    <label className="font-bold text-sm">Tenure</label>
                    <img src="https://placehold.co/16x16/000000/FFFFFF?text=?" alt="info" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center rounded-md bg-gray-100 p-2">
                      <input
                        id="tenure-input"
                        className="pr-1 text-right rounded-md bg-transparent outline-none w-10 font-semibold text-gray-800"
                        type="number"
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                      />
                    </div>
                    <div className="flex rounded-lg overflow-hidden bg-gray-200 font-semibold">
                      <button
                        id="tenure-mo"
                        className={`px-4 py-2 text-sm transition-all duration-300 ${tenureType === 'Mo' ? 'bg-white text-gray-800 shadow-md' : 'bg-transparent text-gray-500'}`}
                        onClick={() => setTenureType('Mo')}
                      >
                        Mo
                      </button>
                      <button
                        id="tenure-yr"
                        className={`px-4 py-2 text-sm transition-all duration-300 ${tenureType === 'Yr' ? 'bg-white text-gray-800 shadow-md' : 'bg-transparent text-gray-500'}`}
                        onClick={() => setTenureType('Yr')}
                      >
                        Yr
                      </button>
                    </div>
                  </div>
                </div>
                <input
                  id="tenure-slider"
                  type="range"
                  min="1"
                  max={tenureType === 'Mo' ? 360 : 30}
                  step="1"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200"
                  style={{ accentColor: '#f2b100' }}
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (col-4 equivalent) - Chart */}
          <div className="md:col-span-4 border rounded-3xl p-6 bg-white shadow-xl flex flex-col items-center justify-center">
            <p className="text-[#F2B100] text-sm font-semibold mb-4 cursor-pointer">View EMI Schedule</p>
            <div className="relative w-full max-w-[300px] h-[300px] flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="90" stroke="#E5E7EB" strokeWidth="20" fill="none" />
                {/* Principal Arc */}
                <circle 
                  id="principal-arc"
                  cx="100" cy="100" r="90"
                  stroke="#FDD335" strokeWidth="20" fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={principalDashoffset}
                  transform="rotate(-90 100 100)"
                />
                {/* Interest Arc */}
                <circle
                  id="interest-arc"
                  cx="100" cy="100" r="90"
                  stroke="#797E96" strokeWidth="20" fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={interestDashoffset}
                  transform={`rotate(${(principalPercentage / 100) * 360 - 90} 100 100)`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p id="total-payment-display" className="text-2xl font-bold text-gray-800">{formatRupees(totalPayment)}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Result Box - Positioned below the main grid */}
        <div className="mt-5 max-w-2xl mx-auto px-6 py-2 bg-[#2b2b2b] rounded-3xl text-white space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-semibold">Equated Monthly Installments (EMI)</h4>
            <p id="emi-display" className="text-lg font-semibold whitespace-nowrap">{formatRupees(emi)}</p>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Total Amt Payable</h3>
            <p id="total-payment-display-bottom" className="text-lg font-medium whitespace-nowrap">{formatRupees(totalPayment)}</p>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-medium">Total Interest</h3>
            <p id="total-interest-display" className="text-lg font-medium whitespace-nowrap">{formatRupees(totalInterest)}</p>
          </div>
          <div className="text-center ">
            <button
              type="button"
              className="bg-[#FDD335] text-[#212529] px-8 py-3 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
