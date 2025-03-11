import React, { useState, useEffect } from 'react';
import styles from '../styles/Terminal.module.css';

const SystemMessage = ({ 
  children, 
  type = 'info', 
  blinking = false,
  prefix = true,
  delay = 0 
}) => {
  const [visible, setVisible] = useState(delay === 0);
  const [blinkState, setBlinkState] = useState(true);
  
  // Message type styling
  const messageTypes = {
    info: styles.systemInfo,
    warning: styles.systemWarning,
    error: styles.systemError,
    critical: styles.systemCritical,
    success: styles.systemSuccess
  };
  
  // Message type prefixes
  const typePrefixes = {
    info: 'INFO:',
    warning: 'WARNING:',
    error: 'ERROR:',
    critical: 'CRITICAL ERROR:',
    success: 'SUCCESS:'
  };
  
  // Delayed appearance
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);
  
  // Blinking effect
  useEffect(() => {
    if (!blinking || !visible) return;
    
    const blinkInterval = setInterval(() => {
      setBlinkState(prev => !prev);
    }, 800);
    
    return () => clearInterval(blinkInterval);
  }, [blinking, visible]);
  
  // Don't render until visible
  if (!visible) return null;
  
  const messageClass = messageTypes[type] || messageTypes.info;
  const prefixText = prefix ? typePrefixes[type] || typePrefixes.info : null;
  
  return (
    <div className={`${styles.systemMessage} ${messageClass} ${blinking && !blinkState ? styles.blinkOff : ''}`}>
      {prefixText && <span className={styles.messagePrefix}>{prefixText}</span>}
      <span className={styles.messageContent}>{children}</span>
    </div>
  );
};

// Special error variants for convenience
SystemMessage.Warning = (props) => <SystemMessage {...props} type="warning" />;
SystemMessage.Error = (props) => <SystemMessage {...props} type="error" />;
SystemMessage.Critical = (props) => <SystemMessage {...props} type="critical" blinking={true} />;
SystemMessage.Success = (props) => <SystemMessage {...props} type="success" />;

export default SystemMessage;