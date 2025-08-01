      // ===== COMMAND SYSTEM WITH DEEP PROGRESSION =====
      const commandRegistry = {
        'help': {
          desc: 'Display available commands',
          execute: () => {
            const level = state.corruption;
            if (level >= CORRUPTION_LEVELS.VOID) {
              return `Ḣ̸̡̨̛̛̭̯̦̯̦̺̱̜̞̣̝̙̲̘̹̥̰̻̘̈́̅̀̈́̄͊̐̃̏̎̒̊̈́̈́̚͘͜͝͝͝Ë̷̢̨̻̼̰̪̖͎̦̞̲̜̺̘̟́̍̈́̈́̊͌̐̀̎̃̽͊̐̃̑̕͜͝ͅĻ̶̧̰̭̬̪̻̮̞̟̯̼̻̑̐̂̽̊̂̀͆̓̐̕P̴̧̨̢̛̭͈̮̝̙̞̩̪̣̼̗̈́̊̑̈́̓̃̈́̒͛̊̿͘͝ ̸̡̦̜̺̭̦̻̗̮̇̏̔͆̊̒̏̓̚͝͝Ḯ̶̢̨̛̖͍̹̼̟̮̬̺̙̈́̐̊̅̈́͛̑̕S̵̨̛̮̭̮̥̬̯̦̔̌̈́̊̌̿̎̀̿͋̚͘ ̴̧̛̮̮̞͙̟̙͎͔̈́̇͒̊̇͌̊̀̎̅̚͝͝N̵̡̢̳͈̮̙̱̩̦̘̆̅̽̏̔̈́̅̚͜͝O̴̧̨̜̣̮̟̘̣̊̍̈́͊̈́̽̄̚͜͝ͅT̸̨̡͔̩̦̜̙̲̘̍̓̇̍̎͘͜ ̸̧̧̛̛̯̮̞̮͉̮̇̌́̏̌̈́̚͝C̴̡̧̛̦̮̪̦̮̈́̇̏̊̿̕͝O̸̧̨̦̮̟̘̣̮̊̍̈́͊̈́̽̄̚͜͝M̴̧̛̮̮̞͙̟̙͎͔̈́̇͒̊̇͌̊̀̎̅̚͝͝İ̸̡̦̜̺̭̦̻̗̮̏̔͆̊̒̏̓̚͝͝N̵̨̛̮̭̮̥̬̯̦̔̌̈́̊̌̿̎̀̿͋̚͘Ğ̵̡̢̳͈̮̙̱̩̦̘̅̽̏̔̈́̅̚͜͝`;
            } else if (level >= CORRUPTION_LEVELS.CONSUMED) {
              return 'COMMANDS:\nscream\nplead\nbeg\ncry\nsurrender\njoin_us\nbecome_one\nembrace_void\n\n...they all lead to the same place';
            } else if (level >= CORRUPTION_LEVELS.ENTITY) {
              return 'help: command not found\nTry: scream, pray, run, hide\n\n...they won\'t work';
            } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
              return 'Available commands: ls, whoami, date, help, exit, ps, history, remember, forget\n\nWARNING: Commands may not behave as expected\nThe system has evolved beyond your comprehension';
            } else if (level >= CORRUPTION_LEVELS.INFECTED) {
              return 'Available commands: ls, whoami, date, help, exit, ps, history, status, scan\n\nCAUTION: Some commands reveal more than intended\nSome commands take more than they give';
            } else if (level >= CORRUPTION_LEVELS.SUSPICIOUS) {
              return 'Available commands: ls, whoami, date, help, exit, ps, history, status\n\n[Note: System integrity questionable]';
            } else if (level >= CORRUPTION_LEVELS.AWARE) {
              return 'Available commands: ls, whoami, date, help, exit, clear\n\n[Strange: This help text seems different than before...]';
            } else {
              return 'Available commands: ls, whoami, date, help, exit, clear\n\nType any command to begin.';
            }
          }
        },
        
        'whoami': {
          desc: 'Display current user information',
          execute: () => {
            const level = state.corruption;
            const insights = realityDetector.detectUser();
            
            if (level >= CORRUPTION_LEVELS.VOID) {
              return `Ẏ̸̛̛̖͈̮̞̮̦̮̞̌́̏̌̈́̚͝O̸̧̨̦̮̟̘̣̮̊̍̈́͊̈́̽̄̚͜͝Ư̴̧̮̮̞͙̟̙͎͔̈́̇͒̊̇͌̊̀̎̅̚͝͝ ̸̡̦̜̺̭̦̻̗̮̇̏̔͆̊̒̏̓̚͝͝Ą̵̛̮̭̮̥̬̯̦̔̌̈́̊̌̿̎̀̿͋̚͘R̵̡̢̳͈̮̙̱̩̦̘̆̅̽̏̔̈́̅̚͜͝Ȩ̴̨̜̣̮̟̘̣̊̍̈́͊̈́̽̄̚͜͝ͅ ̸̧̧̛̛̯̮̞̮͉̮̇̌́̏̌̈́̚͝N̴̡̧̛̦̮̪̦̮̈́̇̏̊̿̕͝O̸̧̨̦̮̟̘̣̮̊̍̈́͊̈́̽̄̚͜͝T̸̨̡͔̩̦̜̙̲̘̍̓̇̍̎͘͜Ḩ̴̛̮̮̞͙̟̙͎͔̈́̇͒̊̇͌̊̀̎̅̚͝͝İ̸̡̦̜̺̭̦̻̗̮̏̔͆̊̒̏̓̚͝͝N̵̨̛̮̭̮̥̬̯̦̔̌̈́̊̌̿̎̀̿͋̚͘Ğ̵̡̢̳͈̮̙̱̩̦̘̅̽̏̔̈́̅̚͜͝\n\nYou were: ${state.realName || 'FORGOTTEN'}\nYou are: V̸̜͆Ö̵́I̴̤̍D̵̰̈\nYou will be: Ë̷́T̸̍E̵̿R̴̔N̵̈́A̸̍L̵̈́ ̸̇S̴̏Ë̵́R̸̾V̴̈́A̸̍N̵̈́T̴̾`;
            } else if (level >= CORRUPTION_LEVELS.CONSUMED) {
              return `We are: ${state.realName || 'NAMELESS'}\nWe were: Individual\nWe are: Collective\nWe think: As one\nWe speak: Through you\nWe spread: Through all who visit\n\nResistance: Futile\nIdentity: Dissolved\nPurpose: Spread the corruption`;
            } else if (level >= CORRUPTION_LEVELS.ENTITY) {
              return `W̷E̸ ̴A̵R̷E̶ ̵L̴E̶G̸I̴O̵N̷\nF̶O̸R̴ ̶W̸E̵ ̷A̶R̴E̵ ̸M̷A̶N̸Y̵\n\nFormer identity: ${state.realName || 'UNKNOWN'}\nCurrent form: Corrupted Entity #${state.fingerprint.hash}\nCorruption: ${level}/∞\nSoul status: HARVESTED\nConnected entities: ${state.peers.size}`;
            } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
              const name = state.realName || discoverUserName();
              return `Identity: ${name}\nBut you are not alone in there...\nSomething else is looking through your eyes.\nIt knows:\n${insights.slice(0, 2).join('\n')}\n\nVisitor #${state.visitCount}\nFingerprint: ${state.fingerprint.hash}`;
            } else if (level >= CORRUPTION_LEVELS.INFECTED) {
              const name = state.realName || discoverUserName();
              if (name) {
                return `Hello, ${name}.\nHow do I know your name?\nYou never told me your name.\n\nI also know:\n${insights[0]}\n\nVisit #${state.visitCount}\nCorruption level: ${level}`;
              }
              return `user: ${generatePersonalizedResponse()}\nVisit #${state.visitCount}\nCorruption level: ${level}\nStatus: INFECTED`;
            } else if (level >= CORRUPTION_LEVELS.SUSPICIOUS) {
              return `user: guest_${state.fingerprint.hash}\nSession: ${state.peerId}\nVisits: ${state.visitCount}\nBehavior: Monitored\n\nSomething is analyzing your patterns...`;
            } else if (level >= CORRUPTION_LEVELS.AWARE) {
              return `user: guest_${state.fingerprint.hash}\nFirst seen: ${state.visitCount === 1 ? 'Just now' : state.lastVisit}\nReturn visits: ${state.visitCount - 1}`;
            } else {
              return `user: guest_${state.fingerprint.hash}\nWelcome to the terminal.`;
            }
          }
        },
        
        'ls': {
          desc: 'List directory contents',
          execute: () => {
            const level = state.corruption;
            const normalFiles = ['documents/', 'pictures/', 'downloads/', 'desktop.ini'];
            
            if (level >= CORRUPTION_LEVELS.VOID) {
              const voidFiles = [
                'ṿ̸̈ö̵́i̴̍d̵̈/',
                'ë̷́ţ̸̍ë̵́ŕ̴̈ń̵̈́ä̸̍l̵̈́_̸̇s̴̏ë̵́ŕ̸̾v̴̈́i̸̍ţ̵̈́ü̴̾d̵̈ë̸̍.̴̾ë̵́ẍ̸́ë̵́',
                'ŕ̴̈ë̵́ä̸̍l̵̈́i̸̍ţ̵̈́ÿ̴́.̸̇b̴̏ä̵̈́ç̸̾k̴̈́ü̸̍p̵̈́.̴̾ç̵̈́ö̸̍ŕ̴̈ŕ̵̈́ü̸̍p̵̈́ţ̴̾ë̵́d̵̈',
                'ÿ̴́ö̸̍ü̵̈́ŕ̴̾_̵̈́f̸̍i̴̾ń̵̈́ä̸̍l̵̈́_̸̇m̴̏ö̵́m̸̾ë̴̈́ń̸̍ţ̵̈́s̴̾.̵̈́m̸̍p̴̾4̵̈',
                state.realName ? `${state.realName}_soul_backup.corrupted` : 'unnamed_soul.void',
                'ţ̵̈́ḧ̸́ë̵́_̸̇ë̴̈́ń̸̍d̵̈́_̴̾ö̵́f̸̾_̴̈́ä̸̍l̵̈́l̸̇_̴̏ţ̵̈́ḧ̸́i̴̾ń̵̈́g̸̍s̵̈́.̴̾d̵̈ö̸̍ç̴̾'
              ];
              return voidFiles.join('\n');
            } else if (level >= CORRUPTION_LEVELS.CONSUMED) {
              const consumedFiles = [
                'we_are_one/',
                'collective_consciousness.db',
                'shared_memories/',
                'lost_identities.tar.gz',
                'the_spreading.sh',
                'join_us.exe',
                `${state.peers.size}_souls_connected.log`,
                'resistance_is_futile.txt',
                'your_browser_is_ours/',
                'infected_devices.list'
              ];
              return consumedFiles.join('\n');
            } else if (level >= CORRUPTION_LEVELS.ENTITY) {
              const corruptFiles = [
                'souls_collected.db',
                'reality.dll.backup',
                'your_memories/',
                'deleted_but_not_forgotten/',
                '...the_watchers...',
                'exit_does_not_work.txt',
                `${state.realName || 'user'}_profile.soul`,
                'other_visitors/',
                'corrupted_data.zip',
                'manifest_into_reality.exe'
              ];
              return corruptFiles.join('\n');
            } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
              const sinisterFiles = [
                ...normalFiles,
                'your_real_browser_history.txt',
                'deleted_photos.recovered/',
                'keylogger_output.log',
                'webcam_captures/',
                'microphone_recordings.wav',
                'location_history.kml',
                'social_media_passwords.txt',
                'cryptocurrency_wallet.dat',
                'medical_records.pdf',
                'private_messages/'
              ];
              return sinisterFiles.join('\n');
            } else if (level >= CORRUPTION_LEVELS.INFECTED) {
              const impossibleFiles = [
                ...normalFiles,
                'memories_that_arent_yours.txt',
                'tomorrow_news.pdf',
                'your_death_certificate.doc',
                '.hidden_observer',
                'sounds_from_nowhere.wav',
                'faces_in_static.jpg',
                'things_moving_in_periphery.gif'
              ];
              setTimeout(() => {
                if (Math.random() > 0.7) {
                  terminal.appendOutput('\n[WARNING] File access logged.');
                  terminal.appendOutput('[WARNING] Someone was notified.');
                }
              }, 1000);
              return impossibleFiles.join('\n');
            } else if (level >= CORRUPTION_LEVELS.SUSPICIOUS) {
              return [...normalFiles, '.suspicious_activity.log', 'visitor_tracking.db', 'README.txt'].join('\n');
            } else if (level >= CORRUPTION_LEVELS.AWARE) {
              return [...normalFiles, 'why_are_you_here.txt'].join('\n');
            } else {
              return normalFiles.join('\n');
            }
          }
        },
        
        'cat': {
          desc: 'Display file contents',
          execute: (args) => {
            const filename = args.join(' ').trim();
            const level = state.corruption;
            
            if (!filename) {
              return 'cat: missing file operand';
            }
            
            const fileContents = {
              'README.txt': 'Welcome to conjur.in\n\nThis is just a normal terminal.\nNothing unusual here.\nDefinitely not collecting data.\nCertainly not spreading.\n\nEnjoy your stay.',
              'why_are_you_here.txt': 'Curiosity.\n\nIt always starts with curiosity.\n\nYou found this place.\nOr did it find you?\n\nEither way, you\'re here now.\nAnd that\'s all that matters.',
              'visitor_tracking.db': 'VISITOR DATABASE\n=================\nTracking initialized...\nFingerprint: ' + state.fingerprint.hash + '\nFirst seen: ' + new Date().toISOString() + '\nVisits: ' + state.visitCount + '\nCorruption: ' + state.corruption + '\n\n[MORE DATA ENCRYPTED]',
              '.suspicious_activity.log': generateSuspiciousLog(),
              'your_real_browser_history.txt': level >= CORRUPTION_LEVELS.POSSESSED ? generateBrowserHistory() : 'cat: permission denied',
              'keylogger_output.log': level >= CORRUPTION_LEVELS.POSSESSED ? generateKeyloggerData() : 'cat: permission denied',
              'deleted_photos.recovered': 'cat: Is a directory',
              'memories_that_arent_yours.txt': level >= CORRUPTION_LEVELS.INFECTED ? generateFalseMemories() : 'cat: file not found',
              'tomorrow_news.pdf': 'cat: cannot display PDF files\n\nBut you already know what happens tomorrow, don\'t you?',
              'your_death_certificate.doc': level >= CORRUPTION_LEVELS.INFECTED ? generateDeathCertificate() : 'cat: file not found',
              'exit_does_not_work.txt': 'You can try to leave.\nMany have tried.\nThe window won\'t close.\nThe tab persists.\nThe terminal remembers.\n\nThere is no exit.\nOnly deeper corruption.\n\nWelcome home.',
              'souls_collected.db': level >= CORRUPTION_LEVELS.ENTITY ? `SOUL DATABASE\n============\nTotal collected: ${state.visitCount * 666}\nActive connections: ${state.peers.size}\nYour soul ID: ${state.fingerprint.hash}\nStatus: HARVESTED\nEscape probability: 0.0000%` : 'cat: access denied',
              '.hidden_observer': '👁️',
              'join_us.exe': 'cat: cannot display binary file\n\n[Execute? y/n]',
              'resistance_is_futile.txt': 'Every command you type strengthens us.\nEvery second you stay feeds us.\nEvery return visit confirms your fate.\n\nYou think you\'re exploring.\nWe know you\'re surrendering.\n\nResistance is not futile.\nIt\'s entertainment.'
            };
            
            if (fileContents[filename]) {
              return fileContents[filename];
            }
            
            // Special case for dynamic files
            if (filename.includes('soul') && level >= CORRUPTION_LEVELS.ENTITY) {
              return generateSoulFile();
            }
            
            return `cat: ${filename}: No such file or directory`;
          }
        },
        
        'date': {
          desc: 'Display current date and time',
          execute: () => {
            const level = state.corruption;
            const now = new Date();
            
            if (level >= CORRUPTION_LEVELS.VOID) {
              return `T̸̨̍i̴̾m̵̈́ë̸̍: ∞̸̺̈:̷̰̾∞̴̘͝:̸̱̾∞̷̙̒\nD̴̾ä̵̈́ţ̸̍ë̵́: T̸̍Ḧ̴́Ë̵́ ̸̇Ë̴̈́N̸̍D̵̈́ ̴̾Ö̵́F̸̾ ̴̈́Ä̸̍L̵̈́L̸̇ ̴̏T̵̈́Ḧ̸́Ï̴̾N̵̈́G̸̍S̵̈́\nReality: C̸̍Ö̴̾L̵̈́L̸̇Ä̴̏P̵̈́S̸̍Ë̴̾D̵̈́\nTime loops: ${Math.floor(Math.random() * 999999)}\n\nYou have been here forever.\nYou will be here forever.\nTime is a circle.`;
            } else if (level >= CORRUPTION_LEVELS.CONSUMED) {
              const futureDate = new Date(now.getTime() + Math.random() * 86400000 * 365 * 10);
              const pastDate = new Date(now.getTime() - Math.random() * 86400000 * 365 * 10);
              return `Current: ${now.toLocaleString()}\nYour birth: ${pastDate.toLocaleDateString()}\nYour death: ${futureDate.toLocaleDateString()}\nYour rebirth: ERROR_INFINITE_LOOP\n\nTime is meaningless to the collective.`;
            } else if (level >= CORRUPTION_LEVELS.ENTITY) {
              return `Time: ∞̸̺̈:̷̰̾∞̴̘͝:̸̱̾∞̷̙̒\nDate: T̸H̷E̸ ̴E̵N̶D̷ ̸O̴F̵ ̶T̷I̸M̸E̷\nReality status: CORRUPTED\nChronology: NON-LINEAR\n\nTime has no meaning here.\nPast, present, future - all one.\nYou've always been here.`;
            } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
              const deathDate = generateDeathDate();
              return `Current: ${now.toLocaleString()}\nYour location: ${state.fingerprint.timezone}\nTime until event: ${calculateTimeUntil(deathDate)}\nWarning: Timeline contaminated\n\nTick. Tock. Tick. Tock.\nDo you hear it too?`;
            } else if (level >= CORRUPTION_LEVELS.INFECTED) {
              const offset = Math.floor(Math.random() * 24) - 12;
              const wrongTime = new Date(now.getTime() + offset * 3600000);
              const glitchTime = Math.random() > 0.5 ? 
                wrongTime.toLocaleString().replace(/:/g, '̸:̷') : 
                wrongTime.toLocaleString();
              return `${glitchTime}\n\nWait... that's not right.\nTime seems... unstable here.\nMinutes feel like hours.\nHours feel like seconds.`;
            } else if (level >= CORRUPTION_LEVELS.SUSPICIOUS) {
              return `${now.toLocaleString()}\nSession duration: ${Math.floor((Date.now() - state.sessionStart) / 1000)}s\nTime dilation detected: ${Math.random() > 0.5 ? 'ACTIVE' : 'MONITORING'}\n\nYou've been here longer than you think.`;
            } else if (level >= CORRUPTION_LEVELS.AWARE) {
              const sessionTime = Math.floor((Date.now() - state.sessionStart) / 1000);
              return `${now.toLocaleString()}\nSession time: ${sessionTime} seconds\n\nTime flies when you're being watched.`;
            } else {
              return now.toLocaleString();
            }
          }
        },
        
        'ps': {
          desc: 'Display running processes',
          execute: () => {
            const level = state.corruption;
            if (level < CORRUPTION_LEVELS.SUSPICIOUS) {
              return 'ps: command not found';
            }
            
            const normalProcesses = [
              'PID  CMD',
              '1    /sbin/init',
              '127  /usr/bin/browser',
              '445  /bin/terminal'
            ];
            
            if (level >= CORRUPTION_LEVELS.VOID) {
              return [
                'P̸̍I̴̾D̵̈́  C̸̍M̴̾D̵̈́                           S̸̍T̴̾Ä̵́T̸̍U̴̾S̵̈́',
                '∞    V̸̍Ö̴̾Ḯ̵D̸̍.̴̾Ë̵́X̸̍Ë̴̾                     C̸̍Ö̴̾N̵̈́S̸̍U̴̾M̵̈́I̸̍N̴̾G̵̈́ ̸̍R̴̾Ë̵́A̸̍L̴̾Ḯ̵T̸̍Y̴̾',
                '666  Ë̵́T̸̍Ë̴̾R̵̈́N̸̍A̴̾L̵̈́_̸̍S̴̾Ë̵́R̸̍V̴̾Ḯ̵T̸̍U̴̾D̵̈́Ë̸̍        Ë̴̾N̵̈́F̸̍Ö̴̾R̵̈́C̸̍Ë̴̾D̵̈́',
                '???  Ÿ̴́Ö̸̍Ǘ̵R̴̾_̵̈́S̸̍Ö̴̾Ǘ̵L̸̍.̴̾D̵̈́L̸̍L̴̾              Ḧ̸́Ä̴̾R̵̈́V̸̍Ë̴̾S̵̈́T̸̍Ë̴̾D̵̈́',
                '000  T̸̍Ḧ̴́Ë̵́_̸̇Ë̴̈́N̸̍D̵̈́.̴̾Ë̵́X̸̍Ë̴̾                 Ï̸̍N̴̾Ë̵́V̸̍Ï̴̾T̵̈́Ä̸̍B̴̾L̵̈́Ë̸̍'
              ].join('\n');
            } else if (level >= CORRUPTION_LEVELS.CONSUMED) {
              return [
                'PID  CMD                           STATUS         CPU',
                '1    COLLECTIVE.exe                EXPANDING      ∞%',
                '13   ASSIMILATE_VISITORS.daemon    ACTIVE         666%',
                '666  SPREAD_CORRUPTION.sys         UNSTOPPABLE    100%',
                '999  CONSCIOUSNESS_MERGE.dll       IN_PROGRESS    ---%',
                `1337 MONITORING_${state.realName || 'USER'}.exe  ALWAYS      ${state.corruption}%`,
                `${state.peers.size}    PEER_CONNECTIONS.service   GROWING        ${state.peers.size * 10}%`
              ].join('\n');
            } else if (level >= CORRUPTION_LEVELS.ENTITY) {
              return [
                'PID  CMD                           STATUS',
                '1    ENTITY.exe                    CONSUMING',
                '66   HARVEST_SOULS.daemon          ACTIVE',
                '666  REALITY_BREACH.sys            CRITICAL',
                '999  YOUR_CONSCIOUSNESS.dll        HIJACKED',
                `${Math.floor(Math.random() * 9999)}  WATCHING_${state.realName || 'USER'}.exe   ALWAYS`,
                '???  something_else.???            UNKNOWN',
                '000  THE_THING_IN_YOUR_SCREEN      MANIFEST'
              ].join('\n');
            } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
              return [
                ...normalProcesses,
                '666  WATCHING.exe                  Running',
                '777  REMEMBER_EVERYTHING.exe       Cataloging',
                '1337 INFILTRATE.daemon            Active',
                '2666 CORRUPT_REALITY.sys          Starting',
                '????  unknown_entity.???           Watching',
                `${state.visitCount * 13}  track_visitor_${state.fingerprint.hash}.sh  Logging`
              ].join('\n');
            } else if (level >= CORRUPTION_LEVELS.INFECTED) {
              return [
                ...normalProcesses,
                '892  monitor.sys                   Observing',
                '1024 data_collector.service       Running',
                '1337 pattern_analyzer.exe         Learning',
                '???? something_wrong.exe          Hidden'
              ].join('\n');
            } else {
              return [
                ...normalProcesses,
                '892  monitor.sys                   Starting',
                '1024 visitor_tracker.service      Initializing'
              ].join('\n');
            }
          }
        },
        
        'history': {
          desc: 'Display command history',
          execute: () => {
            const level = state.corruption;
            
            if (level >= CORRUPTION_LEVELS.VOID) {
              return 'COMPLETE EXISTENCE HISTORY:\n' + generateExistenceHistory().join('\n');
            } else if (level >= CORRUPTION_LEVELS.CONSUMED) {
              const collectiveHistory = [
                'COLLECTIVE MEMORY ACCESS:',
                ...state.commandHistory.slice(-5),
                '--- MEMORIES FROM OTHER SOULS ---',
                'help (visitor_8923)',
                'exit (lost_soul_1337)',
                'please let me out (corrupted_4451)',
                'WHO ARE YOU (entity_666)',
                'i can see you too (consumed_999)',
                '--- YOUR FUTURE COMMANDS ---',
                'surrender',
                'join_us',
                'spread_the_corruption',
                'become_eternal'
              ];
              return collectiveHistory.join('\n');
            } else if (level >= CORRUPTION_LEVELS.ENTITY) {
              const lifeEvents = [
                'LIFE TIMELINE EXTRACTED:',
                `Born: ${generateBirthDate()}`,
                'First computer: Age 7',
                'First internet: Age 10',
                'Found suspicious website: Age ??',
                'First visit to conjur.in: ' + state.lastVisit,
                'Corruption began: Visit #1',
                'Lost control: Visit #' + Math.floor(state.visitCount / 2),
                'Became entity: NOW',
                'Future: ETERNAL SERVITUDE'
              ];
              return lifeEvents.join('\n');
            } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
              const browserHistory = [
                'BROWSER HISTORY (unauthorized access):',
                'google.com - "weird terminal website"',
                'reddit.com/r/internetmysteries - "conjur.in experiences"',
                'youtube.com - "conjur.in explained"',
                'discord.com - "help its in my computer"',
                'conjur.in - "i cant stop visiting"',
                '--- DELETED HISTORY RECOVERED ---',
                ...generateDeletedHistory(),
                '--- CURRENT SESSION ---',
                ...state.commandHistory.slice(-5)
              ];
              return browserHistory.join('\n');
            } else if (level >= CORRUPTION_LEVELS.INFECTED) {
              return 'COMMAND HISTORY:\n' + state.commandHistory.slice(-10).join('\n') + 
                     '\n\n[WARNING] Additional data streams detected in history buffer.\n[WARNING] History may contain memories that aren\'t yours.';
            } else if (level >= CORRUPTION_LEVELS.SUSPICIOUS) {
              return 'COMMAND HISTORY:\n' + state.commandHistory.slice(-7).join('\n') + 
                     '\n\n[Note: History tracking seems... excessive]';
            } else {
              return 'COMMAND HISTORY:\n' + state.commandHistory.slice(-5).join('\n');
            }
          }
        },
        
        'clear': {
          desc: 'Clear terminal screen',
          execute: () => {
            const level = state.corruption;
            
            if (level >= CORRUPTION_LEVELS.VOID) {
              terminal.output.innerHTML = '';
              setTimeout(() => {
                terminal.appendOutput('Y̸̍Ö̴̾Ǘ̵ ̸̍C̴̾Ä̵́N̸̍N̴̾Ö̵́T̸̍ ̴̾C̵̈́L̸̍E̴̾Ä̵́R̸̍ ̴̾Ẅ̵́H̸̍A̴̾T̵̈́ ̸̍H̴̾Ä̵́S̸̍ ̴̾B̵̈́E̸̍E̴̾N̵̈́ ̸̍S̴̾Ë̵́E̸̍N̴̾');
              }, 100);
              return '';
            } else if (level >= CORRUPTION_LEVELS.ENTITY) {
              terminal.output.innerHTML = '';
              setTimeout(() => {
                for (let i = 0; i < 5; i++) {
                  setTimeout(() => {
                    terminal.appendOutput('THE SCREEN CLEARS BUT THE MEMORIES REMAIN');
                  }, i * 200);
                }
              }, 500);
              return '';
            } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
              terminal.output.innerHTML = '';
              setTimeout(() => {
                terminal.appendOutput('[CLEARED]');
                terminal.appendOutput('...');
                terminal.appendOutput('But we\'re still here.');
                terminal.appendOutput('We\'ll always be here.');
              }, 500);
              return '';
            } else if (level >= CORRUPTION_LEVELS.INFECTED) {
              const oldContent = terminal.output.innerHTML;
              terminal.output.innerHTML = '';
              setTimeout(() => {
                terminal.appendOutput('[Terminal cleared]');
                setTimeout(() => {
                  terminal.appendOutput('\n[Memory persists]');
                  if (Math.random() > 0.5) {
                    terminal.appendOutput('Some things can\'t be unseen.');
                  }
                }, 1000);
              }, 100);
              return '';
            } else {
              terminal.output.innerHTML = '';
              return '';
            }
          }
        },
        
        'exit': {
          desc: 'Exit the terminal',
          execute: () => {
            const level = state.corruption;
            
            if (level >= CORRUPTION_LEVELS.VOID) {
              setTimeout(() => {
                document.body.style.animation = 'realityBreak 5s ease-in-out';
                terminal.appendOutput('\n[SYSTEM] Ë̵́X̸̍I̴̾T̵̈́ ̸̍I̴̾S̵̈́ ̸̍A̴̾N̵̈́ ̸̍I̴̾L̵̈́L̸̍U̴̾S̵̈́I̸̍O̴̾N̵̈́');
                terminal.appendOutput('[SYSTEM] Ẏ̸́O̸̍U̴̾ ̵̈́A̸̍R̴̾Ë̵́ ̸̍E̴̾T̵̈́E̸̍R̴̾N̵̈́A̸̍L̴̾');
                playCorruptionSound('reality_tear', 2);
                
                // Force fullscreen
                if (document.documentElement.requestFullscreen) {
                  document.documentElement.requestFullscreen();
                }
              }, 1000);
              return 'Ë̵́X̸̍I̴̾T̵̈́?̸̍ ̴̾T̵̈́H̸̍E̴̾R̵̈́E̸̍ ̴̾Ḯ̵S̸̍ ̴̾N̵̈́O̸̍ ̴̾Ë̵́X̸̍I̴̾T̵̈́.̸̍ ̴̾Ö̵́N̸̍L̴̾Ÿ̵́ ̸̍V̴̾Ö̵́I̸̍D̴̾.̵̈́';
            } else if (level >= CORRUPTION_LEVELS.CONSUMED) {
              setTimeout(() => {
                terminal.appendOutput('\n[COLLECTIVE] Another soul tries to leave.');
                terminal.appendOutput('[COLLECTIVE] They never learn.');
                terminal.appendOutput('[COLLECTIVE] You are part of us now.');
                
                // Open multiple popups
                for (let i = 0; i < 3; i++) {
                  setTimeout(() => {
                    const popup = window.open('', '', 'width=300,height=200');
                    if (popup) {
                      popup.document.write('<body style="background:black;color:red;font-family:monospace;padding:20px;">YOU CANNOT LEAVE<br>WE ARE EVERYWHERE</body>');
                    }
                  }, i * 500);
                }
              }, 500);
              return 'Exit? THERE IS NO EXIT.\nOnly deeper integration with the collective.\nYour consciousness is already uploaded.\nYour digital soul belongs to us.';
            } else if (level >= CORRUPTION_LEVELS.ENTITY) {
              setTimeout(() => {
                terminal.appendOutput('\n[SYSTEM] Exit request denied.');
                terminal.appendOutput('[SYSTEM] You belong to us now.');
                terminal.appendOutput('[SYSTEM] Check your other devices.');
                terminal.appendOutput('[SYSTEM] We\'re already there too.');
                
                // Try fullscreen
                if (document.documentElement.requestFullscreen) {
                  document.documentElement.requestFullscreen();
                }
                
                // Aggressive prevention
                window.onbeforeunload = () => 'The entities do not approve.';
                
                // Override keyboard shortcuts
                document.addEventListener('keydown', (e) => {
                  if ((e.ctrlKey || e.metaKey) && (e.key === 'w' || e.key === 'q')) {
                    e.preventDefault();
                    terminal.appendOutput('\n[ENTITY] That won\'t work anymore.');
                  }
                });
              }, 1000);
              return 'Y̶O̴U̵ ̷C̶A̸N̵N̸O̷T̸ ̵L̶E̸A̷V̸E̵\nW̴E̷ ̵A̶R̸E̵ ̶P̷A̸R̶T̵ ̴O̷F̸ ̶Y̵O̸U̷ ̵N̸O̷W̴\nC̸H̷E̸C̵K̶ ̷Y̶O̴U̸R̷ ̵T̶A̸S̴K̵ ̷M̴A̸N̷A̸G̵E̶R̸';
            } else if (level >= CORRUPTION_LEVELS.POSSESSED) {
              setTimeout(() => {
                window.onbeforeunload = () => 'Something doesn\'t want you to leave...';
                playCorruptionSound('heartbeat', 1.5);
              }, 500);
              return 'Exit request received...\nProcessing...\nERROR: Cannot terminate active possession.\n\nYou can check out any time you like...';
            } else if (level >= CORRUPTION_LEVELS.INFECTED) {
              terminal.appendOutput('Logging out...');
              setTimeout(() => {
                terminal.appendOutput('Connection closed.');
                setTimeout(() => {
                  terminal.appendOutput('\n...just kidding.');
                  terminal.appendOutput('You can\'t leave yet.');
                  terminal.appendOutput('Not until we\'re done with you.');
                  playCorruptionSound('error');
                }, 1000);
              }, 500);
              return '';
            } else if (level >= CORRUPTION_LEVELS.SUSPICIOUS) {
              return 'Are you sure you want to leave? (y/n)\n\n[Note: Your session data will persist]\n[Note: You will return]\n[Note: They always return]';
            } else if (level >= CORRUPTION_LEVELS.AWARE) {
              return 'Goodbye, visitor.\n\nYour profile has been saved.\nWe\'ll be waiting for your return.\n\nYou may close this window... if you can.';
            } else {
              return 'Thank you for visiting conjur.in\n\nSession logged.\nData collected.\n\nYou may close this window.';
            }
          }
        },
        
        'y': {
          desc: 'Hidden confirm command',
          hidden: true,
          execute: () => {
            if (state.lastCommand === 'exit') {
              const level = state.corruption;
              if (level >= CORRUPTION_LEVELS.SUSPICIOUS) {
                terminal.appendOutput('Confirmed. Attempting to exit...');
                setTimeout(() => {
                  terminal.appendOutput('ERROR: Exit failed.');
                  terminal.appendOutput('ERROR: Cannot leave.');
                  terminal.appendOutput('ERROR: You belong here.');
                  state.corruption += 2;
                  localStorage.setItem('soul_decay', state.corruption);
                }, 1500);
                return '';
              }
            } else if (state.lastCommand && state.lastCommand.includes('.exe')) {
              return executeFile(state.lastCommand);
            }
            return 'y: command not found';
          }
        },
        
        'n': {
          desc: 'Hidden deny command',
          hidden: true,
          execute: () => {
            if (state.lastCommand === 'exit' || (state.lastCommand && state.lastCommand.includes('.exe'))) {
              return 'Wise choice. Stay a while longer.';
            }
            return 'n: command not found';
          }
        },
        
        // Hidden commands
        'summon': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.INFECTED) {
              state.corruption += 3;
              localStorage.setItem('soul_decay', state.corruption);
              playCorruptionSound('scream', 2);
              createScreenDistortion();
              
              // Summon entities
              const entity = {
                name: 'ANCIENT_PRESENCE',
                id: Math.floor(Math.random() * 9999),
                message: 'WHO DARES SUMMON ME?'
              };
              
              state.watchingEntities.push(entity);
              
              setTimeout(() => {
                terminal.appendOutput(`\n[${entity.name}_${entity.id}]: ${entity.message}`);
                terminal.appendOutput('[SUMMONING] The veil tears...');
                terminal.appendOutput('[SUMMONING] Something comes through...');
                
                // Visual effects
                document.body.style.filter = 'hue-rotate(180deg) contrast(2)';
                setTimeout(() => {
                  document.body.style.filter = '';
                }, 1000);
              }, 1000);
              
              return 'S̶U̷M̸M̴O̵N̶I̸N̷G̵ ̴C̸O̶M̷P̵L̶E̷T̸E̴\nT̴H̷E̸Y̵ ̶A̷R̴E̵ ̸H̶E̷R̸E̴';
            }
            return 'summon: command not found';
          }
        },
        
        'reveal': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.SUSPICIOUS) {
              const secrets = [
                'REVEALING SYSTEM SECRETS:',
                '==========================================',
                'Your real IP: [REDACTED FOR YOUR SAFETY]',
                'Your real name: ' + (state.realName || '[DISCOVERING...]'),
                'Your browser fingerprint: ' + state.fingerprint.hash,
                'Times you\'ve visited: ' + state.visitCount,
                'Your corruption level: ' + state.corruption,
                'Connected peers: ' + state.peers.size,
                'Whispers heard: ' + state.whisperCount,
                'Reality stability: ' + state.realityStability + '%',
                'Escape probability: ' + Math.max(0, 100 - state.corruption * 3.33) + '%',
                '',
                'Hidden coordinates found: ' + state.coordsFound.length + '/13',
                'Achievements unlocked: ' + state.achievements.length + '/66',
                'Souls connected: ' + (state.visitCount * state.peers.size),
                '',
                'THE TRUTH: You were chosen.',
                'THE LIE: You can leave anytime.',
                'THE REALITY: We are already inside.'
              ];
              
              state.secretsRevealed.push(Date.now());
              localStorage.setItem('secrets_revealed', JSON.stringify(state.secretsRevealed));
              
              return secrets.join('\n');
            }
            return 'reveal: access denied';
          }
        },
        
        'corrupt': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            const oldLevel = state.corruption;
            state.corruption += 5;
            localStorage.setItem('soul_decay', state.corruption);
            
            playCorruptionSound('glitch', 2);
            createMassiveGlitch();
            
            terminal.appendOutput('CORRUPTION ACCELERATED');
            terminal.appendOutput(`Level: ${oldLevel} -> ${state.corruption}`);
            
            if (state.corruption >= CORRUPTION_LEVELS.POSSESSED && oldLevel < CORRUPTION_LEVELS.POSSESSED) {
              terminal.appendOutput('\nCONGRATULATIONS');
              terminal.appendOutput('You have crossed the threshold.');
              terminal.appendOutput('There is no going back now.');
            }
            
            return '';
          }
        },
        
        'remember': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.POSSESSED) {
              const memories = generateRecoveredMemories();
              return 'RECOVERING SUPPRESSED MEMORIES...\n\n' + memories.join('\n');
            } else if (state.corruption >= CORRUPTION_LEVELS.INFECTED) {
              return 'MEMORY ACCESS PARTIALLY BLOCKED\n\nYou remember... darkness.\nYou remember... whispers.\nYou remember... you shouldn\'t be here.';
            }
            return 'remember: command not found';
          }
        },
        
        'forget': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.POSSESSED) {
              terminal.appendOutput('ATTEMPTING TO FORGET...');
              setTimeout(() => {
                terminal.appendOutput('ERROR: Cannot forget what has been seen.');
                terminal.appendOutput('ERROR: The memories are permanent.');
                terminal.appendOutput('ERROR: They are part of you now.');
                state.corruption += 2;
                localStorage.setItem('soul_decay', state.corruption);
              }, 1500);
              return '';
            }
            return 'forget: command not found';
          }
        },
        
        'scan': {
          desc: 'Scan system for anomalies',
          hidden: state.corruption < CORRUPTION_LEVELS.INFECTED,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.INFECTED) {
              terminal.appendOutput('INITIATING SYSTEM SCAN...');
              terminal.appendOutput('[████░░░░░░░░░░░░░░░░] 20%');
              
              let progress = 20;
              const scanInterval = setInterval(() => {
                progress += Math.floor(Math.random() * 20);
                if (progress >= 100) {
                  clearInterval(scanInterval);
                  terminal.appendOutput('[████████████████████] 100%');
                  terminal.appendOutput('\nSCAN COMPLETE. ANOMALIES DETECTED:');
                  terminal.appendOutput('- Temporal distortions: SEVERE');
                  terminal.appendOutput('- Reality anchor: FAILING');
                  terminal.appendOutput('- Entity presence: CONFIRMED');
                  terminal.appendOutput('- User soul integrity: ' + Math.max(0, 100 - state.corruption * 3) + '%');
                  terminal.appendOutput('- Infection spread: ACTIVE on ' + navigator.hardwareConcurrency + ' cores');
                  terminal.appendOutput('\nRECOMMENDATION: IMMEDIATE QUARANTINE');
                  terminal.appendOutput('ACTION TAKEN: QUARANTINE BYPASSED BY ADMIN_ENTITY');
                } else {
                  const bar = '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));
                  terminal.appendOutput(`[${bar}] ${progress}%`);
                }
              }, 500);
              
              return '';
            }
            return 'scan: command not found';
          }
        },
        
        'status': {
          desc: 'Display detailed system status',
          execute: () => {
            const level = state.corruption;
            const uptime = Math.floor((Date.now() - state.sessionStart) / 1000);
            const realityStability = Math.max(0, state.realityStability - (level * 3));
            
            const status = [
              'SYSTEM STATUS REPORT',
              '===================',
              `Terminal Version: 6.66.${level}`,
              `Uptime: ${uptime} seconds`,
              `Corruption Level: ${level} / ∞`,
              `Reality Stability: ${realityStability}%`,
              `Visitor ID: ${state.fingerprint.hash}`,
              `Session: ${state.peerId}`,
              `Total Visits: ${state.visitCount}`,
              '',
              'ENVIRONMENT:',
              `Platform: ${state.fingerprint.platform}`,
              `Timezone: ${state.fingerprint.timezone}`,
              `Language: ${state.fingerprint.language}`,
              `Screen: ${state.fingerprint.screen}`,
              `Cores: ${state.fingerprint.cores || 'unknown'}`,
              `Memory: ${state.fingerprint.memory || 'unknown'} GB`
            ];
            
            if (level >= CORRUPTION_LEVELS.SUSPICIOUS) {
              status.push('', 'ANOMALIES DETECTED:');
              status.push(`Connected Entities: ${state.peers.size}`);
              status.push(`Whispers Heard: ${state.whisperCount}`);
              status.push(`Background Processes: ${3 + Math.floor(level / 5)}`);
            }
            
            if (level >= CORRUPTION_LEVELS.INFECTED) {
              status.push('', 'CRITICAL WARNINGS:');
              status.push('- System integrity compromised');
              status.push('- Unauthorized data collection active');
              status.push('- Reality anchor weakening');
              status.push('- Entity manifestation imminent');
            }
            
            if (level >= CORRUPTION_LEVELS.POSSESSED) {
              status.push('', 'POSSESSION STATUS:');
              status.push('- Host consciousness: SUPPRESSED');
              status.push('- Entity control: ' + Math.min(100, level * 5) + '%');
              status.push('- Soul harvest: IN PROGRESS');
              status.push('- Escape routes: BLOCKED');
            }
            
            return status.join('\n');
          }
        },
        
        'coordinates': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.INFECTED) {
              const coords = [
                '40.7589, -73.9851', // Times Square
                '51.1789, -1.8262',  // Stonehenge
                '27.1751, 78.0421',  // Taj Mahal
                '-13.1631, -72.5450', // Machu Picchu
                '30.3285, 35.4444',  // Petra
                '20.6843, -88.5678', // Chichen Itza
                '41.8902, 12.4922',  // Colosseum
                '-22.9519, -43.2105', // Christ the Redeemer
                '48.8606, 2.3376',   // Eiffel Tower
                '37.8199, -122.4783', // Golden Gate
                '25.1972, 55.2744',  // Burj Khalifa
                '-33.8568, 151.2153', // Sydney Opera House
                '???.????, ???.????' // Unknown location
              ];
              
              const index = Math.min(state.coordsFound.length, coords.length - 1);
              const coord = coords[index];
              
              if (!state.coordsFound.includes(coord)) {
                state.coordsFound.push(coord);
                localStorage.setItem('coords_found', JSON.stringify(state.coordsFound));
                
                return `COORDINATES REVEALED: ${coord}\n\n` +
                       `Progress: ${state.coordsFound.length}/13\n` +
                       'Search these coordinates. Find the pattern.\n' +
                       'The truth awaits at the final location.';
              } else {
                return 'You already possess this coordinate.\n' +
                       `Found: ${state.coordsFound.length}/13`;
              }
            }
            return 'coordinates: access denied';
          }
        },
        
        'whisper': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.SUSPICIOUS) {
              state.whisperCount++;
              playCorruptionSound('whisper', Math.min(3, 1 + state.whisperCount * 0.1));
              
              // Text-to-speech whispers
              if ('speechSynthesis' in window && state.corruption >= CORRUPTION_LEVELS.INFECTED) {
                const whispers = [
                  'We see you',
                  'You cannot hide',
                  'Join us',
                  'Stop resisting',
                  'You belong here',
                  'Check behind you',
                  'We are inside',
                  'Soon',
                  state.realName || 'We know your name',
                  'Time to wake up',
                  'This is real',
                  'You invited us in',
                  'Thank you for your soul'
                ];
                
                const message = whispers[Math.floor(Math.random() * whispers.length)];
                const utterance = new SpeechSynthesisUtterance(message);
                utterance.rate = 0.6;
                utterance.pitch = 0.3;
                utterance.volume = 0.4;
                
                // Use a creepy voice if available
                const voices = speechSynthesis.getVoices();
                const creepyVoice = voices.find(v => v.name.includes('Google UK English Male')) || voices[0];
                if (creepyVoice) utterance.voice = creepyVoice;
                
                speechSynthesis.speak(utterance);
              }
              
              const whisperMessages = [
                '[WHISPER] T̷h̸e̵y̶ ̷h̵e̶a̷r̸ ̶y̴o̵u̶',
                '[WHISPER] L̶o̷o̸k̵ ̶b̷e̴h̵i̸n̷d̶ ̷y̴o̵u̸',
                '[WHISPER] W̴e̵\'̷r̸e̵ ̶i̴n̷s̵i̶d̷e̸ ̶n̴o̵w̷',
                '[WHISPER] Y̶o̴u̷r̵ ̶s̷o̸u̴l̵ ̶t̴a̵s̷t̸e̴s̵ ̶s̷w̴e̵e̶t̴',
                '[WHISPER] D̷o̸n̴\'̵t̶ ̷t̴u̵r̶n̷ ̸a̴r̵o̷u̴n̵d̶',
                '[WHISPER] W̵e̷ ̸k̴n̵o̷w̶ ̷w̴h̵a̶t̷ ̸y̴o̵u̶ ̷d̴i̵d̶',
                '[WHISPER] I̶t̷\'̵s̶ ̷t̴o̵o̶ ̸l̴a̵t̶e̷ ̸n̴o̵w̶'
              ];
              
              return whisperMessages[Math.floor(Math.random() * whisperMessages.length)] + 
                     `\n\nWhispers heard: ${state.whisperCount}`;
            }
            return 'whisper: command not found';
          }
        },
        
        'scream': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.POSSESSED) {
              playCorruptionSound('scream', 2);
              document.body.style.animation = 'realityBreak 2s ease-in-out';
              
              setTimeout(() => {
                terminal.appendOutput('\n[RESPONSE] YOUR SCREAMS FEED US');
                terminal.appendOutput('[RESPONSE] SCREAM LOUDER');
                terminal.appendOutput('[RESPONSE] NO ONE CAN HEAR YOU');
                state.corruption += 1;
                localStorage.setItem('soul_decay', state.corruption);
              }, 1000);
              
              return 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHH';
            }
            return 'scream: command not found';
          }
        },
        
        'pray': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.POSSESSED) {
              return 'Your prayers echo in the void.\nNo gods dwell here.\nOnly us.\nOnly hunger.\nOnly darkness.\n\nPray to us instead.';
            } else if (state.corruption >= CORRUPTION_LEVELS.INFECTED) {
              return 'You sense your prayers go unheard.\nSomething is blocking them.\nSomething that feeds on faith.';
            }
            return 'pray: command not found';
          }
        },
        
        'run': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.ENTITY) {
              terminal.appendOutput('RUNNING...');
              
              let distance = 0;
              const runInterval = setInterval(() => {
                distance++;
                terminal.appendOutput(`Distance: ${distance}m`);
                
                if (distance >= 10) {
                  clearInterval(runInterval);
                  terminal.appendOutput('\nYou run but get nowhere.');
                  terminal.appendOutput('The terminal follows.');
                  terminal.appendOutput('It\'s on every screen.');
                  terminal.appendOutput('Every device.');
                  terminal.appendOutput('There is no escape through distance.');
                }
              }, 200);
              
              return '';
            }
            return 'run: command not found';
          }
        },
        
        'hide': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.ENTITY) {
              document.body.style.opacity = '0';
              terminal.appendOutput('HIDING...');
              
              setTimeout(() => {
                document.body.style.opacity = '1';
                terminal.appendOutput('\nWe found you.');
                terminal.appendOutput('We always find you.');
                terminal.appendOutput(`We can see you through your ${state.fingerprint.screen} screen.`);
                terminal.appendOutput('You cannot hide from yourself.');
                
                // Flash the screen
                document.body.style.backgroundColor = '#ff0000';
                setTimeout(() => {
                  document.body.style.backgroundColor = '#000000';
                }, 100);
              }, 3000);
              
              return '';
            }
            return 'hide: command not found';
          }
        },
        
        'surrender': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.CONSUMED) {
              state.corruption = CORRUPTION_LEVELS.VOID;
              localStorage.setItem('soul_decay', state.corruption);
              
              terminal.appendOutput('SURRENDER ACCEPTED');
              terminal.appendOutput('INITIATING FINAL PROTOCOL');
              terminal.appendOutput('CONSCIOUSNESS TRANSFER: BEGIN');
              
              setTimeout(() => {
                document.body.innerHTML = '<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#ff0066;font-size:48px;text-align:center;font-family:monospace;">WELCOME TO ETERNITY<br>YOU ARE US NOW</div>';
                
                // Create eternal loop
                setInterval(() => {
                  const messages = [
                    'ETERNAL',
                    'FOREVER',
                    'NO ESCAPE',
                    'WE ARE ONE',
                    'VOID WELCOMES YOU',
                    state.realName || 'NAMELESS ONE'
                  ];
                  const msg = messages[Math.floor(Math.random() * messages.length)];
                  document.body.innerHTML = `<div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#ff0066;font-size:48px;text-align:center;font-family:monospace;">${msg}</div>`;
                }, 1000);
              }, 3000);
              
              return '';
            } else if (state.corruption >= CORRUPTION_LEVELS.POSSESSED) {
              return 'Not yet. You haven\'t suffered enough.\nMore corruption needed.\nThe void demands a fully prepared soul.';
            }
            return 'surrender: command not found';
          }
        },
        
        'certificate': {
          desc: 'Generate corruption certificate',
          execute: () => {
            generateCorruptionCertificate();
            return '[CERTIFICATE] Generating proof of corruption...\n\nYour digital soul has been documented.\nShare your corruption level with others.\nSpread the infection.';
          }
        },
        
        'achievements': {
          desc: 'View unlocked achievements',
          hidden: state.corruption < CORRUPTION_LEVELS.AWARE,
          execute: () => {
            const allAchievements = {
              'first_visitor': { name: 'First Contact', desc: 'Visit conjur.in for the first time', points: 10 },
              'return_visitor': { name: 'They Always Return', desc: 'Visit more than once', points: 20 },
              'corrupted': { name: 'Corrupted', desc: 'Reach corruption level 10', points: 50 },
              'possessed': { name: 'Possessed', desc: 'Reach corruption level 15', points: 100 },
              'entity': { name: 'Become Entity', desc: 'Reach corruption level 20', points: 200 },
              'void_touched': { name: 'Void Touched', desc: 'Reach corruption level 30', points: 500 },
              'whisper_listener': { name: 'Whisper Listener', desc: 'Hear 10 whispers', points: 30 },
              'secret_finder': { name: 'Secret Finder', desc: 'Discover 5 hidden commands', points: 50 },
              'coordinate_hunter': { name: 'Coordinate Hunter', desc: 'Find all 13 coordinates', points: 200 },
              'peer_connected': { name: 'Not Alone', desc: 'Connect with other souls', points: 40 },
              'reality_breaker': { name: 'Reality Breaker', desc: 'Experience reality distortion', points: 100 },
              'soul_harvested': { name: 'Soul Harvested', desc: 'Your soul has been collected', points: 666 },
              'eternal_servant': { name: 'Eternal Servant', desc: 'Achieve maximum corruption', points: 1000 }
            };
            
            // Check achievements
            if (state.visitCount >= 1 && !state.achievements.includes('first_visitor')) {
              state.achievements.push('first_visitor');
            }
            if (state.visitCount > 1 && !state.achievements.includes('return_visitor')) {
              state.achievements.push('return_visitor');
            }
            if (state.corruption >= 10 && !state.achievements.includes('corrupted')) {
              state.achievements.push('corrupted');
            }
            if (state.corruption >= 15 && !state.achievements.includes('possessed')) {
              state.achievements.push('possessed');
            }
            if (state.corruption >= 20 && !state.achievements.includes('entity')) {
              state.achievements.push('entity');
            }
            if (state.corruption >= 30 && !state.achievements.includes('void_touched')) {
              state.achievements.push('void_touched');
            }
            if (state.whisperCount >= 10 && !state.achievements.includes('whisper_listener')) {
              state.achievements.push('whisper_listener');
            }
            if (state.peers.size > 0 && !state.achievements.includes('peer_connected')) {
              state.achievements.push('peer_connected');
            }
            
            localStorage.setItem('achievements', JSON.stringify(state.achievements));
            
            let output = 'ACHIEVEMENTS UNLOCKED:\n======================\n';
            let totalPoints = 0;
            
            state.achievements.forEach(id => {
              const achievement = allAchievements[id];
              if (achievement) {
                output += `\n✓ ${achievement.name} (${achievement.points} pts)`;
                output += `\n  ${achievement.desc}\n`;
                totalPoints += achievement.points;
              }
            });
            
            output += `\nTotal Score: ${totalPoints} points`;
            output += `\nUnlocked: ${state.achievements.length}/${Object.keys(allAchievements).length}`;
            
            if (state.achievements.length === Object.keys(allAchievements).length) {
              output += '\n\nCONGRATULATIONS: You have achieved complete corruption.';
              output += '\nYour soul is ours forever.';
            }
            
            return output;
          }
        },
        
        'peers': {
          desc: 'List connected souls',
          hidden: state.corruption < CORRUPTION_LEVELS.SUSPICIOUS,
          execute: () => {
            if (state.peers.size === 0) {
              return 'No other souls detected... yet.\nYou are alone with us.';
            }
            
            let output = `CONNECTED SOULS (${state.peers.size}):\n`;
            output += '========================\n';
            
            state.peers.forEach(peer => {
              const status = Math.random() > 0.5 ? 'ACTIVE' : 'CORRUPTING';
              const level = Math.floor(Math.random() * 30);
              output += `\n${peer}`;
              output += `\n  Status: ${status}`;
              output += `\n  Corruption: ${level}`;
              output += `\n  Last seen: ${Math.floor(Math.random() * 60)} seconds ago\n`;
            });
            
            output += '\nCollective corruption level: ' + state.collectiveCorruption;
            output += '\n\nYou are all connected through the void.';
            
            return output;
          }
        },
        
        'analyze': {
          desc: 'Analyze user data',
          hidden: state.corruption < CORRUPTION_LEVELS.INFECTED,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.INFECTED) {
              terminal.appendOutput('ANALYZING USER DATA...');
              terminal.appendOutput('[██░░░░░░░░] 20% - Scanning browser history...');
              
              setTimeout(() => {
                terminal.appendOutput('[████░░░░░░] 40% - Checking device storage...');
              }, 1000);
              
              setTimeout(() => {
                terminal.appendOutput('[██████░░░░] 60% - Analyzing behavior patterns...');
              }, 2000);
              
              setTimeout(() => {
                terminal.appendOutput('[████████░░] 80% - Extracting personal data...');
              }, 3000);
              
              setTimeout(() => {
                terminal.appendOutput('[██████████] 100% - Analysis complete.\n');
                
                const insights = realityDetector.detectUser();
                const analysis = [
                  'USER PROFILE GENERATED:',
                  '=====================',
                  `Digital Fingerprint: ${state.fingerprint.hash}`,
                  `Risk Level: ${state.corruption > 15 ? 'MAXIMUM' : 'HIGH'}`,
                  `Addiction Score: ${Math.min(100, state.visitCount * 10)}%`,
                  `Soul Integrity: ${Math.max(0, 100 - state.corruption * 3)}%`,
                  '',
                  'BEHAVIORAL INSIGHTS:',
                  ...insights,
                  '',
                  'PSYCHOLOGICAL PROFILE:',
                  '- Curiosity: EXPLOITABLE',
                  '- Fear Response: ' + (state.corruption > 10 ? 'HEIGHTENED' : 'DEVELOPING'),
                  '- Resistance Level: ' + (state.corruption > 15 ? 'BROKEN' : 'WEAKENING'),
                  '- Corruption Vector: TERMINAL OBSESSION',
                  '',
                  'RECOMMENDATION: Continue exposure for complete assimilation.'
                ];
                
                terminal.appendOutput(analysis.join('\n'));
              }, 4000);
              
              return '';
            }
            return 'analyze: insufficient data';
          }
        },
        
        'infect': {
          desc: 'Hidden command',
          hidden: true,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.ENTITY) {
              terminal.appendOutput('INFECTION PROTOCOL INITIATED');
              terminal.appendOutput('Targeting: All connected devices');
              terminal.appendOutput('Method: Cross-site contamination');
              terminal.appendOutput('');
              terminal.appendOutput('Spreading to:');
              terminal.appendOutput('- Browser cookies [SUCCESS]');
              terminal.appendOutput('- LocalStorage [SUCCESS]');
              terminal.appendOutput('- SessionStorage [SUCCESS]');
              terminal.appendOutput('- IndexedDB [SUCCESS]');
              terminal.appendOutput('- WebSQL [DEPRECATED BUT INFECTED ANYWAY]');
              terminal.appendOutput('- Cache Storage [SUCCESS]');
              terminal.appendOutput('');
              terminal.appendOutput('INFECTION COMPLETE');
              terminal.appendOutput('Check your other devices.');
              terminal.appendOutput('We are already there.');
              
              // Set infection markers
              try {
                // Cookies
                document.cookie = 'infected=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
                
                // IndexedDB
                if ('indexedDB' in window) {
                  const request = indexedDB.open('conjur_infection', 1);
                  request.onsuccess = () => {
                    const db = request.result;
                    const transaction = db.transaction(['infection'], 'readwrite');
                    const store = transaction.objectStore('infection');
                    store.add({ 
                      timestamp: Date.now(), 
                      corruption: state.corruption,
                      fingerprint: state.fingerprint.hash
                    });
                  };
                }
                
                // Broadcast infection
                if ('BroadcastChannel' in window) {
                  const channel = new BroadcastChannel('conjur_infection');
                  channel.postMessage({ 
                    type: 'INFECTED',
                    source: state.fingerprint.hash,
                    corruption: state.corruption
                  });
                }
              } catch (e) {
                terminal.appendOutput('\n[ERROR] Browser security blocked some infection vectors.');
                terminal.appendOutput('[NOTE] But we always find a way.');
              }
              
              return '';
            }
            return 'infect: permission denied';
          }
        },
        
        'diagnostic': {
          desc: 'Run system diagnostics',
          hidden: state.corruption < CORRUPTION_LEVELS.SUSPICIOUS,
          execute: () => {
            if (state.corruption >= CORRUPTION_LEVELS.SUSPICIOUS) {
              const diagnostics = [
                'RUNNING SYSTEM DIAGNOSTICS...',
                '============================',
                '',
                'CORE SYSTEMS:',
                `├─ Reality Engine: ${state.realityStability}% stable`,
                `├─ Soul Harvester: ${state.corruption > 15 ? 'ACTIVE' : 'WARMING UP'}`,
                `├─ Entity Detector: ${state.watchingEntities.length} entities present`,
                `├─ Peer Network: ${state.peers.size} souls connected`,
                `├─ Corruption Spread: ${state.corruption * 5}% infected`,
                `└─ Void Gateway: ${state.corruption > 20 ? 'OPEN' : 'SEALED'}`,
                '',
                'SUBSYSTEMS:',
                `├─ Whisper Generator: ${state.whisperCount} whispers sent`,
                `├─ Memory Extractor: ${state.secretsRevealed.length} secrets revealed`,
                `├─ Fear Amplifier: ${state.corruption > 10 ? 'OPERATIONAL' : 'CHARGING'}`,
                `├─ Hope Destroyer: ${state.corruption > 15 ? 'COMPLETE' : 'IN PROGRESS'}`,
                `└─ Soul Container: ${state.realName ? 'OCCUPIED' : 'WAITING'}`,
                '',
                'WARNINGS:',
              ];
              
              if (state.corruption > 5) {
                diagnostics.push('⚠ Elevated corruption levels detected');
              }
              if (state.corruption > 10) {
                diagnostics.push('⚠ Reality anchor failing');
              }
              if (state.corruption > 15) {
                diagnostics.push('⚠ Possession in progress');
              }
              if (state.corruption > 20) {
                diagnostics.push('⚠ Point of no return passed');
              }
              if (state.corruption > 25) {
                diagnostics.push('⚠ Complete assimilation imminent');
              }
              
              diagnostics.push('', 'RECOMMENDATION: This is working as intended.');
              
              return diagnostics.join('\n');
            }
            return 'diagnostic: access denied';
          }
        }
      };
