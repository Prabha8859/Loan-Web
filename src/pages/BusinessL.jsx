import React, { useRef, useEffect, useState } from 'react';
import EmiCalculator from "../pages/EmiCalculator"; 

// Main Business Loan Page Component
const BusinessLoanPage = () => {
    const aboutRef = useRef(null);
    const featuresRef = useRef(null);
    const eligibilityRef = useRef(null);
    const howtoapplyRef = useRef(null);
    const purposeRef = useRef(null);
    const faqRef = useRef(null);

    const [isSticky, setIsSticky] = useState(false);
    const navRef = useRef(null);

    // Define the heights of the headers
    const mainHeaderHeight = 96; // Adjust this if your main header has a different height
    const navBarHeight = 64;   // Height of the navigation tabs

    const scrollToSection = (ref) => {
        // Scroll to the section, adjusting for both the fixed main header and the sticky nav
        window.scrollTo({
            top: ref.current.offsetTop - mainHeaderHeight - navBarHeight - 10,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (navRef.current) {
                // Calculate the offset where the nav should become sticky (after the main header)
                const offset = navRef.current.offsetTop - mainHeaderHeight;
                if (window.pageYOffset > offset) {
                    setIsSticky(true);
                } else {
                    setIsSticky(false);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [mainHeaderHeight]);

    const navItems = [
        { name: "About", ref: aboutRef, id: "about" },
        { name: "Features", ref: featuresRef, id: "features" },
        { name: "Eligibility", ref: eligibilityRef, id: "eligibility" },
        { name: "How to Apply", ref: howtoapplyRef, id: "howtoapply" },
        { name: "Purpose", ref: purposeRef, id: "purpose" },
        { name: "FAQ", ref: faqRef, id: "faq" },
    ];

    // --- AccordionItem Component Definition ---
    const AccordionItem = ({ title, icon, children }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md mb-4 transition-all duration-300">
                <div
                    className="flex justify-between items-center p-6 cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex items-center">
                        <span className="text-orange-500 mr-4">{icon}</span>
                        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    </div>
                    <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        {/* Arrow Icon SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                <div
                    className={`bg-white transition-all duration-500 overflow-hidden ${
                        isOpen ? 'max-h-screen p-6 pt-0' : 'max-h-0 p-0'
                    }`}
                >
                    <div className="text-gray-700">
                        {children}
                    </div>
                </div>
            </div>
        );
    };

    // --- SVG Icon Components ---
    const FeaturesIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    );

    const EligibilityIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.01 12.01 0 002.944 12c.078 2.923.864 5.694 2.197 8.058a11.996 11.996 0 008.625 3.038 12.001 12.001 0 008.625-3.038c1.333-2.364 2.119-5.135 2.197-8.058a12.01 12.01 0 00-2.944-8.618z" />
        </svg>
    );

    const DocumentsIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );

    const FeesIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5a2 2 0 00-2-2H12z" />
        </svg>
    );

    // --- Placeholders for other components ---
    const ProcessCard = ({ step, title, description }) => (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-3xl font-bold text-orange-500 mb-2">{step}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );

    const FAQItem = ({ question, answer }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="border-b border-gray-200">
                <button
                    className="flex justify-between items-center w-full py-4 text-left font-semibold text-gray-800 hover:text-orange-500 transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {question}
                    <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <p className="pb-4 text-gray-600">{answer}</p>
                </div>
            </div>
        );
    };


    return (
        <div className=" text-gray-800">
            {/* Hero Section */}
            <div className="relative h-[300px] md:h-[450px] w-full">
                {/* Desktop Image */}
                <img
                    alt="Business Loan Banner"
                    loading="lazy"
                    src="https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/Inner_Pages/BL/images_Hero-BL.png"
                    className="hidden sm:inline w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x550/000000/F0E68C?text=Business+Loan+Banner"; }}
                />
                {/* Mobile Image */}
                <img
                    alt="Business Loan Banner Mobile"
                    loading="lazy"
                    src="https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/Inner_Pages/BL/images_mHero-BL.png"
                    className="sm:hidden w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x550/000000/F0E68C?text=Business+Loan+Banner+Mobile"; }}
                />
                {/* Overlay Content - Updated ClassName Here */}
                <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <div className="container mx-auto px-4 text-white text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Business Loan</h1>
                        <p className="text-lg md:text-xl font-light mb-8">
                            Funds to take care of your business needs
                        </p>
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                            <button className="bg-white text-black font-semibold py-3 px-8 rounded-lg shadow-lg">
                                Check Eligibility
                            </button>
                            <button className="bg-orange-500 text-white font-semibold py-3 px-10 rounded-lg shadow-lg">
                                Apply for loan
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs (Becomes Sticky below the Main Header) */}
            <div ref={navRef} className={`w-full bg-white shadow-md transition-all duration-300 ${isSticky ? 'fixed top-[96px] z-50 animate-slideDown' : 'relative'}`}>
                <div className="container mx-auto">
                    <ul className="flex justify-center flex-wrap md:flex-nowrap py-3">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => scrollToSection(item.ref)}
                                    className="px-4 py-2 md:px-8 text-base md:text-lg font-medium text-gray-700 hover:text-orange-500 transition-colors duration-200"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* About Section */}
            <section ref={aboutRef} id="about" className="py-16 md:py-12">
                <div className="container mx-auto px-10">
                    {/* Breadcrumb Navigation */}
                    <div className="hidden sm:block mb-8">
                        <nav className="inline-block text-sm font-medium text-gray-400">
                            <ol className="flex items-center list-none border border-gray-300 rounded-lg px-3 py-2">
                                <li className="inline-block">
                                    <a href="/" className="text-gray-600 hover:text-orange-500">Home</a>
                                    <span className="mx-2 text-gray-400"></span>
                                </li>
                                <li className="inline-block cursor-default text-orange-500">Business Loan</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="flex flex-col lg:flex-row-reverse items-start gap-12">
                        {/* Form Section (Right Side) */}
                        <div className="w-full lg:w-2/4 bg-gray-900 text-white p-8 rounded-lg shadow-xl">
                            <h3 className="text-2xl font-bold mb-6">Need More Details?</h3>
                            <form className="space-y-4">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="First Name *"
                                        className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Last Name *"
                                        className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="tel"
                                        placeholder="Mobile Number *"
                                        className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="number"
                                        placeholder="Upto ₹5,00,000"
                                        className="w-full px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
                                    />
                                </div>
                                <div className="flex items-start">
                                    <input
                                        id="termsCheckbox"
                                        type="checkbox"
                                        className="mt-1 w-4 h-4 text-yellow-400 bg-gray-900 rounded border-gray-700 focus:ring-yellow-400"
                                        required
                                    />
                                    <label
                                        htmlFor="termsCheckbox"
                                        className="ml-2 text-sm text-gray-300"
                                    >
                                        By continuing, you agree to KreditBee's{' '}
                                        <a href="#" className="text-yellow-400 underline">Terms & Conditions</a>
                                        and{' '}
                                        <a href="#" className="text-yellow-400 underline">Privacy Policy</a> and receive communication from KreditBee via SMS, E-Mail and WhatsApp
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-white text-gray-900 font-semibold py-3 px-6 rounded-md shadow-lg hover:bg-gray-200 transition-colors duration-200"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                        {/* Content Section (Left Side) */}
                        <div className="w-full lg:w-2/4 px-5">
                            <h2 className="sr-only">About Business Loan</h2>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                Designed specifically for small and medium enterprises (SMEs), KreditBee's business loans empower entrepreneurs like you to achieve your goals. Whether it's starting a new venture, expanding your operations, or managing everyday expenses, a personal loan for business is perfect for such uses.
                            </p>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                Get a hassle-free business loan from ₹6,000 to ₹5 Lakhs directly into your bank account. Simply keep your PAN card, Aadhaar card, and a business or income proof handy when applying.
                            </p>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                                Choose a repayment tenure that suits your cash flow, ranging from 6 to 48 months. Apply now and let KreditBee be your partner in success.
                            </p>
                            <button className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors duration-200">
                                Get Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section ref={featuresRef} id="features" className="bg-gray-100 py-10 md:py-24">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-[26px] capitalize text-gray-900 flex items-center flex-col font-semibold container text-center">
                        Features and Benefits of a Business Loan with KreditBee
                        <div className="w-16 mt-2 h-1 rounded-full bg-orange-500"></div>
                    </h2>
                    <div className="mt-6 text-xs font-medium text-center md:text-sm desktop:text-base [&>a]:text-orange-500 [&_p]:mb-4 [&_a]:text-orange-500 [&_ul]:px-12 [&_ol]:px-12 [&_ul]:py-4 [&_ol]:py-4 [&_ul]:list-disc [&_ol]:list-decimal container">
                        The best features for a smooth credit experience
                    </div>
                    <ul className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 px-8">
                        {/* Feature Card 1 */}
                        <li className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                            <div className="flex-none w-16 h-16 mb-4 relative">
                                <img
                                    title="Collateral-free funds"
                                    alt="Collateral-free funds"
                                    loading="lazy"
                                    decoding="async"
                                    src="https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/Inner_Pages/PLSA/ic_PLSA-BenefitsAndFeatures_1.svg"
                                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'contain', color: 'transparent' }}
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Collateral-free funds</h3>
                            <p className="text-sm text-gray-500">
                                Secure the financing you need without pledging any assets as security.
                            </p>
                        </li>
                        {/* Feature Card 2 */}
                        <li className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                            <div className="flex-none w-16 h-16 mb-4 relative">
                                <img
                                    title="Quick loan disbursal"
                                    alt="Quick loan disbursal"
                                    loading="lazy"
                                    decoding="async"
                                    src="https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/Inner_Pages/PLSA/ic_PLSA-BenefitsAndFeatures_5.svg"
                                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'contain', color: 'transparent' }}
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Quick loan disbursal</h3>
                            <p className="text-sm text-gray-500">
                                Get funds directly in your bank account within a short time upon approval.
                            </p>
                        </li>
                        {/* Feature Card 3 */}
                        <li className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                            <div className="flex-none w-16 h-16 mb-4 relative">
                                <img
                                    title="Hassle-free Documentation"
                                    alt="Hassle-free Documentation"
                                    loading="lazy"
                                    decoding="async"
                                    src="https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/Inner_Pages/PLSA/ic_PLSA-BenefitsAndFeatures_4.svg"
                                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'contain', color: 'transparent' }}
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Hassle-free Documentation</h3>
                            <p className="text-sm text-gray-500">
                                Experience a streamlined application process with hassle-free documentation.
                            </p>
                        </li>
                        {/* Feature Card 4 */}
                        <li className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                            <div className="flex-none w-16 h-16 mb-4 relative">
                                <img
                                    title="Collateral-free business loan"
                                    alt="Collateral-free business loan"
                                    loading="lazy"
                                    decoding="async"
                                    src="https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/Inner_Pages/PLSA/ic_PLSA-BenefitsAndFeatures_6.svg"
                                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'contain', color: 'transparent' }}
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Collateral-free business loan</h3>
                            <p className="text-sm text-gray-500">
                                Access funds without the need for collateral or security deposits.
                            </p>
                        </li>
                        {/* Feature Card 5 */}
                        <li className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                            <div className="flex-none w-16 h-16 mb-4 relative">
                                <img
                                    title="Loans ranging from ₹6,000 to ₹5 Lakhs"
                                    alt="Loans ranging from ₹6,000 to ₹5 Lakhs"
                                    loading="lazy"
                                    decoding="async"
                                    src="https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/Inner_Pages/PLSA/ic_PLSA-BenefitsAndFeatures_2.svg"
                                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'contain', color: 'transparent' }}
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Loans ranging from ₹6,000 to ₹5 Lakhs</h3>
                            <p className="text-sm text-gray-500">
                                Choose a loan amount that aligns with your business needs.
                            </p>
                        </li>
                        {/* Feature Card 6 */}
                        <li className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                            <div className="flex-none w-16 h-16 mb-4 relative">
                                <img
                                    title="Available 24x7"
                                    alt="Available 24x7"
                                    loading="lazy"
                                    decoding="async"
                                    src="https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/Inner_Pages/PLSA/ic_PLSA-BenefitsAndFeatures_3.svg"
                                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'contain', color: 'transparent' }}
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Available 24x7</h3>
                            <p className="text-sm text-gray-500">
                                Apply for a loan anytime, anywhere, at your convenience.
                            </p>
                        </li>
                        {/* Feature Card 7 */}
                        <li className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                            <div className="flex-none w-16 h-16 mb-4 relative">
                                <img
                                    title="Interest Rates"
                                    alt="Interest Rates"
                                    loading="lazy"
                                    decoding="async"
                                    src="https://ik.imagekit.io/krazybee/kreditbee_in/InnerPages/Generic/Features&Benefits/ic_InterestRates.svg"
                                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'contain', color: 'transparent' }}
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Interest Rates Range from 12% to 28.5% p.a</h3>
                            <p className="text-sm text-gray-500">
                                Enjoy competitive business loan interest rates tailored to your profile and loan amount.
                            </p>
                        </li>
                        {/* Feature Card 8 */}
                        <li className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                            <div className="flex-none w-16 h-16 mb-4 relative">
                                <img
                                    title="Tenures"
                                    alt="Tenures"
                                    loading="lazy"
                                    decoding="async"
                                    src="https://ik.imagekit.io/krazybee/kreditbee_in/InnerPages/Generic/Features&Benefits/ic_EasyEMI.svg"
                                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'contain', color: 'transparent' }}
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Tenures ranging from 6 months to 48 months</h3>
                            <p className="text-sm text-gray-500">
                                Select a repayment tenure that matches your cash flow and business cycle.
                            </p>
                        </li>
                        {/* Feature Card 9 */}
                        <li className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                            <div className="flex-none w-16 h-16 mb-4 relative">
                                <img
                                    title="Processing fee"
                                    alt="Processing fee"
                                    loading="lazy"
                                    decoding="async"
                                    src="https://ik.imagekit.io/krazybee/kreditbee_in/InnerPages/Generic/Features&Benefits/ic_ProcessingFee.svg"
                                    style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'contain', color: 'transparent' }}
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Processing fee up to 5.1% + GST</h3>
                            <p className="text-sm text-gray-500">
                                Select a repayment tenure that matches your cash flow and business cycle.
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="bg-[#090907] w-full px-4 md:px-0 py-6 flex justify-center mt-1">
                    <div className="flex flex-col lg:flex-row justify-center items-center container">
                        <p className="text-lg text-center font-medium text-white">
                            Fulfil your business needs with a Quick Loan now!
                        </p>
                        <a href="/signin">
                            <button
                                type="button"
                                className="relative overflow-hidden bg-white text-gray-900 font-semibold py-3 px-8 rounded-lg shadow-lg mt-6 lg:mt-0 lg:ml-8 transition-colors duration-300
                                                   before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-orange-500 before:z-0 before:transition-transform before:duration-500 before:scale-x-0 before:origin-left hover:before:scale-x-100"
                            >
                                <span className="relative z-10">Apply Now</span>
                            </button>
                        </a>
                    </div>
                </div>
            </section>
            <section ref={eligibilityRef} id="eligibility" className=" md:py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl capitalize text-gray-900 flex flex-col items-center font-semibold text-center ">
                        Business Loan Eligibility Criteria and Documentation
                        <div className="w-16 mt-2 h-1 rounded-full bg-orange-500"></div>
                    </h2>
                    <p className="mt-6 text-base text-center text-gray-600 max-w-3xl mx-auto mb-8">
                        To avail of startup business loans with KreditBee, you must meet certain eligibility criteria and submit the necessary documents for a smooth application process.
                    </p>

                    <div className="max-w-4xl mx-auto">
                        <AccordionItem title="Features" icon={<FeaturesIcon />}>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Loan amount from **₹6,000 to ₹5 Lakhs**</li>
                                <li>Interest Rates ranging from **12% to 28.5%** per annum</li>
                                <li>Tenure ranging from **6 months to 48 months**</li>
                                <li>Processing fee up to **5.1% + GST**</li>
                                <li>Minimal documentation, quick &amp; direct transfer to the Bank Account</li>
                                <li>No collateral or pledge of security</li>
                                <li>Collateral for the credit extended to MSME borrowers* (Udyam Registration mandatory)</li>
                            </ul>
                        </AccordionItem>

                        <AccordionItem title="Eligibility Criteria" icon={<EligibilityIcon />}>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Indian Citizen</li>
                                <li>Age to be **21 years and above**</li>
                                <li>Business operations for a minimum of past **12 months**</li>
                                <li>Minimum monthly personal income of **₹10,000**</li>
                                <li>Monthly household income more than **₹25,000**</li>
                                <li>Possess Government approved Valid Identity Proof &amp; Address Proof</li>
                                <li>Aadhaar-linked mobile number</li>
                            </ul>
                        </AccordionItem>

                        <AccordionItem title="Documents Required" icon={<DocumentsIcon />}>
                            <ul className="list-disc pl-8 space-y-2">
                                <li>Photograph</li>
                                <li>PAN</li>
                                <li>Address Proof (Permanent &amp; Current Address)</li>
                                <li>Business Income Proof (Bank Statements reflecting Business Income / GST Details)</li>
                                <li>Business Ownership Proof (GST Details / Udyam Registration Certificate / Shop &amp; Establishment Certificate / FSSAI License)</li>
                            </ul>
                        </AccordionItem>

                        <AccordionItem title="Other Fees & Charges" icon={<FeesIcon />}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
                                <ul className="space-y-4">
                                    <li>
                                        <h4 className="font-semibold">Foreclosure charges</h4>
                                        <p className="ml-5 text-sm">Foreclosure charges of up to **4% of principal outstanding** + GST will be charged in case Foreclosure is opted.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-semibold">Part-Prepayment Charges</h4>
                                        <p className="ml-5 text-sm">Part Prepayment Charges of up to **4% of principal prepaid** + GST will be charged in case Part-Prepayment is opted.</p>
                                    </li>
                                    <li>
                                        <h4 className="font-semibold">Penal Charges</h4>
                                        <p className="ml-5 text-sm">
                                            1. EMI bounce charge (1st day): **4% of principal overdue** or ₹500, whichever is lower.<br />
                                            2. Penal charges for 2-180 days: **36% per annum** on principal overdue.
                                        </p>
                                    </li>
                                    <li>
                                        <h4 className="font-semibold">Credit Information Report Fees</h4>
                                        <p className="ml-5 text-sm">
                                            1. Credit Information Report Fees of **₹50 + GST** is applied if the customer opts for receiving their Credit Information Report.<br />
                                            2. Credit Information Report fees is disclosed upfront in the KFS (Key Fact Statement).
                                        </p>
                                    </li>
                                </ul>
                                <ul className="space-y-4">
                                    <li>
                                        <h4 className="font-semibold">Retained Processing Fees in case of cool-off</h4>
                                        <p className="ml-5 text-sm">
                                            1. A percentage of the one-time processing fees may be retained as the cool off fee if the customer exits the loan during the cooling-off period.<br />
                                            2. The exact amount of the cool off fees is disclosed upfront in the KFS (Key Fact Statement).
                                        </p>
                                    </li>
                                    <li>
                                        <h4 className="font-semibold">Stamp Duty</h4>
                                        <p className="ml-5 text-sm">
                                            1. Stamp duty charges as per actuals shall be applied based on the disbursement office / branch.<br />
                                            2. The exact amount of the Stamp duty charges is disclosed upfront in the KFS (Key Fact Statement).
                                        </p>
                                    </li>
                                    <li>
                                        <h4 className="font-semibold">Maintenance &amp; Procurement Cost</h4>
                                        <p className="ml-5 text-sm">
                                            1. Maintenance &amp; Procurement Cost may be applied based on the disbursement office / branch.<br />
                                            2. The exact amount of the Maintenance &amp; Procurement Cost is disclosed upfront in the KFS (Key Fact Statement).
                                        </p>
                                    </li>
                                    <li><p className="text-sm font-semibold mt-4">**round to the nearest rupee</p></li>
                                </ul>
                            </div>
                        </AccordionItem>
                    </div>
                </div>
            </section>

            {/* How to Apply Section */}
            <section ref={howtoapplyRef} id="howtoapply" className="bg-gray-100 py-16 md:py-24">
              
                 <EmiCalculator />
            </section>

            <section ref={purposeRef} id="purpose" className="py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <img
                        src="https://placehold.co/800x400/FFC933/FFFFFF?text=Purpose+of+Business+Loan"
                        alt="Purpose Section"
                        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-8"
                    />
                    <h2 className="text-3xl md:text-4xl font-bold mb-12">Purpose of Business Loan</h2>
                    <p className="max-w-3xl mx-auto text-gray-600">
                        A business loan can be used for various purposes to help your business grow. Use the funds for:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
                        <li className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">Working Capital</li>
                        <li className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">Business Expansion</li>
                        <li className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">Inventory Purchase</li>
                        <li className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">Machinery & Equipment</li>
                    </ul>
                </div>
            </section>

            {/* FAQ Section */}
            <section ref={faqRef} id="faq" className="bg-gray-100 py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <img
                        src="https://placehold.co/800x400/A084E6/FFFFFF?text=Frequently+Asked+Questions"
                        alt="FAQ Section"
                        className="w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-8"
                    />
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4 max-w-4xl mx-auto">
                        <FAQItem question="What is the maximum loan amount I can get?" answer="The maximum loan amount depends on your business's financial health and credit score. It can go up to ₹50 Lakhs." />
                        <FAQItem question="How long does the approval process take?" answer="Our digital process is fast, and you can get an in-principle approval within 24 hours." />
                        <FAQItem question="Is there any collateral required?" answer="No, our business loans are unsecured, so no collateral is required." />
                    </div>
                </div>
            </section>
        </div>
    );
};

// Reusable Components
const FeatureCard = ({ icon, title, description }) => {
    // This component is already defined and used in your code, no changes needed.
    // I've commented out the `getIcon` part to avoid errors since you didn't provide its full code.
    // The existing img tags in your code will work fine.
    return (
        <li className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
            <div className="flex-none w-16 h-16 mb-4 relative">
                <img src={icon} alt={title} style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'contain' }} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </li>
    );
};

export default BusinessLoanPage;