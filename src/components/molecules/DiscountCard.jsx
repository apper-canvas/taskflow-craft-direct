import { motion } from 'framer-motion';
import { format, isAfter } from 'date-fns';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const DiscountCard = ({ discount }) => {
  const isExpired = !isAfter(new Date(discount.expiryDate), new Date());
  
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(discount.code);
      toast.success('Discount code copied to clipboard!');
    } catch (err) {
      toast.error('Failed to copy discount code');
    }
  };

  const openLink = () => {
    window.open(discount.url, '_blank', 'noopener,noreferrer');
  };

  const categoryIcons = {
    'Office': 'Briefcase',
    'Software': 'Monitor',
    'Training': 'GraduationCap',
    'Furniture': 'Armchair'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      layout
    >
      <Card className={`p-6 h-full flex flex-col ${isExpired ? 'opacity-60' : ''}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-warning rounded-lg flex items-center justify-center">
              <ApperIcon 
                name={categoryIcons[discount.category] || 'Tag'} 
                className="w-5 h-5 text-white" 
              />
            </div>
            <Badge variant="accent" size="sm">
              {discount.category}
            </Badge>
          </div>
          
          {isExpired && (
            <Badge variant="error" size="sm">
              Expired
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-surface-900 mb-2">
            {discount.title}
          </h3>
          <p className="text-sm text-surface-600 mb-4 line-clamp-2">
            {discount.description}
          </p>

          {/* Discount Amount */}
          <div className="mb-4">
            <div className="inline-flex items-center px-3 py-2 bg-accent/10 rounded-lg">
              <ApperIcon name="Percent" size={16} className="text-accent mr-2" />
              <span className="font-bold text-accent text-lg">
                {discount.discount}
              </span>
            </div>
          </div>

          {/* Code */}
          <div className="mb-4">
            <div className="flex items-center justify-between p-3 bg-surface-50 rounded-lg border border-dashed border-surface-300">
              <code className="font-mono font-medium text-surface-800">
                {discount.code}
              </code>
              <Button
                variant="ghost"
                size="sm"
                icon="Copy"
                onClick={copyCode}
                disabled={isExpired}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-surface-200 pt-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-surface-500">
              <ApperIcon name="Calendar" size={14} className="mr-1" />
              Expires: {format(new Date(discount.expiryDate), 'MMM d, yyyy')}
            </div>
            
            <Button
              variant="primary"
              size="sm"
              icon="ExternalLink"
              onClick={openLink}
              disabled={isExpired}
            >
              Use Deal
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default DiscountCard;