import React from 'react';

interface PlateGraphicProps {
  className?: string;
  variant?: 'plate' | 'bowl' | 'cutlery' | 'pan' | 'fruit' | 'veg';
  size?: number;
}

export const PlateGraphic: React.FC<PlateGraphicProps> = ({ 
  className = 'text-stone-300', 
  variant = 'plate', 
  size = 48 
}) => {
  if (variant === 'bowl') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 48 48" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
        aria-hidden="true"
      >
        <path d="M7 21C7 31.5 14.5 37.5 24 37.5C33.5 37.5 41 31.5 41 21H7Z" />
        <path d="M17 37.5L15 41H33L31 37.5" />
        <path d="M15 15C16.5 12 18.5 12 20 15" strokeWidth="1" strokeDasharray="1.5 2" />
        <path d="M23 14C24.5 10.5 26.5 10.5 28 14" strokeWidth="1" strokeDasharray="1.5 2" />
        <path d="M31 15C32.5 12 34.5 12 36 15" strokeWidth="1" strokeDasharray="1.5 2" />
      </svg>
    );
  }

  if (variant === 'fruit') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 48 48" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
        aria-hidden="true"
      >
        {/* Apple shape with delicate stem and leaf */}
        <path d="M24 14C21 8 16 9 16 9" />
        <path d="M24 13C25 8 30 8 32 9C32 12 28 13 24 13Z" strokeWidth="1" />
        <path d="M18 16C12 16 9 21 9 28C9 36 17 41 24 41C31 41 39 36 39 28C39 21 36 16 30 16C26.5 16 24 18 24 18C24 18 21.5 16 18 16Z" />
      </svg>
    );
  }

  if (variant === 'veg') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 48 48" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
        aria-hidden="true"
      >
        {/* Carrot / leaf contour */}
        <path d="M18 22L36 7" strokeWidth="1.2" />
        <path d="M21 17L38 10" strokeWidth="1" strokeDasharray="1 2" />
        <path d="M16 22L32 14" strokeWidth="1" strokeDasharray="1 2" />
        <path d="M20 20C24 24 23 30 19 36C15 42 11 43 10 42C9 41 10 37 16 33C22 29 20 20 20 20Z" />
      </svg>
    );
  }

  if (variant === 'cutlery') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 48 48" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
        aria-hidden="true"
      >
        {/* Fork */}
        <path d="M15 7V17C15 19 17 21 19 21V41" />
        <path d="M23 7V17C23 19 21 21 19 21" />
        <path d="M19 7V17" />
        {/* Knife */}
        <path d="M30 7V41" />
        <path d="M30 7C33 9 35 14 35 22H30" />
      </svg>
    );
  }

  if (variant === 'pan') {
    return (
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 48 48" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
        aria-hidden="true"
      >
        <circle cx="21" cy="23" r="13" />
        <circle cx="21" cy="23" r="8.5" strokeDasharray="2 3" strokeWidth="0.9" />
        <path d="M30 32L41 42" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  // Default clean ceramic plate contour
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="19" />
      <circle cx="24" cy="24" r="13" strokeWidth="0.9" strokeDasharray="2 2" />
      <circle cx="24" cy="24" r="7" strokeWidth="0.9" />
    </svg>
  );
};
