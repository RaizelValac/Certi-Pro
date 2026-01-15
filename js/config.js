/**
 * CERTI-PRO CONFIGURATION
 * Central configuration for API endpoints and app settings
 */

const CONFIG = {
  // API Base URL - Change this when deploying to production
  API_BASE_URL: 'http://localhost:5000/api',

  // Frontend Base URL - Change this when deploying
  FRONTEND_URL: 'http://localhost:5500',

  // Token storage key
  TOKEN_KEY: 'certipro_token',
  
  // User data storage key
  USER_KEY: 'certipro_user',

  // Account type storage key
  ACCOUNT_TYPE_KEY: 'certipro_account_type',

  // Token expiry check interval (in milliseconds)
  TOKEN_CHECK_INTERVAL: 60000, // 1 minute

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
    SKILL_DETAIL: '/skills', // + /:id
    SKILL_CAN_ATTEMPT: '/skills', // + /:id/can-attempt
    SKILL_PROGRESS: '/skills', // + /:id/progress

    // Tests
    TEST_STATUS: '/tests', // + /:skillId/status
    TEST_START: '/tests', // + /:skillId/start
    TEST_SESSION: '/tests/session', // + /:sessionId
    TEST_SAVE_ANSWER: '/tests/session', // + /:sessionId/answer
    TEST_SUBMIT: '/tests/session', // + /:sessionId/submit
    TEST_HISTORY: '/tests', // + /:skillId/history

    // Certificate Verification (Public)
    VERIFY_CERTIFICATE: '/verify' // + /:certificateCode
  },

  // Page URLs (relative paths)
  PAGES: {
    // Auth pages
    LOGIN: '/index.html',
    SIGNUP: '/signup.html',
    ORG_SIGNUP: '/org_signup.html',
    VERIFY: '/verify.html',
    FORGOT_PASSWORD: '/forgot_pswd.html',
    RESET_PASSWORD: '/set_pswd.html',

    // User pages
    DASHBOARD: '/dashboard.html',
    VIEW_CERTIFICATES: '/viewcert.html',
    QR_VIEWS: '/qrviewall.html',
    RECENT_ACTIVITY: '/recent.html',
    USER_PROFILE: '/user_profile.html',

    // Skills pages
    TRENDING_SKILLS: '/trendingskills.html',
    TEST: '/test.html',

    // Organization pages
    ORG_DASHBOARD: '/org_dashboard.html',

    // Public pages
    HOMEPAGE: '/homepage.html',
    VERIFY_CERTIFICATE: '/verify_certificate.html'
  }
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.ENDPOINTS);
Object.freeze(CONFIG.PAGES);