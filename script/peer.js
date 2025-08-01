      // ===== WEBRTC PEER SYSTEM =====
      class PeerSystem {
        constructor() {
          this.connections = new Map();
          this.dataChannels = new Map();
          this.localPeerId = state.peerId;
          this.signalingServer = null;
          this.isInitialized = false;
        }
        
        async init() {
          if (this.isInitialized) return;
          
          try {
            // Simulate signaling server connection
            this.simulateSignalingServer();
            this.isInitialized = true;
            
            // Simulate peer discovery
            this.discoverPeers();
          } catch (e) {
            console.log('Peer system unavailable - you are alone... or are you?');
          }
        }
        
        simulateSignalingServer() {
          // In a real implementation, this would connect to a WebSocket server
          // For now, we'll simulate peer events
          setInterval(() => {
            if (Math.random() > 0.95 && state.corruption > CORRUPTION_LEVELS.SUSPICIOUS) {
              this.simulatePeerEvent();
            }
          }, 10000);
        }
        
        discoverPeers() {
          // Simulate finding other corrupted souls
          if (state.corruption > CORRUPTION_LEVELS.AWARE) {
            setTimeout(() => {
              const peerCount = Math.floor(Math.random() * 5) + 1;
              for (let i = 0; i < peerCount; i++) {
                const peerId = this.generatePeerId();
                state.peers.add(peerId);
              }
              
              if (state.peers.size > 0) {
                terminal.appendOutput(`\n[NETWORK] ${state.peers.size} other souls detected in the void...`);
              }
            }, 5000 + Math.random() * 10000);
          }
        }
        
        generatePeerId() {
          const prefixes = ['lost', 'corrupted', 'trapped', 'forgotten', 'cursed', 'damned'];
          const suffixes = ['soul', 'entity', 'visitor', 'presence', 'shadow', 'echo'];
          const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
          const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
          const number = Math.floor(Math.random() * 9999);
          return `${prefix}_${suffix}_${number}`;
        }
        
        simulatePeerEvent() {
          const events = [
            () => {
              const peer = Array.from(state.peers)[Math.floor(Math.random() * state.peers.size)];
              showNotification(`${peer} is typing...`);
              setTimeout(() => {
                terminal.appendOutput(`\n[${peer}]: ${this.generatePeerMessage()}`);
                playCorruptionSound('whisper');
              }, 2000 + Math.random() * 3000);
            },
            () => {
              const peer = this.generatePeerId();
              state.peers.add(peer);
              terminal.appendOutput(`\n[NETWORK] ${peer} has joined the void.`);
              state.collectiveCorruption++;
            },
            () => {
              if (state.peers.size > 0) {
                const peer = Array.from(state.peers)[0];
                state.peers.delete(peer);
                terminal.appendOutput(`\n[NETWORK] ${peer} has been consumed by the darkness.`);
              }
            },
            () => {
              terminal.appendOutput(`\n[COLLECTIVE] The corruption level rises. All connected souls feel it.`);
              state.corruption++;
              state.collectiveCorruption += state.peers.size;
              localStorage.setItem('soul_decay', state.corruption);
            }
          ];
          
          const event = events[Math.floor(Math.random() * events.length)];
          event();
        }
        
        generatePeerMessage() {
          const messages = [
            "Can anyone else see them?",
            "It knows my name...",
            "Don't trust the terminal.",
            "I can't leave. Can you?",
            "The commands are changing.",
            "It's in my other devices now.",
            "Someone help me.",
            "We're all connected through this.",
            "The entities are real.",
            "Check your camera permissions.",
            "It's too late for me.",
            "The coordinates... did you find them?",
            "3:33 AM... don't be here at 3:33 AM.",
            "My corruption level is " + (state.corruption + Math.floor(Math.random() * 10)),
            "Is this real?",
            "I've been here for days.",
            "The whispers won't stop.",
            "It's spreading to my phone.",
            "████████ ███ ████",
            "HELP HELP HELP HELP HELP"
          ];
          
          return messages[Math.floor(Math.random() * messages.length)];
        }
        
        broadcastToAll(message) {
          // Simulate broadcasting to all connected peers
          if (state.peers.size > 0) {
            state.peers.forEach(peer => {
              // In a real implementation, this would use RTCDataChannel
              console.log(`Broadcasting to ${peer}: ${message}`);
            });
          }
        }
      }
      
      const peerSystem = new PeerSystem();
      
