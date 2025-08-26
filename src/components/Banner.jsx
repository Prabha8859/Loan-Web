// src/components/Banner.jsx

import React from "react";
import Slider from "react-slick";
import { HiArrowRight } from "react-icons/hi";
import { FaMoneyBillAlt } from "react-icons/fa";

// ---- Image Imports ----
import bannerOne from "../assets/img/banner-one-bg.27c1b5595ac60b4881f1.jpg";
import bannerTwo from "../assets/img/banner-one-bg-2.cb4dc87bbf18b82b1363.jpg";
import bannerThree from "../assets/img/banner-one-bg.27c1b5595ac60b4881f1.jpg";

// Custom CSS for animations and slider dots
const CustomStyles = () => (
  <style>
    {`
    @keyframes fade-left {
        from { opacity: 0; transform: translateX(-200px); }
        to { opacity: 1; transform: translateX(0); }
    }
    .animate-fade-left {
        animation: fade-left 1s ease-in-out;
    }
    @keyframes zoom-in {
        from { transform: scale(1.1); }
        to { transform: scale(1); }
    }
    .animate-zoom-in {
        animation: zoom-in 1.5s ease-in-out forwards;
    }
    .slick-dots {
      right: 50px !important;
      bottom: 50px !important;
      top: unset !important;
      width: auto !important;
      display: flex !important;
      flex-direction: row !important;
      justify-content: flex-end;
      align-items: center;
    }
    .slick-dots li {
      margin: 0 8px !important; /* Spacing between dots */
    }
    .slick-dots li button:before {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      border: 1px solid white; /* White border for the circle */
      border-radius: 50%;
      background-color: transparent;
      opacity: 0.5; /* Inactive dot opacity */
      transition: all 0.3s ease-in-out;
    }
    .slick-dots li.slick-active button:before {
      background-color: white; /* Active dot is solid white */
      opacity: 1; /* Active dot opacity */
    }
    `}
  </style>
);

// Slide data
const slideData = [
  {
    image: bannerOne,
    title: "Elevate Your Financial Future with LoanLift",
    description:
      "We offer a range of expert services designed to support your financial journey and business success. Our consultancy includes tailored financial planning, strategic business advice.",
  },
  {
    image: bannerTwo,
    title: "Your Partner for Financial Growth & Success",
    description:
      "We offer a range of expert services designed to support your financial journey and business success. Our consultancy includes tailored financial planning, strategic business advice.",
  },
  {
    image: bannerThree,
    title: "Unlock Your Financial Potential Today",
    description:
      "We offer a range of expert services designed to support your financial journey and business success. Our consultancy includes tailored financial planning, strategic business advice.",
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <section className="relative w-full h-200 overflow-hidden text-white font-sans mb-4">
      <CustomStyles />

      <Slider {...settings}>
        {slideData.map((slide, index) => (
          <div key={index}>
            <div className="relative w-full h-200">
              {/* Background Image */}
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center animate-zoom-in"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>

              {/* Gray Overlay with adjusted opacity */}
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>

              <div className="container mx-auto relative z-10 flex items-center h-full px-4">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full">
                  {/* Main Content */}
                  <div className="w-full lg:w-7/12 mt-20 lg:mt-0">
                    <div className="animate-fade-left">
                      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        {slide.title}
                      </h1>
                      <div className="w-1/3 my-4 border-t border-gray-500"></div>
                    </div>

                    <div className="animate-fade-left mt-6">
                      <p className="text-base lg:text-lg text-gray-300 max-w-lg">
                        {slide.description}
                      </p>
                    </div>

                    <div className="animate-fade-left mt-8 w-40">
                      <a
                        href="#"
                        className="relative flex items-center px-4 py-2 border border-white rounded-full text-white overflow-hidden group"
                      >
                        <span className="relative z-10 text-sm md:text-base transition-colors duration-300 group-hover:text-black">
                          Contact Us
                        </span>
                        <HiArrowRight className="relative z-10 ml-2 transition-colors duration-300 group-hover:text-black" />
                        <span className="absolute inset-0 bg-white transition-transform duration-300 transform scale-x-0 origin-left group-hover:scale-x-100"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Floating Box - Hiding on smaller screens to prevent overlap */}
      <div 
        className="hidden md:block mb-5 absolute bottom-0 right-10 md:right-40 w-80 md:w-96 text-center text-white p-8 border border-white border-opacity-20 rounded-md shadow-lg z-20" 
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
      >
        <div className="flex items-center justify-center space-x-4 mb-4 pb-4 border-b border-gray-500">
          <FaMoneyBillAlt className="text-4xl text-sky-500" />
          <h2 className="text-4xl font-bold">5% Interest</h2>
        </div>
        <p className="text-sm text-gray-300">
          Discover our dependable loan solutions designed to empower your
          financial journey.
        </p>
      </div>
    </section>
  );
};

export default Banner;