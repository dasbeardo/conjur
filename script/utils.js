      // ===== UTILITY FUNCTIONS =====
      function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => notification.remove(), 500);
        }, 5000);
      }
      
      function createScreenDistortion() {
        const distortion = document.createElement('div');
        distortion.className = 'screen-distortion';
        document.body.appendChild(distortion);
        
        setTimeout(() => {
          distortion.remove();
        }, 100);
      }
