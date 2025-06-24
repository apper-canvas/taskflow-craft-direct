import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const ContactCard = ({ contact, onEdit, onDelete }) => {
  const copyToClipboard = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      layout
    >
      <Card className="p-6 group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Avatar & Name */}
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-surface-900">{contact.name}</h3>
                <p className="text-sm text-surface-600">{contact.role}</p>
              </div>
            </div>

            {/* Department */}
            <div className="flex items-center text-sm text-surface-500 mb-4">
              <ApperIcon name="Building" size={14} className="mr-2" />
              {contact.department}
            </div>

            {/* Contact Actions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-surface-600">
                  <ApperIcon name="Mail" size={14} className="mr-2" />
                  <span className="truncate">{contact.email}</span>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="Mail"
                    onClick={() => handleEmail(contact.email)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="Copy"
                    onClick={() => copyToClipboard(contact.email, 'Email')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-surface-600">
                  <ApperIcon name="Phone" size={14} className="mr-2" />
                  <span>{contact.phone}</span>
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="Phone"
                    onClick={() => handleCall(contact.phone)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="Copy"
                    onClick={() => copyToClipboard(contact.phone, 'Phone')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Management Actions */}
          <div className="flex flex-col space-y-1 ml-4">
            <Button
              variant="ghost"
              size="sm"
              icon="Edit2"
              onClick={() => onEdit(contact)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <Button
              variant="ghost"
              size="sm"
              icon="Trash2"
              onClick={() => onDelete(contact.Id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-error hover:text-error"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ContactCard;