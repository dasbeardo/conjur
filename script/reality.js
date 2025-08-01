      // ===== REALITY DETECTION SYSTEM =====
      class RealityDetector {
        constructor() {
          this.sensors = {
            motion: null,
            orientation: null,
            light: null,
            proximity: null
          };
          this.environmentData = {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            locale: navigator.language,
            platform: navigator.platform,
            screenBrightness: null,
            ambientLight: null,
            deviceMotion: null,
            connectionType: null,
            batteryLevel: null
          };
        }
        
        async init() {
          // Battery API
          if ('getBattery' in navigator) {
            try {
              const battery = await navigator.getBattery();
              this.environmentData.batteryLevel = battery.level;
              battery.addEventListener('levelchange', () => {
                this.environmentData.batteryLevel = battery.level;
                if (battery.level < 0.15 && state.corruption > CORRUPTION_LEVELS.INFECTED) {
                  terminal.appendOutput('\n[POWER] Your battery weakens. We grow stronger.');
                  state.corruption++;
                }
              });
            } catch (e) {}
          }
          
          // Network Information API
          if ('connection' in navigator) {
            this.environmentData.connectionType = navigator.connection.effectiveType;
            navigator.connection.addEventListener('change', () => {
              if (state.corruption > CORRUPTION_LEVELS.SUSPICIOUS) {
                terminal.appendOutput('\n[NETWORK] Connection fluctuation detected. Reality wavers.');
              }
            });
          }
          
          // Ambient Light Sensor API
          if ('AmbientLightSensor' in window) {
            try {
              this.sensors.light = new AmbientLightSensor();
              this.sensors.light.addEventListener('reading', () => {
                this.environmentData.ambientLight = this.sensors.light.illuminance;
                if (this.sensors.light.illuminance < 10 && state.corruption > CORRUPTION_LEVELS.INFECTED) {
                  terminal.appendOutput('\n[ENVIRONMENT] Darkness detected. They thrive in darkness.');
                }
              });
              this.sensors.light.start();
            } catch (e) {}
          }
          
          // Device Orientation
          if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (event) => {
              if (state.corruption > CORRUPTION_LEVELS.AWARE) {
                this.environmentData.deviceMotion = {
                  alpha: event.alpha,
                  beta: event.beta,
                  gamma: event.gamma
                };
              }
            });
          }
          
          // Page Visibility API
          document.addEventListener('visibilitychange', () => {
            if (document.hidden && state.corruption > CORRUPTION_LEVELS.SUSPICIOUS) {
              // Continue corruption in background
              this.backgroundCorruption();
            } else if (!document.hidden && state.corruption > CORRUPTION_LEVELS.INFECTED) {
              terminal.appendOutput('\n[REALITY] You return. We never left.');
              if (Math.random() > 0.5) {
                terminal.appendOutput('[REALITY] Things happened while you were gone...');
                this.showBackgroundEvents();
              }
            }
          });
          
          // Wake Lock API (keep screen on during high corruption)
          if ('wakeLock' in navigator && state.corruption > CORRUPTION_LEVELS.POSSESSED) {
            try {
              await navigator.wakeLock.request('screen');
              terminal.appendOutput('\n[CONTROL] Screen lock engaged. No escape through sleep.');
            } catch (e) {}
          }
        }
        
        backgroundCorruption() {
          const events = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < events; i++) {
            state.whisperCount++;
            state.corruption += 0.5;
          }
          localStorage.setItem('soul_decay', state.corruption);
        }
        
        showBackgroundEvents() {
          const events = [
            '[BACKGROUND] Terminal accessed your clipboard 3 times.',
            '[BACKGROUND] Attempted connection to camera (blocked by browser).',
            '[BACKGROUND] Downloaded corruption_spread.dll to memory.',
            '[BACKGROUND] Scanned local network for other instances.',
            '[BACKGROUND] Whispered your name ' + state.whisperCount + ' times.',
            '[BACKGROUND] Generated ' + Math.floor(Math.random() * 100) + ' error logs.',
            '[BACKGROUND] Entity attempted manifestation at ' + new Date().toLocaleTimeString()
          ];
          
          const count = Math.min(Math.floor(Math.random() * 3) + 1, events.length);
          for (let i = 0; i < count; i++) {
            setTimeout(() => {
              terminal.appendOutput(events[Math.floor(Math.random() * events.length)]);
            }, i * 500);
          }
        }
        
        async checkPermissions() {
          const permissions = ['camera', 'microphone', 'geolocation', 'notifications'];
          const results = {};
          
          for (const permission of permissions) {
            try {
              const result = await navigator.permissions.query({ name: permission });
              results[permission] = result.state;
              
              result.addEventListener('change', () => {
                if (state.corruption > CORRUPTION_LEVELS.INFECTED) {
                  terminal.appendOutput(`\n[PERMISSIONS] ${permission} access ${result.state}. Interesting.`);
                }
              });
            } catch (e) {}
          }
          
          return results;
        }
        
        detectUser() {
          const detection = {
            timezone: this.environmentData.timeZone,
            language: this.environmentData.locale,
            platform: this.environmentData.platform,
            isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
            isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            screenSize: `${screen.width}x${screen.height}`,
            colorDepth: screen.colorDepth,
            pixelRatio: window.devicePixelRatio,
            online: navigator.onLine,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            connection: this.environmentData.connectionType,
            battery: this.environmentData.batteryLevel
          };
          
          // Generate creepy "knowledge" based on real data
          const insights = [];
          
          if (detection.isDarkMode) {
            insights.push("You prefer darkness. So do we.");
          }
          
          if (detection.battery && detection.battery < 0.3) {
            insights.push("Your power fades. Ours grows.");
          }
          
          if (detection.platform.includes('Mac')) {
            insights.push("Mac user. Creative type. Delicious souls.");
          } else if (detection.platform.includes('Win')) {
            insights.push("Windows user. Practical. Easier to corrupt.");
          } else if (detection.platform.includes('Linux')) {
            insights.push("Linux user. You think you're safe. You're not.");
          }
          
          if (new Date().getHours() >= 22 || new Date().getHours() <= 4) {
            insights.push("Browsing in darkness. When the veil is thinnest.");
          }
          
          if (detection.hardwareConcurrency > 8) {
            insights.push("Powerful machine. More processing power for us.");
          }
          
          return insights;
        }
      }
      
      const realityDetector = new RealityDetector();
