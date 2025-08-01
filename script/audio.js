      // ===== ENHANCED AUDIO SYSTEM =====
      let audioContext = null;
      let masterGain = null;
      
      function initAudio() {
        try {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
          masterGain = audioContext.createGain();
          masterGain.connect(audioContext.destination);
          masterGain.gain.value = 0.3;
        } catch (e) {
          console.log('Audio not available - the silence is deafening');
        }
      }
      
      function playCorruptionSound(type = 'whisper', intensity = 1) {
        if (!audioContext) return;
        
        const now = audioContext.currentTime;
        
        switch(type) {
          case 'whisper':
            createWhisperSound(intensity);
            break;
          case 'glitch':
            createGlitchSound(intensity);
            break;
          case 'error':
            createErrorSound(intensity);
            break;
          case 'heartbeat':
            createHeartbeatSound(intensity);
            break;
          case 'scream':
            createScreamSound(intensity);
            break;
          case 'reality_tear':
            createRealityTearSound(intensity);
            break;
        }
      }
      
      function createWhisperSound(intensity) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        oscillator.frequency.value = 60 + Math.random() * 40;
        oscillator.type = 'sine';
        
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        filter.Q.value = 10;
        
        gainNode.gain.value = 0;
        gainNode.gain.linearRampToValueAtTime(0.1 * intensity, audioContext.currentTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 2);
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 2);
        
        // Add subtle modulation
        const lfo = audioContext.createOscillator();
        lfo.frequency.value = 0.5;
        const lfoGain = audioContext.createGain();
        lfoGain.gain.value = 20;
        lfo.connect(lfoGain);
        lfoGain.connect(oscillator.frequency);
        lfo.start();
        lfo.stop(audioContext.currentTime + 2);
      }
      
      function createGlitchSound(intensity) {
        const bufferSize = audioContext.sampleRate * 0.2;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() - 0.5) * 2;
          if (i % 100 < 10) {
            data[i] *= 10; // Spike
          }
        }
        
        const source = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        source.buffer = buffer;
        
        filter.type = 'bandpass';
        filter.frequency.value = 1000 + Math.random() * 2000;
        filter.Q.value = 20;
        
        gainNode.gain.value = 0.2 * intensity;
        
        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);
        
        source.start();
      }
      
      function createErrorSound(intensity) {
        const oscillator1 = audioContext.createOscillator();
        const oscillator2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator1.frequency.value = 200;
        oscillator2.frequency.value = 205; // Slight detune for beating
        
        oscillator1.type = 'square';
        oscillator2.type = 'square';
        
        gainNode.gain.value = 0.15 * intensity;
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        
        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(masterGain);
        
        oscillator1.start();
        oscillator2.start();
        oscillator1.stop(audioContext.currentTime + 0.5);
        oscillator2.stop(audioContext.currentTime + 0.5);
      }
      
      function createHeartbeatSound(intensity) {
        const createBeat = (delay) => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const filter = audioContext.createBiquadFilter();
          
          oscillator.frequency.value = 40;
          oscillator.type = 'sine';
          
          filter.type = 'lowpass';
          filter.frequency.value = 100;
          
          const now = audioContext.currentTime + delay;
          gainNode.gain.setValueAtTime(0, now);
          gainNode.gain.linearRampToValueAtTime(0.3 * intensity, now + 0.01);
          gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          
          oscillator.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(masterGain);
          
          oscillator.start(now);
          oscillator.stop(now + 0.2);
        };
        
        // Double beat pattern
        createBeat(0);
        createBeat(0.3);
      }
      
      function createScreamSound(intensity) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        oscillator.frequency.value = 800;
        oscillator.frequency.exponentialRampToValueAtTime(2000, audioContext.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 1);
        
        filter.type = 'bandpass';
        filter.frequency.value = 1500;
        filter.Q.value = 5;
        
        gainNode.gain.value = 0.2 * intensity;
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1);
        
        // Add distortion by overdriving
        const distortion = audioContext.createWaveShaper();
        distortion.curve = makeDistortionCurve(400 * intensity);
        
        oscillator.connect(distortion);
        distortion.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
      }
      
      function createRealityTearSound(intensity) {
        // Multiple detuned oscillators for otherworldly effect
        for (let i = 0; i < 5; i++) {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          const panner = audioContext.createStereoPanner();
          
          oscillator.frequency.value = 100 * (i + 1) + Math.random() * 50;
          oscillator.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
          
          // Random panning
          panner.pan.value = (Math.random() - 0.5) * 2;
          
          gainNode.gain.value = 0.05 * intensity;
          gainNode.gain.setValueAtTime(0.05 * intensity, audioContext.currentTime + i * 0.1);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 3);
          
          oscillator.connect(panner);
          panner.connect(gainNode);
          gainNode.connect(masterGain);
          
          oscillator.start(audioContext.currentTime + i * 0.1);
          oscillator.stop(audioContext.currentTime + 3);
          
          // Frequency modulation
          const lfo = audioContext.createOscillator();
          lfo.frequency.value = 0.1 + i * 0.1;
          const lfoGain = audioContext.createGain();
          lfoGain.gain.value = 50;
          lfo.connect(lfoGain);
          lfoGain.connect(oscillator.frequency);
          lfo.start(audioContext.currentTime + i * 0.1);
          lfo.stop(audioContext.currentTime + 3);
        }
      }
      
      function makeDistortionCurve(amount) {
        const samples = 44100;
        const curve = new Float32Array(samples);
        const deg = Math.PI / 180;
        
        for (let i = 0; i < samples; i++) {
          const x = (i * 2) / samples - 1;
          curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
        }
        
        return curve;
      }
      
