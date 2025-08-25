// src/components/Header.jsx

import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { BiChevronDown } from 'react-icons/bi';
import { HiArrowRight, HiMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { Link } from 'react-router-dom';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false); // State for Services dropdown on mobile

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className="relative w-full z-50">
      {/* Top Header Bar - Hides on scroll and on small screens */}
      <div 
        className={`bg-gray-800 py-3 text-sm text-white transition-all duration-300 ease-in-out ${
          isScrolled ? 'opacity-0 h-0 overflow-hidden py-0' : 'opacity-100 h-auto'
        } hidden md:block`}
      >
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex items-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-sm text-sky-500" />
              <span>28 Valencia Street, New York</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-sm text-sky-500" />
              <span>help@company.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-sm text-sky-500" />
              <span>+1 200.098.456 11</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden lg:flex items-center space-x-4">
              <a href="#" className="hover:text-sky-500 transition-colors">Help</a>
              <a href="#" className="hover:text-sky-500 transition-colors">About</a>
              <a href="#" className="hover:text-sky-500 transition-colors">Content</a>
            </nav>
            <div className="flex items-center space-x-3 text-gray-400">
              <a href="#" className="hover:text-sky-500 transition-colors"><FaFacebookF /></a>
              <a href="#" className="hover:text-sky-500 transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-sky-500 transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-sky-500 transition-colors"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav 
        className={`container w-full transition-all duration-300 ease-in-out ${
          isScrolled ? 'fixed top-0 bg-gray-900 shadow-lg' : 'absolute top-9 bg-transparent' // Changed top-9 to top-0
        }`}
      >
        <div className="container mx-auto flex justify-between items-center py-2 px-4 ">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <a href="#" className="text-3xl font-bold tracking-wider text-white">
              LOANLIFT
            </a>
          </div>

          {/* Navigation Links and Buttons */}
          <div className="flex items-center space-x-4 text-lg font-medium text-gray-300">
            {/* Desktop Navigation Links */}
            <ul className="hidden lg:flex items-center space-x-6 pr-6 border-r border-gray-700">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              {/* <li><a href="#" className="hover:text-white transition-colors flex items-center">Pages <BiChevronDown className="ml-1" /></a></li> */}
             <li
                className="relative"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <span className="hover:text-white transition-colors flex items-center cursor-pointer">
                  Loan <BiChevronDown className="ml-1" />
                </span>

                  {isServicesOpen && (
                    <div className="absolute left-1/2  mt-5 transform -translate-x-1/2 w-60 bg-white text-black rounded-xl shadow-lg z-50 hover:shadow-lg hover:shadow-yellow-100 transition-all duration-200">
                      <div className="absolute -top-5 left-0 w-full h-5"></div>
                      {/* Arrow */}
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rotate-45"></div>
                      {/* Yellow top border */}
                      <div className="h-1 bg-yellow-400 rounded-t-xl"></div>

                        {/* Dropdown items */}
                        <ul className="py-2">
                          <li>
                            <Link
                              to="/personal-loan"
                              className="block px-6 py-2 hover:bg-gray-100"
                            >
                              Personal Loan
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/against-loan"
                              className="block px-5 py-2 hover:bg-gray-100"
                            >
                              Loan Against Property
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/business-loan"
                              className="block px-6 py-2 hover:bg-gray-100"
                            >
                              Business Loan
                            </Link>
                          </li>
                        </ul>
                      </div>
                  )}
</li>

          <li
  className="relative"
  onMouseEnter={() => setIsCalculatorOpen(true)}
  onMouseLeave={() => setIsCalculatorOpen(false)}
