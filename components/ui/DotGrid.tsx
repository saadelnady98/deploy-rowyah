"use client"
import React from 'react';

interface DotGridProps {
  className?: string;
}

export const DotGrid: React.FC<DotGridProps> = ({ className = '' }) => {
  // The dot color from Figma: rgba(82, 178, 179, 0.41)
  const dotColor = 'rgba(82, 178, 179, 0.41)';
  
  return (
    <div className={`dot-grid-pattern ${className}`}>
      <div className="grid-container">
        {/* First column */}
        <div className="column">
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <div key={`col1-${row}`} className="dot" />
          ))}
        </div>
        
        {/* Second column */}
        <div className="column">
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <div key={`col2-${row}`} className="dot" />
          ))}
        </div>
        
        {/* Third column */}
        <div className="column">
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <div key={`col3-${row}`} className="dot" />
          ))}
        </div>
        {/* Third column */}
        <div className="column">
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <div key={`col3-${row}`} className="dot" />
          ))}
        </div>
        {/* Third column */}
        <div className="column">
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <div key={`col3-${row}`} className="dot" />
          ))}
        </div>
        {/* Third column */}
        <div className="column">
          {[0, 1, 2, 3, 4, 5].map((row) => (
            <div key={`col3-${row}`} className="dot" />
          ))}
        </div>
      </div>

      <style jsx>{`
        .dot-grid-pattern {
          display: block;
          pointer-events: none;
        }
        
        .grid-container {
          display: flex;
          gap: 10px;
        }
        
        .column {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background-color: ${dotColor};
        }
      `}</style>
    </div>
  );
};
