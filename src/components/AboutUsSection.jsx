import React from 'react';
import aboutImage from '../assets/img/about-1.jpg';

const AboutUsSection = () => {
  return (
    <>
      <style>
        {`
          .experience-box-golden {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 0;
            bottom: 95px;
            width: 180px;
            height: 180px;
            text-align: center;
            background: #FFD700; /* Golden color */
            border-radius: 50%;
            padding: 15px 20px;
            z-index: 1;
          }
          
          .experience-box-golden::before {
            position: absolute;
            content: "";
            width: 290px;
            height: 290px;
            border-radius: 50%;
            left: -55px;
            top: -55px;
            border: 20px solid rgba(255, 255, 255, 0.5); /* Semi-transparent white border */
          }
          
          .experience-box-golden h2 {
            font-size: 3rem;
            font-weight: bold;
            color: #fff;
            margin: 0;
          }
          
          .experience-box-golden h6 {
            font-size: 0.875rem;
            color: #fff;
            margin: 0;
            line-height: 1.2;
          }

          .rating-box-golden {
            position: absolute;
            top: 25%;
            left: 0;
            transform: translateX(-50%);
            background: #fff;
            padding: 1rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            z-index: 2;
          }

          /* New CSS for the right side features */
          .single-item {
            position: relative;
            display: block;
            padding-left: 90px;
            margin-bottom: 23px;
          }
          .icon-box {
            position: absolute;
            left: 0;
            top: 0;
            width: 70px;
            height: 70px;
            line-height: 70px;
            font-size: 40px;
            text-align: center;
            border-radius: 50%;
            color: #FFD700; /* Golden color */
            z-index: 1;
          }
          .icon-box::before {
            content: "";
            position: absolute;
            background: #FFD700; /* Golden color */
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            border-radius: 50%;
            opacity: 0.1;
            z-index: -1;
          }
          .single-item h3 {
            display: block;
            font-size: 24px;
            line-height: 30px;
            margin-bottom: 10px;
          }

          /* New Button CSS */
          .theme-btn {
            position: relative;
            overflow: hidden;
            background: #FFD700; /* Golden color */
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            font-weight: bold;
            transition: color 0.5s ease;
            z-index: 1;
            border: none;
          }
          
          .theme-btn::before,
          .theme-btn::after {
            content: "";
            position: absolute;
            display: block;
            box-sizing: border-box;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #000; /* Secondary color (black for this context) */
            transition: all 0.5s cubic-bezier(.68, -.55, .265, 1.55);
            transform-origin: center;
            transform: scale(0) rotate(0);
            z-index: -1;
          }
          
          .theme-btn:hover::before {
            transform: scale(1) rotate(360deg);
          }
          
          .theme-btn:hover::after {
            transform: scale(2) rotate(180deg);
          }
          
          .theme-btn:hover {
            color: #FFD700; /* Golden color on hover */
          }

          .icon-box-svg {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
      <div className="bg-white py-5 px-5 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            
            {/* Left Side: Image and Floating elements */}
            <div className="relative mt-8 lg:mt-0 lg:order-1">
              <div className="relative z-10">
                <img
                  className="w-110 h-auto rounded-lg shadow-xl"
                  src={aboutImage}
                  alt="Financial Guidance"
                />
                
                {/* Floating "40 Years of Experience" circle */}
                <div className="experience-box-golden">
                  <div className="inner text-white">
                    <h2 className="text-5xl">40</h2>
                    <h6 className="text-sm">Years of Experience</h6>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Text Content and Features */}
            <div className="mt-10 lg:mt-0 lg:order-2">
              <p className="text-sm font-semibold text-gold-600 uppercase tracking-wide mb-4">
                ABOUT US
              </p>
              <h2 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Financial Guidance for Every Stage of Life.
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis, suscipit you take action against fraud. See it the Security Center for and Mobile and Online Banking.
              </p>

              <div className="inner-box mt-10">
                {/* Feature 1 */}
                <div className="single-item">
                  <div className="icon-box icon-box-svg">
                    {/* SVG Icon for Solution Focused (placeholder) */}
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 8a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2A.5.5 0 015 8zm8.5 2a.5.5 0 01-.5.5H11a.5.5 0 010-1h1.5a.5.5 0 01.5.5zM10 13a.5.5 0 01-.5.5H8a.5.5 0 010-1h1.5a.5.5 0 01.5.5zM10 7a.5.5 0 01.5-.5H12a.5.5 0 010 1h-1.5a.5.5 0 01-.5-.5z"></path>
                    </svg>
                  </div>
                  <h3>Solution Focused</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis tincidunt feugiat</p>
                </div>

                {/* Feature 2 */}
                <div className="single-item">
                  <div className="icon-box icon-box-svg">
                    {/* SVG Icon for 99.99% Success (placeholder) */}
                    <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h3>99.99% Success</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis tincidunt feugiat</p>
                </div>
              </div>

              {/* Discover More Button */}
              <div className="mt-10">
                <button className="theme-btn">
                  Discover More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsSection;