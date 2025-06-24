import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '',
  hover = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-surface-200 shadow-sm';
  const hoverClasses = hover || onClick ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer' : '';
  
  const cardClasses = `
    ${baseClasses}
    ${hoverClasses}
    transition-all duration-200
    ${className}
  `.trim();

  const MotionCard = onClick ? motion.div : 'div';
  const motionProps = onClick ? {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <MotionCard
      className={cardClasses}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </MotionCard>
  );
};

export default Card;