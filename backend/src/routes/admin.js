const express = require('express');
const rateLimit = require('express-rate-limit');

const {
    ADMIN_COOKIE_NAME,
    buildAdminCookieOptions,
    loginHandler,
    logFailedLoginAttempt,
    verifyAdmin,
} = require('../middleware/adminAuth');

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        logFailedLoginAttempt(req, 'rate_limit_exceeded');
        res.status(429).json({
            error: 'Too many login attempts. Please try again after 15 minutes.',
        });
    },
});

router.post('/login', loginLimiter, loginHandler);

router.get('/session', verifyAdmin, (_req, res) => {
    res.json({
        ok: true,
    });
});

router.post('/logout', (_req, res) => {
    res.clearCookie(ADMIN_COOKIE_NAME, buildAdminCookieOptions());
    res.status(204).send();
});

module.exports = router;
