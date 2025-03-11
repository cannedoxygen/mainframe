/**
 * Utility functions for generating text-based glitch effects
 */

// Characters used for scrambled text effects
const GLITCH_CHARS = {
    SYMBOLS: '!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`',
    BINARY: '01',
    HEX: '0123456789ABCDEF',
    BRACKETS: '[]{}()<>',
    ASCII: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    WIDE: 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９',
    BLOCK: '█▓▒░▄▀▐▌'
  };
  
  /**
   * Generate a randomized glitch version of the input text
   * @param {string} text - The original text to glitch
   * @param {object} options - Glitch options
   * @param {number} options.intensity - Glitch intensity (0-1)
   * @param {string} options.mode - Glitch mode: 'random', 'binary', 'symbols', etc.
   * @returns {string} The glitched text
   */
  export const generateRandomGlitch = (text, options = {}) => {
    const {
      intensity = 0.5,
      mode = 'random'
    } = options;
    
    // Don't glitch empty text
    if (!text || text.length === 0) return text;
    
    let glitchSet;
    
    // Select character set based on mode
    switch (mode) {
      case 'binary':
        glitchSet = GLITCH_CHARS.BINARY;
        break;
      case 'hex':
        glitchSet = GLITCH_CHARS.HEX;
        break;
      case 'symbols':
        glitchSet = GLITCH_CHARS.SYMBOLS;
        break;
      case 'brackets':
        glitchSet = GLITCH_CHARS.BRACKETS;
        break;
      case 'blocks':
        glitchSet = GLITCH_CHARS.BLOCK;
        break;
      case 'wide':
        glitchSet = GLITCH_CHARS.WIDE;
        break;
      default:
        // Random uses all character sets
        glitchSet = Object.values(GLITCH_CHARS).join('');
    }
    
    // Generate glitched version
    return text.split('').map(char => {
      // Only glitch some characters based on intensity
      if (Math.random() > intensity) {
        return char;
      }
      
      // Replace with random glitch character
      const randomIndex = Math.floor(Math.random() * glitchSet.length);
      return glitchSet[randomIndex];
    }).join('');
  };
  
  /**
   * Generate a full screen terminal glitch effect
   * @param {number} width - Terminal width in characters
   * @param {number} height - Terminal height in lines
   * @param {object} options - Glitch options
   * @returns {string} Multi-line glitch text
   */
  export const generateFullScreenGlitch = (width = 80, height = 24, options = {}) => {
    const {
      density = 0.7,
      useBlocks = true,
      useSymbols = true
    } = options;
    
    let glitchChars = '';
    if (useBlocks) glitchChars += GLITCH_CHARS.BLOCK;
    if (useSymbols) glitchChars += GLITCH_CHARS.SYMBOLS;
    if (glitchChars === '') glitchChars = GLITCH_CHARS.ASCII;
    
    let result = '';
    
    for (let y = 0; y < height; y++) {
      let line = '';
      for (let x = 0; x < width; x++) {
        // Add random character based on density
        if (Math.random() < density) {
          const randIndex = Math.floor(Math.random() * glitchChars.length);
          line += glitchChars[randIndex];
        } else {
          line += ' ';
        }
      }
      result += line + '\n';
    }
    
    return result;
  };
  
  /**
   * Generate glitch lines to insert into normal text
   * @param {number} numLines - Number of glitch lines to generate
   * @param {number} width - Line width
   * @returns {string[]} Array of glitch lines
   */
  export const generateGlitchLines = (numLines = 3, width = 80) => {
    const lines = [];
    
    for (let i = 0; i < numLines; i++) {
      const glitchTypes = [
        // Binary line
        () => '0'.repeat(Math.floor(Math.random() * width * 0.8)) + '1'.repeat(Math.floor(Math.random() * width * 0.2)),
        
        // Block characters
        () => {
          const blocks = GLITCH_CHARS.BLOCK.split('');
          return Array.from({ length: width }, () => {
            const randIndex = Math.floor(Math.random() * blocks.length);
            return blocks[randIndex];
          }).join('');
        },
        
        // Memory address
        () => {
          const hex = '0x' + Math.floor(Math.random() * 0xFFFFFFFF).toString(16).toUpperCase().padStart(8, '0');
          return `MEMORY ERROR AT ${hex}: SEGMENTATION FAULT`;
        },
        
        // Corrupted data
        () => {
          const dataStrings = [
            'CORRUPTED DATA SEQUENCE',
            'BUFFER OVERFLOW DETECTED',
            'STACK TRACE ERROR',
            'INVALID MEMORY REFERENCE',
            'UNEXPECTED TOKEN IN JSON'
          ];
          const randString = dataStrings[Math.floor(Math.random() * dataStrings.length)];
          return randString + ' ' + '@'.repeat(Math.floor(Math.random() * (width - randString.length)));
        }
      ];
      
      const glitchGenerator = glitchTypes[Math.floor(Math.random() * glitchTypes.length)];
      lines.push(glitchGenerator());
    }
    
    return lines;
  };
  
  export default {
    generateRandomGlitch,
    generateFullScreenGlitch,
    generateGlitchLines,
    GLITCH_CHARS
  };