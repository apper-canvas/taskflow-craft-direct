import { useState } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  className = '',
  required = false,
  disabled = false,
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  const hasValue = value && value.length > 0;
  const showFloatingLabel = focused || hasValue;

  return (
    <div className={`relative ${className}`}>
      {/* Floating Label */}
      {label && (
        <label
          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
            showFloatingLabel
              ? 'top-2 text-xs text-surface-600 bg-white px-1 -ml-1'
              : 'top-1/2 -translate-y-1/2 text-surface-500'
          }`}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
            <ApperIcon name={icon} size={18} />
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={!label ? placeholder : ''}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className={`
            w-full h-12 px-3 rounded-lg border-2 transition-all duration-200
            ${icon ? 'pl-10' : ''}
            ${error 
              ? 'border-error focus:border-error focus:ring-2 focus:ring-error/20' 
              : 'border-surface-300 focus:border-primary focus:ring-2 focus:ring-primary/20'
            }
            ${disabled 
              ? 'bg-surface-50 text-surface-400 cursor-not-allowed' 
              : 'bg-white text-surface-900'
            }
            placeholder:text-surface-400
            focus:outline-none
          `}
          {...props}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center mt-1 text-sm text-error">
          <ApperIcon name="AlertCircle" size={14} className="mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;