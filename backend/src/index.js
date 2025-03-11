/**
 * Main entry point for the backend service
 * Handles ELIZA agent log monitoring and WebSocket communication
 */

const config = require('config');
const path = require('path');
const { startWebSocketServer } = require('./websocket');
const { initializeFileWatcher } = require('./logWatcher/fileWatcher');
const { processLogEntry } = require('./logWatcher/logParser');
const { messageQueue } = require('./utils/messageQueue');
const { routeMessage } = require('./utils/messageRouter');
const { AGENTS } = require('./agents/agentMapping');
const { generateSystemMessages } = require('./utils/systemMessages');

// Configuration
const SERVER_PORT = config.get('server.port') || 3001;
const LOG_FILE_PATH = config.get('logWatcher.filePath') || '/var/log/eliza/output.log';
const ENABLE_FAKE_DATA = config.get('debug.generateFakeData') || false;
const SIMULATE_ELIZA = process.env.SIMULATE_ELIZA === 'true' || false;

// Initialize WebSocket server
const wss = startWebSocketServer(SERVER_PORT);
console.log(`WebSocket server started on port ${SERVER_PORT}`);

// Handle incoming messages from clients
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send initial system status on connect
  ws.send(JSON.stringify({
    type: 'system_status',
    status: {
      booted: true,
      connectionStatus: 'connected',
      activeAgents: Object.keys(AGENTS)
    }
  }));
  
  // Send initial agent information
  ws.send(JSON.stringify({
    type: 'agent_status',
    activeAgents: Object.keys(AGENTS),
    agents: AGENTS
  }));
  
  // Handle client messages
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received message from client:', data);
      
      // Handle different command types
      if (data.command === 'reset') {
        // Clear message queue and notify clients
        messageQueue.clear();
        wss.clients.forEach(client => {
          client.send(JSON.stringify({
            type: 'system_status',
            status: { reset: true }
          }));
        });
      }
    } catch (error) {
      console.error('Error processing client message:', error);
    }
  });
  
  // Handle disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Initialize log file watcher
if (!SIMULATE_ELIZA) {
  const logFilePath = path.resolve(LOG_FILE_PATH);
  initializeFileWatcher(logFilePath, (entry) => {
    // Process each new log entry
    const parsedMessage = processLogEntry(entry);
    
    if (parsedMessage) {
      // Route message to appropriate agent queue
      routeMessage(parsedMessage);
      
      // Broadcast to all clients
      wss.clients.forEach(client => {
        if (client.readyState === 1) { // WebSocket.OPEN
          client.send(JSON.stringify(parsedMessage));
        }
      });
    }
  });
  
  console.log(`Watching log file: ${logFilePath}`);
} else {
  console.log('Running in ELIZA simulation mode');
  
  // Simulate ELIZA outputs for testing/development
  const simulateELIZA = () => {
    // Generate fake messages for random agents
    const randomAgentKeys = Object.keys(AGENTS);
    const randomAgentId = randomAgentKeys[Math.floor(Math.random() * randomAgentKeys.length)];
    const randomAgent = AGENTS[randomAgentId];
    
    // Create a realistic sequence of messages
    const simulateAgentActivity = async (agentId, agentName) => {
      // First send a thinking message
      const thinkingMessage = {
        type: 'agent_message',
        agentId,
        messageType: 'THINKING',
        content: `Analyzing recent trends about ${['crypto', 'markets', 'NFTs', 'DeFi', 'Web3'][Math.floor(Math.random() * 5)]}...`
      };
      
      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify(thinkingMessage));
        }
      });
      
      // After a delay, send a processing message
      await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));
      
      const processingMessage = {
        type: 'agent_message',
        agentId,
        messageType: 'PROCESSING',
        content: `Formulating response about ${['market volatility', 'bullish patterns', 'bearish signals', 'trading strategies', 'price action'][Math.floor(Math.random() * 5)]}...`
      };
      
      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify(processingMessage));
        }
      });
      
      // Finally send a tweet
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      const tweetTemplates = [
        "Never underestimate the power of HODLing through tough times. The best investors aren't swayed by volatility. #DiamondHands",
        "Just observed a bullish divergence on the 4-hour chart. This could be the reversal we've been waiting for. NFA.",
        "Markets don't go up in a straight line. Corrections are healthy and necessary for sustainable growth. #MarketWisdom",
        "Reminder: Your strategy should never depend on a single outcome. Diversify your positions and manage risk properly.",
        "The difference between amateur and professional traders isn't their win rate—it's their risk management. #TradingTips"
      ];
      
      const tweetMessage = {
        type: 'agent_message',
        agentId,
        messageType: 'TWEET',
        content: 'Tweet prepared and ready to send:',
        metadata: {
          tweetContent: tweetTemplates[Math.floor(Math.random() * tweetTemplates.length)]
        }
      };
      
      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify(tweetMessage));
        }
      });
    };
    
    // Simulate activity for a random agent
    simulateAgentActivity(randomAgentId, randomAgent.name);
    
    // Occasionally send system messages or errors
    if (Math.random() < 0.2) {
      const systemMessages = generateSystemMessages();
      const randomMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)];
      
      wss.clients.forEach(client => {
        if (client.readyState === 1) {
          client.send(JSON.stringify({
            type: 'system_message',
            level: Math.random() < 0.7 ? 'info' : 'warning',
            content: randomMessage
          }));
        }
      });
    }
    
    // Schedule next simulation after a delay
    const nextDelay = 5000 + Math.random() * 15000; // Random delay between 5-20 seconds
    setTimeout(simulateELIZA, nextDelay);
  };
  
  // Start simulation after a short delay
  setTimeout(simulateELIZA, 3000);
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
});

module.exports = { wss };