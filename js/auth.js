/**
 * CERTI-PRO AUTHENTICATION MODULE
 * Handles login, signup, verification, password reset
 */

const Auth = {
  
  // ==================== REGISTER USER ====================
  async registerUser(fullName, email, password, confirmPassword, termsAccepted) {
    if (password !== confirmPassword) {
      throw new APIError('Passwords do not match', 400, null);
    }

    if (!termsAccepted) {
      throw new APIError('You must accept the terms and conditions', 400, null);
    }

    const response = await api.post(CONFIG.ENDPOINTS.REGISTER_USER, {
      fullName,
      email,
      password,
      termsAccepted
    }, false);

    // Store email for verification page
    sessionStorage.setItem('pendingVerificationEmail', email);
    sessionStorage.setItem('verificationType', 'email');

    return response;
  },

  // ==================== REGISTER ORGANIZATION ====================
  async registerOrganization(fullName, email, password, confirmPassword, organizationName, organizationType, termsAccepted) {
    if (password !== confirmPassword) {
      throw new APIError('Passwords do not match', 400, null);
    }

    if (!termsAccepted) {
      throw new APIError('You must accept the terms and conditions', 400, null);
    }

    const response = await api.post(CONFIG.ENDPOINTS.REGISTER_ORG, {
      fullName,
      email,
      password,
      organizationName,
      organizationType,
      termsAccepted
    }, false);

    // Store email for verification page
    sessionStorage.setItem('pendingVerificationEmail', email);
    sessionStorage.setItem('verificationType', 'email');

    return response;
  },

  // ==================== LOGIN ====================
  async login(email, password) {
    const response = await api.post(CONFIG.ENDPOINTS.LOGIN, {
      email,
      password
    }, false);

    if (response.success && response.data) {
      // Check if email is verified
      if (!response.data.user.isEmailVerified) {
        sessionStorage.setItem('pendingVerificationEmail', email);
        sessionStorage.setItem('verificationType', 'email');
        throw new APIError('Please verify your email first', 403, { requiresVerification: true });
      }

      // Store token and user data
      api.setToken(response.data.token);
      api.setUser(response.data.user);
      api.setAccountType(response.data.user.accountType || 'user');
    }

    return response;
  },

  // ==================== VERIFY EMAIL ====================
  async verifyEmail(code) {
    const email = sessionStorage.getItem('pendingVerificationEmail');
    
    if (!email) {
      throw new APIError('No email pending verification', 400, null);
    }

    const response = await api.post(CONFIG.ENDPOINTS.VERIFY_EMAIL, {
      email,
      code
    }, false);

    if (response.success) {
      // Clear pending verification
      sessionStorage.removeItem('pendingVerificationEmail');
      sessionStorage.removeItem('verificationType');

      // If token provided, user is now logged in
      if (response.data && response.data.token) {
        api.setToken(response.data.token);
        api.setUser(response.data.user);
        api.setAccountType(response.data.user.accountType || 'user');
      }
    }

    return response;
  },

  // ==================== RESEND CODE ====================
  async resendCode() {
    const email = sessionStorage.getItem('pendingVerificationEmail');
    const type = sessionStorage.getItem('verificationType') || 'email';
    
    if (!email) {
      throw new APIError('No email found for resending code', 400, null);
    }

    return await api.post(CONFIG.ENDPOINTS.RESEND_CODE, {
      email,
      type
    }, false);
  },

  // ==================== FORGOT PASSWORD ====================
  async forgotPassword(email) {
    const response = await api.post(CONFIG.ENDPOINTS.FORGOT_PASSWORD, {
      email
    }, false);

    if (response.success) {
      // Store email for verification and reset
      sessionStorage.setItem('pendingVerificationEmail', email);
      sessionStorage.setItem('verificationType', 'password_reset');
    }

    return response;
  },

  // ==================== VERIFY RESET CODE ====================
  async verifyResetCode(code) {
    const email = sessionStorage.getItem('pendingVerificationEmail');
    
    if (!email) {
      throw new APIError('No email pending password reset', 400, null);
    }

    const response = await api.post(CONFIG.ENDPOINTS.VERIFY_RESET_CODE, {
      email,
      code
    }, false);

    if (response.success) {
      // Store code for reset password page
      sessionStorage.setItem('resetCode', code);
    }

    return response;
  },

  // ==================== RESET PASSWORD ====================
  async resetPassword(newPassword, confirmPassword) {
    const email = sessionStorage.getItem('pendingVerificationEmail');
    const code = sessionStorage.getItem('resetCode');
    
    if (!email || !code) {
      throw new APIError('Password reset session expired', 400, null);
    }

    if (newPassword !== confirmPassword) {
      throw new APIError('Passwords do not match', 400, null);
    }

    const response = await api.post(CONFIG.ENDPOINTS.RESET_PASSWORD, {
      email,
      code,
      newPassword
    }, false);

    if (response.success) {
      // Clear reset session
      sessionStorage.removeItem('pendingVerificationEmail');
      sessionStorage.removeItem('verificationType');
      sessionStorage.removeItem('resetCode');
    }

    return response;
  },

  // ==================== GET CURRENT USER ====================
  async getMe() {
    return await api.get(CONFIG.ENDPOINTS.GET_ME);
  },

  // ==================== LOGOUT ====================
  logout() {
    api.removeToken();
    sessionStorage.clear();
    window.location.href = CONFIG.PAGES.LOGIN;
  },

  // ==================== CHECK AUTH STATUS ====================
  isLoggedIn() {
    return api.isLoggedIn();
  },

  // ==================== PROTECT PAGE ====================
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = CONFIG.PAGES.LOGIN;
      return false;
    }
    return true;
  },

  // ==================== REDIRECT IF LOGGED IN ====================
  redirectIfLoggedIn(destination = null) {
    if (this.isLoggedIn()) {
      const accountType = api.getAccountType();
      if (destination) {
        window.location.href = destination;
      } else if (accountType === 'organization') {
        window.location.href = CONFIG.PAGES.ORG_DASHBOARD;
      } else {
        window.location.href = CONFIG.PAGES.DASHBOARD;
      }
      return true;
    }
    return false;
  },

  // ==================== GET PENDING EMAIL ====================
  getPendingEmail() {
    return sessionStorage.getItem('pendingVerificationEmail');
  },

  // ==================== GET VERIFICATION TYPE ====================
  getVerificationType() {
    return sessionStorage.getItem('verificationType');
  }
};