import { createContext, useContext, useState, useRef } from 'react';
import { FiAlertTriangle, FiInfo, FiCheckCircle } from 'react-icons/fi';
import './DialogContext.css';

const DialogContext = createContext();

export function DialogProvider({ children }) {
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: 'alert', // 'alert' | 'confirm'
    title: 'Bildirishnoma',
    message: '',
    confirmText: 'Tushunarli',
    cancelText: 'Bekor qilish',
    variant: 'info' // 'info' | 'success' | 'warning' | 'danger'
  });

  const resolverRef = useRef();

  const showAlert = (message, options = {}) => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setDialogState({
        isOpen: true,
        type: 'alert',
        title: options.title || 'Bildirishnoma',
        message: message,
        confirmText: options.confirmText || 'Tushunarli',
        cancelText: '',
        variant: options.variant || 'info'
      });
    });
  };

  const showConfirm = (message, options = {}) => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      setDialogState({
        isOpen: true,
        type: 'confirm',
        title: options.title || 'Tasdiqlash',
        message: message,
        confirmText: options.confirmText || 'Tasdiqlash',
        cancelText: options.cancelText || 'Bekor qilish',
        variant: options.variant || 'warning'
      });
    });
  };

  const handleConfirm = () => {
    setDialogState(prev => ({ ...prev, isOpen: false }));
    if (resolverRef.current) {
      resolverRef.current(true);
    }
  };

  const handleCancel = () => {
    setDialogState(prev => ({ ...prev, isOpen: false }));
    if (resolverRef.current) {
      resolverRef.current(false);
    }
  };

  const renderIcon = () => {
    const iconSize = 44;
    switch (dialogState.variant) {
      case 'success':
        return <FiCheckCircle size={iconSize} className="dialog-icon dialog-icon--success" />;
      case 'warning':
      case 'danger':
        return <FiAlertTriangle size={iconSize} className="dialog-icon dialog-icon--warning" />;
      default:
        return <FiInfo size={iconSize} className="dialog-icon dialog-icon--info" />;
    }
  };

  return (
    <DialogContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      {dialogState.isOpen && (
        <div className="dialog-overlay animate-fade-in">
          <div className="dialog-card animate-scale-up">
            <div className="dialog-card__glow" />
            <div className="dialog-card__content">
              <div className="dialog-card__header-icon">
                {renderIcon()}
              </div>
              <h3 className="dialog-card__title">{dialogState.title}</h3>
              <p className="dialog-card__message">{dialogState.message}</p>
              
              <div className="dialog-card__actions">
                {dialogState.type === 'confirm' && (
                  <button 
                    className="dialog-btn dialog-btn--cancel" 
                    onClick={handleCancel}
                  >
                    {dialogState.cancelText}
                  </button>
                )}
                <button 
                  className={`dialog-btn dialog-btn--confirm dialog-btn--${dialogState.variant}`} 
                  onClick={handleConfirm}
                >
                  {dialogState.confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  return useContext(DialogContext);
}
