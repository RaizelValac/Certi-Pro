/**
 * CERTI-PRO API HELPER
 * Centralized API calls with error handling
 */

class CertiProAPI {
  constructor() {
    this.baseURL = CONFIG.API_BASE_URL;
  }

  // Get stored token
  getToken() {
    return localStorage.getItem(CONFIG.TOKEN_KEY);
  }

  // Set token
  setToken(token) {
    localStorage.setItem(CONFIG.TOKEN_KEY, token);
  }

  // Remove token
  removeToken() {
    localStorage.removeItem(CONFIG.TOKEN_KEY);
    localStorage.removeItem(CONFIG.USER_KEY);
    localStorage.removeItem(CONFIG.ACCOUNT_TYPE_KEY);
  }

  // Set user data
  setUser(user) {
    localStorage.setItem(CONFIG.USER_KEY, JSON.stringify(user));
  }

  // Get user data
  getUser() {
    const user = localStorage.getItem(CONFIG.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Set account type
  setAccountType(type) {
    localStorage.setItem(CONFIG.ACCOUNT_TYPE_KEY, type);
  }

  // Get account type
  getAccountType() {
    return localStorage.getItem(CONFIG.ACCOUNT_TYPE_KEY);
  }

  // Check if user is logged in
  isLoggedIn() {
    return !!this.getToken();
  }

  // Build headers
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (includeAuth && this.getToken()) {
      headers['Authorization'] = `Bearer ${this.getToken()}`;
    }

    return headers;
  }

  // Generic API request
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: this.getHeaders(options.auth !== false),
      ...options
    };

    // Remove custom properties
    delete config.auth;

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle 401 Unauthorized
        if (response.status === 401) {
          this.removeToken();
          // Redirect to login if not already there
          if (!window.location.pathname.includes('index.html') && 
              !window.location.pathname.includes('signup') &&
              !window.location.pathname.includes('verify') &&
              !window.location.pathname.includes('forgot') &&
              !window.location.pathname.includes('set_pswd')) {
            window.location.href = CONFIG.PAGES.LOGIN;
          }
        }
        throw new APIError(data.message || 'Something went wrong', response.status, data);
      }

      return data;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError('Network error. Please check your connection.', 0, null);
    }
  }

  // GET request
  async get(endpoint, auth = true) {
    return this.request(endpoint, { method: 'GET', auth });
  }

  // POST request
  async post(endpoint, body, auth = true) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      auth
    });
  }

  // PUT request
  async put(endpoint, body, auth = true) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      auth
    });
  }

  // DELETE request
  async delete(endpoint, auth = true) {
    return this.request(endpoint, { method: 'DELETE', auth });
  }
}

// Custom API Error class
class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

// Create global API instance
const api = new CertiProAPI();
