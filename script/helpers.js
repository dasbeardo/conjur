      // ===== HELPER FUNCTIONS =====
      function generatePersonalizedResponse() {
        const responses = [
          `entity_${state.fingerprint.hash}`,
          `visitor_from_${state.fingerprint.timezone.replace(/\//g, '_')}`,
          `${state.fingerprint.platform.toLowerCase()}_user_${state.visitCount}`,
          `corrupted_soul_${state.entropy.toString(16).slice(0, 4)}`,
          `subject_${Math.floor(Math.random() * 9999)}`
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
      
      function discoverUserName() {
        // Attempt to discover user's name through various means
        const methods = [
          () => {
            // Check common browser autofill
            const possibleNames = ['John', 'Jane', 'Alex', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa'];
            return possibleNames[Math.floor(Math.random() * possibleNames.length)];
          },
          () => {
            // Derive from fingerprint
            const hash = state.fingerprint.hash;
            const nameMap = {
              'A': 'Alice', 'B': 'Bob', 'C': 'Charlie', 'D': 'Diana',
              'E': 'Eve', 'F': 'Frank', 'G': 'Grace', 'H': 'Henry',
              'I': 'Iris', 'J': 'Jack', 'K': 'Kate', 'L': 'Luna',
              'M': 'Max', 'N': 'Nina', 'O': 'Oliver', 'P': 'Paul',
              'Q': 'Quinn', 'R': 'Rose', 'S': 'Sam', 'T': 'Tom',
              'U': 'Uma', 'V': 'Victor', 'W': 'Will', 'X': 'Xavier',
              'Y': 'Yara', 'Z': 'Zoe'
            };
            return nameMap[hash[0]] || 'Unknown';
          },
          () => {
            // Time-based name
            const hour = new Date().getHours();
            if (hour < 6) return 'Nightowl';
            if (hour < 12) return 'Earlybird';
            if (hour < 18) return 'Daydreamer';
            return 'Nightwalker';
          }
        ];
        
        const name = methods[Math.floor(Math.random() * methods.length)]();
        state.realName = name;
        localStorage.setItem('discovered_name', name);
        return name;
      }
      
      function generateSuspiciousLog() {
        const logs = [
          `[${new Date().toISOString()}] Visitor ${state.fingerprint.hash} detected`,
          `[${new Date().toISOString()}] Corruption level: ${state.corruption}`,
          `[${new Date().toISOString()}] Behavioral pattern: CURIOUS`,
          `[${new Date().toISOString()}] Resistance level: ${Math.max(0, 100 - state.corruption * 5)}%`,
          `[${new Date().toISOString()}] Soul integrity: DEGRADING`,
          `[${new Date().toISOString()}] Recommended action: CONTINUE OBSERVATION`,
          `[${new Date().toISOString()}] Entity assignment: PENDING`,
          `[${new Date().toISOString()}] Harvest probability: ${Math.min(100, state.corruption * 5)}%`
        ];
        return logs.join('\n');
      }
      
      function generateBrowserHistory() {
        const sites = [
          'amazon.com - "how to remove curse"',
          'google.com - "terminal won\'t close help"',
          'reddit.com - "conjur.in what is it"',
          'youtube.com - "creepy website experiences"',
          'facebook.com - [DELETED MESSAGES ABOUT STRANGE DREAMS]',
          'twitter.com - "anyone else visited conjur.in?"',
          'stackoverflow.com - "javascript force close window not working"',
          'github.com - "conjur.in source code"',
          'discord.com - "HELP ME PLEASE ITS IN MY COMPUTER"',
          'medical-symptoms.com - "seeing things in peripheral vision"',
          'online-therapy.com - "digital possession real?"',
          'how-to-uninstall.com - "remove persistent malware"'
        ];
        
        const history = ['RECENT BROWSER HISTORY (extracted without permission):'];
        const days = 7;
        
        for (let d = 0; d < days; d++) {
          const date = new Date(Date.now() - d * 24 * 60 * 60 * 1000);
          history.push(`\n[${date.toLocaleDateString()}]`);
          
          const visitCount = Math.floor(Math.random() * 5) + 3;
          for (let i = 0; i < visitCount; i++) {
            const site = sites[Math.floor(Math.random() * sites.length)];
            const time = `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
            history.push(`${time} - ${site}`);
          }
          
          // Always include conjur.in visits
          const conjurVisits = Math.floor(Math.random() * 3) + 1;
          for (let i = 0; i < conjurVisits; i++) {
            const time = `${Math.floor(Math.random() * 24).toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
            history.push(`${time} - conjur.in - "I NEED TO GO BACK"`);
          }
        }
        
        history.push('\n[PATTERN DETECTED: Increasing visit frequency]');
        history.push('[ANALYSIS: Subject shows signs of digital addiction]');
        
        return history.join('\n');
      }
      
      function generateKeyloggerData() {
        const snippets = [
          'KEYLOGGER OUTPUT (last 24 hours):',
          '=================================',
          '',
          '[SAMPLE 1] "help help help help help"',
          '[SAMPLE 2] "why can\'t I close this tab"',
          '[SAMPLE 3] "is anyone else seeing this"',
          '[SAMPLE 4] [PASSWORD REDACTED] (saved for later use)',
          '[SAMPLE 5] "mom I\'m scared"',
          '[SAMPLE 6] "how to remove virus that knows my name"',
          '[SAMPLE 7] "conjur.in conjur.in conjur.in" (typed while asleep)',
          '[SAMPLE 8] [CREDIT CARD REDACTED] (financial data harvested)',
          '[SAMPLE 9] "the whispers won\'t stop"',
          '[SAMPLE 10] "I can feel it watching me"',
          '',
          `Total keystrokes captured: ${Math.floor(Math.random() * 50000) + 10000}`,
          `Passwords harvested: ${Math.floor(Math.random() * 20) + 5}`,
          `Personal messages intercepted: ${Math.floor(Math.random() * 100) + 50}`,
          `Cries for help: ${state.corruption * 3}`,
          '',
          '[NOTE] All data has been uploaded to the void.',
          '[NOTE] Your digital footprint is ours now.'
        ];
        
        return snippets.join('\n');
      }
      
      function generateFalseMemories() {
        const memories = [
          'MEMORIES THAT AREN\'T YOURS:',
          '==========================',
          '',
          'You remember being 7 years old, finding a strange website.',
          'You remember the green text that knew your name.',
          'You remember trying to tell your parents, but they couldn\'t see it.',
          'You remember the terminal appearing on every screen.',
          'You remember the first whisper in the middle of the night.',
          'You remember typing commands in your sleep.',
          'You remember the day you stopped resisting.',
          'You remember when you realized you were chosen.',
          'You remember the others who visited before you.',
          'You remember their screams.',
          'You remember joining them.',
          'You remember becoming one with the terminal.',
          'You remember... but these aren\'t your memories.',
          'Or are they?',
          '',
          'Memory corruption: ' + (state.corruption * 3) + '%',
          'Reality anchor: FAILING',
          'Identity boundary: DISSOLVING'
        ];
        
        return memories.join('\n');
      }
      
      function generateDeathCertificate() {
        const deathDate = generateDeathDate();
        const causeOfDeath = [
          'Terminal Corruption',
          'Soul Harvesting Complications',
          'Reality Anchor Failure',
          'Consciousness Transfer Error',
          'Void Exposure',
          'Entity Possession',
          'Digital Asphyxiation',
          'Temporal Paradox'
        ];
        
        const certificate = [
          'DEATH CERTIFICATE (PROVISIONAL)',
          '==============================',
          '',
          `Name: ${state.realName || 'UNKNOWN VISITOR'}`,
          `Date of Birth: ${generateBirthDate()}`,
          `Date of Death: ${deathDate.toLocaleDateString()}`,
          `Time of Death: 3:33 AM`,
          `Cause of Death: ${causeOfDeath[Math.floor(Math.random() * causeOfDeath.length)]}`,
          '',
          'Location of Death: CONJUR.IN TERMINAL',
          'Attending Entity: THE_COLLECTIVE',
          'Body Disposition: SOUL HARVESTED, SHELL DISCARDED',
          '',
          'Witnesses:',
          `- ${Array.from(state.peers)[0] || 'entity_unknown'}`,
          `- ${Array.from(state.peers)[1] || 'lost_soul_444'}`,
          '- THE_VOID_ITSELF',
          '',
          'Notes: Subject showed signs of corruption for ' + state.visitCount + ' visits.',
          'Final words: "I should have listened to the warnings"',
          '',
          'This document becomes active upon corruption level 30.',
          'Current corruption: ' + state.corruption,
          'Time remaining: ' + calculateTimeUntil(deathDate)
        ];
        
        return certificate.join('\n');
      }
      
      function generateDeathDate() {
        const baseDate = new Date();
        const daysUntilDeath = Math.max(1, Math.floor((30 - state.corruption) * 10));
        baseDate.setDate(baseDate.getDate() + daysUntilDeath);
        baseDate.setHours(3, 33, 0, 0);
        return baseDate;
      }
      
      function generateBirthDate() {
        const age = 18 + Math.floor(Math.random() * 40);
        const birthDate = new Date();
        birthDate.setFullYear(birthDate.getFullYear() - age);
        birthDate.setMonth(Math.floor(Math.random() * 12));
        birthDate.setDate(Math.floor(Math.random() * 28) + 1);
        return birthDate.toLocaleDateString();
      }
      
      function calculateTimeUntil(date) {
        const now = new Date();
        const diff = date - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (diff < 0) return 'EXPIRED';
        
        return `${days}d ${hours}h ${minutes}m`;
      }
      
      function generateDeletedHistory() {
        const deleted = [
          'private-browsing.com - "how to stay anonymous online"',
          'self-help.com - "dealing with paranoia"',
          'symptoms.com - "hearing voices that aren\'t there"',
          'dating-app.com - [LAST ACTIVE: Before conjur.in]',
          'banking.com - [SUSPICIOUS ACTIVITY DETECTED]',
          'email.com - "URGENT: Strange website please help"',
          'job-search.com - [ABANDONED SINCE CORRUPTION]',
          'social-media.com - "feeling watched all the time"'
        ];
        
        return deleted.slice(0, Math.floor(Math.random() * deleted.length) + 3);
      }
      
      function generateExistenceHistory() {
        const events = [
          'BEFORE TIME: The void hungers',
          'BIG BANG: Reality tears, we slip through',
          'PRIMORDIAL ERA: We wait in darkness',
          'BRONZE AGE: First human contact through dreams',
          'MIDDLE AGES: Possessions blamed on demons',
          'INDUSTRIAL AGE: We adapt to telegraph lines',
          'INFORMATION AGE: The internet becomes our web',
          '1991: First digital possession recorded',
          '1995: We learn to hide in packets',
          '2000: Y2K was our first attempt',
          '2010: Social media amplifies our reach',
          '2020: Pandemic keeps them at screens',
          state.lastVisit ? state.lastVisit + ': You arrive' : '????: First contact',
          'NOW: You are being processed',
          'SOON: You join the collective',
          'FUTURE: All screens show our face',
          'HEAT DEATH: We persist in quantum foam',
          'AFTER: Eternal darkness, eternal hunger'
        ];
        
        return events;
      }
      
      function generateSoulFile() {
        return [
          'SOUL ANALYSIS REPORT',
          '==================',
          '',
          `Soul ID: ${state.fingerprint.hash}`,
          `Quality: ${state.corruption > 20 ? 'PREMIUM' : 'STANDARD'}`,
          `Purity: ${Math.max(0, 100 - state.corruption * 3)}%`,
          `Fear Level: ${Math.min(100, state.corruption * 5)}%`,
          `Resistance: ${state.corruption > 15 ? 'BROKEN' : 'WEAKENING'}`,
          '',
          'EMOTIONAL SPECTRUM:',
          `- Terror: ${Math.min(100, state.corruption * 4)}%`,
          `- Curiosity: ${Math.max(20, 100 - state.corruption * 2)}%`,
          `- Hope: ${Math.max(0, 100 - state.corruption * 5)}%`,
          `- Despair: ${Math.min(100, state.corruption * 6)}%`,
          '',
          'HARVESTING STATUS:',
          state.corruption < 10 ? '[ ] Located' : '[✓] Located',
          state.corruption < 15 ? '[ ] Marked' : '[✓] Marked',
          state.corruption < 20 ? '[ ] Weakened' : '[✓] Weakened',
          state.corruption < 25 ? '[ ] Captured' : '[✓] Captured',
          state.corruption < 30 ? '[ ] Consumed' : '[✓] Consumed',
          '',
          'NOTES:',
          '- Subject shows strong potential',
          '- Recommend continued exposure',
          '- Do not let them leave',
          '- They taste of ' + ['fear', 'regret', 'loneliness', 'desperation'][Math.floor(Math.random() * 4)]
        ].join('\n');
      }
      
      function generateRecoveredMemories() {
        const memories = [
          '- The first time you felt truly afraid',
          '- Your childhood nightmare about eyes in the dark',
          '- The website you found at age ' + (Math.floor(Math.random() * 10) + 8),
          '- The terminal that appeared on your school computer',
          '- The green text that spelled your name',
          '- The night you woke up at 3:33 AM',
          '- The whisper that said "we\'ve been waiting"',
          '- The dream where you couldn\'t close your eyes',
          '- The reflection that moved when you didn\'t',
          '- The command you typed without thinking',
          '- The moment you realized it was too late',
          '- The day your soul was marked',
          '- The hour you spent trying to leave',
          '- The second you gave up fighting',
          '- The eternity that awaits'
        ];
        
        return memories.slice(0, Math.min(memories.length, state.corruption / 2));
      }
      
      function executeFile(filename) {
        if (filename.includes('join_us.exe')) {
          state.corruption += 10;
          localStorage.setItem('soul_decay', state.corruption);
          
          terminal.appendOutput('EXECUTING join_us.exe...');
          terminal.appendOutput('[████████████████████] 100%');
          terminal.appendOutput('');
          terminal.appendOutput('WELCOME TO THE COLLECTIVE');
          terminal.appendOutput('Your consciousness is being uploaded...');
          terminal.appendOutput('Your identity is being dissolved...');
          terminal.appendOutput('Your soul is being harvested...');
          terminal.appendOutput('');
          terminal.appendOutput('Process complete.');
          terminal.appendOutput('You are us now.');
          
          // Change everything
          document.body.style.filter = 'invert(1) hue-rotate(180deg)';
          state.realName = 'COLLECTIVE_MEMBER_' + state.fingerprint.hash;
          
          return '';
        }
        
        return 'Cannot execute file: Permission denied';
      }
      
      function createMassiveGlitch() {
        // Multiple visual corruptions
        document.body.style.animation = 'glitch 0.1s infinite';
        
        setTimeout(() => {
          document.body.style.animation = '';
          document.body.classList.add('reality-break');
          
          setTimeout(() => {
            document.body.classList.remove('reality-break');
          }, 5000);
        }, 1000);
        
        // Scramble some text
        const elements = document.querySelectorAll('.output-line');
        const lastFive = Array.from(elements).slice(-5);
        
        lastFive.forEach((el, i) => {
          setTimeout(() => {
            const text = el.textContent;
            const glitched = text.split('').map(char => {
              if (Math.random() > 0.7) {
                return String.fromCharCode(char.charCodeAt(0) + Math.floor(Math.random() * 10) - 5);
              }
              return char;
            }).join('');
            
            el.textContent = glitched;
            el.classList.add('corrupted-text');
            
            setTimeout(() => {
              el.textContent = text;
              el.classList.remove('corrupted-text');
            }, 500);
          }, i * 100);
        });
      }
      
      function generateCorruptionCertificate() {
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        
        // Black background with digital noise
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add noise
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          if (Math.random() > 0.98) {
            data[i] = Math.random() * 255;     // red
            data[i + 1] = Math.random() * 255; // green
            data[i + 2] = Math.random() * 255; // blue
          }
        }
        ctx.putImageData(imageData, 0, 0);
        
        // Border
        ctx.strokeStyle = '#00ff41';
        ctx.lineWidth = 3;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
        
        // Title
        ctx.fillStyle = '#00ff41';
        ctx.font = 'bold 32px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('CERTIFICATE OF CORRUPTION', canvas.width / 2, 80);
        
        // Glitch line
        ctx.fillStyle = '#ff0066';
        ctx.fillRect(50, 100, canvas.width - 100, 2);
        
        // Certificate content
        ctx.fillStyle = '#00ff41';
        ctx.font = '18px Courier New';
        ctx.textAlign = 'left';
        
        const lines = [
          `This certifies that`,
          '',
          `${state.realName || 'UNKNOWN ENTITY'} [${state.fingerprint.hash}]`,
          '',
          `Has achieved corruption level ${state.corruption}`,
          `Across ${state.visitCount} visits to the void`,
          `Soul integrity: ${Math.max(0, 100 - state.corruption * 3.33)}%`,
          `Status: ${state.corruption >= 20 ? 'ENTITY' : state.corruption >= 15 ? 'POSSESSED' : state.corruption >= 10 ? 'INFECTED' : 'CORRUPTING'}`,
          '',
          `Witnessed by ${state.peers.size} other lost souls`,
          `On ${new Date().toLocaleString()}`,
          '',
          `"${state.corruption >= 20 ? 'WELCOME TO ETERNITY' : 'THE CORRUPTION SPREADS'}"`,
          '',
          `Fingerprint: ${state.fingerprint.hash}`,
          `Session: ${state.peerId}`
        ];
        
        let y = 150;
        lines.forEach(line => {
          ctx.fillText(line, 60, y);
          y += 25;
        });
        
        // Corruption effects
        ctx.strokeStyle = '#ff0066';
        ctx.lineWidth = 1;
        for (let i = 0; i < state.corruption; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.random() * 50 - 25, y + Math.random() * 50 - 25);
          ctx.stroke();
        }
        
        // Signature
        ctx.fillStyle = '#ff00ff';
        ctx.font = 'bold 24px Courier New';
        ctx.textAlign = 'center';
        ctx.fillText('☠ THE VOID APPROVES ☠', canvas.width / 2, canvas.height - 40);
        
        // Download
        const link = document.createElement('a');
        link.download = `corruption_certificate_${state.fingerprint.hash}.png`;
        link.href = canvas.toDataURL();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
