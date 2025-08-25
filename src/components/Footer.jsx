import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTimes, FaGooglePlay, FaApple, FaPhoneAlt, FaQuestionCircle, FaHands, FaMobileAlt, FaBriefcase, FaSitemap, FaArrowUp } from 'react-icons/fa';
import FooterBg from '../assets/img/Footer.5d4a09601bcf849e3833.jpg';
import GooglePlayBadge from '../assets/img/ic-StoreBadge-GooglePlay.svg'; // <-- यह लाइन जोड़ी गई है
import AppStoreBadge from '../assets/img/ic-StoreBadge-AppStore.svg';   // <-- यह लाइन जोड़ी गई है

const Footer = () => {
  return (
    <>
      <style>
        {`
        .footer-bg-pattern {
          background-image: url(${FooterBg});
          background-position: 50%;
          background-size: cover;
          position: relative;
        }

        .footer-bg-pattern::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(4, 16, 33, 0.88);
          z-index: 0;
        }

        .footer-content {
          position: relative;
          z-index: 1;
        }

        .heading-underline::after {
          content: '';
          display: block;
          width: 50px;
          height: 3px;
          background-color: #ffd700;
          margin-top: 8px;
        }

        .link-hover-underline {
          position: relative;
          display: inline-block;
        }

        .link-hover-underline::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -2px;
          left: 0;
          background-color: white;
          transition: width 0.3s ease-in-out;
        }

        .link-hover-underline:hover::after {
          width: 100%;
        }

        .social-link-circle {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #333;
          transition: background-color 0.3s ease;
          overflow: hidden;
        }
        
        .social-link-circle:hover {
          background-color: white;
        }
        
        .social-link-circle .icon-default {
          transition: opacity 0.3s ease, transform 0.3s ease;
          opacity: 1;
          color: white;
        }
        
        .social-link-circle:hover .icon-default {
          opacity: 0;
          transform: translateY(-100%);
        }
        
        .social-link-circle .icon-hover {
          position: absolute;
          transition: opacity 0.3s ease, transform 0.3s ease;
          opacity: 0;
          transform: translateY(100%);
        }

        .social-link-circle:hover .icon-hover {
          opacity: 1;
          transform: translateY(0);
        }
        
        .footer-arrow-button {
          background-color: #ffd700;
          color: black;
          width: 40px;
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          right: 20px;
          bottom: 20px;
          cursor: pointer;
        }
        `}
      </style>
      <footer className="bg-[#1a1a1a] text-white footer-bg-pattern">
        <div className="container mx-auto px-10 py-16 footer-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-16">
            {/* Column 1: Logo & Links */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">KreditBee</h2>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-center space-x-2">
                  <FaPhoneAlt className="text-white" />
                  <span className="link-hover-underline text-white">Contact Us</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaQuestionCircle className="text-white" />
                  <span className="link-hover-underline text-white">FAQ</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaHands className="text-white" />
                  <span className="link-hover-underline text-white">Responsible Lending</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaMobileAlt className="text-white" />
                  <span className="link-hover-underline text-white">Instant Personal Loan App</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaBriefcase className="text-white" />
                  <span className="link-hover-underline text-white">Careers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaSitemap className="text-white" />
                  <span className="link-hover-underline text-white">Sitemap</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Services */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-6 heading-underline">Services</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Personal Loan</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Flexi Personal Loan</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Personal Loan for Self-Employed</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Flexi Personal for Salaried</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Loan Against Property</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Business Loan</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Two Wheeler Loan</a></li>
              </ul>
            </div>

            {/* Column 3: Our Company */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-6 heading-underline">Our Company</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Partner with us</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Digital Lending Partners</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Digital Lead Partner</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Awards</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">News Board</a></li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-6 heading-underline">Legal</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Grievance Redressal</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Corporate Social Responsibility Policy</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Security Centre</a></li>
                <li><a href="#" className="link-hover-underline hover:text-white transition-colors">Corporate Information</a></li>
              </ul>
            </div>
            
            {/* Column 5: App Buttons & Social Icons */}
            <div className="lg:col-span-1">
              <div className="space-y-4 mb-10">
               <a href="#" target="_blank" rel="noopener noreferrer" className="mb-2 block"> {/* Added mb-2 and block */}
                 <img src={GooglePlayBadge} alt="Get it on Google Play" className="w-40" />
               </a>
               <a href="#" target="_blank" rel="noopener noreferrer">
                 <img src={AppStoreBadge} alt="Download on the App Store" className="w-40" />
               </a>
             </div>
              <div className="flex space-x-3">
                <a href="#" className="social-link-circle">
                  <span className="icon-default"><FaFacebookF /></span>
                  <span className="icon-hover" style={{ color: '#1877F2' }}><FaFacebookF /></span>
                </a>
                <a href="#" className="social-link-circle">
                  <span className="icon-default"><FaLinkedinIn /></span>
                  <span className="icon-hover" style={{ color: '#0A66C2' }}><FaLinkedinIn /></span>
                </a>
                <a href="#" className="social-link-circle">
                  <span className="icon-default"><FaTimes /></span>
                  <span className="icon-hover" style={{ color: '#000000' }}><FaTimes /></span>
                </a>
                <a href="#" className="social-link-circle">
                  <span className="icon-default"><FaInstagram /></span>
                  <span className="icon-hover" style={{ color: '#E4405F' }}><FaInstagram /></span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Footer Section */}
        <div className="bg-[#111] py-5 relative">
          <div className="container mx-auto px-4 text-gray-400 text-sm">
            <p>
              © Copyright KreditBee. All rights reserved
            </p>
          </div>
          <button className="footer-arrow-button">
            <FaArrowUp />
          </button>
        </div>
      </footer>
    </>
  );
};

export default Footer;