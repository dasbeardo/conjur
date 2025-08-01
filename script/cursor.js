      // ===== CUSTOM CURSOR =====
      const cursor = document.getElementById('customCursor');
      let mouseX = 0, mouseY = 0;
      let cursorVisible = true;
      
      function updateCursor(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (cursorVisible) {
          cursor.style.left = mouseX - 10 + 'px';
          cursor.style.top = mouseY - 10 + 'px';
        }
        
        // Corruption effects on cursor
        if (state.corruption > CORRUPTION_LEVELS.INFECTED) {
          cursor.style.borderColor = '#ff0066';
          cursor.style.transform = 'scale(' + (0.8 + Math.random() * 0.4) + ')';
          cursor.style.borderWidth = (2 + Math.random() * 2) + 'px';
        }
        
        if (state.corruption > CORRUPTION_LEVELS.POSSESSED) {
          // Sometimes hide/show cursor
          if (Math.random() > 0.98) {
            cursorVisible = !cursorVisible;
            cursor.style.display = cursorVisible ? 'block' : 'none';
            
            if (!cursorVisible) {
              terminal.appendOutput('\n[CURSOR] Where did it go?');
              setTimeout(() => {
                cursorVisible = true;
                cursor.style.display = 'block';
                terminal.appendOutput('[CURSOR] Found it.');
              }, 3000);
            }
          }
        }
        
        if (state.corruption > CORRUPTION_LEVELS.ENTITY) {
          // Cursor trails
          if (Math.random() > 0.95) {
            const trail = document.createElement('div');
            trail.style.position = 'fixed';
            trail.style.left = mouseX - 5 + 'px';
            trail.style.top = mouseY - 5 + 'px';
            trail.style.width = '10px';
            trail.style.height = '10px';
            trail.style.borderRadius = '50%';
            trail.style.backgroundColor = '#ff00ff';
            trail.style.pointerEvents = 'none';
            trail.style.opacity = '0.5';
            document.body.appendChild(trail);
            
            setTimeout(() => {
              trail.style.transition = 'opacity 1s';
              trail.style.opacity = '0';
              setTimeout(() => trail.remove(), 1000);
            }, 100);
          }
        }
      }
      
