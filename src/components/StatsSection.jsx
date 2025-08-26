import React, { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    name: "Raviraj Patil",
    location: "Mumbai",
    text: "Thanks to KreditBee, I could easily get a loan when I needed one...",
    image: "https://placehold.co/100x100/1e293b/d1d5db?text=User1",
  },
  {
    name: "Aman Gupta",
    location: "Delhi",
    text: "KreditBee's user interface is incredibly intuitive...",
    image: "https://placehold.co/100x100/1e293b/d1d5db?text=User2",
  },
  {
    name: "Pooja Sharma",
    location: "Bangalore",
    text: "I was hesitant at first, but KreditBee exceeded all my expectations...",
    image: "https://placehold.co/100x100/1e293b/d1d5db?text=User3",
  },
  {
    name: "Vijay Kumar",
    location: "Chennai",
    text: "Getting a loan through KreditBee was an absolute breeze...",
    image: "https://placehold.co/100x100/1e293b/d1d5db?text=User4",
  },
  {
    name: "Nisha Singh",
    location: "Pune",
    text: "KreditBee provides a secure and transparent platform for personal loans...",
    image: "https://placehold.co/100x100/1e293b/d1d5db?text=User5",
  },
  {
    name: "Sandeep Rao",
    location: "Hyderabad",
    text: "The collateral-free loans from KreditBee were exactly what I needed...",
    image: "https://placehold.co/100x100/1e293b/d1d5db?text=User6",
  },
];

const TestimonialCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3); // default lg
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideInterval = useRef(null);

  const loopTestimonials = [...testimonials, ...testimonials]; // duplicate for infinite loop

  // ✅ Responsive visible cards
  useEffect(() => {
    const updateCards = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1); // mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2); // tablet
      } else {
        setVisibleCards(3); // desktop
      }
    };

    updateCards();
    window.addEventListener("resize", updateCards);
    return () => window.removeEventListener("resize", updateCards);
  }, []);

  // ✅ Auto slide
  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
      setIsTransitioning(true);
    }, 3000);

    return () => clearInterval(slideInterval.current);
  }, []);

  // ✅ Reset for infinite loop
  useEffect(() => {
    if (currentSlide >= testimonials.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 600);
    }
  }, [currentSlide]);

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-[26px] capitalize text-[#212529] font-semibold">
            Testimonials
          </h2>
          <div className="w-16 mt-2 h-1 rounded-full bg-[#ff7f50] mx-auto"></div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden relative">
          <div
            className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
            style={{
              transform: `translateX(-${(currentSlide * 100) / visibleCards}%)`,
              width: `${(loopTestimonials.length * 100) / visibleCards}%`,
            }}
          >
            {loopTestimonials.map((t, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / visibleCards}%` }} // ✅ force width based on visibleCards
              >
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center h-full">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full object-cover mb-4 shadow-sm"
                  />
                  <p className="text-gray-600 italic mb-4">"{t.text}"</p>
                  <h4 className="font-semibold text-lg text-gray-800">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === (currentSlide % testimonials.length)
                    ? "bg-orange-500"
                    : "bg-gray-400"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
