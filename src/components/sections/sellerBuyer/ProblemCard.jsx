import { forwardRef } from 'react';

const ProblemCard = forwardRef(({ title, problems, side }, ref) => {
  return (
    <div 
      ref={ref}
      className={`problem-card problem-card--${side}`}
    >
      <h3 className="problem-card__title">{title}</h3>
      <ul className="problem-card__list">
        {problems.map((problem, index) => (
          <li key={index} className="problem-card__item">
            <span className="problem-card__bullet" />
            {problem}
          </li>
        ))}
      </ul>
    </div>
  );
});

ProblemCard.displayName = 'ProblemCard';

export default ProblemCard;
