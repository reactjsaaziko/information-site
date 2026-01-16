import { forwardRef } from 'react';

const ProblemCard2D = forwardRef(({ 
  title, 
  subtitle,
  problems, 
  type = 'seller',
  visibleCount = 0,
  isHovered = false
}, ref) => {
  const accentColor = type === 'seller' ? '#5b9bd5' : '#4db8b8';
  
  return (
    <div 
      ref={ref} 
      className={`problem-card-2d problem-card-2d--${type} ${isHovered ? 'problem-card-2d--hovered' : ''}`}
    >
      <div className="problem-card-2d__header">
        <div 
          className="problem-card-2d__icon" 
          style={{ 
            background: `${accentColor}${isHovered ? '30' : '18'}`, 
            borderColor: `${accentColor}${isHovered ? '60' : '35'}` 
          }}
        >
          {type === 'seller' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          )}
        </div>
        <div className="problem-card-2d__title-group">
          <h3 className="problem-card-2d__title">{title}</h3>
          <p className="problem-card-2d__helper">{subtitle}</p>
        </div>
      </div>
      
      <ul className="problem-card-2d__list">
        {problems.map((problem, index) => (
          <li 
            key={index} 
            className={`problem-card-2d__item ${index < visibleCount ? 'problem-card-2d__item--visible' : ''}`}
            style={{ 
              '--accent': accentColor,
              transitionDelay: `${index * 0.05}s`
            }}
          >
            <span className="problem-card-2d__bullet" style={{ background: accentColor }} />
            <span className="problem-card-2d__text">{problem}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

ProblemCard2D.displayName = 'ProblemCard2D';

export default ProblemCard2D;
