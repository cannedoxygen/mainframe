import React, { useEffect, useState } from 'react';
import Terminal from './Terminal';
import styles from '../styles/Terminal.module.css';
import { useTerminalContext } from '../context/TerminalContext';
import useTerminalEffects from '../hooks/useTerminalEffects';

const AGENT_CONFIG = [
  { id: 'agent1', name: 'T-101', color: '#00ff00' },
  { id: 'agent2', name: 'T-VIPER', color: '#00ff44' },
  { id: 'agent3', name: 'T-NGMI', color: '#00dd66' },
  { id: 'agent4', name: 'T-ALPHA', color: '#00cc88' },
  { id: 'agent5', name: 'T-TEASE', color: '#00bbaa' },
  { id: 'agent6', name: 'T-ORACLE', color: '#00aacc' },
  { id: 'agent7', name: 'T-PRIME', color: '#0099ee' },
  { id: 'agent8', name: 'T-WOKE', color: '#0088ff' }
];

const TerminalGrid = () => {
  const { messages, systemStatus } = useTerminalContext();
  const { playBootSound, playGlitchSound, playErrorSound } = useTerminalEffects();
  const [booted, setBooted] = useState(false);

  // Simulate boot sequence on initial load
  useEffect(() => {
    const bootSystem = async () => {
      playBootSound();
      // Simulate staggered boot of terminals
      await new Promise(resolve => setTimeout(resolve, 2000));
      setBooted(true);
    };
    
    bootSystem();
  }, [playBootSound]);

  // Random glitch effect on terminals occasionally
  useEffect(() => {
    if (!booted) return;
    
    const glitchInterval = setInterval(() => {
      const shouldGlitch = Math.random() < 0.1; // 10% chance every interval
      if (shouldGlitch) {
        const randomAgentIndex = Math.floor(Math.random() * AGENT_CONFIG.length);
        const randomAgent = AGENT_CONFIG[randomAgentIndex].id;
        // Trigger glitch effect on a random terminal
        document.getElementById(randomAgent)?.classList.add(styles.glitch);
        playGlitchSound();
        
        // Remove glitch effect after animation completes
        setTimeout(() => {
          document.getElementById(randomAgent)?.classList.remove(styles.glitch);
        }, 500);
      }
    }, 15000);
    
    return () => clearInterval(glitchInterval);
  }, [booted, playGlitchSound, styles.glitch]);

  // Play error sound when critical errors occur
  useEffect(() => {
    if (systemStatus.hasCriticalError) {
      playErrorSound();
    }
  }, [systemStatus.hasCriticalError, playErrorSound]);

  return (
    <div className={styles.terminalGrid}>
      {AGENT_CONFIG.map((agent) => (
        <Terminal
          key={agent.id}
          id={agent.id}
          agentName={agent.name}
          textColor={agent.color}
          messages={messages[agent.id] || []}
          booted={booted}
        />
      ))}
    </div>
  );
};

export default TerminalGrid;