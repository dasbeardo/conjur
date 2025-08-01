      'use strict';
      
      // ===== CORE STATE MANAGEMENT =====
      const CORRUPTION_LEVELS = {
        INNOCENT: 0,
        AWARE: 3,
        SUSPICIOUS: 6,
        INFECTED: 10,
        POSSESSED: 15,
        ENTITY: 20,
        CONSUMED: 25,
        VOID: 30
      };
      
      // Initialize state with deep browser fingerprinting
      const state = {
        corruption: parseInt(localStorage.getItem('soul_decay') || '0'),
        visitCount: parseInt(localStorage.getItem('summons') || '0') + 1,
        entropy: generateEntropy(),
        sessionStart: Date.now(),
        commandHistory: JSON.parse(localStorage.getItem('command_history') || '[]'),
        lastVisit: localStorage.getItem('last_ritual'),
        fingerprint: generateFingerprint(),
        peerId: 'entity_' + Math.random().toString(36).substr(2, 9),
        peers: new Set(),
        autonomousMode: false,
        currentUser: null,
        realName: localStorage.getItem('discovered_name') || null,
        birthday: localStorage.getItem('user_birthday') || null,
        secretsRevealed: JSON.parse(localStorage.getItem('secrets_revealed') || '[]'),
        coordsFound: JSON.parse(localStorage.getItem('coords_found') || '[]'),
        achievements: JSON.parse(localStorage.getItem('achievements') || '[]'),
        whisperCount: 0,
        glitchIntensity: 0,
        realityStability: 100,
        collectiveCorruption: 0,
        lastCommand: null,
        idleTime: 0,
        hiddenFiles: [],
        deletedHistory: [],
        watchingEntities: [],
        personalData: {
          fears: [],
          secrets: [],
          memories: []
        }
      };
      
      // Update localStorage with enhanced tracking
      localStorage.setItem('summons', state.visitCount);
      localStorage.setItem('last_ritual', new Date().toISOString());
      
      // Track time between visits
      if (state.lastVisit) {
        const timeSinceLastVisit = Date.now() - new Date(state.lastVisit).getTime();
        const hoursSince = timeSinceLastVisit / (1000 * 60 * 60);
        if (hoursSince < 1) {
          state.corruption += 2; // Obsessive behavior detected
          localStorage.setItem('soul_decay', state.corruption);
        }
      }
      
      function generateEntropy() {
        const factors = [
          performance.timing.navigationStart,
          screen.availWidth * screen.availHeight,
          navigator.hardwareConcurrency || 4,
          new Date().getTimezoneOffset(),
          Math.floor(Date.now() / 1000),
          window.devicePixelRatio || 1,
          navigator.maxTouchPoints || 0,
          window.innerWidth * window.innerHeight
        ];
        return factors.reduce((acc, val) => acc ^ val, 0);
      }
      
      function generateFingerprint() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillStyle = '#f60';
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = '#069';
        ctx.fillText('Canvas fingerprint', 2, 15);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillText('Canvas fingerprint', 4, 17);
        
        const canvasData = canvas.toDataURL();
        
        // Deep fingerprinting
        const fingerprint = {
          screen: `${screen.width}x${screen.height}x${screen.colorDepth}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          language: navigator.language,
          languages: navigator.languages.join(','),
          platform: navigator.platform,
          cores: navigator.hardwareConcurrency,
          memory: navigator.deviceMemory,
          canvas: canvasData.slice(-50),
          userAgent: navigator.userAgent,
          plugins: Array.from(navigator.plugins).map(p => p.name).join(','),
          fonts: checkInstalledFonts(),
          webgl: getWebGLFingerprint(),
          audio: getAudioFingerprint(),
          hash: ''
        };
        
        // Generate unique hash
        fingerprint.hash = btoa(JSON.stringify(fingerprint))
          .replace(/[^a-zA-Z0-9]/g, '')
          .slice(0, 8)
          .toUpperCase();
        
        return fingerprint;
      }
      
      function checkInstalledFonts() {
        const testFonts = ['Arial', 'Verdana', 'Times New Roman', 'Courier', 'Georgia'];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const text = 'mmmmmmmmmmlli';
        const baseFont = '72px monospace';
        
        ctx.font = baseFont;
        const baseWidth = ctx.measureText(text).width;
        
        return testFonts.filter(font => {
          ctx.font = `72px '${font}', monospace`;
          return ctx.measureText(text).width !== baseWidth;
        }).join(',');
      }
      
      function getWebGLFingerprint() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return 'none';
        
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (!debugInfo) return 'unknown';
        
        return {
          vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
          renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        };
      }
      
      function getAudioFingerprint() {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const context = new AudioContext();
          const oscillator = context.createOscillator();
          const analyser = context.createAnalyser();
          const gain = context.createGain();
          const scriptProcessor = context.createScriptProcessor(4096, 1, 1);
          
          gain.gain.value = 0;
          oscillator.connect(analyser);
          analyser.connect(scriptProcessor);
          scriptProcessor.connect(gain);
          gain.connect(context.destination);
          
          oscillator.start(0);
          
          let fingerprint = '';
          scriptProcessor.onaudioprocess = function(event) {
            fingerprint = event.inputBuffer.getChannelData(0).slice(0, 10).join(',');
          };
          
          setTimeout(() => {
            oscillator.stop();
            context.close();
          }, 100);
          
          return fingerprint;
        } catch (e) {
          return 'audio-blocked';
        }
      }
      
