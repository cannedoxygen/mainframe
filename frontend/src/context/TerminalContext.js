import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import useWebSocket from '../hooks/useWebSocket';

// Default agent configuration
const DEFAULT_AGENTS = [
  { id: 'agent1', name: 'T-101', color: '#00ff00' },
  { id: 'agent2', name: 'T-VIPER', color: '#00ff44' },
  { id: 'agent3', name: 'T-NGMI', color: '#00dd66' },
  { id: 'agent4', name: 'T-ALPHA', color: '#00cc88' },
  { id: 'agent5', name: 'T-TEASE', color: '#00bbaa' },
  { id: 'agent6', name: 'T-ORACLE', color: '#00aacc' },
  { id: 'agent7', name: 'T-PRIME', color: '#0099ee' },
  { id: 'agent8', name: 'T-WOKE', color: '#0088ff' }
];

// Create the context
const TerminalContext = createContext();

export const TerminalProvider = ({ children }) => {
  // Messages state organized by agent ID
  const [messages, setMessages] = useState({});
  
  // System status state
  const [systemStatus, setSystemStatus] = useState({
    booted: false,
    hasCriticalError: false,
    connectionStatus: 'disconnected', // disconnected, connecting, connected
    activeAgents: []
  });
  
  // Agent configuration
  const [agents, setAgents] = useState(DEFAULT_AGENTS);
  
  // WebSocket connection
  const { 
    lastMessage, 
    sendMessage, 
    connectionStatus 
  } = useWebSocket('ws://localhost:3001');
  
  // Update system connection status from WebSocket
  useEffect(() => {
    setSystemStatus(prev => ({
      ...prev,
      connectionStatus
    }));
  }, [connectionStatus]);
  
  // Process incoming WebSocket messages
  useEffect(() => {
    if (!lastMessage) return;
    
    try {
      const data = JSON.parse(lastMessage);
      
      // Handle different message types
      switch (data.type) {
        case 'agent_message':
          // Add new agent message
          addMessage(data.agentId, data.messageType, data.content, data.metadata);
          break;
          
        case 'system_status':
          // Update system status
          setSystemStatus(prev => ({
            ...prev,
            ...data.status
          }));
          break;
          
        case 'critical_error':
          // Handle critical system error
          setSystemStatus(prev => ({
            ...prev,
            hasCriticalError: true
          }));
          addSystemMessage('critical', data.error);
          break;
          
        case 'agent_status':
          // Track active agents
          setSystemStatus(prev => ({
            ...prev,
            activeAgents: data.activeAgents || prev.activeAgents
          }));
          break;
          
        default:
          console.log('Unknown message type:', data.type);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  }, [lastMessage]);
  
  // Add a message to a specific agent's terminal
  const addMessage = useCallback((agentId, type, content, metadata = {}) => {
    const timestamp = new Date().toLocaleTimeString();
    
    setMessages(prev => {
      // Initialize agent's message array if not exists
      const agentMessages = prev[agentId] || [];
      
      return {
        ...prev,
        [agentId]: [
          ...agentMessages,
          {
            id: `${agentId}-${Date.now()}`,
            timestamp,
            type,
            content,
            ...metadata
          }
        ]
      };
    });
  }, []);
  
  // Add a system message to all terminals
  const addSystemMessage = useCallback((level, message) => {
    agents.forEach(agent => {
      addMessage(agent.id, `SYSTEM_${level.toUpperCase()}`, message);
    });
  }, [agents, addMessage]);
  
  // Clear all messages (for system reset)
  const clearAllMessages = useCallback(() => {
    setMessages({});
  }, []);
  
  // Send command to backend
  const sendCommand = useCallback((command, data = {}) => {
    sendMessage(JSON.stringify({
      command,
      ...data
    }));
  }, [sendMessage]);
  
  // Context value
  const contextValue = {
    messages,
    systemStatus,
    agents,
    addMessage,
    addSystemMessage,
    clearAllMessages,
    sendCommand
  };
  
  return (
    <TerminalContext.Provider value={contextValue}>
      {children}
    </TerminalContext.Provider>
  );
};

// Custom hook to use the terminal context
export const useTerminalContext = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error('useTerminalContext must be used within a TerminalProvider');
  }
  return context;
};

export default TerminalContext;