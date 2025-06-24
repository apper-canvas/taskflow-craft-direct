import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const FilterTabs = ({ 
  tabs, 
  activeTab, 
  onTabChange, 
  className = '' 
}) => {
  return (
    <div className={`flex space-x-1 p-1 bg-surface-100 rounded-lg ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className="relative flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200"
        >
          {activeTab === tab.value && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white shadow-sm rounded-md"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          
          <div className="relative z-10 flex items-center space-x-2">
            {tab.icon && (
              <ApperIcon 
                name={tab.icon} 
                size={16} 
                className={activeTab === tab.value ? 'text-primary' : 'text-surface-600'} 
              />
            )}
            <span className={activeTab === tab.value ? 'text-primary' : 'text-surface-600'}>
              {tab.label}
            </span>
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                activeTab === tab.value 
                  ? 'bg-primary/10 text-primary' 
                  : 'bg-surface-200 text-surface-600'
              }`}>
                {tab.count}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;