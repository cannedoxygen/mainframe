import React, { useRef, useEffect } from 'react';
import styles from '../styles/Terminal.module.css';

const ScrollingLog = ({ children, autoScroll = true, maxHeight = '100%' }) => {
  const scrollRef = useRef(null);
  const lastScrollPosition = useRef(0);
  const isUserScrolling = useRef(false);
  
  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (!scrollRef.current || !autoScroll || isUserScrolling.current) return;
    
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [children, autoScroll]);
  
  // Track user scrolling to prevent auto-scroll from interrupting
  const handleScroll = (e) => {
    const element = scrollRef.current;
    if (!element) return;
    
    // Calculate if user is scrolling up
    if (element.scrollTop < lastScrollPosition.current) {
      isUserScrolling.current = true;
    }
    
    // If user has scrolled to the bottom, resume auto-scrolling
    const isAtBottom = 
      element.scrollHeight - element.scrollTop <= element.clientHeight + 10;
    if (isAtBottom) {
      isUserScrolling.current = false;
    }
    
    lastScrollPosition.current = element.scrollTop;
  };
  
  // Add artificial log "noise" lines
  const addNoiseLines = () => {
    // Only add noise if we have actual log content
    if (!React.Children.count(children)) return null;
    
    // Generate random system noise messages
    const noiseMessages = [
      <div key="noise-1" className={styles.noiseMessage}>SYSTEM IDLE...</div>,
      <div key="noise-2" className={styles.noiseMessage}>PROCESSING API REQUEST...</div>,
      <div key="noise-3" className={styles.noiseMessage}>MONITORING NETWORK TRAFFIC...</div>,
      <div key="noise-4" className={styles.noiseMessage}>CHECKING TWITTER RATE LIMITS...</div>,
      <div key="noise-5" className={styles.noiseMessage}>ANALYZING SENTIMENT MODEL...</div>
    ];
    
    // Randomly select a few noise messages
    const selectedNoise = [];
    const messageCount = React.Children.count(children);
    
    // Add more noise for longer logs
    const noiseCount = Math.min(Math.floor(messageCount / 3), 3);
    
    for (let i = 0; i < noiseCount; i++) {
      const randomIndex = Math.floor(Math.random() * noiseMessages.length);
      selectedNoise.push(noiseMessages[randomIndex]);
    }
    
    return selectedNoise;
  };
  
  return (
    <div 
      ref={scrollRef}
      className={styles.scrollingLog}
      style={{ maxHeight }}
      onScroll={handleScroll}
    >
      {/* Main log content */}
      <div className={styles.logContent}>
        {children}
      </div>
      
      {/* Ambient noise messages */}
      <div className={styles.logNoise}>
        {addNoiseLines()}
      </div>
    </div>
  );
};

export default ScrollingLog;