/**
 * CERTI-PRO CONFIGURATION
 * API Configuration and Constants
 */

const CONFIG = {
  // API Base URL - Change this when deploying to production
  API_BASE_URL: 'http://localhost:5000/api',
  
  // Token storage key
  TOKEN_KEY: 'certipro_token',
  
  // User data storage key
  USER_KEY: 'certipro_user',
  
  // Account type storage key
  ACCOUNT_TYPE_KEY: 'certipro_account_type',
  
  // Token expiry check (in milliseconds)
  TOKEN_CHECK_INTERVAL: 60000, // 1 minute
  
  // Redirect URLs
  REDIRECTS: {
    AFTER_LOGIN_USER: 'dashboard.html',
    AFTER_LOGIN_ORG: 'org_dashboard.html',
    AFTER_REGISTER: 'verify.html',
    AFTER_VERIFY: 'dashboard.html',
    AFTER_LOGOUT: 'index.html',
    AFTER_PASSWORD_RESET: 'index.html',
    LOGIN_PAGE: 'index.html'
  },
  
  // API Endpoints
  ENDPOINTS: {
    // Auth
    REGISTER_USER: '/auth/register/user',
    REGISTER_ORG: '/auth/register/organization',
    LOGIN: '/auth/login',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_CODE: '/auth/resend-code',
    FORGOT_PASSWORD: '/auth/forgot-password',
    VERIFY_RESET_CODE: '/auth/verify-reset-code',
    RESET_PASSWORD: '/auth/reset-password',
    GET_ME: '/auth/me',
    
    // User Dashboard
    DASHBOARD_STATS: '/user/dashboard/stats',
    USER_CERTIFICATES: '/user/certificates',
    USER_CERTIFICATES_QR: '/user/certificates/qr-views',
    USER_ACTIVITIES: '/user/activities',
    USER_TEMPLATES: '/user/templates',
    
    // Skills
    SKILLS: '/skills',
    SKILLS_TRENDING: '/skills/trending',
    SKILLS_CATEGORIES: '/skills/categories',
    SKILL_DETAIL: '/skills/', // + skillId
    SKILL_CAN_ATTEMPT: '/skills/', // + skillId + /can-attempt
    SKILL_PROGRESS: '/skills/', // + skillId + /progress
    
    // Tests
    TEST_STATUS: '/tests/', // + skillId + /status
    TEST_START: '/tests/', // + skillId + /start
    TEST_SESSION: '/tests/session/', // + sessionId
    TEST_SAVE_ANSWER: '/tests/session/', // + sessionId + /answer
    TEST_SUBMIT: '/tests/session/', // + sessionId + /submit
    TEST_HISTORY: '/tests/', // + skillId + /history
    
    // Certificate Verification (Public)
    VERIFY_CERTIFICATE: '/verify/' // + certificateCode
  }
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.REDIRECTS);
Object.freeze(CONFIG.ENDPOINTS);