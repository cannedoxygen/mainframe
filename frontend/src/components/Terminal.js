import React, { useRef, useEffect, useState } from 'react';
import styles from '../styles/Terminal.module.css';
import TypingEffect from './TypingEffect';
import GlitchEffect from './GlitchEffect';
import ScrollingLog from './ScrollingLog';
import SystemMessage from './SystemMessage';

const Terminal = ({ id, agentName, textColor, messages, booted }) => {
  const terminalRef = useRef(null);
  const [isGlitching, setIsGlitching] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  
  // Boot sequence animation
  useEffect(() => {
    if (!booted) return;
    
    const bootTimer = setTimeout(() => {
      setBootSequence(false);
    }, 3000 + Math.random() * 2000); // Randomize boot time between terminals
    
    return () => clearTimeout(bootTimer);
  }, [booted]);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (terminalRef.current && messages.length > 0) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle glitch effect
  const triggerGlitch = () => {
    if (isGlitching) return;
    
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 800);
  };

  return (
    <div 
      id={id}
      className={`${styles.terminal} ${isGlitching ? styles.glitching : ''}`}
      style={{ '--terminal-color': textColor }}
    >
      <div className={styles.terminalHeader}>
        <span className={styles.agentName}>{agentName}</span>
        <span className={styles.statusIndicator}>
          {booted && !bootSequence ? 'ONLINE' : 'BOOTING...'}
        </span>
      </div>
      
      <div className={styles.terminalScreen} ref={terminalRef}>
        <div className={styles.crtOverlay}></div>
        <div className={styles.scanlines}></div>
        
        {/* Boot sequence */}
        {(bootSequence && booted) && (
          <div className={styles.bootSequence}>
            <SystemMessage>INITIALIZING {agentName} SYSTEM...</SystemMessage>
            <SystemMessage>LOADING PERSONALITY MATRIX...</SystemMessage>
            <SystemMessage>CONNECTING TO TWITTER API...</SystemMessage>
            <SystemMessage>BOOT SEQUENCE COMPLETE</SystemMessage>
          </div>
        )}
        
        {/* Messages display */}
        {!bootSequence && (
          <div className={styles.messagesContainer}>
            <ScrollingLog>
              {messages.map((msg, index) => (
                <div key={`${id}-msg-${index}`} className={styles.messageEntry}>
                  {/* Show timestamp and message type */}
                  <div className={styles.messageHeader}>
                    <span className={styles.timestamp}>[{msg.timestamp}]</span>
                    <span className={styles.messageType}>{msg.type}</span>
                  </div>
                  
                  {/* Message content with typing effect for latest message */}
                  <div className={styles.messageContent}>
                    {index === messages.length - 1 ? (
                      <TypingEffect text={msg.content} speed={30} onComplete={() => {
                        // 5% chance to trigger a glitch after typing completes
                        if (Math.random() < 0.05) triggerGlitch();
                      }} />
                    ) : (
                      <span>{msg.content}</span>
                    )}
                  </div>
                  
                  {/* For tweet messages, show the tweet preview */}
                  {msg.type === 'TWEET' && msg.tweetContent && (
                    <div className={styles.tweetPreview}>
                      <GlitchEffect isActive={index === messages.length - 1}>
                        <span className={styles.tweetIcon}>📡</span> TWEET SENT:
                        <div className={styles.tweetContent}>"{msg.tweetContent}"</div>
                      </GlitchEffect>
                    </div>
                  )}
                </div>
              ))}
            </ScrollingLog>
            
            {/* Typing cursor */}
            <div className={styles.cursor}>█</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;