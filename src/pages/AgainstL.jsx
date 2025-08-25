import React, { useRef, useState, useEffect } from 'react';

const AgainstL = () => {
    const otherProductsRef = useRef(null);

    // EMI Calculator State
    const [loanAmount, setLoanAmount] = useState(100000);
    const [interestRate, setInterestRate] = useState(12);
    const [loanTenure, setLoanTenure] = useState(12);
    const [tenureType, setTenureType] = useState('months'); // 'months' or 'years'
    const [emi, setEmi] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [monthlyBreakdown, setMonthlyBreakdown] = useState([]);
    const [showSchedule, setShowSchedule] = useState(false);

    // Other Loan Products Data
    const otherLoanProducts = [
        {
            id: 1,
            title: "Home Loan",
            description: "Fulfill your dream of owning a home with our flexible home loan options.",
            interestRate: "8.4% - 12% p.a.",
            amount: "Up to ₹5 Crores",
            tenure: "Up to 30 years",
            icon: "🏠",
            features: ["Low interest rates", "Flexible tenure", "Top-up loan facility"]
        },
        {
            id: 2,
            title: "Car Loan",
            description: "Drive home your dream car with our attractive car loan offers.",
            interestRate: "9.5% - 14% p.a.",
            amount: "Up to ₹50 Lakhs",
            tenure: "Up to 7 years",
            icon: "🚗",
            features: ["100% on-road funding", "Quick processing", "Flexible repayment options"]
        },
        {
            id: 3,
            title: "Education Loan",
            description: "Invest in your future with our education loans for domestic and international studies.",
            interestRate: "10% - 13.5% p.a.",
            amount: "Up to ₹50 Lakhs",
            tenure: "Up to 15 years",
            icon: "🎓",
            features: ["Moratorium period", "No collateral for loans up to ₹7.5 Lakhs", "Tax benefits"]
        },
        {
            id: 4,
            title: "Business Loan",
            description: "Fuel your business growth with customized loan solutions for entrepreneurs.",
            interestRate: "11% - 16% p.a.",
            amount: "Up to ₹2 Crores",
            tenure: "Up to 5 years",
            icon: "💼",
            features: ["Minimal documentation", "Quick disbursal", "No collateral required"]
        },
        {
            id: 5,
            title: "Gold Loan",
            description: "Get instant funds against your gold ornaments with minimal paperwork.",
            interestRate: "12% - 18% p.a.",
            amount: "Up to ₹50 Lakhs",
            tenure: "Up to 3 years",
            icon: "📿",
            features: ["Instant approval", "High loan-to-value ratio", "Safe custody of gold"]
        }
    ];

    // Carousel State and Functions
    const [currentProductIndex, setCurrentProductIndex] = useState(0);
    const [productsPerPage, setProductsPerPage] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setProductsPerPage(1);
            } else if (window.innerWidth < 1024) {
                setProductsPerPage(2);
            } else {
                setProductsPerPage(3);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate EMI whenever loan amount, interest rate, or tenure changes
    useEffect(() => {
        calculateEmi();
        calculateAmortization();
    }, [loanAmount, interestRate, loanTenure, tenureType]);

    const calculateEmi = () => {
        // Convert tenure to months if it's in years
        const tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
        
        // Convert interest rate from percentage to decimal and calculate monthly interest
        const monthlyInterestRate = interestRate / 12 / 100;
        
        // EMI formula: [P x R x (1+R)^N]/[(1+R)^N-1]
        const emiValue = loanAmount * monthlyInterestRate * 
                         Math.pow(1 + monthlyInterestRate, tenureInMonths) / 
                         (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);
        
        const totalPaymentValue = emiValue * tenureInMonths;
        const totalInterestValue = totalPaymentValue - loanAmount;
        
        setEmi(isFinite(emiValue) ? emiValue : 0);
        setTotalPayment(isFinite(totalPaymentValue) ? totalPaymentValue : 0);
        setTotalInterest(isFinite(totalInterestValue) ? totalInterestValue : 0);
    };

    const calculateAmortization = () => {
        const tenureInMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
        const monthlyRate = interestRate / 12 / 100;
        let balance = loanAmount;
        const breakdown = [];
        
        for (let month = 1; month <= tenureInMonths; month++) {
            const interestComponent = balance * monthlyRate;
            const principalComponent = emi - interestComponent;
            balance -= principalComponent;
            
            if (month <= 12) { // Show only first 12 months for brevity
                breakdown.push({
                    month,
                    principal: principalComponent,
                    interest: interestComponent,
                    balance: balance > 0 ? balance : 0
                });
            }
        }
        
        setMonthlyBreakdown(breakdown);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            maximumFractionDigits: 0,
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    const nextProducts = () => {
        setCurrentProductIndex(prevIndex => 
            Math.min(prevIndex + 1, otherLoanProducts.length - productsPerPage)
        );
    };

    const prevProducts = () => {
        setCurrentProductIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const goToProduct = (index) => {
        setCurrentProductIndex(index);
    };

    // Circular Chart Component
    const CircularChart = ({ principal, interest }) => {
        const total = principal + interest;
        const principalPercentage = (principal / total) * 100;
        const interestPercentage = (interest / total) * 100;
        
        const radius = 60;
        const circumference = 2 * Math.PI * radius;
        
        const principalDashoffset = circumference - (principalPercentage / 100) * circumference;
        const interestDashoffset = circumference - (interestPercentage / 100) * circumference;
        
        return (
            <div className="flex flex-col items-center justify-center mb-4">
                <h4 className="font-semibold text-gray-800 mb-3">Payment Breakdown</h4>
                <div className="relative w-40 h-40">
                    <svg className="w-full h-full" viewBox="0 0 140 140">
                        {/* Principal segment */}
                        <circle
                            className="text-orange-500"
                            strokeWidth="12"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="70"
                            cy="70"
                            strokeDasharray={circumference}
                            strokeDashoffset={principalDashoffset}
                            strokeLinecap="round"
                            transform="rotate(-90 70 70)"
                        />
                        {/* Interest segment */}
                        <circle
                            className="text-blue-500"
                            strokeWidth="12"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="70"
                            cy="70"
                            strokeDasharray={circumference}
                            strokeDashoffset={interestDashoffset}
                            strokeLinecap="round"
                            transform="rotate(-90 70 70)"
                            style={{ 
                                strokeDashoffset: interestDashoffset,
                                transform: 'rotate(-90deg)',
                                transformOrigin: '70px 70px'
                            }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-lg font-bold text-gray-800">{formatCurrency(emi)}</span>
                        <span className="text-xs text-gray-600">per month</span>
                    </div>
                </div>
                <div className="flex justify-center mt-3 space-x-6">
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                        <span className="text-xs">Principal: {formatCurrency(principal)}</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                        <span className="text-xs">Interest: {formatCurrency(interest)}</span>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="text-gray-800">
            {/* New Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-900 to-purple-800 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Loan against Property</h1>
                        <p className="text-xl text-white mb-8">The perfect loan to help you build your future.</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="bg-white text-blue-900 font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors">
                                Check Eligibility
                            </button>
                            <button className="bg-orange-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-orange-600 transition-colors">
                                Apply for loan
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Navigation Section */}
            <section className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <nav className="flex space-x-8 md:space-x-12 py-4">
                            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">About</a>
                            <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium">Features</a>
                            <a href="#eligibility" className="text-gray-700 hover:text-blue-600 font-medium">Eligibility</a>
                            <a href="#blogs" className="text-gray-700 hover:text-blue-600 font-medium">Blogs</a>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-gray-100 py-12 md:py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl capitalize text-gray-900 flex flex-col items-center font-semibold text-center mb-8 md:mb-12">
                        Why Choose Loan Against Securities?
                        <div className="w-16 mt-2 h-1 rounded-full bg-orange-500"></div>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-xl sm:text-2xl">💰</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Instant Disbursal</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Get funds within 24 hours without selling your investments</p>
                        </div>
                        
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-xl sm:text-2xl">📈</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Continue Earnings</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Keep earning on your securities while using them as collateral</p>
                        </div>
                        
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg text-center">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                                <span className="text-xl sm:text-2xl">📝</span>
                            </div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-2">Minimal Documentation</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Quick and hassle-free process with minimal paperwork</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* EMI Calculator Section */}
            <section className="bg-white py-12 md:py-16 lg:py-24">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">EMI Calculator</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Input Section */}
                            <div className="space-y-8">
                                {/* Loan Amount Slider */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-lg font-semibold text-gray-800">
                                            Loan Amount
                                        </label>
                                        <span className="text-orange-600 font-bold text-lg">
                                            {formatCurrency(loanAmount)}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10000"
                                        max="1000000"
                                        step="10000"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>₹10K</span>
                                        <span>₹20L</span>
                                        <span>₹40L</span>
                                        <span>₹60L</span>
                                        <span>₹80L</span>
                                        <span>₹1Cr</span>
                                    </div>
                                </div>
                                
                                {/* Interest Rate Slider */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-lg font-semibold text-gray-800">
                                            Rate Of Interest
                                        </label>
                                        <span className="text-orange-600 font-bold text-lg">
                                            {interestRate}%
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="25"
                                        step="0.1"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>0</span>
                                        <span>5</span>
                                        <span>10</span>
                                        <span>15</span>
                                        <span>20</span>
                                        <span>25</span>
                                    </div>
                                </div>
                                
                                {/* Loan Tenure Slider */}
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="block text-lg font-semibold text-gray-800">
                                            Tenure
                                        </label>
                                        <div className="flex items-center">
                                            <span className="text-orange-600 font-bold text-lg mr-2">
                                                {loanTenure}
                                            </span>
                                            <div className="flex bg-gray-100 rounded-md p-1">
                                                <button 
                                                    className={`px-2 py-1 rounded text-xs ${tenureType === 'months' ? 'bg-white shadow' : ''}`}
                                                    onClick={() => setTenureType('months')}
                                                >
                                                    Mo
                                                </button>
                                                <button 
                                                    className={`px-2 py-1 rounded text-xs ${tenureType === 'years' ? 'bg-white shadow' : ''}`}
                                                    onClick={() => setTenureType('years')}
                                                >
                                                    Yr
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min={tenureType === 'months' ? 3 : 1}
                                        max={tenureType === 'months' ? 240 : 20}
                                        step="1"
                                        value={loanTenure}
                                        onChange={(e) => setLoanTenure(parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                                        <span>{tenureType === 'months' ? '3' : '1'}</span>
                                        <span>{tenureType === 'months' ? '48' : '4'}</span>
                                        <span>{tenureType === 'months' ? '96' : '8'}</span>
                                        <span>{tenureType === 'months' ? '144' : '12'}</span>
                                        <span>{tenureType === 'months' ? '192' : '16'}</span>
                                        <span>{tenureType === 'months' ? '240' : '20'}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Results Section */}
                            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 flex flex-col justify-center">
                                <div className="text-center mb-6">
                                    <p className="text-gray-600 text-sm sm:text-base">Your Monthly EMI</p>
                                    <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                                        {formatCurrency(emi)}
                                    </p>
                                </div>
                                
                                {/* Circular Chart */}
                                <CircularChart principal={loanAmount/(tenureType === 'years' ? loanTenure * 12 : loanTenure)} interest={totalInterest/(tenureType === 'years' ? loanTenure * 12 : loanTenure)} />
                                
                                {/* Principal and Interest Breakdown */}
                                <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-semibold text-gray-800">Principal (A)</h4>
                                        <span className="font-bold text-lg">¥ 1,00,000</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold text-gray-800">Interest (B)</h4>
                                        <span className="font-bold text-lg">¥ 6,619</span>
                                    </div>
                                    <div className="border-t border-gray-300 mt-3 pt-3">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-semibold text-gray-800">Total Payment (A+B)</h4>
                                            <span className="font-bold text-lg text-green-600">{formatCurrency(totalPayment)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* View EMI Schedule Button */}
                                <button 
                                    onClick={() => setShowSchedule(!showSchedule)}
                                    className="flex items-center justify-center text-orange-500 font-semibold mb-4 hover:text-orange-600 transition-colors"
                                >
                                    <span>{showSchedule ? 'Hide' : 'View'} EMI Schedule</span>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={`h-4 w-4 ml-1 transition-transform ${showSchedule ? 'rotate-180' : ''}`}
                                        viewBox="0 0 20 20" 
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                
                                <button 
                                    className="bg-orange-500 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-200 text-sm sm:text-base"
                                    onClick={() => {
                                        alert('Redirecting to loan application...');
                                    }}
                                >
                                    Apply for Loan
                                </button>
                            </div>
                        </div>
                        
                        {/* Amortization Table - Only show when toggled */}
                        {showSchedule && (
                            <div className="mt-8">
                                <h3 className="text-lg font-semibold mb-4">Payment Schedule (First 12 Months)</h3>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border border-gray-200">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="py-2 px-2 sm:px-4 border-b text-left text-xs sm:text-sm">Month</th>
                                                <th className="py-2 px-2 sm:px-4 border-b text-right text-xs sm:text-sm">Principal</th>
                                                <th className="py-2 px-2 sm:px-4 border-b text-right text-xs sm:text-sm">Interest</th>
                                                <th className="py-2 px-2 sm:px-4 border-b text-right text-xs sm:text-sm">Total Payment</th>
                                                <th className="py-2 px-2 sm:px-4 border-b text-right text-xs sm:text-sm">Balance</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {monthlyBreakdown.map((payment) => (
                                                <tr key={payment.month} className={payment.month % 2 === 0 ? 'bg-gray-50' : ''}>
                                                    <td className="py-2 px-2 sm:px-4 border-b text-xs sm:text-sm">{payment.month}</td>
                                                    <td className="py-2 px-2 sm:px-4 border-b text-right text-xs sm:text-sm">{formatCurrency(payment.principal)}</td>
                                                    <td className="py-2 px-2 sm:px-4 border-b text-right text-xs sm:text-sm">{formatCurrency(payment.interest)}</td>
                                                    <td className="py-2 px-2 sm:px-4 border-b text-right text-xs sm:text-sm">{formatCurrency(emi)}</td>
                                                    <td className="py-2 px-2 sm:px-4 border-b text-right text-xs sm:text-sm">{formatCurrency(payment.balance)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Other Loan Products Section */}
            <section ref={otherProductsRef} id="other-products" className="py-12 md:py-16 lg:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl capitalize text-gray-900 flex flex-col items-center font-semibold text-center mb-8 md:mb-12">
                        Other Loan Products
                        <div className="w-16 mt-2 h-1 rounded-full bg-orange-500"></div>
                    </h2>
                    <p className="text-center text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
                        Explore our wide range of financial products designed to meet your diverse needs
                    </p>

                    <div className="relative">
                        {/* Products Carousel */}
                        <div className="overflow-hidden mb-8">
                            <div 
                                className="flex transition-transform duration-300 ease-in-out"
                                style={{ transform: `translateX(-${currentProductIndex * (100 / productsPerPage)}%)` }}
                            >
                                {otherLoanProducts.map((product) => (
                                    <div key={product.id} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3">
                                        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full border border-gray-100">
                                            <div className="p-4 sm:p-6">
                                                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{product.icon}</div>
                                                <h3 className="text-lg sm:text-xl font-semibold mb-2">{product.title}</h3>
                                                <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm md:text-base">{product.description}</p>
                                                
                                                <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                                                    <div className="flex justify-between text-xs sm:text-sm">
                                                        <span className="text-gray-500">Interest Rate:</span>
                                                        <span className="font-semibold">{product.interestRate}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs sm:text-sm">
                                                        <span className="text-gray-500">Loan Amount:</span>
                                                        <span className="font-semibold">{product.amount}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs sm:text-sm">
                                                        <span className="text-gray-500">Tenure:</span>
                                                        <span className="font-semibold">{product.tenure}</span>
                                                    </div>
                                                </div>

                                                <div className="mb-3 sm:mb-4">
                                                    <h4 className="font-medium mb-1 sm:mb-2 text-xs sm:text-sm">Key Features:</h4>
                                                    <ul className="space-y-1">
                                                        {product.features.map((feature, index) => (
                                                            <li key={index} className="flex items-center text-xs sm:text-sm">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1 sm:mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                                <span className="text-xs sm:text-sm">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <button className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 text-xs sm:text-sm">
                                                    Know More
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Square Navigation Buttons */}
                        <div className="flex justify-center items-center gap-4">
                            <button 
                                onClick={prevProducts}
                                disabled={currentProductIndex === 0}
                                className={`bg-white border border-orange-500 text-orange-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-orange-50 transition-colors ${currentProductIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            
                            {/* Carousel Indicators */}
                            <div className="flex justify-center">
                                {Array.from({ length: Math.ceil(otherLoanProducts.length / productsPerPage) }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToProduct(index * productsPerPage)}
                                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mx-1 ${currentProductIndex === index * productsPerPage ? 'bg-orange-500' : 'bg-gray-300'}`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                            <button 
                                onClick={nextProducts}
                                disabled={currentProductIndex >= otherLoanProducts.length - productsPerPage}
                                className={`bg-white border border-orange-500 text-orange-500 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-orange-50 transition-colors ${currentProductIndex >= otherLoanProducts.length - productsPerPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-orange-500 py-8 md:py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">Ready to meet your financial needs?</h2>
                    <p className="text-white text-sm sm:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
                        Apply for a loan against securities today and get instant approval
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                        <button className="bg-white text-orange-500 font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200 text-sm sm:text-base">
                            Apply Now
                        </button>
                        <button className="bg-transparent border-2 border-white text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-lg shadow-lg hover:bg-white hover:text-orange-500 transition-colors duration-200 text-sm sm:text-base">
                            Check Eligibility
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AgainstL;