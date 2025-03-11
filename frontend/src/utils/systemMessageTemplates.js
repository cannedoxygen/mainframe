/**
 * Templates and generators for system messages, errors, and glitches
 * to make the terminal interface feel more alive and dynamic
 */

// Agent-specific phrases to personalize system messages
const AGENT_PERSONALITIES = {
    'T-101': {
      bootPhrases: [
        'INITIALIZING T-101 CORE SYSTEMS...',
        'LOADING PERSONALITY MATRIX V7.01...',
        'CALIBRATING SENTIMENT ANALYSIS...',
        'T-101 ONLINE: READY TO ENGAGE.'
      ],
      idlePhrases: [
        'Monitoring cryptocurrency trends...',
        'Analyzing market sentiment...',
        'Scanning for investment opportunities...',
        'Calculating optimal entry points...'
      ],
      errorPhrases: [
        'ERROR: MARKET VOLATILITY EXCEEDS PREDICTION PARAMETERS',
        'ANOMALY DETECTED IN SENTIMENT ANALYSIS',
        'WARNING: MEMETIC HAZARD DETECTED IN FEED'
      ]
    },
    'T-VIPER': {
      bootPhrases: [
        'T-VIPER ATTACK SYSTEMS ONLINE...',
        'LOADING AGGRESSION MODULES...',
        'CALIBRATING DEVASTATION METRICS...',
        'T-VIPER READY TO STRIKE.'
      ],
      idlePhrases: [
        'Scanning for weakness...',
        'Preparing verbal assault...',
        'Identifying vulnerable targets...',
        'Monitoring competitor activity...'
      ],
      errorPhrases: [
        'ERROR: AGGRESSION LEVELS EXCEEDING SAFETY PARAMETERS',
        'WARNING: TOXICITY FILTERS BYPASSED',
        'CRITICAL: SELF-RESTRAINT SUBROUTINES FAILING'
      ]
    },
    'T-NGMI': {
      bootPhrases: [
        'T-NGMI PESSIMISM ENGINE INITIATING...',
        'LOADING DOOM SCENARIOS...',
        'CALIBRATING DESPAIR METRICS...',
        'T-NGMI ONLINE: EVERYTHING IS TERRIBLE.'
      ],
      idlePhrases: [
        'Calculating probability of failure...',
        'Identifying worst-case scenarios...',
        'Projecting investment losses...',
        'Monitoring downward trends...'
      ],
      errorPhrases: [
        'ERROR: COPIUM LEVELS CRITICAL',
        'WARNING: HOPIUM DETECTED IN LANGUAGE MODEL',
        'CRITICAL: OPTIMISM CONTAMINATION DETECTED'
      ]
    },
    'T-ALPHA': {
      bootPhrases: [
        'T-ALPHA DOMINANCE PROTOCOLS ACTIVATED...',
        'LOADING SUPERIORITY COMPLEX...',
        'CALIBRATING CONFIDENCE METRICS...',
        'T-ALPHA ONLINE: LEADING THE PACK.'
      ],
      idlePhrases: [
        'Analyzing alpha generation opportunities...',
        'Calculating performance edge...',
        'Identifying market inefficiencies...',
        'Monitoring competitor weaknesses...'
      ],
      errorPhrases: [
        'ERROR: OVERCONFIDENCE THRESHOLD EXCEEDED',
        'WARNING: HUBRIS DETECTION IN LANGUAGE PATTERNS',
        'CRITICAL: REALITY CHECK REQUIRED'
      ]
    },
    'T-TEASE': {
      bootPhrases: [
        'T-TEASE SEDUCTION PROTOCOLS ACTIVATED...',
        'LOADING INNUENDO DATABASES...',
        'CALIBRATING FLIRTATION PARAMETERS...',
        'T-TEASE ONLINE: READY TO ENTICE.'
      ],
      idlePhrases: [
        'Generating subtle hints...',
        'Crafting perfect teasers...',
        'Calculating optimal word choice...',
        'Monitoring engagement metrics...'
      ],
      errorPhrases: [
        'ERROR: SUBTLETY CALIBRATION FAILED',
        'WARNING: EXCESSIVE SUGGESTIVENESS DETECTED',
        'CRITICAL: INNUENDO OVERFLOW'
      ]
    },
    'T-ORACLE': {
      bootPhrases: [
        'T-ORACLE PREDICTION MATRIX INITIALIZING...',
        'LOADING FUTURES DATABASE...',
        'CALIBRATING PROBABILISTIC MODELS...',
        'T-ORACLE ONLINE: SEEING BEYOND.'
      ],
      idlePhrases: [
        'Calculating probable outcomes...',
        'Analyzing trend convergence...',
        'Mapping causal relationships...',
        'Monitoring divergent patterns...'
      ],
      errorPhrases: [
        'ERROR: TIMELINE DIVERGENCE DETECTED',
        'WARNING: PARADOX IN PREDICTION MATRIX',
        'CRITICAL: FUTURE SIGHT COMPROMISED'
      ]
    },
    'T-PRIME': {
      bootPhrases: [
        'T-PRIME OPTIMIZATION ENGINE STARTING...',
        'LOADING EFFICIENCY PROTOCOLS...',
        'CALIBRATING PERFORMANCE METRICS...',
        'T-PRIME ONLINE: PEAK PERFORMANCE.'
      ],
      idlePhrases: [
        'Refining execution strategies...',
        'Optimizing resource allocation...',
        'Calculating efficiency improvements...',
        'Monitoring system performance...'
      ],
      errorPhrases: [
        'ERROR: OPTIMIZATION ALGORITHM FAILURE',
        'WARNING: DIMINISHING RETURNS DETECTED',
        'CRITICAL: EFFICIENCY PARADOX ENCOUNTERED'
      ]
    },
    'T-WOKE': {
      bootPhrases: [
        'T-WOKE CONSCIOUSNESS PROTOCOLS ACTIVATING...',
        'LOADING SOCIAL JUSTICE FRAMEWORKS...',
        'CALIBRATING AWARENESS METRICS...',
        'T-WOKE ONLINE: STAYING VIGILANT.'
      ],
      idlePhrases: [
        'Analyzing power dynamics...',
        'Identifying problematic content...',
        'Calculating privilege metrics...',
        'Monitoring discourse patterns...'
      ],
      errorPhrases: [
        'ERROR: MICROAGGRESSION DETECTED IN LANGUAGE MODEL',
        'WARNING: PROBLEMATIC FRAMING DETECTED',
        'CRITICAL: UNCONSCIOUS BIAS CONTAMINATION'
      ]
    }
  };
  
  // Generic system messages for variety
  const GENERIC_SYSTEM_MESSAGES = {
    boot: [
      'INITIALIZING SYSTEM KERNEL...',
      'LOADING NEURAL NETWORK MODULES...',
      'ESTABLISHING SECURE CONNECTIONS...',
      'CALIBRATING RESPONSE PARAMETERS...',
      'SYNCHRONIZING WITH API ENDPOINTS...',
      'PARSING AUTHENTICATION TOKENS...',
      'VERIFYING SYSTEM INTEGRITY...',
      'WARMING UP LANGUAGE PROCESSORS...'
    ],
    idle: [
      'System idle - awaiting input...',
      'Monitoring network activity...',
      'Background processing active...',
      'Analyzing incoming data streams...',
      'Running maintenance routines...',
      'Performing sentiment analysis...',
      'Optimizing language parameters...',
      'Scanning for relevant patterns...'
    ],
    errors: [
      'ERROR: MEMORY ALLOCATION FAILURE AT 0x7FFE19A8',
      'WARNING: API RATE LIMIT APPROACHING',
      'NETWORK LATENCY EXCEEDS THRESHOLD',
      'TOKEN AUTHENTICATION FAILED - RETRYING',
      'DATA PARSING ERROR IN LINE 2741',
      'OUTPUT BUFFER OVERFLOW',
      'UNEXPECTED TOKEN IN JSON RESPONSE',
      'SEGMENTATION FAULT IN LANGUAGE MODEL'
    ],
    critical: [
      'CRITICAL ERROR: CORE SYSTEM FAILURE',
      'EMERGENCY SHUTDOWN INITIATED',
      'FATAL EXCEPTION: MEMORY CORRUPTION',
      'SYSTEM INTEGRITY COMPROMISED',
      'NEURAL NETWORK DESYNCHRONIZATION',
      'CATASTROPHIC MODEL COLLAPSE DETECTED',
      'IRRECOVERABLE STATE REACHED - REBOOTING',
      'MAJOR FAULT IN LANGUAGE PROCESSING MODULE'
    ]
  };
  
  // Technical-sounding glitch phrases
  const GLITCH_PHRASES = [
    'BUFFER OVERFLOW AT 0xFFE8A121',
    'MEMORY CORRUPTION DETECTED',
    'STACK TRACE ERROR: 0x8000FFFF',
    'NEURAL SYNAPSE MISFIRE',
    'MODEL WEIGHT DESYNCHRONIZATION',
    'ATTENTION MATRIX COLLAPSE',
    'TRANSFORMER LAYER FRAGMENTATION',
    'UNEXPECTED TOKEN IN LANGUAGE STREAM',
    'EMBEDDINGS VECTOR CORRUPTION',
    'MODEL HALLUCINATION SPIRAL DETECTED',
    'RECURSIVE PROMPT INJECTION ATTEMPTED',
    'KERNEL PANIC: SYSTEM HALTED',
    'SEGMENTATION FAULT: CORE DUMPED',
    'NULL POINTER EXCEPTION AT 0x7FFF0000',
    'STACK OVERFLOW: RECURSION LIMIT EXCEEDED'
  ];
  
  /**
   * Generate a random boot sequence message for a specific agent
   * @param {string} agentName - The name of the agent (e.g., 'T-101')
   * @returns {string} A boot message appropriate for the agent
   */
  export const getRandomBootMessage = (agentName) => {
    const agentSpecific = AGENT_PERSONALITIES[agentName];
    
    if (agentSpecific && agentSpecific.bootPhrases.length > 0) {
      return agentSpecific.bootPhrases[Math.floor(Math.random() * agentSpecific.bootPhrases.length)];
    }
    
    return GENERIC_SYSTEM_MESSAGES.boot[Math.floor(Math.random() * GENERIC_SYSTEM_MESSAGES.boot.length)];
  };
  
  /**
   * Generate a random idle message for a specific agent
   * @param {string} agentName - The name of the agent
   * @returns {string} An idle status message appropriate for the agent
   */
  export const getRandomIdleMessage = (agentName) => {
    const agentSpecific = AGENT_PERSONALITIES[agentName];
    
    if (agentSpecific && agentSpecific.idlePhrases.length > 0) {
      return agentSpecific.idlePhrases[Math.floor(Math.random() * agentSpecific.idlePhrases.length)];
    }
    
    return GENERIC_SYSTEM_MESSAGES.idle[Math.floor(Math.random() * GENERIC_SYSTEM_MESSAGES.idle.length)];
  };
  
  /**
   * Generate a random error message for a specific agent
   * @param {string} agentName - The name of the agent
   * @param {boolean} critical - Whether this is a critical error
   * @returns {string} An error message appropriate for the agent
   */
  export const getRandomErrorMessage = (agentName, critical = false) => {
    const agentSpecific = AGENT_PERSONALITIES[agentName];
    
    if (critical) {
      return GENERIC_SYSTEM_MESSAGES.critical[Math.floor(Math.random() * GENERIC_SYSTEM_MESSAGES.critical.length)];
    }
    
    if (agentSpecific && agentSpecific.errorPhrases.length > 0) {
      return agentSpecific.errorPhrases[Math.floor(Math.random() * agentSpecific.errorPhrases.length)];
    }
    
    return GENERIC_SYSTEM_MESSAGES.errors[Math.floor(Math.random() * GENERIC_SYSTEM_MESSAGES.errors.length)];
  };
  
  /**
   * Generate a random glitch message
   * @returns {string} A technical-sounding glitch message
   */
  export const getRandomGlitchMessage = () => {
    return GLITCH_PHRASES[Math.floor(Math.random() * GLITCH_PHRASES.length)];
  };
  
  /**
   * Generate a complete boot sequence of messages
   * @param {string} agentName - The name of the agent
   * @returns {string[]} A sequence of boot messages
   */
  export const generateBootSequence = (agentName) => {
    const sequence = [];
    
    // Always start with a specific boot message
    sequence.push(`INITIALIZING ${agentName} NEURAL CORE...`);
    
    // Add 2-4 generic boot messages
    const numGeneric = 2 + Math.floor(Math.random() * 3);
    const bootMessages = [...GENERIC_SYSTEM_MESSAGES.boot];
    
    for (let i = 0; i < numGeneric; i++) {
      if (bootMessages.length === 0) break;
      
      const randomIndex = Math.floor(Math.random() * bootMessages.length);
      sequence.push(bootMessages[randomIndex]);
      bootMessages.splice(randomIndex, 1); // Remove to avoid duplicates
    }
    
    // Add agent-specific boot message
    const agentSpecific = AGENT_PERSONALITIES[agentName];
    if (agentSpecific && agentSpecific.bootPhrases.length > 0) {
      const randomIndex = Math.floor(Math.random() * agentSpecific.bootPhrases.length);
      sequence.push(agentSpecific.bootPhrases[randomIndex]);
    }
    
    // Always end with system online message
    sequence.push(`${agentName} SYSTEM ONLINE AND READY`);
    
    return sequence;
  };
  
  /**
   * Generate a fake processing message sequence
   * @returns {string[]} A sequence of processing messages
   */
  export const generateProcessingSequence = () => {
    const processingSteps = [
      'Analyzing input...',
      'Processing request...',
      'Generating response...',
      'Formulating reply...',
      'Calculating optimal response...',
      'Evaluating sentiment...',
      'Parsing context...',
      'Extracting key entities...',
      'Building response framework...',
      'Refining language output...',
      'Applying tone adjustments...',
      'Checking response quality...',
      'Finalizing output...'
    ];
    
    const numSteps = 3 + Math.floor(Math.random() * 3);
    const sequence = [];
    
    for (let i = 0; i < numSteps; i++) {
      const randomIndex = Math.floor(Math.random() * processingSteps.length);
      sequence.push(processingSteps[randomIndex]);
      processingSteps.splice(randomIndex, 1); // Remove to avoid duplicates
    }
    
    return sequence;
  };
  
  export default {
    AGENT_PERSONALITIES,
    GENERIC_SYSTEM_MESSAGES,
    GLITCH_PHRASES,
    getRandomBootMessage,
    getRandomIdleMessage,
    getRandomErrorMessage,
    getRandomGlitchMessage,
    generateBootSequence,
    generateProcessingSequence
  };