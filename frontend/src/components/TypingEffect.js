import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/Terminal.module.css';

const TypingEffect = ({ text, speed = 30, onComplete = () => {}, errorRate = 0.005 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [errorMode, setErrorMode] = useState(false);
  
  // Function to simulate typing errors and corrections
  const simulateTypingWithErrors = useCallback(() => {
    if (currentIndex >= text.length) {
      onComplete();
      return;
    }
    
    if (isPaused) {
      // Randomly unpause (simulates "thinking")
      setIsPaused(Math.random() > 0.4);
      return;
    }
    
    // Check if we should introduce an error
    if (!errorMode && Math.random() < errorRate) {
      // Enter error mode
      setErrorMode(true);
      
      // Generate a random incorrect character
      const randomChar = String.fromCharCode(
        Math.floor(Math.random() * 26) + 97
      );
      
      setDisplayedText(prevText => prevText + randomChar);
      return;
    }
    
    if (errorMode) {
      // In error mode - delete the incorrect character
      setDisplayedText(prevText => prevText.slice(0, -1));
      setErrorMode(false);
      return;
    }
    
    // Normal typing mode
    const nextChar = text[currentIndex];
    setDisplayedText(prevText => prevText + nextChar);
    setCurrentIndex(prevIndex => prevIndex + 1);
    
    // Random pauses for more realistic typing
    if (nextChar === ' ' || nextChar === '.' || nextChar === ',' || nextChar === '!') {
      // Higher chance to pause after punctuation
      if (Math.random() < 0.15) {
        setIsPaused(true);
      }
    }
  }, [currentIndex, text, isPaused, errorMode, errorRate, onComplete]);
  
  useEffect(() => {
    // Reset on text change
    setDisplayedText('');
    setCurrentIndex(0);
    setIsPaused(false);
    setErrorMode(false);
  }, [text]);
  
  useEffect(() => {
    const typingInterval = setInterval(() => {
      simulateTypingWithErrors();
    }, isPaused ? 300 + Math.random() * 700 : speed + Math.random() * 20);
    
    // Clear interval when typing is complete
    if (currentIndex >= text.length && !errorMode) {
      clearInterval(typingInterval);
    }
    
    return () => clearInterval(typingInterval);
  }, [text, currentIndex, simulateTypingWithErrors, isPaused, speed, errorMode]);
  
  return (
    <span className={styles.typedText}>
      {displayedText}
      {currentIndex < text.length && (
        <span className={styles.typingCursor}>▌</span>
      )}
    </span>
  );
};

export default TypingEffect;