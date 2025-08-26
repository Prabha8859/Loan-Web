import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { FiUser, FiBriefcase, FiRss, FiTrendingUp, FiHome, FiArrowRight } from 'react-icons/fi';

const servicesData = [
  {
    title: "Personal Loans",
    description: "Need funds urgently? Get a personal loan from ₹6,000 to ₹10 Lakhs with flexible EMIs from 6 to 60 months. Easy online application, quick disbursal, and financial support when you need it.",
    image: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?q=80&w=2940&auto=format&fit=crop",
    icon: <FiUser className="w-10 h-10" />
  },
  {
    title: "Two Wheeler Loan",
    description: "Finance your dream ride in Bangalore with loans up to ₹5 Lakhs and flexible tenures up to 60 months. Quick approval, hassle-free process, and easy repayment for your convenience.",
    image: "https://images.unsplash.com/photo-1542453412-1d5778847e2b?q=80&w=2832&auto=format&fit=crop",
    icon: <FiRss className="w-10 h-10" />
  },
  {
    title: "Business Loan",
    description: "Expand your business with a loan from ₹6,000 to ₹5 Lakhs, featuring flexible repayment from 6 to 48 months. Quick approval, hassle-free process, and funds to help your business grow seamlessly",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2940&auto=format&fit=crop",
    icon: <FiTrendingUp className="w-10 h-10" />
  },
  {
    title: "Loan Against Property",
    description: "Leverage your property as collateral for a loan up to ₹1 Crores with repayment tenures of up to 20 years. Enjoy competitive interest rates from 12%, available across major cities in South India.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2946&auto=format&fit=crop",
    icon: <FiHome className="w-10 h-10" />
  }
];

const StatSection = () => {
    const [countUpStarted, setCountUpStarted] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('stat-section');
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0 && !countUpStarted) {
                    setCountUpStarted(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [countUpStarted]);

    return (
        <div id="stat-section" className="flex justify-center bg-[#1A1A1A] w-full  ">
            <div className="container flex flex-col  py-4 md:px-0 md:py-3 md:flex-row items-center justify-between">
                {/* First Stat: App Downloads */}
                <div className="flex justify-center items-center my-2 w-full md:my-0 md:w-[30%] relative">
                    <img
                        alt="7 Crore App Downloads"
                        src="https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/ic-downloads.svg"
                        className="w-16 h-16 md:w-20 md:h-20"
                    />
                    <div className="ml-8 font-semibold text-white">
                        <p className="font-bold text-[#797e96] text-xs">OVER</p>
                        <p className="text-xl md:text-3xl font-semibold">
                            <CountUp
                                end={countUpStarted ? 7 : 0}
                                duration={2}
                                separator=","
                            />
                            {' Crore'}
                        </p>
                        <p className="font-medium text-yellow-400">App Downloads</p>
                    </div>
                </div>

                {/* Vertical Divider 1 */}
                <div className="hidden md:block w-[1px] h-24 bg-[#797E96] mx-8"></div>
                <div className="block md:hidden w-full h-[1px] bg-[#797E96] my-4"></div>

                {/* Second Stat: Total Credit Given */}
                <div className="flex justify-center items-center my-2 w-full md:my-0 md:w-[30%] relative">
                    <img
                        alt="₹62,000 Crores Total Credit Given"
                        src="https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/ic-disbursals.svg"
                        className="w-16 h-16 md:w-20 md:h-20"
                    />
                    <div className="ml-8 font-semibold text-white">
                        <p className="font-bold text-[#797e96] text-xs">OVER</p>
                        <p className="text-xl md:text-3xl font-semibold">
                            ₹
                            <CountUp
                                end={countUpStarted ? 62000 : 0}
                                duration={2}
                                separator=","
                            />
                            {' Crores'}
                        </p>
                        <p className="font-medium text-yellow-400">Total Credit Given</p>
                    </div>
                </div>

                {/* Vertical Divider 2 */}
                <div className="hidden md:block w-[1px] h-24 bg-[#797E96] mx-8"></div>
                <div className="block md:hidden w-full h-[1px] bg-[#797E96] my-4"></div>

                {/* App Store Buttons */}
                <div className="flex justify-center items-center my-4 w-full md:my-0 md:w-[40%] md:justify-around">
                    <a aria-label="Download from Google Play Store" href="https://a.krdt.be/02Je/d9cddac2" className="mr-4 md:mr-0">
                        <img
                            alt="Download on Google Play"
                            src="https://ik.imagekit.io/krazybee/kreditbee_in/ic-StoreBadge-GooglePlay.svg"
                            className="w-40 h-14 md:w-48 md:h-16"
                        />
                    </a>
                    <a aria-label="Download from Apple App Store" href="https://a.krdt.be/02Je/d9cddac2">
                        <img
                            alt="Download on the App Store"
                            src="https://ik.imagekit.io/krazybee/kreditbee_in/ic-StoreBadge-AppStore.svg"
                            className="w-40 h-14 md:w-48 md:h-16"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

const LoanCards = () => {
    return (
        <div className="max-w-7xl mx-auto">
          <div className="px-12 mb-2">
            {/* Heading Section */}
            <div className="text-center mb-2">
                <div className="inline-block p-2 border-2 border-yellow-400 rounded-full">
                    <h2 className="text-xl md:text-[10px] capitalize text-[#212529] font-semibold">
                        What We Offer
                    </h2>
                </div>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                {servicesData.map((card, index) => (
                    <div
                        key={index}
                        className="relative bg-white p-6 border border-gray-200 overflow-hidden group transition-all duration-500"
                    >
                        {/* Background Image Container */}
                        <div
                            className="absolute top-0 left-0 w-full h-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"
                            style={{
                                backgroundImage: `url(${card.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black opacity-60"></div>
                        </div>

                        {/* Main Content */}
                        <div className="relative z-10">
                            <div className="flex flex-row items-center justify-between">
                                {/* Icon */}
                                <div className="flex-shrink-0 text-gray-800 group-hover:text-white transition-colors duration-300">
                                    {card.icon}
                                </div>
                                {/* Arrow Icon */}
                                <div className="flex-shrink-0">
                                    <FiArrowRight
                                        className="w-8 h-8 text-gray-400 group-hover:text-white transform group-hover:-rotate-45 transition-transform duration-500"
                                    />
                                </div>
                            </div>
                            {/* Title & Description */}
                            <div className="mt-4">
                                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-white transition-colors duration-300">
                                    {card.title}
                                </h3>
                                <p className="text-gray-600 group-hover:text-gray-200 transition-colors duration-300">
                                    {card.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
            {/* New Stat Section */}
            <StatSection />
        </div>
    );
};

export default LoanCards;