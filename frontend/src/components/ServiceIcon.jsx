import React from 'react';

const ServiceIcon = ({ type, className = "w-8 h-8" }) => {
  const icons = {
    'eyelashes': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4C8 4 4 8 4 12s4 8 8 8 8-4 8-8-4-8-8-8z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M12 8c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M8 6c1-1 2-1 3-1M16 6c-1-1-2-1-3-1M8 18c1 1 2 1 3 1M16 18c-1 1-2 1-3 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'sparkle': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l2 6h6l-4.5 3.5L17 18l-5-3.5L7 18l1.5-6.5L4 8h6l2-6z" fill="currentColor"/>
        <path d="M6 3l1 2h2l-1.5 1L8 8l-2-1L4 8l.5-2L3 5h2l1-2zM18 16l1 2h2l-1.5 1L20 21l-2-1-2 1 .5-2L15 18h2l1-2z" fill="currentColor"/>
      </svg>
    ),
    'nail-polish': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 2h8v4H8V2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M9 6h6v14c0 1-1 2-2 2h-2c-1 0-2-1-2-2V6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M10 8h4M10 11h4M10 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'diamond': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 9l6-7 6 7-6 13-6-13z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M6 9h12M9 2l3 7M15 2l-3 7" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    'gel': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 12c0-3 2-5 5-5s5 2 5 5c0 5-2 9-5 9s-5-4-5-9z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M9 10c1-1 2-1 3-1s2 0 3 1M10 14c1 0 2 0 2 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    'acrylic': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 8h8v12c0 1-1 2-2 2h-4c-1 0-2-1-2-2V8z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M6 8h12l-2-4H8l-2 4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M10 12h4M10 15h4M10 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    'refresh': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c2.5 0 4.8 1 6.5 2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M21 6v6h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    'foot': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3c2 0 4 2 4 4v8c0 3-2 5-4 5s-4-2-4-5V7c0-2 2-4 4-4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <circle cx="8" cy="6" r="1" fill="currentColor"/>
        <circle cx="10" cy="5" r="1" fill="currentColor"/>
        <circle cx="12" cy="6" r="1" fill="currentColor"/>
        <circle cx="14" cy="7" r="1" fill="currentColor"/>
        <circle cx="10" cy="18" r="1.5" fill="currentColor"/>
      </svg>
    ),
    'remove': (
      <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6h18M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  };

  return icons[type] || icons['nail-polish'];
};

export default ServiceIcon;
