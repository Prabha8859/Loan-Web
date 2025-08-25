import React from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

import LoanPhones from "../assets/img/banner-loan_b.webp";
import BgPattern from "../assets/img/ic-what-we-offer.png";
import GooglePlayBadge from "../assets/img/ic-StoreBadge-GooglePlay.svg";
import AppStoreBadge from "../assets/img/ic-StoreBadge-AppStore.svg";

const InstantLoanSection = () => {
  return (
    <>
      <style>
        {`
        /* Floating animation */
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(+15px);
          }
        }

        .phone-float-animation {
          animation: float 3s ease-in-out infinite;
        }

        .bg-pattern-container {
          background-image: url(${BgPattern});
          background-size: cover;
          background-position: center;
          position: relative;
          background-color: #111; /* fallback black */
          border-radius: 12px;
        }

        .bg-pattern-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          z-index: 0;
          border-radius: 12px;
        }

        .content-box-inner {
          position: relative;
          z-index: 1;
        }

        .loan-button {
          background-color: #ffd700;
          color: black;
          font-weight: bold;
          padding: 12px 24px;
          border-radius: 9999px;
          border: 2px solid transparent;
          transition: background-color 0.3s ease, border-color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .loan-button:hover {
          background-color: transparent;
          border-color: #38b2ac;
          color: white;
        }

        .loan-button .arrow-icon {
          margin-left: 8px;
          transition: transform 0.3s ease;
        }

        .loan-button:hover .arrow-icon {
          transform: rotate(-45deg);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap; /* break avoid */
        }

        .feature-item .icon {
          color: #ffd700;
          flex-shrink: 0;
          font-size: 20px;
        }
        `}
      </style>

      <div className="px-4 md:px-8 lg:px-16 bg-gray-100">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side: Animated Image */}
          <div className="w-full lg:w-5/12 flex justify-center items-center">
            <img
              src={LoanPhones}
              alt="Instant Personal Loans on Mobile"
              className="max-w-full h-auto phone-float-animation"
            />
          </div>

          {/* Right Side: Content Box */}
          <div className="w-full lg:w-5/12 bg-pattern-container p-4 md:p-10 shadow-lg text-white">
            <div className="content-box-inner">
              <h3 className="text-3xl font-bold mb-2">Instant Personal Loans</h3>
              <p className="text-lg text-gray-300 mb-8">
                Trusted by Over 7 Crore Indians
              </p>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                <li className="feature-item">
                  <FaCheckCircle className="icon" />
                  <span>From 6,000 to 10 Lakhs</span>
                </li>
                <li className="feature-item">
                  <FaCheckCircle className="icon" />
                  <span>100% Online Process</span>
                </li>
                <li className="feature-item">
                  <FaCheckCircle className="icon" />
                  <span>10 Minute Disbursal</span>
                </li>
                <li className="feature-item">
                  <FaCheckCircle className="icon" />
                  <span>Direct Bank Transfer</span>
                </li>
              </ul>

              {/* Get Loan Now Button */}
              <div className="flex justify-end">
                <button className="loan-button">
                  Get Loan Now <FaArrowRight className="arrow-icon" />
                </button>
              </div>

              {/* App Store Badges */}
              <div className="flex gap-4 mt-8">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img
                    src={GooglePlayBadge}
                    alt="Get it on Google Play"
                    className="w-40"
                  />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <img
                    src={AppStoreBadge}
                    alt="Download on the App Store"
                    className="w-40"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstantLoanSection;
