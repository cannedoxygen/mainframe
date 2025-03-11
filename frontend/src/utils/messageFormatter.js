/**
 * Utility functions for formatting and processing messages for terminal display
 */

// Message type constants
export const MESSAGE_TYPES = {
    THINKING: 'THINKING',
    PROCESSING: 'PROCESSING',
    TWEET: 'TWEET',
    SYSTEM: 'SYSTEM',
    ERROR: 'ERROR',
    BOOT: 'BOOT',
    STATUS: 'STATUS',
    INCOMING: 'INCOMING',
    LOG: 'LOG'
  };
  
  /**
   * Format raw message data for terminal display
   * @param {object} rawMessage - The raw message data from backend
   * @param {string} agentId - The ID of the agent this message belongs to
   * @returns {object} Formatted message object
   */
  export const formatMessage = (rawMessage, agentId) => {
    // If already formatted, return as is
    if (rawMessage.timestamp && rawMessage.type) {
      return rawMessage;
    }
    
    const timestamp = new Date().toLocaleTimeString();
    let messageType = MESSAGE_TYPES.PROCESSING;
    let content = '';
    let metadata = {};
    
    // Determine message type and format content based on the raw message structure
    if (typeof rawMessage === 'string') {
      try {
        // Attempt to parse JSON string
        const parsedMessage = JSON.parse(rawMessage);
        return formatMessage(parsedMessage, agentId);
      } catch (e) {
        // Plain text message
        content = rawMessage;
      }
    } else if (typeof rawMessage === 'object') {
      // Handle different message object formats
      
      if (rawMessage.type) {
        messageType = rawMessage.type;
      } else if (rawMessage.tweet) {
        messageType = MESSAGE_TYPES.TWEET;
        content = 'Tweet ready to send:';
        metadata.tweetContent = rawMessage.tweet;
      } else if (rawMessage.thinking) {
        messageType = MESSAGE_TYPES.THINKING;
        content = rawMessage.thinking;
      } else if (rawMessage.error) {
        messageType = MESSAGE_TYPES.ERROR;
        content = rawMessage.error;
      } else if (rawMessage.status) {
        messageType = MESSAGE_TYPES.STATUS;
        content = rawMessage.status;
      } else if (rawMessage.log) {
        messageType = MESSAGE_TYPES.LOG;
        content = rawMessage.log;
      } else if (rawMessage.content) {
        content = rawMessage.content;
        
        if (rawMessage.metadata) {
          metadata = { ...rawMessage.metadata };
        }
      } else {
        // Use stringified object as content if no specific format detected
        content = JSON.stringify(rawMessage);
      }
    } else {
      // Fallback for unexpected message types
      content = String(rawMessage);
    }
    
    return {
      id: `${agentId}-${Date.now()}`,
      timestamp,
      type: messageType,
      content,
      ...metadata
    };
  };
  
  /**
   * Extract tweet content from a message for display
   * @param {object} message - The formatted message
   * @returns {string|null} Tweet content or null if not a tweet
   */
  export const extractTweetContent = (message) => {
    if (message.type !== MESSAGE_TYPES.TWEET) {
      return null;
    }
    
    // Extract from tweetContent if available
    if (message.tweetContent) {
      return message.tweetContent;
    }
    
    // Try to extract from content if in standard format
    const tweetMatch = message.content.match(/["'](.+?)["']/);
    if (tweetMatch && tweetMatch[1]) {
      return tweetMatch[1];
    }
    
    // Return the whole content as fallback
    return message.content;
  };
  
  /**
   * Format system messages for consistent display
   * @param {string} level - Message level (info, warning, error, critical)
   * @param {string} content - Message content
   * @returns {object} Formatted system message
   */
  export const formatSystemMessage = (level, content) => {
    return {
      id: `system-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      type: `SYSTEM_${level.toUpperCase()}`,
      content: content,
      systemLevel: level
    };
  };
  
  /**
   * Add ELIZA-style prefixed thinking indicators to messages
   * @param {string} message - Original thinking message
   * @returns {string} Message with thinking indicators
   */
  export const addThinkingIndicators = (message) => {
    const thinkingPrefixes = [
      'Processing...',
      'Analyzing sentiment...',
      'Considering response...',
      'Evaluating context...',
      'Formulating reply...'
    ];
    
    const randomPrefix = thinkingPrefixes[Math.floor(Math.random() * thinkingPrefixes.length)];
    return `${randomPrefix} ${message}`;
  };
  
  /**
   * Format log entries for terminal display
   * @param {string} logEntry - Raw log entry
   * @returns {object} Formatted log message
   */
  export const formatLogEntry = (logEntry) => {
    return {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      type: MESSAGE_TYPES.LOG,
      content: logEntry
    };
  };
  
  export default {
    formatMessage,
    extractTweetContent,
    formatSystemMessage,
    addThinkingIndicators,
    formatLogEntry,
    MESSAGE_TYPES
  };