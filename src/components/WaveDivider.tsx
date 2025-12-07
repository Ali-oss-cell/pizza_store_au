import React from 'react';

interface WaveDividerProps {
  position?: 'top' | 'bottom';
  color?: string;
  flip?: boolean;
  className?: string;
}

export const WaveDivider: React.FC<WaveDividerProps> = ({ 
  position = 'top', 
  color = '#1f2937', // pizza-dark
  flip = false,
  className = ''
}) => {
  // Wavy path - you can customize this for different wave patterns
  const wavePath = flip 
    ? "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    : "M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,208C672,224,768,224,864,208C960,192,1056,160,1152,160C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z";

  return (
    <div 
      className={`w-full ${position === 'top' ? '-mt-1' : '-mb-1'} ${className}`}
      style={{ 
        transform: position === 'top' ? 'rotate(180deg)' : 'none',
        lineHeight: 0 
      }}
    >
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="w-full h-20"
        style={{ display: 'block' }}
      >
        <path
          d={wavePath}
          fill={color}
        />
      </svg>
    </div>
  );
};

