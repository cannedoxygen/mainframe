import React, { useState, useEffect } from 'react';
import styles from '../styles/Terminal.module.css';
import { generateRandomGlitch } from '../utils/glitchGenerator';

const GlitchEffect = ({ children, isActive = false, intensity = 'medium', duration = 800 }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  const [glitchClass, setGlitchClass] = useState('');
  
  // Different glitch classes for variety
  const glitchClasses = {
    mild: styles.glitchMild,
    medium: styles.glitchMedium,
    severe: styles.glitchSevere,
    scramble: styles.glitchScramble,
    flicker: styles.glitchFlicker,
    offset: styles.glitchOffset
  };
  
  // Trigger glitch effect
  useEffect(() => {
    if (!isActive) return;
    
    // Random chance to glitch when active
    const glitchChance = Math.random();
    if (glitchChance > 0.6) {
      triggerGlitch();
    }
  }, [isActive]);
  
  const triggerGlitch = () => {
    // Already glitching
    if (isGlitching) return;
    
    // Start glitch effect
    setIsGlitching(true);
    
    // Choose random glitch type
    const glitchTypes = Object.keys(glitchClasses);
    const randomType = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
    setGlitchClass(glitchClasses[randomType]);
    
    // Generate scrambled text if using scramble effect
    if (randomType === 'scramble') {
      // Get text content from children
      const textContent = typeof children === 'string' 
        ? children 
        : React.Children.toArray(children)
            .map(child => typeof child === 'string' ? child : '')
            .join('');
      
      setGlitchText(generateRandomGlitch(textContent));
    }
    
    // End glitch effect after duration
    const glitchTimer = setTimeout(() => {
      setIsGlitching(false);
      setGlitchText('');
      setGlitchClass('');
    }, duration);
    
    return () => clearTimeout(glitchTimer);
  };
  
  // If glitching with scramble effect, show glitched text
  if (isGlitching && glitchClass === styles.glitchScramble) {
    return <span className={glitchClass}>{glitchText}</span>;
  }
  
  // Otherwise apply the glitch class to the children
  return (
    <span className={isGlitching ? glitchClass : ''}>
      {children}
    </span>
  );
};

export default GlitchEffect;