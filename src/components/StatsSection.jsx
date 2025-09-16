import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Shield, Clock, Users, TrendingUp, Award, Zap, ChevronDown, ChevronUp, HelpCircle, CheckCircle } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    position: "SMALL BUSINESS OWNER, DELHI",
    text: "I needed ₹2 lakhs urgently for my shop inventory. KreditBee approved my loan in just 2 hours without any collateral.Highly recommended for quick business loans!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    date: "15 Days Ago",
    loanAmount: "₹2,00,000",
    rating: 5,
    verified: true,
    loanType: "Business Loan"
  },
  {
    name: "Priya Sharma", 
    position: "SOFTWARE ENGINEER, BANGALORE",
    text: "Needed funds for my wedding expenses. KreditBee's instant personal loan saved the day! The entire process was digital .Amazing customer service and transparent terms.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    date: "1 Month Ago",
    loanAmount: "₹5,00,000",
    rating: 5,
    verified: true,
    loanType: "Personal Loan"
  },
  {
    name: "Amit Patel",
    position: "MARKETING MANAGER, MUMBAI", 
    text: "Emergency medical expenses came up suddenly. KreditBee's quick loan approval process was a lifesaver. The app interface is user-friendly and the support team is very helpful. Best loan app in India!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    date: "3 Weeks Ago",
    loanAmount: "₹1,50,000",
    rating: 5,
    verified: true,
    loanType: "Emergency Loan"
  },
  {
    name: "Sneha Reddy",
    position: "FREELANCE DESIGNER, HYDERABAD",
    text: "As a freelancer, getting loans from traditional banks was difficult. Used it for buying new equipment. Flexible repayment options made it easy to manage.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    date: "2 Months Ago", 
    loanAmount: "₹3,00,000",
    rating: 5,
    verified: true,
    loanType: "Equipment Loan"
  },
  {
    name: "Vikash Singh",
    position: "STUDENT, LUCKNOW",
    text: "Needed funds for my higher education abroad. KreditBee's education loan feature was perfect. The loan counselor guided me through every step. Grateful for making my dreams possible!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    date: "6 Weeks Ago",
    loanAmount: "₹8,00,000", 
    rating: 5,
    verified: true,
    loanType: "Education Loan"
  },
  {
    name: "Meera Joshi",
    position: "HOMEMAKER, PUNE",
    text: "Wanted to start my home-based catering business. Now my business is thriving thanks to KreditBee!",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    date: "1 Week Ago",
    loanAmount: "₹1,00,000",
    rating: 5,
    verified: true,
    loanType: "Startup Loan"
  },
];

const faqData = [
  {
    question: "What is the minimum and maximum loan amount I can get?",
    answer: "You can get a loan starting from ₹1,000 to ₹10 lakhs depending on your profile, income, and creditworthiness. The loan amount is determined after our AI-powered assessment of your financial profile."
  },
  {
    question: "How long does the loan approval process take?",
    answer: "Our instant loan approval process takes just 2-5 minutes! Once approved, the money is disbursed to your bank account within 24 hours. In many cases, you'll receive funds within a few hours of approval."
  },
  {
    question: "What documents are required for loan application?",
    answer: "You need minimal documents: Valid PAN card, Aadhaar card, bank statements (3-6 months), salary slips (for salaried), and ITR (for self-employed). Everything can be uploaded digitally through our app."
  },
  {
    question: "What are the interest rates and charges?",
    answer: "Our interest rates start from 12% per annum and can go up to 36% depending on your credit profile. We charge a processing fee of 1-3% of the loan amount. No hidden charges - complete transparency in all fees."
  },
  {
    question: "Can I prepay my loan without penalties?",
    answer: "Yes! You can prepay your loan anytime without any penalties or hidden charges. We encourage early repayment and it also helps improve your credit score for future loans."
  },
  {
    question: "What if I have a low credit score or no credit history?",
    answer: "Don't worry! We consider multiple factors beyond just credit scores. Our AI evaluates your banking behavior, spending patterns, and income stability. First-time borrowers and those with lower credit scores are also welcome."
  },
  {
    question: "How secure is my personal and financial information?",
    answer: "Your data security is our top priority. We use 256-bit SSL encryption, are RBI compliant, and follow strict data protection protocols. Your information is never shared with third parties without consent."
  },
  {
    question: "What loan repayment options are available?",
    answer: "We offer flexible EMI options from 3 months to 36 months. You can choose weekly, bi-weekly, or monthly repayment cycles. Auto-debit facility ensures you never miss a payment."
  },
  {
    question: "Can I get a loan if I'm self-employed or a freelancer?",
    answer: "Absolutely! We understand the unique needs of self-employed individuals and freelancers. We assess your income through bank statements and financial patterns rather than traditional salary slips."
  },
  {
    question: "What happens if I miss an EMI payment?",
    answer: "If you miss a payment, we charge a late fee and it may impact your credit score. However, we offer grace periods and will work with you to find a solution. Contact our support team immediately if you're facing difficulties."
  }
];

const TestimonialCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);
  const slideInterval = useRef(null);
  const sectionRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Responsive visible cards
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  // Auto slide
  useEffect(() => {
    if (!isPaused && isVisible) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => 
          prev >= testimonials.length - visibleCards ? 0 : prev + 1
        );
      }, 6000);
    }

    return () => clearInterval(slideInterval.current);
  }, [visibleCards, isPaused, isVisible]);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev >= testimonials.length - visibleCards ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev <= 0 ? testimonials.length - visibleCards : prev - 1
    );
  };

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getLoanTypeColor = (type) => {
    const colors = {
      'Business Loan': 'bg-blue-500',
      'Personal Loan': 'bg-purple-500',
      'Emergency Loan': 'bg-red-500',
      'Equipment Loan': 'bg-green-500',
      'Education Loan': 'bg-indigo-500',
      'Startup Loan': 'bg-orange-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="overflow-hidden">
      {/* Testimonials Section */}
      <div 
        ref={sectionRef}
        className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 overflow-hidden relative"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute -bottom-16 right-1/3 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Enhanced Header Section with Animations */}
          <div className="text-center mb-10">
            <div className={`inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-8 shadow-lg transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <Award className="w-5 h-5 mr-3 animate-bounce" />
              ⭐ CUSTOMER TESTIMONIALS ⭐
              <Zap className="w-5 h-5 ml-3 animate-bounce" style={{animationDelay: '0.5s'}} />
            </div>
            {/* Enhanced Trust Indicators */}
            <div className={`flex items-center justify-center flex-wrap gap-8 text-sm font-semibold transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Shield className="w-6 h-6 text-green-500 mr-3 animate-pulse" />
                <span className="text-gray-700">100% Secure & Safe</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Clock className="w-6 h-6 text-blue-500 mr-3 animate-spin" style={{animationDuration: '3s'}} />
                <span className="text-gray-700">2 Minutes Approval</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Star className="w-6 h-6 text-yellow-500 mr-3 fill-current animate-bounce" />
                <span className="text-gray-700">4.9/5 Customer Rating</span>
              </div>
              <div className="flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <TrendingUp className="w-6 h-6 text-purple-500 mr-3 animate-pulse" />
                <span className="text-gray-700">₹1000 Cr+ Disbursed</span>
              </div>
            </div>
          </div>

          {/* Carousel Container */}
          <div 
            className={`relative transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="overflow-hidden rounded-3xl">
              <div
                className="flex transition-all duration-700 ease-out"
                style={{
                  transform: `translateX(-${(currentSlide * 100) / visibleCards}%)`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 px-4"
                    style={{ width: `${100 / visibleCards}%` }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 h-full flex flex-col shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:rotate-1 relative overflow-hidden group">
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                      
                      {/* Floating elements */}
                      <div className="absolute  right-4 w-16 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse group-hover:animate-spin"></div>
                      <div className="absolute left-4 w-12 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
                      
                      {/* Verified Badge */}
                      {testimonial.verified && (
                        <div className="absolute right-6 bg-gradient-to-r from-green-400 to-green-600 text-white px-4  rounded-full text-xs font-bold flex items-center shadow-lg z-10 animate-bounce">
                          <Shield className="w-4 h-4 mr-1" />
                          ✓ Verified
                        </div>
                      )}

                      {/* Loan Type Badge */}
                      <div className={`absolute  left-6 ${getLoanTypeColor(testimonial.loanType)} text-white px-4  rounded-full text-xs font-bold shadow-lg z-10 animate-pulse`}>
                        {testimonial.loanType}
                      </div>

                      {/* User Info */}
                      <div className="flex items-start mb-2 relative z-10 mt-10">
                        <div className="relative">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-20 h-20 rounded-full object-cover border-4 border-gradient-to-r from-blue-400 to-purple-400 flex-shrink-0 shadow-lg hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = `https://placehold.co/150x150/3b82f6/ffffff?text=${testimonial.name.split(' ').map(n => n[0]).join('')}`;
                            }}
                          />
                          <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                          </div>
                        </div>
                        <div className="ml-6 flex-1">
                          <h4 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                            {testimonial.name}
                          </h4>
                          <p className="text-blue-600 font-bold text-xs tracking-wider uppercase mb-3 opacity-80">
                            {testimonial.position}
                          </p>
                          <div className="flex items-center">
                            {renderStars(testimonial.rating)}
                            <span className="ml-2 text-sm text-gray-600 font-medium">({testimonial.rating}/5)</span>
                          </div>
                        </div>
                      </div>

                      {/* Loan Amount Badge */}
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-2xl text-base font-bold mb-4 self-start shadow-lg transform hover:scale-105 transition-all duration-300 relative z-10">
                        💰 Loan Amount: {testimonial.loanAmount}
                      </div>

                      {/* Testimonial Text */}
                      <div className="flex-1  relative z-10">
                        <div className="text-xl text-blue-200 font-bold ">"</div>
                        <p className="text-gray-700 text-base leading-relaxed font-medium italic">
                          {testimonial.text}
                        </p>
                        <div className="text-1xl text-blue-200 font-bold text-right ">"</div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs  border-t border-gray-200 relative z-10">
                        <div className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full mr-1 animate-pulse"></div>
                          <span className="font-semibold">{testimonial.date}</span>
                        </div>
                        <div className="flex items-center text-green-600 font-bold">
                          <Award className="w-3 h-3 mr-1" />
                          <span>Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Navigation Buttons - Square Style */}
          <div className={`flex justify-center items-center gap-6 mt-2 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button
              onClick={prevSlide}
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300 border-4 border-white/50 group hover:scale-110"
            >
              <ChevronLeft className="w-7 h-7 group-hover:scale-110 transition-transform" />
            </button>
            
            <button
              onClick={nextSlide}
              className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl shadow-2xl flex items-center justify-center text-white hover:shadow-3xl transition-all duration-300 border-4 border-white/50 group hover:scale-110"
            >
              <ChevronRight className="w-7 h-7 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-br from-slate-100 via-gray-100 to-blue-100 py-8 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&h=1080&fit=crop&crop=center" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Side - How We Work Process */}
            <div className="space-y-8 ml-15">
              <div>
                <p className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-4">PROCESS</p>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  How We Work?
                </h2>
                <p className="text-gray-600 text-lg">
                  Just three steps to your quick loan!
                </p>
              </div>

              {/* Process Steps */}
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 14h.01M12 11h.01M12 7V4a1 1 0 00-1-1H9a1 1 0 00-1 1v3M8 21h8a2 2 0 002-2V9a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Step 1</h3>
                    <p className="text-gray-600 text-lg">Specify the required amount;</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Step 2</h3>
                    <p className="text-gray-600 text-lg">Wait a few minutes for a decision;</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Step 3</h3>
                    <p className="text-gray-600 text-lg">Get funds from Quick Loan partners!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - FAQ Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                  Still Have Questions?
                </h2>
                <p className="text-gray-600 text-lg italic">Read our FAQ!</p>
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {[
                  {
                    question: "What is a payday loan?",
                    answer: "A payday loan is a short-term deposit loan to help you make the ends met. Our partners give urgent loans for any needs."
                  },
                  {
                    question: "How do I qualify?",
                    answer: "You need to be 18+ years old, have a regular income source, and possess a valid bank account. Our AI system evaluates your eligibility instantly."
                  },
                  {
                    question: "How to repay the loan?",
                    answer: "Repayment is automatic through your bank account on the due date. You can also repay early without any penalties through our app or website."
                  },
                  {
                    question: "How do I find out if I am approved?",
                    answer: "You'll receive instant notification via SMS and email once your application is processed. The entire approval process takes just 2-5 minutes."
                  },
                  // {
                  //   question: "What if I don't want the loan anymore?",
                  //   answer: "You can cancel your loan application anytime before the funds are disbursed without any charges. Just contact our support team."
                  // },
                  // {
                  //   question: "What is the minimal loan amount?",
                  //   answer: "The minimum loan amount starts from ₹1,000. The maximum amount depends on your income and credit profile, up to ₹10 lakhs."
                  // }
                ].map((faq, index) => (
                  <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full p-5 text-left flex items-center justify-between hover:bg-gray-50/50 transition-all duration-300 rounded-xl"
                    >
                      <h3 className="font-bold text-gray-900 text-lg pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {openFAQ === index ? (
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">−</span>
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">+</span>
                          </div>
                        )}
                      </div>
                    </button>

                    <div
                      className={`transition-all duration-500 ease-in-out overflow-hidden ${
                        openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-5 pb-5">
                        <div className="pt-3 border-t border-gray-200">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-x {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-scale-x {
          animation: scale-x 2s ease-out 1s forwards;
        }
      `}</style>
    </div>
  );
};

export default TestimonialCarousel;