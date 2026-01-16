import { forwardRef } from 'react';

const ProblemCard = forwardRef(({ 
  title, 
  subtitle,
  problems, 
  type = 'seller',
  visibleCount = 0 
}, ref) => {
  const accentColor = type === 'seller' ? '#60a5fa' : '#22d3ee';
  
  return (
    <div ref={ref} className={`problem-card-pro problem-card-pro--${type}`}>
      <div className="problem-card-pro__header">
        <h3 className="problem-card-pro__title">{title}</h3>
        <p className="problem-card-pro__subtitle">{subtitle}</p>
      </div>
      
      <ul className="problem-card-pro__list">
        {problems.map((problem, index) => (
          <li 
            key={index} 
            className={`problem-card-pro__item ${index < visibleCount ? 'problem-card-pro__item--visible' : ''}`}
            style={{ '--accent': accentColor }}
          >
            <span className="problem-card-pro__icon">
              <svg viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="3" fill={accentColor} />
                <circle cx="8" cy="8" r="6" stroke={accentColor} strokeWidth="1" strokeOpacity="0.3" />
              </svg>
            </span>
            <span className="problem-card-pro__text">{problem}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

ProblemCard.displayName = 'ProblemCard';

export default ProblemCard;
