import React from 'react';
import CreditScoreBanner from '../assets/img/ic-what-we-offer.png'; 

const CreditScoreSection = () => {
  // CSS क्लास जो बैकग्राउंड इमेज और ओवरले के लिए है
  const sectionStyle = {
    backgroundImage: `linear-gradient(to right, rgba(182, 215, 222, 0.8) 30%, rgba(230, 244, 247, 0.7) 41%, rgba(230, 244, 247, 0.7) 76%, rgba(182, 215, 222, 0.8) 93%), url(${CreditScoreBanner})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' 
  };

  return (
    <>
      <style>
        {`
         .button--hyperion {
  font-family: input-mono-narrow, monospace;
  font-weight: 500;
  padding: 0.8rem 1.9rem;
  border: 1px solid #000;
  overflow: hidden;
  color: #000;
  position: relative;
  background-color: transparent;
  transition: color 0.3s cubic-bezier(0.7, 0, 0.2, 1);
  border-radius: 9999px;
  margin-right: 10.5rem;
}

.button--hyperion::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1);
  transform-origin: 100% 50%;
  transform: scaleX(0);
  z-index: 1;
}

.button--hyperion:hover::before {
  transform: scaleX(1);
  transform-origin: 0% 50%;
}

/* Ye add karo for white text on hover */
.button--hyperion span {
  position: relative;
  z-index: 2;
  color: #000;
}

.button--hyperion:hover span {
  color: #fff;
}

        `}
      </style>
      <div 
        className="flex justify-center py-2 w-full below-700px-height-credit-score-banner wide:mt-16"
        style={sectionStyle}
      >
        <div className="desktop:px-32 flex flex-col md:flex-row justify-center items-center px-6 container space-y-4 md:space-y-0 md:space-x-8">
          
          {/* Main Content Area: Text and Button */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full text-center md:text-left">
            
            {/* Text Content */}
            <div className="flex-1">
              <h2 className="font-bold text-lg md:text-xl lg:text-[30px] laptop:text-[20px] text-black">
                Know your Credit Score now!
              </h2>
              <p className="font-medium text-xs md:text-sm lg:text-[22px] laptop:text-[16px] text-gray-700">
                Check for detailed report & insights!
              </p>
            </div>
            
            {/* Get Report Button with new styling */}
            <div className="flex-shrink-0">
              <a href="/csr/login">
                <button
                  type="button"
                  className="button--hyperion text-white"
                >
                  <span>Get Report</span>
                </button>
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditScoreSection;