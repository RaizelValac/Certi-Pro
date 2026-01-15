/**
 * CERTI-PRO UTILITY FUNCTIONS
 * Toast notifications, loading spinners, form helpers
 */

const Utils = {

  // ==================== TOAST NOTIFICATIONS ====================
  
  // Create toast container if not exists
  initToast() {
    if (!document.getElementById('certipro-toast')) {
      const toast = document.createElement('div');
      toast.id = 'certipro-toast';
      toast.style.cssText = `
        visibility: hidden;
        min-width: 280px;
        background-color: #333;
        color: #fff;
        text-align: center;
        border-radius: 8px;
        padding: 16px 24px;
        position: fixed;
        z-index: 9999;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s, bottom 0.3s;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      `;
      document.body.appendChild(toast);
    }
  },

  // Show toast message
  showToast(message, type = 'default', duration = 3000) {
    this.initToast();
    const toast = document.getElementById('certipro-toast');
    
    // Set colors based on type
    const colors = {
      success: '#2ecc71',
      error: '#ff4b5c',
      warning: '#f39c12',
      info: '#3498db',
      default: '#333'
    };
    
    toast.style.backgroundColor = colors[type] || colors.default;
    toast.textContent = message;
    toast.style.visibility = 'visible';
    toast.style.opacity = '1';
    toast.style.bottom = '50px';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.bottom = '30px';
      setTimeout(() => {
        toast.style.visibility = 'hidden';
      }, 300);
    }, duration);
  },

  // Shorthand methods
  success(message, duration) { this.showToast(message, 'success', duration); },
  error(message, duration) { this.showToast(message, 'error', duration); },
  warning(message, duration) { this.showToast(message, 'warning', duration); },
  info(message, duration) { this.showToast(message, 'info', duration); },

  // ==================== LOADING SPINNER ====================

  // Create loading overlay if not exists
  initLoader() {
    if (!document.getElementById('certipro-loader')) {
      const loader = document.createElement('div');
      loader.id = 'certipro-loader';
      loader.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.8);
        z-index: 9998;
        justify-content: center;
        align-items: center;
      `;
      loader.innerHTML = `
        <div style="
          width: 50px;
          height: 50px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #4A90E2;
          border-radius: 50%;
          animation: certipro-spin 1s linear infinite;
        "></div>
        <style>
          @keyframes certipro-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      `;
      document.body.appendChild(loader);
    }
  },

  // Show loading
  showLoading() {
    this.initLoader();
    const loader = document.getElementById('certipro-loader');
    loader.style.display = 'flex';
  },

  // Hide loading
  hideLoading() {
    const loader = document.getElementById('certipro-loader');
    if (loader) {
      loader.style.display = 'none';
    }
  },

  // ==================== FORM HELPERS ====================

  // Get form data as object
  getFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return {};
    
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    
    return data;
  },

  // Validate email format
  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  // Validate password strength
  isValidPassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  },

  // Add error class to input
  setInputError(inputId, message = null) {
    const input = document.getElementById(inputId);
    if (input) {
      input.classList.add('input-error');
      input.style.borderColor = '#ff4b5c';
      
      // Add shake animation
      input.classList.add('shake-anim');
      setTimeout(() => input.classList.remove('shake-anim'), 400);

      // Show error message if provided
      if (message) {
        let errorEl = input.parentElement.querySelector('.error-message');
        if (!errorEl) {
          errorEl = document.createElement('small');
          errorEl.className = 'error-message';
          errorEl.style.cssText = 'color: #ff4b5c; font-size: 12px; display: block; margin-top: 4px;';
          input.parentElement.appendChild(errorEl);
        }
        errorEl.textContent = message;
      }
    }
  },

  // Remove error class from input
  clearInputError(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
      input.classList.remove('input-error');
      input.style.borderColor = '';
      
      const errorEl = input.parentElement.querySelector('.error-message');
      if (errorEl) {
        errorEl.remove();
      }
    }
  },

  // Clear all form errors
  clearAllErrors(formId) {
    const form = document.getElementById(formId);
    if (form) {
      form.querySelectorAll('.input-error').forEach(el => {
        el.classList.remove('input-error');
        el.style.borderColor = '';
      });
      form.querySelectorAll('.error-message').forEach(el => el.remove());
    }
  },

  // ==================== URL HELPERS ====================

  // Get URL parameter
  getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  // Redirect with delay
  redirect(url, delay = 0) {
    if (delay > 0) {
      setTimeout(() => {
        window.location.href = url;
      }, delay);
    } else {
      window.location.href = url;
    }
  },

  // ==================== DATE/TIME HELPERS ====================

  // Format date
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },

  // Format time ago
  timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };

    for (let [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return `${interval} ${unit}${interval > 1 ? 's' : ''} ago`;
      }
    }
    
    return 'Just now';
  },

  // Format countdown timer
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  },

  // ==================== STORAGE HELPERS ====================

  // Set item with expiry
  setWithExpiry(key, value, ttlMs) {
    const item = {
      value: value,
      expiry: Date.now() + ttlMs
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  // Get item with expiry check
  getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.value;
  },

  // ==================== MISC HELPERS ====================

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Copy to clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.success('Copied to clipboard!');
      return true;
    } catch (err) {
      this.error('Failed to copy');
      return false;
    }
  },

  // Generate random string
  randomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
};

// Add global CSS for animations
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.innerHTML = `
    .input-error { border: 1px solid #ff4b5c !important; }
    @keyframes shake { 
      0%, 100% { transform: translateX(0); } 
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); } 
      20%, 40%, 60%, 80% { transform: translateX(5px); } 
    }
    .shake-anim { animation: shake 0.4s ease-in-out; }
  `;
  document.head.appendChild(style);
});