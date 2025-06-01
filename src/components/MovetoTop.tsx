import { useEffect, useState } from 'react';
import onTop from '../assets/onTop.gif';

interface CircleProgressProps {
  radius: number;
  percentage: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  radius,
  percentage,
  strokeWidth = 5,
  color,
  backgroundColor
}) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      width={radius * 2}
      height={radius *2 }
      style={{ transform: 'rotate(-90deg)' }} // Rotate to start from top (12 o'clock)
    >
      {/* Background Circle */}
      <circle
        stroke={backgroundColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      {/* Foreground Arc */}
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

const MovetoTop = () => {
  const [showOnTop, setShowOnTop] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setPercentage(Math.min(100, Math.max(0, scrolled)));
      setShowOnTop(scrollTop > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`
        fixed right-8 bottom-8 z-50 cursor-pointer
        transition-all duration-300 ease-in-out
        ${showOnTop ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
        hover:scale-110
      `}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <div className="relative h-16 w-16">
        {/* Circle Progress behind */}
        <CircleProgress radius={32} percentage={percentage} strokeWidth={2} color="#dc2626" backgroundColor="#e5e7eb" />
        
        {/* Top image */}
        <img
          src={onTop}
          alt="up-arrow"
          className="absolute top-0 left-0 scale-90 h-full w-full rounded-full"
        />
      </div>
    </div>
  );
};

export default MovetoTop;
