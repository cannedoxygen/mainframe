import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for WebSocket communication with the backend
 * @param {string} url - WebSocket server URL
 * @param {object} options - Configuration options
 * @returns {object} WebSocket state and methods
 */
const useWebSocket = (url, options = {}) => {
  const {
    reconnectInterval = 2000,
    reconnectAttempts = 10,
    autoConnect = true,
    onMessage = null,
  } = options;

  // WebSocket connection states
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [lastMessage, setLastMessage] = useState(null);
  
  // Refs to maintain values across renders
  const websocket = useRef(null);
  const reconnectCount = useRef(0);
  const intentionalClose = useRef(false);
  
  // Connect to WebSocket server
  const connect = useCallback(() => {
    if (websocket.current?.readyState === WebSocket.OPEN) return;
    
    intentionalClose.current = false;
    setConnectionStatus('connecting');
    
    try {
      const ws = new WebSocket(url);
      
      ws.onopen = () => {
        console.log('WebSocket connected');
        setConnectionStatus('connected');
        reconnectCount.current = 0;
        websocket.current = ws;
      };
      
      ws.onmessage = (event) => {
        const message = event.data;
        setLastMessage(message);
        
        // Call optional onMessage callback if provided
        if (onMessage && typeof onMessage === 'function') {
          onMessage(message);
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      
      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setConnectionStatus('disconnected');
        websocket.current = null;
        
        // Attempt to reconnect if not intentionally closed
        if (!intentionalClose.current) {
          attemptReconnect();
        }
      };
      
      websocket.current = ws;
    } catch (error) {
      console.error('Failed to connect WebSocket:', error);
      setConnectionStatus('disconnected');
      attemptReconnect();
    }
  }, [url, onMessage]);
  
  // Attempt to reconnect with exponential backoff
  const attemptReconnect = useCallback(() => {
    if (reconnectCount.current >= reconnectAttempts) {
      console.log('Max reconnection attempts reached');
      return;
    }
    
    const delay = reconnectInterval * Math.pow(1.5, reconnectCount.current);
    console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectCount.current + 1}/${reconnectAttempts})`);
    
    setTimeout(() => {
      reconnectCount.current += 1;
      connect();
    }, delay);
  }, [connect, reconnectAttempts, reconnectInterval]);
  
  // Disconnect WebSocket
  const disconnect = useCallback(() => {
    if (!websocket.current) return;
    
    intentionalClose.current = true;
    websocket.current.close();
    websocket.current = null;
    setConnectionStatus('disconnected');
  }, []);
  
  // Send message through WebSocket
  const sendMessage = useCallback((message) => {
    if (!websocket.current || websocket.current.readyState !== WebSocket.OPEN) {
      console.error('Cannot send message, WebSocket is not connected');
      return false;
    }
    
    try {
      websocket.current.send(message);
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    }
  }, []);
  
  // Connect on mount if autoConnect is true
  useEffect(() => {
    if (autoConnect) {
      connect();
    }
    
    // Clean up on unmount
    return () => {
      disconnect();
    };
  }, [connect, disconnect, autoConnect]);
  
  return {
    connectionStatus,
    lastMessage,
    sendMessage,
    connect,
    disconnect
  };
};

export default useWebSocket;