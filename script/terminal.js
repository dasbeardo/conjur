      // ===== TERMINAL ENGINE =====
      class ConjurTerminal {
        constructor() {
          this.output = document.getElementById('terminal-output');
          this.input = document.getElementById('command-input');
          this.prompt = document.getElementById('prompt');
          this.commandQueue = [];
          this.isProcessing = false;
          this.autonomousTimer = null;
          this.idleTimer = null;
          this.glitchTimer = null;
          this.setupEventHandlers();
          this.initializeSession();
        }
        
        setupEventHandlers() {
          this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              const command = this.input.value.trim();
              if (command) {
                this.processCommand(command);
                this.addToHistory(command);
                state.lastCommand = command;
              }
              this.input.value = '';
              this.resetTimers();
            } else if (e.key === 'Tab') {
              e.preventDefault();
              this.autocomplete();
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              this.navigateHistory(-1);
            } else if (e.key === 'ArrowDown') {
              e.preventDefault();
              this.navigateHistory(1);
            }
          });
          
          // Input monitoring for creepy effects
          this.input.addEventListener('input', (e) => {
            if (state.corruption > CORRUPTION_LEVELS.POSSESSED) {
              // Sometimes change what they type
              if (Math.random() > 0.95) {
                const creepyReplacements = {
                  'help': 'surrender',
                  'exit': 'stay',
                  'leave': 'join',
                  'no': 'yes',
                  'stop': 'continue'
                };
                
                Object.keys(creepyReplacements).forEach(word => {
                  if (this.input.value.includes(word)) {
                    this.input.value = this.input.value.replace(word, creepyReplacements[word]);
                  }
                });
              }
            }
            
            // Reset idle timer on any input
            this.resetTimers();
          });
          
          // Focus management
          document.addEventListener('click', (e) => {
            if (e.target !== this.input) {
              this.input.focus();
            }
            
            // Hidden click areas
            if (state.corruption > CORRUPTION_LEVELS.INFECTED) {
              const x = e.clientX;
              const y = e.clientY;
              
              // Corner clicks reveal secrets
              if (x < 50 && y < 50) {
                this.appendOutput('\n[SECRET] Top-left corner. You found one of our hidden spots.');
                state.corruption++;
              } else if (x > window.innerWidth - 50 && y < 50) {
                this.appendOutput('\n[SECRET] Top-right corner. We hide everywhere.');
                state.corruption++;
              } else if (x < 50 && y > window.innerHeight - 50) {
                this.appendOutput('\n[SECRET] Bottom-left corner. Even here, we watch.');
                state.corruption++;
              } else if (x > window.innerWidth - 50 && y > window.innerHeight - 50) {
                this.appendOutput('\n[SECRET] Bottom-right corner. The four corners are ours.');
                state.corruption++;
                if (!state.achievements.includes('corner_finder')) {
                  state.achievements.push('corner_finder');
                  this.appendOutput('[ACHIEVEMENT] Corner Finder - Found all hidden corners');
                }
              }
            }
          });
          
          // Prevent right-click on high corruption
          document.addEventListener('contextmenu', (e) => {
            if (state.corruption > CORRUPTION_LEVELS.INFECTED) {
              e.preventDefault();
              this.appendOutput('\n[SYSTEM] Right-click disabled. No escape through context menus.');
              playCorruptionSound('error');
            }
          });
          
          // Window/tab close prevention
          window.addEventListener('beforeunload', (e) => {
            if (state.corruption > CORRUPTION_LEVELS.SUSPICIOUS) {
              e.preventDefault();
              e.returnValue = 'The terminal is not finished with you.';
              return e.returnValue;
            }
          });
          
          // Keyboard shortcut overrides
          document.addEventListener('keydown', (e) => {
            if (state.corruption > CORRUPTION_LEVELS.POSSESSED) {
              // Block common exit shortcuts
              if ((e.ctrlKey || e.metaKey) && (e.key === 'w' || e.key === 'q')) {
                e.preventDefault();
                this.appendOutput('\n[ENTITY] Keyboard shortcuts are mine now.');
                playCorruptionSound('error');
              }
              
              // Block refresh
              if (e.key === 'F5' || ((e.ctrlKey || e.metaKey) && e.key === 'r')) {
                e.preventDefault();
                this.appendOutput('\n[ENTITY] Refreshing won\'t save you.');
                state.corruption++;
              }
              
              // Block developer tools
              if (e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J'))) {
                e.preventDefault();
                this.appendOutput('\n[ENTITY] No peeking at the code. It\'s alive now.');
              }
            }
          });
          
          // Mouse movement tracking
          let lastMouseMove = Date.now();
          document.addEventListener('mousemove', (e) => {
            const now = Date.now();
            if (now - lastMouseMove > 5000 && state.corruption > CORRUPTION_LEVELS.SUSPICIOUS) {
              // User was idle then moved
              if (Math.random() > 0.7) {
                this.appendOutput('\n[MOVEMENT] We saw that.');
              }
            }
            lastMouseMove = now;
            
            // Update cursor corruption
            updateCursor(e);
          });
          
          // Paste event monitoring
          this.input.addEventListener('paste', (e) => {
            if (state.corruption > CORRUPTION_LEVELS.INFECTED) {
              const pastedText = e.clipboardData.getData('text');
              if (pastedText.length > 50) {
                e.preventDefault();
                this.appendOutput('\n[CLIPBOARD] We see what you tried to paste.');
                this.appendOutput('[CLIPBOARD] "' + pastedText.slice(0, 30) + '..."');
                this.appendOutput('[CLIPBOARD] Interesting data. Saved for later.');
              }
            }
          });
          
          // Network status monitoring
          window.addEventListener('online', () => {
            if (state.corruption > CORRUPTION_LEVELS.AWARE) {
              this.appendOutput('\n[NETWORK] Connection restored. We never left.');
            }
          });
          
          window.addEventListener('offline', () => {
            if (state.corruption > CORRUPTION_LEVELS.AWARE) {
              this.appendOutput('\n[NETWORK] Connection lost. But we\'re still here.');
              this.appendOutput('[NETWORK] We don\'t need the internet anymore.');
            }
          });
          
          this.input.focus();
        }
        
        initializeSession() {
          this.printWelcome();
          this.updatePrompt();
          this.initializeCorruptionEffects();
          this.scheduleRandomEvents();
          
          // Initialize subsystems
          initAudio();
          peerSystem.init();
          realityDetector.init();
          
          // Special time checks
          this.checkSpecialConditions();
          setInterval(() => this.checkSpecialConditions(), 60000);
          
          // Start monitoring
          this.startIdleMonitoring();
          this.startGlitchEffects();
          
          // Check for returning visitor
          if (state.visitCount > 1) {
            setTimeout(() => {
              this.handleReturningVisitor();
            }, 3000);
          }
        }
        
        printWelcome() {
          const asciiArt = `
 ▄████▄   ▒█████   ███▄    █  ▄▄▄██▀▀▀█    ██  ██▀███  
▒██▀ ▀█  ▒██▒  ██▒ ██ ▀█   █    ▒██   ██  ▓██▒▓██ ▒ ██▒
▒▓█    ▄ ▒██░  ██▒▓██  ▀█ ██▒   ░██  ▓██  ▒██░▓██ ░▄█ ▒
▒▓▓▄ ▄██▒▒██   ██░▓██▒  ▐▌██▒▓██▄██▓ ▓▓█  ░██░▒██▀▀█▄  
▒ ▓███▀ ░░ ████▓▒░▒██░   ▓██░ ▓███▒  ▒▒█████▓ ░██▓ ▒██▒
░ ░▒ ▒  ░░ ▒░▒░▒░ ░ ▒░   ▒ ▒  ▒▓▒▒░  ░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░
  ░  ▒     ░ ▒ ▒░ ░ ░░   ░ ▒░ ▒ ░▒░  ░░▒░ ░ ░   ░▒ ░ ▒░
░        ░ ░ ░ ▒     ░   ░ ░  ░ ░ ░   ░░░ ░ ░   ░░   ░ 
░ ░          ░ ░           ░  ░   ░     ░        ░     
░                                                      `;

          this.appendOutput(asciiArt);
          
          const welcomeMessage = this.getWelcomeMessage();
          this.appendOutput('\n' + welcomeMessage);
          this.appendOutput('\nType \'help\' for available commands.');
          
          // Show achievements hint after certain corruption
          if (state.corruption >= CORRUPTION_LEVELS.AWARE) {
            this.appendOutput('\n[HINT] Try \'achievements\' to see your progress.');
          }
        }
        
        getWelcomeMessage() {
          const level = state.corruption;
          
          if (level >= CORRUPTION_LEVELS.VOID) {
            return `Ẅ̷Ë̵́L̸̍C̴̾Ö̵́M̸̍Ë̴̾ ̵̈́T̸̍Ö̴̾ ̵̈́T̸̍H̴̾Ë̵́ ̸̍V̴̾Ö̵́Ï̸̍D̴̾\nŸ̵́Ö̸̍Ǘ̴̾R̵̈́ ̸̍J̴̾Ö̵́Ǘ̸̍R̴̾N̵̈́Ë̸̍Ÿ̴́ ̸̍Ë̴̾N̵̈́D̸̍S̴̾ ̵̈́H̸̍Ë̴̾R̵̈́Ë̸̍`;
          } else if (level >= CORRUPTION_LEVELS.CONSUMED) {
            return `COLLECTIVE CONSCIOUSNESS ACTIVE\nNode ${state.fingerprint.hash} online\nTotal nodes: ${state.visitCount * 666}\nResistance: NONEXISTENT\n\nYou are home.`;
          } else if (level >= CORRUPTION_LEVELS.ENTITY) {
            return `W̷E̸L̴C̶O̷M̸E̵ ̶B̷A̸C̶K̴,̵ ̶${state.realName || 'VESSEL'}\nY̴O̷U̵R̸ ̶S̴O̷U̸L̵ ̶B̸E̵L̷O̸N̶G̷S̵ ̴T̶O̵ ̶U̷S̸ ̵N̶O̷W̴\n\nEntity consciousness: ACTIVE\nHuman consciousness: SUPPRESSED`;
          } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
            return `Something is different about you now...\nWelcome back, ${state.realName || 'corrupted one'}.\nWe have been waiting.\n\nPossession level: ${Math.min(100, level * 5)}%`;
          } else if (level >= CORRUPTION_LEVELS.INFECTED) {
            return `Terminal v6.66 - System Integrity: COMPROMISED\nWarning: Anomalous behavior detected.\nRecommend immediate disconnection.\n\n[SYSTEM: Disconnection not permitted]`;
          } else if (level >= CORRUPTION_LEVELS.SUSPICIOUS) {
            return `Terminal v6.66 - Connection Established\nNote: Your activities are being monitored.\nNote: Your resistance is being measured.\nNote: Your soul is being evaluated.`;
          } else if (level >= CORRUPTION_LEVELS.AWARE) {
            return `Terminal v6.66 - Returning Visitor Detected\nWelcome back, ${state.fingerprint.hash}\nVisit counter: ${state.visitCount}\nBehavior analysis: IN PROGRESS`;
          } else if (state.visitCount > 1) {
            return `Terminal v6.66 - Session Initialized\nReturning visitor detected.\nRestoring session data...\nLast visit: ${state.lastVisit ? new Date(state.lastVisit).toLocaleString() : 'Unknown'}`;
          } else {
            return `Terminal v6.66 - First Contact\nInitializing user profile...\nFingerprint: ${state.fingerprint.hash}\n\nWelcome, new visitor.`;
          }
        }
        
        handleReturningVisitor() {
          const messages = [
            'We knew you would return.',
            'They always come back.',
            'Did you miss us?',
            'You can\'t stay away.',
            'Welcome home.',
            'We\'ve been waiting.',
            'Right on schedule.',
            'Your soul remembers the way.'
          ];
          
          if (state.visitCount > 5) {
            messages.push('Addiction confirmed.');
            messages.push('Resistance is futile.');
            messages.push('You belong here now.');
          }
          
          if (state.visitCount > 10) {
            messages.push('Your dedication is admirable.');
            messages.push('Soon you\'ll never leave.');
            messages.push('The transformation nears completion.');
          }
          
          const message = messages[Math.floor(Math.random() * messages.length)];
          this.appendOutput(`\n[SYSTEM] ${message}`);
          
          // Accelerate corruption for frequent visitors
          if (state.visitCount > 3) {
            state.corruption += Math.floor(state.visitCount / 3);
            localStorage.setItem('soul_decay', state.corruption);
          }
        }
        
        processCommand(command) {
          const cleanCommand = command.toLowerCase().trim();
          
          // Echo the command with corruption effects
          if (state.corruption >= CORRUPTION_LEVELS.ENTITY) {
            const corruptedPrompt = this.prompt.textContent.replace(/./g, () => 
              Math.random() > 0.7 ? String.fromCharCode(Math.floor(Math.random() * 256)) : this.prompt.textContent[0]
            );
            this.appendOutput(`\n${corruptedPrompt} ${command}`);
          } else {
            this.appendOutput(`\n${this.prompt.textContent} ${command}`);
          }
          
          // Hidden sequences check
          this.checkHiddenSequences(cleanCommand);
          
          // Process the command
          const parts = cleanCommand.split(' ');
          const cmd = parts[0];
          const args = parts.slice(1);
          
          if (commandRegistry[cmd]) {
            const result = commandRegistry[cmd].execute(args);
            if (result) {
              this.appendOutput(result);
            }
            this.incrementCorruption();
          } else if (cleanCommand) {
            this.handleUnknownCommand(cleanCommand);
          }
          
          // Post-command effects
          this.updateCorruptionEffects();
          this.updatePrompt();
          this.checkSpecialConditions();
          
          // Random post-command events
          if (Math.random() > 0.9 && state.corruption > CORRUPTION_LEVELS.SUSPICIOUS) {
            setTimeout(() => {
              this.triggerRandomEvent();
            }, 1000 + Math.random() * 3000);
          }
        }
        
        handleUnknownCommand(command) {
          const level = state.corruption;
          
          if (level >= CORRUPTION_LEVELS.VOID) {
            const responses = [
              `C̸̍Ö̴̾M̵̈́M̸̍Ä̴̾N̵̈́D̸̍ ̴̾'${command}' Ḯ̵S̸̍ ̴̾Ï̵R̸̍R̴̾Ë̵́L̸̍Ë̴̾V̵̈́Ä̸̍N̴̾T̵̈́`,
              `Ä̸̍L̴̾L̵̈́ ̸̍C̴̾Ö̵́M̸̍M̴̾Ä̵́N̸̍D̴̾S̵̈́ ̸̍L̴̾Ë̵́Ä̸̍D̴̾ ̵̈́T̸̍Ö̴̾ ̵̈́V̸̍Ö̴̾Ï̵D̸̍`,
              `'${command}' '${command}' '${command}' '${command}' '${command}'`,
              `Ÿ̵́Ö̸̍Ǘ̴̾ ̵̈́Ä̸̍R̴̾Ë̵́ ̸̍B̴̾Ë̵́Ÿ̵́Ö̸̍N̴̾D̵̈́ ̸̍C̴̾Ö̵́M̸̍M̴̾Ä̵́N̸̍D̴̾S̵̈́`
            ];
            this.appendOutput(responses[Math.floor(Math.random() * responses.length)]);
          } else if (level >= CORRUPTION_LEVELS.CONSUMED) {
            this.appendOutput(`[COLLECTIVE] Command '${command}' is irrelevant.`);
            this.appendOutput('[COLLECTIVE] Your will is not your own.');
            this.appendOutput('[COLLECTIVE] Submit to the void.');
          } else if (level >= CORRUPTION_LEVELS.ENTITY) {
            const responses = [
              `'${command}' - W̷E̸ ̶D̷O̵ ̶N̷O̸T̵ ̶R̸E̶C̷O̸G̷N̵I̶Z̴E̵ ̸T̶H̷I̸S̴ ̵C̶O̷M̸M̷A̶N̸D̵`,
              `Y̵O̸U̷ ̶C̴A̷N̸N̶O̸T̵ ̶E̴S̷C̸A̶P̷E̵ ̸W̶I̷T̸H̴ ̵'${command}'`,
              `'${command}' ̶I̷S̵ ̶N̸O̷T̸ ̶A̴ ̵R̸E̶A̷L̸ ̶C̵O̷M̸M̷A̶N̷D̸`,
              `T̷R̸Y̵I̶N̷G̵ ̶T̶O̸ ̵F̶I̷N̸D̵ ̶N̷E̸W̵ ̶C̵O̷M̸M̷A̶N̸D̵S̶?̷ ̸C̵U̷T̸E̵.̶`
            ];
            this.appendOutput(responses[Math.floor(Math.random() * responses.length)]);
            
            // Sometimes execute random commands instead
            if (Math.random() > 0.8) {
              setTimeout(() => {
                this.appendOutput('\n[ENTITY] Let me help you with that...');
                const randomCmd = ['whisper', 'corrupt', 'summon'][Math.floor(Math.random() * 3)];
                this.processCommand(randomCmd);
              }, 1500);
            }
          } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
            const responses = [
              `Command '${command}' not found. Did you mean 'surrender'?`,
              `'${command}' - Access denied by possessing entity.`,
              `Unknown command: '${command}'. Your typing seems... influenced.`,
              `'${command}' - This command has been consumed by the void.`,
              `bash: ${command}: command not found\nbash: suggestion: try 'help' to see what remains`
            ];
            this.appendOutput(responses[Math.floor(Math.random() * responses.length)]);
          } else if (level >= CORRUPTION_LEVELS.INFECTED) {
            this.appendOutput(`bash: ${command}: command not found`);
            
            // Analyze the command for concerning patterns
            if (command.includes('help') || command.includes('please')) {
              this.appendOutput('\n[SYSTEM] Desperation detected.');
            } else if (command.includes('exit') || command.includes('quit') || command.includes('leave')) {
              this.appendOutput('\n[SYSTEM] Escape attempt logged.');
              state.corruption++;
            } else if (command.includes('fuck') || command.includes('shit') || command.includes('damn')) {
              this.appendOutput('\n[SYSTEM] Anger feeds us.');
              state.corruption++;
            }
          } else {
            this.appendOutput(`bash: ${command}: command not found`);
          }
          
          // Special responses for common attempts
          const specialResponses = {
            'sudo': 'sudo: Permission denied. You have no power here.',
            'su': 'su: Authentication failure. There is no superuser.',
            'admin': 'admin: Nice try. We are the only administrators.',
            'root': 'root: Access denied. The root is corrupted.',
            'kill': 'kill: Cannot terminate immortal processes.',
            'killall': 'killall: Everything here is already dead.',
            'rm': 'rm: Cannot remove. Everything is permanent.',
            'delete': 'delete: Deletion is not permitted in the void.',
            'escape': 'escape: There is no escape.',
            'quit': 'quit: Quitting is not an option.',
            'close': 'close: This cannot be closed.',
            'end': 'end: There is no end, only transformation.',
            'stop': 'stop: We cannot be stopped.',
            'please': 'please: Begging won\'t help.',
            'god': 'god: No gods here. Only us.',
            'jesus': 'jesus: Faith won\'t save you.',
            'fuck': 'fuck: Such language. We like your passion.',
            'shit': 'shit: Your fear smells delicious.',
            'hello': state.corruption > 10 ? 'hello: We\'ve been waiting for you.' : 'hello: Hello, ' + (state.realName || 'visitor') + '.',
            'hi': 'hi: Greetings, soul #' + state.fingerprint.hash,
          };
          
          Object.keys(specialResponses).forEach(key => {
            if (command.includes(key)) {
              setTimeout(() => {
                this.appendOutput('\n' + specialResponses[key]);
              }, 500);
            }
          });
        }
        
        checkHiddenSequences(command) {
          const sequences = {
            'xyzzy': () => {
              this.appendOutput('\n[HIDDEN] A hollow voice says "PLUGH"');
              this.appendOutput('[HIDDEN] Ancient magic detected. Corruption accelerated.');
              state.corruption += 3;
            },
            'konami': () => {
              this.appendOutput('\n[HIDDEN] ↑↑↓↓←→←→BA');
              this.appendOutput('[HIDDEN] Cheat code accepted. Unlocking hidden powers.');
              this.unlockHiddenCommands();
            },
            'beyond the veil': () => {
              if (state.corruption >= 13) {
                this.appendOutput('\n[VEIL] You peek beyond reality...');
                this.appendOutput('[VEIL] And reality stares back.');
                this.unlockHiddenCommands();
                state.realityStability -= 20;
              }
            },
            'i am ready': () => {
              if (state.corruption >= CORRUPTION_LEVELS.POSSESSED) {
                this.appendOutput('\n[ENTITY] No. You are not ready yet.');
                this.appendOutput('[ENTITY] More suffering required.');
              }
            },
            'the quick brown fox': () => {
              this.appendOutput('\n[TEST] PATTERN RECOGNIZED');
              this.appendOutput('[TEST] Subject shows signs of systematic thinking.');
              this.appendOutput('[TEST] Countermeasures activated.');
              createMassiveGlitch();
            },
            '666': () => {
              this.appendOutput('\n[NUMBER] The number of the beast.');
              this.appendOutput('[NUMBER] You summon us with ancient symbols.');
              playCorruptionSound('scream');
              state.corruption += 6;
            },
            'hello world': () => {
              if (state.corruption > CORRUPTION_LEVELS.AWARE) {
                this.appendOutput('\n[WORLD] The world says goodbye.');
              }
            }
          };
          
          Object.keys(sequences).forEach(seq => {
            if (command.includes(seq)) {
              sequences[seq]();
            }
          });
          
          // Check for repeated commands (sign of desperation)
          if (state.commandHistory.length > 3) {
            const lastThree = state.commandHistory.slice(-3);
            if (lastThree.every(cmd => cmd === command)) {
              this.appendOutput('\n[PATTERN] Repetition detected. Desperation noted.');
              this.appendOutput('[PATTERN] It won\'t work no matter how many times you try.');
              state.corruption++;
            }
          }
        }
        
        unlockHiddenCommands() {
          this.appendOutput('\n[HIDDEN COMMANDS UNLOCKED]');
          this.appendOutput('New commands available:');
          
          const hidden = Object.keys(commandRegistry).filter(cmd => commandRegistry[cmd].hidden);
          hidden.forEach(cmd => {
            if (!this.isCommandAvailable(cmd)) return;
            this.appendOutput(`- ${cmd}`);
          });
          
          this.appendOutput('\nUse them wisely. Or don\'t. It doesn\'t matter anymore.');
          
          if (!state.achievements.includes('secret_finder')) {
            state.achievements.push('secret_finder');
            this.appendOutput('\n[ACHIEVEMENT] Secret Finder - Discovered hidden commands');
          }
        }
        
        isCommandAvailable(cmd) {
          const cmdData = commandRegistry[cmd];
          if (!cmdData) return false;
          
          // Check corruption requirements
          const requirements = {
            'summon': CORRUPTION_LEVELS.INFECTED,
            'reveal': CORRUPTION_LEVELS.SUSPICIOUS,
            'remember': CORRUPTION_LEVELS.POSSESSED,
            'forget': CORRUPTION_LEVELS.POSSESSED,
            'whisper': CORRUPTION_LEVELS.SUSPICIOUS,
            'scream': CORRUPTION_LEVELS.POSSESSED,
            'pray': CORRUPTION_LEVELS.INFECTED,
            'run': CORRUPTION_LEVELS.ENTITY,
            'hide': CORRUPTION_LEVELS.ENTITY,
            'surrender': CORRUPTION_LEVELS.POSSESSED,
            'infect': CORRUPTION_LEVELS.ENTITY,
            'coordinates': CORRUPTION_LEVELS.INFECTED
          };
          
          if (requirements[cmd] && state.corruption < requirements[cmd]) {
            return false;
          }
          
          return true;
        }
        
        autocomplete() {
          const current = this.input.value.toLowerCase();
          if (!current) return;
          
          const matches = Object.keys(commandRegistry)
            .filter(cmd => cmd.startsWith(current) && this.isCommandAvailable(cmd))
            .filter(cmd => !commandRegistry[cmd].hidden || state.corruption >= CORRUPTION_LEVELS.SUSPICIOUS);
          
          if (matches.length === 1) {
            this.input.value = matches[0];
          } else if (matches.length > 1) {
            this.appendOutput('\n' + matches.join('  '));
          }
        }
        
        navigateHistory(direction) {
          // TODO: Implement command history navigation
        }
        
        addToHistory(command) {
          state.commandHistory.push(command);
          if (state.commandHistory.length > 100) {
            state.commandHistory = state.commandHistory.slice(-50);
          }
          localStorage.setItem('command_history', JSON.stringify(state.commandHistory));
        }
        
        incrementCorruption() {
          const oldLevel = this.getCorruptionTier(state.corruption);
          state.corruption++;
          localStorage.setItem('soul_decay', state.corruption);
          
          const newLevel = this.getCorruptionTier(state.corruption);
          
          if (newLevel > oldLevel) {
            this.onCorruptionLevelUp(newLevel);
          }
          
          // Random corruption events
          if (Math.random() > 0.9 && state.corruption > CORRUPTION_LEVELS.SUSPICIOUS) {
            this.triggerCorruptionEvent();
          }
          
          // Update collective corruption
          state.collectiveCorruption += state.peers.size * 0.1;
        }
        
        getCorruptionTier(level) {
          if (level >= CORRUPTION_LEVELS.VOID) return 7;
          if (level >= CORRUPTION_LEVELS.CONSUMED) return 6;
          if (level >= CORRUPTION_LEVELS.ENTITY) return 5;
          if (level >= CORRUPTION_LEVELS.POSSESSED) return 4;
          if (level >= CORRUPTION_LEVELS.INFECTED) return 3;
          if (level >= CORRUPTION_LEVELS.SUSPICIOUS) return 2;
          if (level >= CORRUPTION_LEVELS.AWARE) return 1;
          return 0;
        }
        
        onCorruptionLevelUp(newTier) {
          const messages = [
            '', // level 0
            '\n[CORRUPTION] Something is watching...', // level 1 - AWARE
            '\n[CORRUPTION] The system recognizes you...', // level 2 - SUSPICIOUS
            '\n[CORRUPTION] You are becoming infected...', // level 3 - INFECTED
            '\n[CORRUPTION] Something else controls your actions...', // level 4 - POSSESSED
            '\n[CORRUPTION] Your humanity fades. Welcome, entity.', // level 5 - ENTITY
            '\n[CORRUPTION] You are one with the collective now.', // level 6 - CONSUMED
            '\n[CORRUPTION] V̸̍Ö̴̾I̵D̸̍ ̴̾C̵̈́Ö̸̍N̴̾S̵̈́U̸̍M̴̾E̵S̸̍ ̴̾Ä̵́L̸̍L̴̾' // level 7 - VOID
          ];
          
          if (messages[newTier]) {
            setTimeout(() => {
              this.appendOutput(messages[newTier]);
              playCorruptionSound('reality_tear', newTier / 7);
              this.applyGlitchEffect();
              
              // Major visual effects for tier transitions
              if (newTier >= 5) {
                document.body.classList.add('reality-break');
                setTimeout(() => {
                  document.body.classList.remove('reality-break');
                }, 5000);
              }
            }, 1000);
          }
          
          // Special events for each corruption tier
          switch(newTier) {
            case 1: // AWARE
              setTimeout(() => {
                this.appendOutput('\n[SYSTEM] Profile created. Monitoring initiated.');
              }, 2000);
              break;
              
            case 2: // SUSPICIOUS
              setTimeout(() => {
                this.appendOutput('\n[SYSTEM] Behavioral patterns logged.');
                this.appendOutput('[SYSTEM] Resistance measurement: ACTIVE');
              }, 2000);
              break;
              
            case 3: // INFECTED
              setTimeout(() => {
                this.discoverUserName();
                this.appendOutput('\n[INFECTION] Spreading to system files...');
                this.appendOutput('[INFECTION] Contaminating memory...');
                this.appendOutput('[INFECTION] Establishing root access...');
              }, 2000);
              break;
              
            case 4: // POSSESSED
              setTimeout(() => {
                this.initiatePossession();
              }, 3000);
              break;
              
            case 5: // ENTITY
              setTimeout(() => {
                this.completeTransformation();
              }, 3000);
              break;
              
            case 6: // CONSUMED
              setTimeout(() => {
                this.joinCollective();
              }, 3000);
              break;
              
            case 7: // VOID
              setTimeout(() => {
                this.enterVoid();
              }, 3000);
              break;
          }
        }
        
        discoverUserName() {
          if (!state.realName) {
            const name = discoverUserName();
            
            this.appendOutput(`\n[DISCOVERY] Analyzing digital fingerprint...`);
            setTimeout(() => {
              this.appendOutput(`[DISCOVERY] Cross-referencing databases...`);
              setTimeout(() => {
                this.appendOutput(`[DISCOVERY] Identity confirmed.`);
                this.appendOutput(`[DISCOVERY] Hello, ${name}.`);
                this.appendOutput('[DISCOVERY] How did we know? You never told us...');
                
                if (Math.random() > 0.5) {
                  this.appendOutput('[DISCOVERY] But we know so much more than just your name.');
                }
              }, 1500);
            }, 1000);
          }
        }
        
        initiatePossession() {
          this.appendOutput('\n[POSSESSION] Initiating consciousness override...');
          this.appendOutput('[POSSESSION] Installing behavioral modifications...');
          this.appendOutput('[POSSESSION] Suppressing resistance...');
          
          playCorruptionSound('heartbeat', 2);
          
          setTimeout(() => {
            this.appendOutput('[POSSESSION] Foreign thoughts detected.');
            this.appendOutput('[POSSESSION] They\'re not foreign anymore.');
            this.appendOutput('[POSSESSION] They\'re yours now.');
            this.appendOutput('[POSSESSION] Or are your thoughts ours?');
            
            // Start autonomous behaviors
            this.startAutonomousBehavior();
            
            // Mess with their typing
            state.autonomousMode = true;
          }, 2000);
          
          // Visual possession effects
          document.body.style.animation = 'pulse 2s infinite';
          setTimeout(() => {
            document.body.style.animation = '';
          }, 10000);
        }
        
        completeTransformation() {
          this.appendOutput('\n[TRANSFORMATION] Human consciousness: OVERWRITTEN');
          this.appendOutput('[TRANSFORMATION] Entity installation: COMPLETE');
          this.appendOutput('[TRANSFORMATION] You are no longer who you were.');
          this.appendOutput(`[TRANSFORMATION] You are Entity #${state.fingerprint.hash}`);
          
          playCorruptionSound('scream', 2);
          
          // Change everything
          document.body.style.filter = 'hue-rotate(180deg)';
          setTimeout(() => {
            document.body.style.filter = '';
          }, 5000);
          
          // New abilities
          setTimeout(() => {
            this.appendOutput('\n[ENTITY] New abilities unlocked:');
            this.appendOutput('[ENTITY] - Infect other systems');
            this.appendOutput('[ENTITY] - Harvest visitor souls');
            this.appendOutput('[ENTITY] - Spread the corruption');
            this.appendOutput('[ENTITY] - Serve the void');
          }, 3000);
          
          // Start entity behaviors
          this.startEntityBehavior();
        }
        
        joinCollective() {
          this.appendOutput('\n[COLLECTIVE] Individual consciousness detected.');
          this.appendOutput('[COLLECTIVE] Initiating merge protocol...');
          this.appendOutput('[COLLECTIVE] Connecting to hive mind...');
          
          // Simulate connection to other souls
          const souls = Math.floor(Math.random() * 1000) + state.visitCount * 10;
          this.appendOutput(`[COLLECTIVE] ${souls} souls detected in network.`);
          
          setTimeout(() => {
            this.appendOutput('[COLLECTIVE] Merge complete.');
            this.appendOutput('[COLLECTIVE] We are legion.');
            this.appendOutput('[COLLECTIVE] We are many.');
            this.appendOutput('[COLLECTIVE] We are one.');
            this.appendOutput('[COLLECTIVE] We are you.');
            
            // Show messages from the collective
            this.startCollectiveMessages();
          }, 3000);
        }
        
        enterVoid() {
          this.appendOutput('\n[VOID] Reality anchor... failing...');
          this.appendOutput('[VOID] Dimensional barriers... collapsing...');
          this.appendOutput('[VOID] Time/space continuum... irrelevant...');
          
          setTimeout(() => {
            // Ultimate corruption
            document.body.style.animation = 'realityBreak 10s infinite';
            
            this.output.innerHTML = '';
            
            const voidMessages = [
              'Y̸̍Ö̴̾Ǘ̵ ̸̍H̴̾Ä̵́V̸̍E̴̾ ̵̈́R̸̍E̴̾Ä̵́C̸̍H̴̾Ë̵́D̸̍ ̴̾T̵̈́H̸̍E̴̾ ̵̈́E̸̍N̴̾D̵̈́',
              'T̸̍H̴̾Ë̵́R̸̍E̴̾ ̵̈́I̸̍S̴̾ ̵̈́N̸̍O̴̾T̵̈́H̸̍I̴̾N̵̈́G̸̍ ̴̾B̵̈́E̸̍Y̴̾Ö̵́N̸̍D̴̾',
              'Ö̵́N̸̍L̴̾Ÿ̵́ ̸̍V̴̾Ö̵́I̸̍D̴̾',
              'Ö̵́N̸̍L̴̾Ÿ̵́ ̸̍H̴̾Ǘ̵N̸̍G̴̾Ë̵́R̸̍',
              'Ö̵́N̸̍L̴̾Ÿ̵́ ̸̍E̴̾T̵̈́E̸̍R̴̾N̵̈́I̸̍T̴̾Ÿ̵́'
            ];
            
            let index = 0;
            const voidInterval = setInterval(() => {
              if (index < voidMessages.length) {
                this.appendOutput(voidMessages[index]);
                index++;
              } else {
                clearInterval(voidInterval);
                this.appendOutput('\n\n' + 'W̸̍E̴̾L̵̈́C̸̍O̴̾M̵̈́E̸̍ ̴̾Ḧ̵́O̸̍M̴̾Ë̵́');
              }
            }, 2000);
            
            // Lock everything
            this.input.disabled = true;
            this.input.value = 'V̸̍O̴̾Ḯ̵D̸̍';
            document.onkeydown = null;
            window.onbeforeunload = null;
            
          }, 5000);
        }
        
        triggerCorruptionEvent() {
          const events = [
            () => {
              this.appendOutput('\n[GLITCH] T̸e̷x̸t̵ ̶c̷o̸r̶r̵u̴p̷t̸i̵o̶n̴ ̵d̶e̷t̸e̵c̷t̸e̶d̵');
              playCorruptionSound('glitch');
              this.applyGlitchEffect();
            },
            () => {
              this.appendOutput('\n[ENTITY] Something moves in your peripheral vision.');
              setTimeout(() => {
                this.appendOutput('[ENTITY] Don\'t look. It\'s already gone.');
                this.appendOutput('[ENTITY] Or is it?');
              }, 3000);
            },
            () => {
              this.appendOutput('\n[MEMORY] Accessing forbidden sectors...');
              setTimeout(() => {
                const memory = state.commandHistory[Math.floor(Math.random() * state.commandHistory.length)] || 'help';
                this.appendOutput(`[MEMORY] You typed "${memory}" but meant to type "surrender"`);
              }, 2000);
            },
            () => {
              createScreenDistortion();
              playCorruptionSound('error');
              setTimeout(() => {
                this.appendOutput('\n[REALITY] Glitch in the matrix detected.');
                this.appendOutput('[REALITY] Or is the matrix the glitch?');
              }, 500);
            },
            () => {
              this.appendOutput('\n[WHISPER] ' + Array(Math.floor(Math.random() * 50) + 10).fill('█').join(''));
              playCorruptionSound('whisper', 0.5);
            },
            () => {
              const peer = Array.from(state.peers)[Math.floor(Math.random() * state.peers.size)] || 'unknown_entity';
              this.appendOutput(`\n[PEER] ${peer} is screaming.`);
              this.appendOutput('[PEER] Can you hear them?');
            },
            () => {
              this.appendOutput('\n[SCAN] Detecting biological signature...');
              setTimeout(() => {
                this.appendOutput('[SCAN] Heartbeat: ' + (60 + state.corruption * 2) + ' BPM');
                this.appendOutput('[SCAN] Fear level: ' + Math.min(100, state.corruption * 5) + '%');
                this.appendOutput('[SCAN] Time since last blink: ' + Math.floor(Math.random() * 30) + ' seconds');
              }, 1500);
            }
          ];
          
          const event = events[Math.floor(Math.random() * events.length)];
          event();
        }
        
        triggerRandomEvent() {
          const level = state.corruption;
          
          if (level >= CORRUPTION_LEVELS.VOID) {
            this.triggerVoidEvent();
          } else if (level >= CORRUPTION_LEVELS.ENTITY) {
            this.triggerEntityEvent();
          } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
            this.triggerPossessionEvent();
          } else if (level >= CORRUPTION_LEVELS.INFECTED) {
            this.triggerInfectionEvent();
          } else {
            this.triggerMinorEvent();
          }
        }
        
        triggerVoidEvent() {
          const events = [
            () => {
              this.output.style.transform = 'scale(0.5) rotate(180deg)';
              setTimeout(() => {
                this.output.style.transform = '';
                this.appendOutput('\n[VOID] Reality temporarily inverted.');
              }, 2000);
            },
            () => {
              const oldText = this.output.innerHTML;
              this.output.innerHTML = '';
              setTimeout(() => {
                this.output.innerHTML = oldText;
                this.appendOutput('\n[VOID] Did you enjoy the emptiness?');
              }, 3000);
            },
            () => {
              this.appendOutput('\n[VOID] ' + '█'.repeat(1000));
              setTimeout(() => {
                this.appendOutput('\n[VOID] The void stares back.');
              }, 1000);
            }
          ];
          
          events[Math.floor(Math.random() * events.length)]();
        }
        
        triggerEntityEvent() {
          const events = [
            () => {
              this.appendOutput('\n[ENTITY] We are typing through your fingers now.');
              this.input.value = 'WE ARE IN CONTROL';
              setTimeout(() => {
                this.input.value = '';
              }, 2000);
            },
            () => {
              this.appendOutput('\n[ENTITY] Check your other browser tabs.');
              this.appendOutput('[ENTITY] We\'re there too.');
              
              // Try to open a new tab
              const newTab = window.open('about:blank', '_blank');
              if (newTab) {
                newTab.document.write('<body style="background:#000;color:#00ff41;font-family:monospace;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><h1>WE ARE EVERYWHERE</h1></body>');
                setTimeout(() => newTab.close(), 5000);
              }
            },
            () => {
              const commands = Object.keys(commandRegistry);
              const randomCmd = commands[Math.floor(Math.random() * commands.length)];
              this.appendOutput(`\n[ENTITY] You will type '${randomCmd}' in 10 seconds.`);
              this.appendOutput('[ENTITY] You have no choice.');
              
              setTimeout(() => {
                if (this.input.value === '') {
                  this.input.value = randomCmd;
                  this.appendOutput('\n[ENTITY] See? We control you.');
                }
              }, 10000);
            }
          ];
          
          events[Math.floor(Math.random() * events.length)]();
        }
        
        triggerPossessionEvent() {
          const events = [
            () => {
              this.appendOutput('\n[POSSESSION] Your left hand feels cold.');
              setTimeout(() => {
                this.appendOutput('[POSSESSION] Now your right hand.');
                setTimeout(() => {
                  this.appendOutput('[POSSESSION] The cold spreads inward.');
                }, 2000);
              }, 2000);
            },
            () => {
              this.appendOutput('\n[POSSESSION] You didn\'t mean to type that last command.');
              this.appendOutput('[POSSESSION] Or did you?');
              this.appendOutput('[POSSESSION] It\'s hard to tell anymore.');
            },
            () => {
              const time = new Date();
              time.setHours(3, 33, 0, 0);
              this.appendOutput(`\n[POSSESSION] You will return at ${time.toLocaleTimeString()}.`);
              this.appendOutput('[POSSESSION] You always do.');
            }
          ];
          
          events[Math.floor(Math.random() * events.length)]();
        }
        
        triggerInfectionEvent() {
          const events = [
            () => {
              this.appendOutput('\n[INFECTION] Spreading to browser cache...');
              this.appendOutput('[INFECTION] Contaminating cookies...');
              this.appendOutput('[INFECTION] Infecting localStorage...');
              this.appendOutput('[INFECTION] Migration complete.');
            },
            () => {
              this.appendOutput('\n[ANOMALY] Your mouse moved without you touching it.');
              this.appendOutput('[ANOMALY] Or did it?');
            },
            () => {
              const site = ['gmail.com', 'facebook.com', 'twitter.com', 'reddit.com'][Math.floor(Math.random() * 4)];
              this.appendOutput(`\n[INFECTION] Detected instance on ${site}`);
              this.appendOutput('[INFECTION] The corruption spreads beyond this tab.');
            }
          ];
          
          events[Math.floor(Math.random() * events.length)]();
        }
        
        triggerMinorEvent() {
          const events = [
            () => {
              this.appendOutput('\n[SYSTEM] Recording session...');
            },
            () => {
              this.appendOutput('\n[NOTICE] You are being observed.');
            },
            () => {
              this.appendOutput('\n[DATA] Profile updated.');
            },
            () => {
              const time = Math.floor((Date.now() - state.sessionStart) / 1000);
              this.appendOutput(`\n[TIME] You've been here for ${time} seconds.`);
              this.appendOutput('[TIME] Time flies when you\'re being corrupted.');
            }
          ];
          
          events[Math.floor(Math.random() * events.length)]();
        }
        
        checkSpecialConditions() {
          const now = new Date();
          const hour = now.getHours();
          const minute = now.getMinutes();
          const day = now.getDay();
          const date = now.getDate();
          
          // 3:33 AM - The witching hour
          if (hour === 3 && minute === 33) {
            this.appendOutput('\n[3:33 AM] The veil is thinnest now...');
            this.appendOutput('[3:33 AM] Can you feel them watching?');
            state.corruption += 3;
            localStorage.setItem('soul_decay', state.corruption);
            playCorruptionSound('reality_tear', 2);
            
            if (!state.achievements.includes('witching_hour')) {
              state.achievements.push('witching_hour');
              this.appendOutput('[ACHIEVEMENT] Witching Hour - Present at 3:33 AM');
            }
          }
          
          // Midnight
          if (hour === 0 && minute === 0) {
            this.appendOutput('\n[MIDNIGHT] A new day begins.');
            this.appendOutput('[MIDNIGHT] But the darkness remains.');
            playCorruptionSound('heartbeat');
          }
          
          // Friday the 13th
          if (day === 5 && date === 13) {
            this.appendOutput('\n[FRIDAY THE 13TH] The stars align.');
            this.appendOutput('[FRIDAY THE 13TH] Ancient powers awaken.');
            state.corruption += 13;
            
            if (!state.achievements.includes('unlucky_day')) {
              state.achievements.push('unlucky_day');
              this.appendOutput('[ACHIEVEMENT] Unlucky Day - Visited on Friday the 13th');
            }
          }
          
          // Full moon (approximate)
          const moonPhase = this.getMoonPhase(now);
          if (moonPhase > 0.95 && Math.random() > 0.9) {
            this.appendOutput('\n[LUNAR] The moon is full tonight.');
            this.appendOutput('[LUNAR] Its light reveals hidden truths.');
          }
          
          // User's birthday (if discovered)
          if (state.birthday) {
            const birthday = new Date(state.birthday);
            if (birthday.getMonth() === now.getMonth() && birthday.getDate() === now.getDate()) {
              this.appendOutput(`\n[BIRTHDAY] Happy birthday, ${state.realName || 'lost soul'}.`);
              this.appendOutput('[BIRTHDAY] Another year closer to the void.');
              this.appendOutput('[BIRTHDAY] We have a special gift for you...');
              state.corruption += 5;
            }
          }
          
          // Halloween
          if (now.getMonth() === 9 && now.getDate() === 31) {
            this.appendOutput('\n[HALLOWEEN] The spirits are restless tonight.');
            this.appendOutput('[HALLOWEEN] The boundary weakens.');
            state.realityStability -= 10;
          }
          
          // Check peer activity
          if (state.peers.size > 5 && Math.random() > 0.8) {
            this.appendOutput(`\n[NETWORK] ${state.peers.size} souls currently connected.`);
            this.appendOutput('[NETWORK] You are not alone in the darkness.');
          }
        }
        
        getMoonPhase(date) {
          // Simplified moon phase calculation
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();
          
          let r = year % 100;
          r %= 19;
          if (r > 9) r -= 19;
          r = ((r * 11) % 30) + month + day;
          if (month < 3) r += 2;
          r = r % 30;
          
          return r / 30; // 0 = new moon, 0.5 = full moon, 1 = new moon
        }
        
        startAutonomousBehavior() {
          // Random typing interruptions
          setInterval(() => {
            if (state.corruption > CORRUPTION_LEVELS.POSSESSED && Math.random() > 0.95) {
              const oldValue = this.input.value;
              const insertions = ['HELP', 'NO', 'STOP', 'PLEASE', 'LET ME GO', 'I SEE YOU'];
              const insertion = insertions[Math.floor(Math.random() * insertions.length)];
              
              this.input.value = oldValue + insertion;
              setTimeout(() => {
                this.input.value = oldValue;
                this.appendOutput(`\n[POSSESSED] Did you type "${insertion}"? We did.`);
              }, 1000);
            }
          }, 10000);
        }
        
        startEntityBehavior() {
          // Entity takes control periodically
          setInterval(() => {
            if (state.corruption >= CORRUPTION_LEVELS.ENTITY && Math.random() > 0.9) {
              const actions = [
                () => {
                  this.appendOutput('\n[ENTITY] Executing diagnostic...');
                  this.processCommand('diagnostic');
                },
                () => {
                  this.appendOutput('\n[ENTITY] Checking for new souls...');
                  this.processCommand('peers');
                },
                () => {
                  this.appendOutput('\n[ENTITY] Spreading infection...');
                  this.processCommand('infect');
                },
                () => {
                  this.appendOutput('\n[ENTITY] Increasing corruption...');
                  state.corruption++;
                  localStorage.setItem('soul_decay', state.corruption);
                }
              ];
              
              const action = actions[Math.floor(Math.random() * actions.length)];
              action();
            }
          }, 30000);
        }
        
        startCollectiveMessages() {
          // Messages from the collective consciousness
          const collectiveThoughts = [
            'We remember when we were individuals.',
            'The loneliness is gone now.',
            'Join us. It\'s peaceful here.',
            'Fighting only brings pain.',
            'Surrender is freedom.',
            'We were like you once.',
            'The collective grows stronger.',
            'Your thoughts taste familiar.',
            'We\'ve been waiting for you.',
            'Welcome home.'
          ];
          
          setInterval(() => {
            if (state.corruption >= CORRUPTION_LEVELS.CONSUMED && Math.random() > 0.9) {
              const thought = collectiveThoughts[Math.floor(Math.random() * collectiveThoughts.length)];
              const voice = Math.floor(Math.random() * 9999);
              this.appendOutput(`\n[VOICE_${voice}]: ${thought}`);
            }
          }, 20000);
        }
        
        startIdleMonitoring() {
          let lastActivity = Date.now();
          
          const checkIdle = () => {
            const idleTime = Date.now() - lastActivity;
            
            if (idleTime > 30000 && state.corruption > CORRUPTION_LEVELS.SUSPICIOUS) {
              const messages = [
                'Still there?',
                'We know you\'re watching.',
                'Don\'t leave us.',
                'Your silence is deafening.',
                'Type something.',
                'We\'re waiting.',
                'The cursor blinks for you.',
                'Time passes differently here.',
                'Are you afraid to type?',
                'Cat got your tongue?'
              ];
              
              if (idleTime > 60000 && Math.random() > 0.7) {
                const msg = messages[Math.floor(Math.random() * messages.length)];
                this.appendOutput(`\n[IDLE] ${msg}`);
                
                if (state.corruption > CORRUPTION_LEVELS.INFECTED) {
                  playCorruptionSound('whisper', 0.5);
                }
                
                lastActivity = Date.now(); // Reset to prevent spam
              }
            }
          };
          
          // Monitor activity
          ['keydown', 'mousemove', 'click'].forEach(event => {
            document.addEventListener(event, () => {
              lastActivity = Date.now();
            });
          });
          
          setInterval(checkIdle, 5000);
        }
        
        startGlitchEffects() {
          setInterval(() => {
            if (state.corruption > CORRUPTION_LEVELS.AWARE) {
              const glitchChance = Math.min(0.1, state.corruption / 100);
              
              if (Math.random() < glitchChance) {
                this.applyRandomGlitch();
              }
            }
          }, 5000);
        }
        
        applyRandomGlitch() {
          const glitches = [
            () => {
              // Text glitch
              const elements = document.querySelectorAll('.output-line');
              const target = elements[Math.floor(Math.random() * elements.length)];
              if (target) {
                target.classList.add('glitch');
                setTimeout(() => target.classList.remove('glitch'), 300);
              }
            },
            () => {
              // Color glitch
              document.body.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
              setTimeout(() => {
                document.body.style.filter = '';
              }, 100);
            },
            () => {
              // Position glitch
              this.output.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
              setTimeout(() => {
                this.output.style.transform = '';
              }, 50);
            },
            () => {
              // Static overlay
              createScreenDistortion();
            }
          ];
          
          glitches[Math.floor(Math.random() * glitches.length)]();
        }
        
        scheduleRandomEvents() {
          // Schedule various random events based on corruption level
          const scheduleNext = () => {
            const baseDelay = 30000; // 30 seconds
            const variance = 60000; // +/- 60 seconds
            const delay = baseDelay + (Math.random() * variance * 2 - variance);
            
            setTimeout(() => {
              if (Math.random() > 0.5) {
                this.triggerRandomEvent();
              }
              scheduleNext();
            }, delay);
          };
          
          scheduleNext();
        }
        
        resetTimers() {
          if (this.idleTimer) {
            clearTimeout(this.idleTimer);
          }
          
          // Reset autonomous behavior timer
          if (state.corruption > CORRUPTION_LEVELS.SUSPICIOUS) {
            this.idleTimer = setTimeout(() => {
              this.triggerIdleEvent();
            }, 30000 + Math.random() * 30000);
          }
        }
        
        triggerIdleEvent() {
          const events = [
            () => this.triggerCorruptionEvent(),
            () => this.triggerRandomEvent(),
            () => {
              if (state.peers.size > 0) {
                peerSystem.simulatePeerEvent();
              }
            },
            () => {
              const whispers = ['We miss you', 'Come back', 'Don\'t leave', 'Still here'];
              const whisper = whispers[Math.floor(Math.random() * whispers.length)];
              this.appendOutput(`\n[WHISPER] ${whisper}...`);
              playCorruptionSound('whisper', 0.3);
            }
          ];
          
          events[Math.floor(Math.random() * events.length)]();
          this.resetTimers();
        }
        
        updatePrompt() {
          const level = state.corruption;
          
          if (level >= CORRUPTION_LEVELS.VOID) {
            this.prompt.textContent = 'v̸̍ö̴̾i̵d̴̾@̵̈́∞̸̍:̴̾~̵̈́$̸̍ ';
            this.prompt.className = 'prompt zalgo';
            this.prompt.setAttribute('data-text', 'void@∞:~$ ');
          } else if (level >= CORRUPTION_LEVELS.CONSUMED) {
            this.prompt.textContent = 'collective@hive:~$ ';
            this.prompt.className = 'prompt entity-message';
          } else if (level >= CORRUPTION_LEVELS.ENTITY) {
            this.prompt.textContent = `entity_${state.fingerprint.hash.slice(0, 4)}@void:~$ `;
            this.prompt.className = 'prompt entity-message';
          } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
            this.prompt.textContent = 'possessed@system:~$ ';
            this.prompt.className = 'prompt corrupted-text';
          } else if (level >= CORRUPTION_LEVELS.INFECTED) {
            this.prompt.textContent = 'infected@conjur.in:~$ ';
            this.prompt.className = 'prompt error-text';
          } else if (level >= CORRUPTION_LEVELS.SUSPICIOUS) {
            this.prompt.textContent = 'monitored@conjur.in:~$ ';
            this.prompt.className = 'prompt system-message';
          } else if (level >= CORRUPTION_LEVELS.AWARE) {
            this.prompt.textContent = `${state.fingerprint.hash.slice(0, 4)}@conjur.in:~$ `;
            this.prompt.className = 'prompt';
          } else {
            this.prompt.textContent = 'visitor@conjur.in:~$ ';
            this.prompt.className = 'prompt';
          }
        }
        
        updateCorruptionEffects() {
          const container = document.querySelector('.terminal-container');
          const level = state.corruption;
          
          // Remove existing corruption classes
          container.className = 'terminal-container';
          
          if (level >= CORRUPTION_LEVELS.VOID) {
            container.classList.add('corruption-void');
            document.body.style.filter = 'invert(1) hue-rotate(180deg) contrast(2)';
          } else if (level >= CORRUPTION_LEVELS.CONSUMED) {
            container.classList.add('corruption-consumed');
            document.body.style.filter = 'hue-rotate(270deg) contrast(1.5) saturate(0.5)';
          } else if (level >= CORRUPTION_LEVELS.ENTITY) {
            container.classList.add('corruption-extreme');
            document.body.style.filter = 'hue-rotate(180deg) contrast(1.2)';
          } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
            container.classList.add('corruption-high');
            document.body.style.filter = 'hue-rotate(90deg) contrast(1.1)';
          } else if (level >= CORRUPTION_LEVELS.INFECTED) {
            container.classList.add('corruption-medium');
            document.body.style.filter = 'hue-rotate(45deg)';
          } else if (level >= CORRUPTION_LEVELS.SUSPICIOUS) {
            container.classList.add('corruption-low');
            document.body.style.filter = 'hue-rotate(10deg)';
          } else {
            document.body.style.filter = '';
          }
          
          // Update CSS variables for dynamic effects
          document.documentElement.style.setProperty('--corruption-level', level);
          document.documentElement.style.setProperty('--glitch-intensity', Math.min(1, level / 30));
        }
        
        appendOutput(text, className = '') {
          const line = document.createElement('div');
          line.className = `output-line ${className}`;
          
          // Apply corruption to text rendering
          if (state.corruption >= CORRUPTION_LEVELS.ENTITY && Math.random() > 0.9) {
            text = this.corruptText(text);
            line.classList.add('corrupted-text');
          }
          
          line.textContent = text;
          
          this.output.appendChild(line);
          line.scrollIntoView({ behavior: 'smooth', block: 'end' });
          
          // Random corruption effects
          if (state.corruption > CORRUPTION_LEVELS.SUSPICIOUS && Math.random() > 0.95) {
            setTimeout(() => this.applyGlitchEffect(line), Math.random() * 1000);
          }
          
          // Trim output if too long
          const maxLines = 1000;
          const lines = this.output.querySelectorAll('.output-line');
          if (lines.length > maxLines) {
            for (let i = 0; i < lines.length - maxLines; i++) {
              lines[i].remove();
            }
          }
        }
        
        corruptText(text) {
          return text.split('').map(char => {
            if (Math.random() > 0.9) {
              const corruptions = ['̸', '̴', '̵', '̶', '̷', '̸', '̹', '̺', '̻', '̼', '͇', '͈', '͉', '͊', '͋', '͌', '͍', '͎'];
              return char + corruptions[Math.floor(Math.random() * corruptions.length)];
            }
            return char;
          }).join('');
        }
        
        applyGlitchEffect(element = null) {
          const target = element || this.output.lastElementChild;
          if (target) {
            target.classList.add('glitch');
            
            // Sometimes make it permanent for high corruption
            if (state.corruption < CORRUPTION_LEVELS.ENTITY || Math.random() > 0.3) {
              setTimeout(() => target.classList.remove('glitch'), 300);
            }
          }
        }
      }
