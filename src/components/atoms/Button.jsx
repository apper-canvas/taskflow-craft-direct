import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:brightness-110 focus:ring-primary shadow-sm',
    secondary: 'bg-secondary text-white hover:brightness-110 focus:ring-secondary shadow-sm',
    accent: 'bg-accent text-white hover:brightness-110 focus:ring-accent shadow-sm',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
    ghost: 'text-surface-600 hover:text-surface-900 hover:bg-surface-50 focus:ring-surface-300',
    danger: 'bg-error text-white hover:brightness-110 focus:ring-error shadow-sm'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${(disabled || loading) ? disabledClasses : ''}
    ${className}
  `.trim();

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;
  const iconSpacing = size === 'sm' ? 'space-x-1.5' : 'space-x-2';

  return (
    <motion.button
      whileHover={disabled || loading ? {} : { scale: 1.05 }}
      whileTap={disabled || loading ? {} : { scale: 0.95 }}
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      <div className={`flex items-center ${children ? iconSpacing : ''}`}>
        {loading && (
          <ApperIcon 
            name="Loader2" 
            className={`animate-spin ${iconSize === 16 ? 'w-4 h-4' : iconSize === 20 ? 'w-5 h-5' : 'w-4 h-4'}`} 
          />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <ApperIcon name={icon} size={iconSize} />
        )}
        {children && <span>{children}</span>}
        {!loading && icon && iconPosition === 'right' && (
          <ApperIcon name={icon} size={iconSize} />
        )}
      </div>
    </motion.button>
  );
};

export default Button;