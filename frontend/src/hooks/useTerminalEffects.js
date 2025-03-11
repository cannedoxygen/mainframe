import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for terminal sound effects and animations
 */
const useTerminalEffects = (options = {}) => {
  const {
    enableSounds = true,
    volume = 0.5,
    keyClickVolume = 0.15,
  } = options;

  // Sound effect references
  const bootSound = useRef(null);
  const keypressSound = useRef(null);
  const errorSound = useRef(null);
  const glitchSound = useRef(null);
  
  // Initialize sound effects on mount
  useEffect(() => {
    if (!enableSounds) return;
    
    // Create audio elements
    bootSound.current = new Audio('/sounds/boot.mp3');
    keypressSound.current = new Audio('/sounds/keypress.mp3');
    errorSound.current = new Audio('/sounds/error.mp3');
    glitchSound.current = new Audio('/sounds/glitch.mp3');
    
    // Set volume levels
    bootSound.current.volume = volume;
    keypressSound.current.volume = keyClickVolume; // Lower volume for keypress
    errorSound.current.volume = volume;
    glitchSound.current.volume = volume;
    
    // Cleanup on unmount
    return () => {
      // Stop any playing sounds
      [bootSound, keypressSound, errorSound, glitchSound].forEach(sound => {
        if (sound.current) {
          sound.current.pause();
          sound.current.currentTime = 0;
        }
      });
    };
  }, [enableSounds, volume, keyClickVolume]);
  
  // Play boot sound
  const playBootSound = useCallback(() => {
    if (!enableSounds || !bootSound.current) return;
    
    bootSound.current.currentTime = 0;
    bootSound.current.play().catch(err => console.error('Error playing boot sound:', err));
  }, [enableSounds]);
  
  // Play keypress sound with rate variation for realistic typing
  const playKeypressSound = useCallback(() => {
    if (!enableSounds || !keypressSound.current) return;
    
    // Clone the audio to allow overlapping sounds
    const keypressSoundClone = keypressSound.current.cloneNode();
    
    // Randomize playback rate for variety
    keypressSoundClone.playbackRate = 0.8 + Math.random() * 0.4;
    keypressSoundClone.volume = keyClickVolume * (0.8 + Math.random() * 0.4);
    
    keypressSoundClone.play().catch(err => console.error('Error playing keypress sound:', err));
    
    // Clean up cloned audio after playing
    keypressSoundClone.onended = () => {
      keypressSoundClone.remove();
    };
  }, [enableSounds, keyClickVolume]);
  
  // Play error sound
  const playErrorSound = useCallback(() => {
    if (!enableSounds || !errorSound.current) return;
    
    errorSound.current.currentTime = 0;
    errorSound.current.play().catch(err => console.error('Error playing error sound:', err));
  }, [enableSounds]);
  
  // Play glitch sound
  const playGlitchSound = useCallback(() => {
    if (!enableSounds || !glitchSound.current) return;
    
    glitchSound.current.currentTime = 0;
    glitchSound.current.play().catch(err => console.error('Error playing glitch sound:', err));
  }, [enableSounds]);
  
  // Simulate keyboard typing sound effect
  const simulateTyping = useCallback((text, callback) => {
    if (!enableSounds) {
      if (callback) callback();
      return;
    }
    
    let index = 0;
    const textLength = text.length;
    
    const typeNextCharacter = () => {
      if (index < textLength) {
        // Don't play sound for spaces and some punctuation
        if (text[index] !== ' ' && text[index] !== '.' && text[index] !== ',') {
          playKeypressSound();
        }
        
        index++;
        
        // Random typing speed
        const nextDelay = 30 + Math.random() * 100;
        setTimeout(typeNextCharacter, nextDelay);
      } else if (callback) {
        callback();
      }
    };
    
    typeNextCharacter();
  }, [enableSounds, playKeypressSound]);
  
  return {
    playBootSound,
    playKeypressSound,
    playErrorSound,
    playGlitchSound,
    simulateTyping
  };
};

export default useTerminalEffects;