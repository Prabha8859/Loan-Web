import { useState, useEffect } from 'react';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(6000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(6);
  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [activeTab, setActiveTab] = useState('calculator');
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  const [selectedLoanType, setSelectedLoanType] = useState('Instant Loan');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Cities data
  const cities = [
    { name: 'Mumbai', loanAmount: 'Up to ₹5 Lakhs' },
    { name: 'Delhi', loanAmount: 'Up to ₹4 Lakhs' },
    { name: 'Bangalore', loanAmount: 'Up to ₹5 Lakhs' },
    { name: 'Hyderabad', loanAmount: 'Up to ₹4 Lakhs' },
    { name: 'Chennai', loanAmount: 'Up to ₹4 Lakhs' },
    { name: 'Kolkata', loanAmount: 'Up to ₹3 Lakhs' },
  ];

  // Loan types data
  const loanTypes = [
    'Instant Loan',
    'Fast Cash Loan',
    'EMI without Credit Card',
    'Low Credit Score Loan'
  ];

  // Purpose and Uses data with icons
  const purposes = [
    { name: 'Travel', icon: '✈️' },
    { name: 'Education', icon: '🎓' },
    { name: 'Emergency', icon: '🆘' },
    { name: 'Shopping', icon: '🛍️' },
    { name: 'Wedding', icon: '💒' },
    { name: 'Maternity', icon: '👶' },
    { name: 'Hobbies', icon: '🎨' },
    { name: 'Occasion', icon: '🎉' },
    { name: 'Gifting', icon: '🎁' },
    { name: 'Opportunity', icon: '💡' },
    { name: 'Low Salary', icon: '💰' },
    { name: 'Home Renovation', icon: '🏠' },
  ];

  // Blog carousel data
  const blogs = [
    {
      title: 'How to Improve Your Credit Score',
      excerpt: 'Learn simple strategies to boost your credit score and get better loan offers.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Understanding Personal Loan Interest Rates',
      excerpt: 'A complete guide to how interest rates work for personal loans.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: '5 Things to Consider Before Taking a Loan',
      excerpt: 'Important factors to evaluate before applying for any type of loan.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    },
    {
      title: 'Managing Your EMIs Effectively',
      excerpt: 'Tips and strategies to ensure you never miss an EMI payment.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'What is an EMI?',
      answer: 'EMI stands for Equated Monthly Installment. It is the fixed amount you pay each month towards your loan until the loan is fully repaid.'
    },
    {
      question: 'How is EMI calculated?',
      answer: 'EMI is calculated using the formula: [P x R x (1+R)^N]/[(1+R)^N-1], where P is the principal amount, R is the monthly interest rate, and N is the number of installments.'
    },
    {
      question: 'Can I prepay my loan?',
      answer: 'Yes, most lenders allow prepayment either partially or in full, though some may charge a prepayment penalty. Check with your lender for specific terms.'
    },
    {
      question: 'What factors affect my loan eligibility?',
      answer: 'Loan eligibility depends on factors like your income, credit score, employment history, existing debts, and the loan amount you\'re applying for.'
    },
    {
      question: 'What documents are required for a personal loan?',
      answer: 'Typically, you need identity proof, address proof, income documents (salary slips or bank statements), and photographs. Specific requirements may vary by lender.'
    },
    {
      question: 'How long does it take to get a loan approved?',
      answer: 'Many lenders offer instant approval for personal loans, with disbursal happening within 24-48 hours after document verification.'
    }
  ];

  // Calculate EMI whenever loanAmount, interestRate, or tenure changes
  useEffect(() => {
    const calculateEMI = () => {
      const monthlyRate = interestRate / 12 / 100;
      const emiValue =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1);
      
      if (isFinite(emiValue)) {
        setEmi(emiValue);
        setTotalAmount(emiValue * tenure);
        setTotalInterest(emiValue * tenure - loanAmount);
      } else {
        setEmi(0);
        setTotalAmount(0);
        setTotalInterest(0);
      }
    };

    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [blogs.length]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blogs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Personal Loan EMI Calculator</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Calculate your Equated Monthly Installments (EMI) and plan your finances better with our easy-to-use calculator
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg hover:bg-indigo-100 transition duration-300">
              Calculate EMI
            </button>
            <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-4 -mt-10">
        {/* Main Calculator Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Loan Type Selection */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Loan Type</h2>
                <div className="space-y-3">
                  {loanTypes.map((type, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedLoanType === type 
                          ? 'bg-indigo-100 border-2 border-indigo-500' 
                          : 'bg-gray-100 border-2 border-transparent hover:bg-gray-200'
                      }`}
                      onClick={() => setSelectedLoanType(type)}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                          selectedLoanType === type ? 'border-indigo-500 bg-indigo-500' : 'border-gray-400'
                        }`}>
                          {selectedLoanType === type && (
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
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {cities.map((city, index) => (
                        <option key={index} value={city.name}>{city.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <p className="text-gray-600">Maximum Loan Amount in {selectedCity}</p>
                    <p className="text-xl font-bold text-indigo-600">
                      {cities.find(city => city.name === selectedCity)?.loanAmount}
                    </p>
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
                <button className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-4 rounded-lg transition duration-300">
                  View EMI Schedule
                </button>
                <button className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-4 rounded-lg transition duration-300">
                  Check Credit Score
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Purpose and Uses Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Purpose And Uses</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {purposes.map((purpose, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition duration-200 cursor-pointer">
                <div className="text-3xl mb-2">{purpose.icon}</div>
                <div className="text-sm font-medium text-center text-gray-800">{purpose.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog Carousel Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Top Blogs</h2>
          <div className="relative overflow-hidden rounded-lg">
            <div className="relative">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {blogs.map((blog, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="flex flex-col md:flex-row items-center p-4">
                      <div className="w-full md:w-2/5 mb-4 md:mb-0">
                        <img 
                          src={blog.image} 
                          alt={blog.title}
                          className="w-full h-56 object-cover rounded-lg shadow-md"
                        />
                      </div>
                      <div className="w-full md:w-3/5 md:pl-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{blog.title}</h3>
                        <p className="text-gray-600 mb-5">{blog.excerpt}</p>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-lg transition duration-300">
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Carousel Navigation */}
              <button 
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-indigo-600 p-2 rounded-full shadow-md transition duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-indigo-600 p-2 rounded-full shadow-md transition duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {blogs.map((_, index) => (
                <button
                  key={index}
                  className={`w-10 h-2 rounded-full ${currentSlide === index ? 'bg-indigo-600' : 'bg-gray-300'}`}
                  onClick={() => setCurrentSlide(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <button
                  className="flex justify-between items-center w-full text-left py-3 focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
                  <svg 
                    className={`w-5 h-5 text-indigo-600 transition-transform duration-300 ${expandedFaq === index ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-600 pt-2 pb-3">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;