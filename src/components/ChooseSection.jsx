import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

// Data for the three new cards (image_365de7.png)
const topCardsData = [
  {
    icon: "https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/ic-1.svg",
    title: "Lower Interest Rates",
    description: "Get loans for multiple purposes at lower interest rates to suit your needs",
  },
  {
    icon: "https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/ic-2.svg",
    title: "Fast Processing and Disbursal",
    description: "Apply online, check your eligibility and get money directly in your bank in 10 minutes",
  },
  {
    icon: "https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/ic-3.svg",
    title: "Easy Repayment Options",
    description: "Repay the loan amount in easy EMI with flexible tenure options",
  },
];

// Data for the bottom three cards (image_358c06.png)
const bottomCardsData = [
  {
    icon: "https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/ic-4.svg",
    title: "100% Paperless",
    description: "No paperwork or physical documentation is required, and you can apply and get a personal loan completely online.",
  },
  {
    icon: "https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/ic-5.svg",
    title: "Safe, Secure and Transparent",
    description: "Our loan application process is fully secured and safe and there are no hidden charges.",
  },
  {
    icon: "https://ik.imagekit.io/krazybee/kreditbee_in/banners/New_Web/ic-6.svg",
    title: "Collateral Free",
    description: "No collateral is required to apply for our personal loans.",
  },
];

const statsData = [
  {
    number: 5.1,
    suffix: " Crore",
    label: "Loan Disbursed"
  },
  {
    number: 1.4,
    suffix: " Crore",
    label: "Loan Customers"
  },
  {
    number: 61,
    suffix: " Lakh",
    label: "Active Users"
  },
  {
    number: 10,
    suffix: " Lakhs",
    label: "Max. Loan Amount"
  }
];

const FullSection = () => {
  const [countUpStarted, setCountUpStarted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('stats-section');
      if (element && !countUpStarted) {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setCountUpStarted(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [countUpStarted]);

  return (
    <>
      <div className="relative pb-12">
        {/* Title and Top Cards Section */}
        <div className="flex justify-center w-full z-10 relative px-8">
          <div className="container px-6 lg:px-0">
            <h2 className="text-xl md:text-[26px] capitalize text-[#212529] flex flex-col items-center font-semibold mt-16 text-center">
              Why Choose KreditBee?
              <div className="w-16 mt-2 h-1 rounded-full bg-kb-orange-dark"></div>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 justify-center">
              {topCardsData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-white shadow-xl p-6 rounded-lg w-full"
                >
                  <img
                    alt={item.title}
                    loading="lazy"
                    width="100"
                    height="100"
                    decoding="async"
                    className="w-[60px] md:w-[100px]"
                    src={item.icon}
                  />
                  <div className="mt-4">
                    <h3 className="font-semibold text-base">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Cards Section (Overlapping with Stats) */}
        <div className="flex justify-center w-full mt-8 z-20 relative px-8">
          <div className="container px-6 lg:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
              {bottomCardsData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-white shadow-xl p-6 rounded-lg w-full"
                >
                  <img
                    alt={item.title}
                    loading="lazy"
                    width="100"
                    height="100"
                    decoding="async"
                    className="w-[60px] md:w-[100px]"
                    src={item.icon}
                  />
                  <div className="mt-4">
                    <h3 className="font-semibold text-base">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with Overlap effect */}
      <div id="stats-section" className="flex justify-center w-full py-12 lg:py-0 bg-[#1A1A1A] relative -mt-18">
        <div className="container flex flex-col items-center justify-around lg:h-40 lg:flex-row">
          {statsData.map((stat, index) => (
            <div key={index} className="flex justify-center w-full my-3 font-semibold text-white lg:my-0">
              <div className="text-center lg:text-left">
                <p className="font-bold text-[#797e96] text-[12px]">OVER</p>
                <p className="font-semibold text-[26px]">
                  <CountUp
                    start={0}
                    end={countUpStarted ? stat.number : 0}
                    duration={2.5}
                    separator=","
                  />
                  {stat.suffix}
                </p>
                <p className="font-medium text-[#ff9a00]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FullSection;