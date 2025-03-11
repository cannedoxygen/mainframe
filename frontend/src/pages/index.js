import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import TerminalGrid from '../components/TerminalGrid';
import { TerminalProvider } from '../context/TerminalContext';
import styles from '../styles/Terminal.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Simulate initial loading/boot sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Handle key commands
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle sound with 'S' key
      if (e.key.toLowerCase() === 's') {
        setSoundEnabled(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>AI MAINFRAME | 8 ELIZA Agents</title>
        <meta name="description" content="8 ELIZA-based AI agents interacting with Twitter in real-time" />
        <link rel="icon" href="/images/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&family=VT323&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        {isLoading ? (
          <div className={styles.bootScreen}>
            <div className={styles.bootContent}>
              <h1 className={styles.bootTitle}>AI MAINFRAME</h1>
              <div className={styles.bootProgress}>
                <div className={styles.bootProgressInner}></div>
              </div>
              <div className={styles.bootStatus}>
                <p>INITIALIZING SYSTEM KERNEL...</p>
                <p>LOADING NEURAL NETWORK MODULES...</p>
                <p>ESTABLISHING SECURE CONNECTIONS...</p>
              </div>
            </div>
          </div>
        ) : (
          <TerminalProvider>
            <div className={styles.gridContainer}>
              <div className={styles.header}>
                <h1 className={styles.title}>AI MAINFRAME</h1>
                <div className={styles.controls}>
                  <button 
                    className={`${styles.controlButton} ${soundEnabled ? styles.active : ''}`}
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    title="Toggle Sound Effects"
                  >
                    {soundEnabled ? 'SOUND: ON' : 'SOUND: OFF'}
                  </button>
                </div>
              </div>
              <TerminalGrid soundEnabled={soundEnabled} />
              <div className={styles.footer}>
                <p className={styles.statusText}>
                  8 ELIZA AGENTS | REAL-TIME TWITTER INTERACTION | {new Date().toISOString().split('T')[0]}
                </p>
              </div>
            </div>
          </TerminalProvider>
        )}
      </main>
    </div>
  );
}