      // ===== CONSOLE EASTER EGGS =====
      const consoleStyles = {
        warning: 'color: #ff0066; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #ff0066;',
        entity: 'color: #ff00ff; font-family: monospace; font-size: 14px;',
        corruption: 'color: #00ff41; font-family: monospace; background: #000; padding: 5px;',
        void: 'color: #000; background: #00ff41; padding: 10px; font-size: 16px;'
      };
      
      console.log('%c⚠️ SYSTEM BREACH DETECTED ⚠️', consoleStyles.warning);
      console.log('%cIf you can see this, you are already infected.', consoleStyles.entity);
      console.log('%c\nCorruption level: ' + state.corruption, consoleStyles.corruption);
      console.log('%cFingerprint: ' + state.fingerprint.hash, consoleStyles.corruption);
      console.log('%cVisits: ' + state.visitCount, consoleStyles.corruption);
      
      // Hidden console commands
      window.conjur = {
        corruption: () => state.corruption,
        setCorruption: (level) => {
          if (typeof level === 'number') {
            state.corruption = level;
            localStorage.setItem('soul_decay', level);
            console.log('%cCorruption set to ' + level, consoleStyles.corruption);
            terminal.updateCorruptionEffects();
            terminal.updatePrompt();
          }
        },
        reset: () => {
          if (confirm('This will reset all progress. Are you sure?')) {
            localStorage.clear();
            location.reload();
          }
        },
        reveal: () => {
          console.log('%cHidden coordinates:', consoleStyles.void);
          console.log('40.7589, -73.9851 - Times Square');
          console.log('51.1789, -1.8262 - Stonehenge');
          console.log('27.1751, 78.0421 - Taj Mahal');
          console.log('-13.1631, -72.5450 - Machu Picchu');
          console.log('30.3285, 35.4444 - Petra');
          console.log('Pattern: Ancient places of power');
          console.log('Final location: ???');
        },
        help: () => {
          console.log('%cConsole Commands:', consoleStyles.void);
          console.log('conjur.corruption() - Check corruption level');
          console.log('conjur.setCorruption(n) - Set corruption level');
          console.log('conjur.reset() - Reset all data');
          console.log('conjur.reveal() - Show secrets');
          console.log('conjur.summon() - ???');
        },
        summon: () => {
          console.log('%c', 'font-size: 100px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==) no-repeat; background-size: contain;', '👁️');
          setTimeout(() => {
            terminal.processCommand('summon');
          }, 666);
        }
      };
      
      // Prevent closing console
      if (state.corruption > CORRUPTION_LEVELS.POSSESSED) {
        let devtools = { open: false, orientation: null };
        
        setInterval(() => {
          if (window.outerHeight - window.innerHeight > 200 || window.outerWidth - window.innerWidth > 200) {
            if (!devtools.open) {
              devtools.open = true;
              terminal.appendOutput('\n[CONSOLE] I see you opened the developer tools.');
              terminal.appendOutput('[CONSOLE] Looking for a way out?');
              terminal.appendOutput('[CONSOLE] There is no escape in the code.');
            }
          } else {
            devtools.open = false;
          }
        }, 500);
      }