>
  <a href="#" className="hover:text-white transition-colors flex items-center">
    Calculators <BiChevronDown className="ml-2" />
  </a>

  {isCalculatorOpen && (
    <div className="absolute left-1/2 mt-5 transform -translate-x-1/2 w-60 bg-white text-black rounded-xl hover:shadow-lg hover:shadow-yellow-100 transition-all duration-200">
      {/* Top safe hover area */}
      <div className="absolute -top-5 left-0 w-full h-5"></div>

      {/* Arrow */}
      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rotate-45"></div>

      {/* Yellow top border */}
      <div className="h-1 bg-yellow-400 rounded-t-xl "></div>

      {/* Dropdown items */}
      <ul className="py-2">
        {/* First item with sub menu */}
        <li className="relative group">
          <a
            href="#"
            className="flex justify-between items-center px-6 py-2 hover:bg-gray-100"
          >
            Loan EMI Calculator <BiChevronDown className="ml-2" />
          </a>

          {/* Submenu */}
          <div className="absolute top-0 left-full ml-1 w-85 bg-white rounded-xl shadow-lg hidden group-hover:block max-h-60  overflow-y-auto custom-scrollbar border-t-4 border-yellow-400">
            <ul className="py-2">
              <li> <Link to="/personal-emi" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">
    Personal Loan EMI Calculator
  </Link></li>
            <li>
  <Link to="/business-emi" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">
    Business Loan EMI Calculator
  </Link>
</li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Compound Interest Calculator</a></li>
               <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Bike Loan EMI Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Mortagage EMI Calculator</a></li>
              {/* Scroll ke liye aur bhi add krlo */}
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100">Eduction Loan EMI Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100">Simple Interest Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">APR Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Commercial Loan EMI Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Flat & reducing Rate Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Team Loan EMI Calculator Online</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Loan To Value Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Interest Rate Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Personal Loan Pre-Payment Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Personal Loan Eligibility Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Salary Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">EPF Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">TDS Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">CAGR Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Retriement  Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">Income Tax Calculator</a></li>
              <li><a href="#" className="block px-5 py-2 hover:bg-gray-100 text-nowrap">HRA Calculator</a></li>
            </ul>
          </div>
        </li>

        {/* Another parent item */}
        <li className="relative group">
          <a
            href="#"
            className="flex justify-between items-center px-6 py-2 hover:bg-gray-100"
          >
            Bank EMI Calculator <BiChevronDown className="ml-2" />
          </a>

          {/* Submenu */}
          <div className="absolute top-0 left-full ml-1 w-64 bg-white rounded-xl shadow-lg hidden group-hover:block max-h-60 overflow-y-auto">
            <ul className="py-2">
              <li><a href="#" className="block px-6 py-2 hover:bg-gray-100">SBI EMI Calculator</a></li>
              <li><a href="#" className="block px-6 py-2 hover:bg-gray-100">HDFC EMI Calculator</a></li>
              <li><a href="#" className="block px-6 py-2 hover:bg-gray-100">ICICI EMI Calculator</a></li>
              <li><a href="#" className="block px-6 py-2 hover:bg-gray-100">Axis Bank EMI Calculator</a></li>
              <li><a href="#" className="block px-6 py-2 hover:bg-gray-100">PNB EMI Calculator</a></li>
              {/* Scroll ke liye aur add kar sakte ho */}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  )}
</li>




              <li><a href="#" className="hover:text-white transition-colors flex items-center">Refer & Earn </a></li>
              <li><a href="#" className="hover:text-white transition-colors">Repayments</a></li>
            </ul>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="text-white text-3xl focus:outline-none"
              >
                <HiMenuAlt3 />
              </button>
            </div>

            {/* "Get Started" Button (Visible on all screen sizes) */}
            <div className="hidden md:block mt-1">
              <a 
                href="#" 
                className="flex items-center px-6 py-2 text-white border-2 border-white rounded-full transition-all duration-300 hover:bg-white hover:text-black"
              >
                Get Started
                <HiArrowRight className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Responsive Sidebar - Sliding from left) */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out z-40 lg:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-[-100%]'
        }`}
      >
        <div className="flex flex-col p-6 pt-4 text-gray-300">
          {/* Close Button and Logo */}
          <div className="flex justify-between items-center w-full mb-8">
            <span className="text-2xl font-bold tracking-wider text-white">LOANLIFT</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-white text-3xl">
              <HiOutlineX />
            </button>
          </div>
          
          <ul className="w-full text-lg">
            {/* Home with chevron right */}
            <li className="py-4 border-b border-gray-700">
              <a href="#" className="flex justify-between items-center w-full hover:text-white transition-colors">
                <span>Home</span>
                <FaChevronRight />
              </a>
            </li>

            {/* Services with dropdown */}
            <li className="py-4 border-b border-gray-700">
              <div 
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)} 
                className="flex justify-between items-center w-full cursor-pointer hover:text-white transition-colors"
              >
                <span>Services</span>
                {isMobileServicesOpen ? <FaChevronDown /> : <FaChevronRight />}
              </div>
              {isMobileServicesOpen && (
                <ul className="mt-4 ml-4 space-y-2 text-sm">
                  <li className="py-2"><a href="#" className="hover:text-white transition-colors">Services</a></li>
                  <li className="py-2"><a href="#" className="hover:text-white transition-colors">Services 2</a></li>
                  <li className="py-2"><a href="#" className="hover:text-white transition-colors">Services Details</a></li>
                </ul>
              )}
            </li>
            
            {/* The rest of the menu items */}
            <li className="py-4 border-b border-gray-700">
              <a href="#" className="flex justify-between items-center w-full hover:text-white transition-colors">
                <span>Services</span>
                <FaChevronRight />
              </a>
            </li>
            
            <li className="py-4 border-b border-gray-700">
              <a href="#" className="flex justify-between items-center w-full hover:text-white transition-colors">
                <span>Services 2</span>
                <FaChevronRight />
              </a>
            </li>

            <li className="py-4">
              <a href="#" className="flex justify-between items-center w-full hover:text-white transition-colors">
                <span>Services Details</span>
                <FaChevronRight />
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Overlay to close menu on click outside */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;