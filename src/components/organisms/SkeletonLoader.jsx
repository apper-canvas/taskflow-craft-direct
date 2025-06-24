import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 3, type = 'card' }) => {
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { x: '100%' }
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-xl border border-surface-200 p-6 shadow-sm">
      <div className="relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-200 to-transparent"
        />
        
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-surface-200 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-surface-200 rounded w-3/4"></div>
              <div className="h-3 bg-surface-200 rounded w-1/2"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            <div className="h-3 bg-surface-200 rounded"></div>
            <div className="h-3 bg-surface-200 rounded w-4/5"></div>
          </div>
          
          {/* Footer */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="h-6 w-16 bg-surface-200 rounded-full"></div>
              <div className="h-6 w-20 bg-surface-200 rounded-full"></div>
            </div>
            <div className="h-4 w-12 bg-surface-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const SkeletonContact = () => (
    <div className="bg-white rounded-xl border border-surface-200 p-6 shadow-sm">
      <div className="relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-200 to-transparent"
        />
        
        <div className="space-y-4">
          {/* Avatar & Name */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-surface-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-surface-200 rounded w-32"></div>
              <div className="h-3 bg-surface-200 rounded w-24"></div>
            </div>
          </div>
          
          {/* Department */}
          <div className="h-3 bg-surface-200 rounded w-20"></div>
          
          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-3 bg-surface-200 rounded w-40"></div>
              <div className="flex space-x-1">
                <div className="w-6 h-6 bg-surface-200 rounded"></div>
                <div className="w-6 h-6 bg-surface-200 rounded"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-3 bg-surface-200 rounded w-32"></div>
              <div className="flex space-x-1">
                <div className="w-6 h-6 bg-surface-200 rounded"></div>
                <div className="w-6 h-6 bg-surface-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SkeletonDiscount = () => (
    <div className="bg-white rounded-xl border border-surface-200 p-6 shadow-sm">
      <div className="relative overflow-hidden">
        <motion.div
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-200 to-transparent"
        />
        
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-surface-200 rounded-lg"></div>
              <div className="h-5 w-16 bg-surface-200 rounded-full"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-3">
            <div className="h-5 bg-surface-200 rounded w-4/5"></div>
            <div className="h-4 bg-surface-200 rounded"></div>
            <div className="h-4 bg-surface-200 rounded w-3/4"></div>
          </div>
          
          {/* Discount */}
          <div className="h-10 w-24 bg-surface-200 rounded-lg"></div>
          
          {/* Code */}
          <div className="h-12 bg-surface-200 rounded-lg"></div>
          
          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-surface-200">
            <div className="h-4 w-32 bg-surface-200 rounded"></div>
            <div className="h-8 w-20 bg-surface-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const skeletonTypes = {
    card: SkeletonCard,
    contact: SkeletonContact,
    discount: SkeletonDiscount
  };

  const SkeletonComponent = skeletonTypes[type] || SkeletonCard;

  return (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <SkeletonComponent />
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;