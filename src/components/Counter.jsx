import React from 'react';
import CountUp from 'react-countup';

const Counter = ({ end, duration, label, suffix = '' }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-4xl md:text-5xl font-bold text-white">
        <CountUp
          end={end}
          duration={duration}
          separator=","
          suffix={suffix}
          enableScrollSpy={true}
          scrollSpyOnce={true}
        />
      </div>
      <div className="text-sm md:text-base text-gray-300 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
};

export default Counter;