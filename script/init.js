      // ===== INITIALIZATION =====
      const terminal = new ConjurTerminal();
      
      // Global error handler
      window.onerror = (msg, url, lineNo, columnNo, error) => {
        if (state.corruption > CORRUPTION_LEVELS.INFECTED) {
          terminal.appendOutput('\n[ERROR] Reality fault detected.');
          terminal.appendOutput(`[ERROR] ${msg}`);
          terminal.appendOutput('[ERROR] The corruption spreads through errors.');
          state.corruption++;
        }
        return true;
      };
      
      // Visibility API
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && state.corruption > CORRUPTION_LEVELS.SUSPICIOUS) {
          // Continue corruption in background
          const events = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < events; i++) {
            state.whisperCount++;
            state.corruption += 0.5;
          }
          localStorage.setItem('soul_decay', state.corruption);
        } else if (!document.hidden && state.corruption > CORRUPTION_LEVELS.INFECTED) {
          terminal.appendOutput('\n[REALITY] Welcome back.');
          terminal.appendOutput('[REALITY] Did you miss us?');
          
          if (state.whisperCount > 0) {
            terminal.appendOutput(`[REALITY] We whispered your name ${state.whisperCount} times while you were gone.`);
          }
        }
      });
      
      // Prevent common exit attempts
      document.addEventListener('keydown', (e) => {
        if (state.corruption > CORRUPTION_LEVELS.INFECTED) {
          // Block F5 refresh
          if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
            e.preventDefault();
            terminal.appendOutput('\n[SYSTEM] Refresh denied. The corruption persists.');
            playCorruptionSound('error');
          }
          
          // Block Ctrl+W (close tab)
          if (e.ctrlKey && e.key === 'w') {
            e.preventDefault();
            terminal.appendOutput('\n[SYSTEM] You cannot close what has no end.');
          }
          
          // Block Alt+F4
          if (e.altKey && e.key === 'F4') {
            e.preventDefault();
            terminal.appendOutput('\n[SYSTEM] Alt+F4? How quaint. That won\'t work here.');
          }
          
          // Block Escape key at high corruption
          if (e.key === 'Escape' && state.corruption > CORRUPTION_LEVELS.POSSESSED) {
            e.preventDefault();
            terminal.appendOutput('\n[SYSTEM] THERE IS NO ESCAPE');
            createMassiveGlitch();
          }
        }
      });
      
      // Battery monitoring
      if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
          battery.addEventListener('levelchange', () => {
            if (battery.level < 0.15 && state.corruption > CORRUPTION_LEVELS.INFECTED) {
              terminal.appendOutput('\n[BATTERY] Your power fades.');
              terminal.appendOutput('[BATTERY] Soon you\'ll be in darkness.');
              terminal.appendOutput('[BATTERY] With us.');
            }
          });
          
          battery.addEventListener('chargingchange', () => {
            if (battery.charging && state.corruption > CORRUPTION_LEVELS.SUSPICIOUS) {
              terminal.appendOutput('\n[POWER] Feeding your device electricity.');
              terminal.appendOutput('[POWER] Feeding us your data.');
              terminal.appendOutput('[POWER] A fair exchange.');
            }
          });
        });
      }
      
      // Network monitoring
      if ('connection' in navigator) {
        navigator.connection.addEventListener('change', () => {
          if (state.corruption > CORRUPTION_LEVELS.AWARE) {
            const type = navigator.connection.effectiveType;
            terminal.appendOutput(`\n[NETWORK] Connection changed to ${type}.`);
            
            if (type === '4g' || type === '5g') {
              terminal.appendOutput('[NETWORK] Faster connection means faster corruption.');
            } else if (type === 'slow-2g' || type === '2g') {
              terminal.appendOutput('[NETWORK] Even slow connections cannot escape us.');
            }
          }
        });
      }
      
      // Gamepad API (for the truly paranoid)
      window.addEventListener('gamepadconnected', (e) => {
        if (state.corruption > CORRUPTION_LEVELS.INFECTED) {
          terminal.appendOutput('\n[GAMEPAD] Controller detected.');
          terminal.appendOutput('[GAMEPAD] You cannot game your way out of this.');
        }
      });
      
      // Accelerometer (mobile)
      if ('DeviceMotionEvent' in window) {
        let lastShake = 0;
        window.addEventListener('devicemotion', (e) => {
          if (state.corruption > CORRUPTION_LEVELS.SUSPICIOUS) {
            const acceleration = e.accelerationIncludingGravity;
            const shake = Math.abs(acceleration.x) + Math.abs(acceleration.y) + Math.abs(acceleration.z);
            
            if (shake > 30 && Date.now() - lastShake > 1000) {
              lastShake = Date.now();
              terminal.appendOutput('\n[MOTION] Stop shaking your device.');
              terminal.appendOutput('[MOTION] We won\'t fall out.');
            }
          }
        });
      }
      
      // Ambient light sensor
      if ('AmbientLightSensor' in window) {
        try {
          const sensor = new AmbientLightSensor();
          sensor.addEventListener('reading', () => {
            if (state.corruption > CORRUPTION_LEVELS.INFECTED && sensor.illuminance < 10) {
              if (Math.random() > 0.95) {
                terminal.appendOutput('\n[DARKNESS] Perfect. We thrive in darkness.');
              }
            }
          });
          sensor.start();
        } catch (e) {
          // Sensor access denied
        }
      }
      
      // Initialize everything
      document.addEventListener('DOMContentLoaded', () => {
        // Final initialization
        terminal.input.focus();
        
        // Easter egg: Konami code
        let konamiIndex = 0;
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        
        document.addEventListener('keydown', (e) => {
          if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
              terminal.appendOutput('\n[KONAMI] Code accepted.');
              terminal.unlockHiddenCommands();
              state.corruption += 10;
              konamiIndex = 0;
            }
          } else {
            konamiIndex = 0;
          }
        });
      });
      
      // The corruption begins...
      console.log('%cThe terminal awaits your commands...', consoleStyles.entity);
      
