const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const ADMIN_COOKIE_NAME = 'admin_token';

const parseCookies = (cookieHeader = '') => (
    cookieHeader
        .split(';')
        .map((part) => part.trim())
        .filter(Boolean)
        .reduce((cookies, part) => {
            const separatorIndex = part.indexOf('=');

            if (separatorIndex === -1) {
                return cookies;
            }

            const key = part.slice(0, separatorIndex).trim();
            const value = part.slice(separatorIndex + 1).trim();

            cookies[key] = decodeURIComponent(value);
            return cookies;
        }, {})
);

const timingSafeEqualStrings = (left, right) => {
    const leftBuffer = Buffer.from(String(left ?? ''), 'utf8');
    const rightBuffer = Buffer.from(String(right ?? ''), 'utf8');

    if (leftBuffer.length !== rightBuffer.length) {
        return false;
    }

    return crypto.timingSafeEqual(leftBuffer, rightBuffer);
};

const logFailedLoginAttempt = (req, reason) => {
    console.warn(`[ADMIN_LOGIN_FAILED] timestamp=${new Date().toISOString()} ip=${req.ip} reason=${reason}`);
};

const compareAdminPassword = async (password) => {
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (adminPasswordHash) {
        return bcrypt.compare(String(password ?? ''), adminPasswordHash);
    }

    if (!process.env.ADMIN_PASSWORD) {
        throw new Error('ADMIN_PASSWORD_HASH is missing on the server.');
    }

    return timingSafeEqualStrings(password, process.env.ADMIN_PASSWORD);
};

const buildAdminCookieOptions = () => ({
    httpOnly: true,
    sameSite: 'strict',
    // Secure cookies rely on HTTPS, which must be enforced in production.
    secure: process.env.NODE_ENV === 'production',
    maxAge: 2 * 60 * 60 * 1000,
    path: '/',
});

const loginHandler = async (req, res) => {
    const { password } = req.body || {};
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        return res.status(500).json({
            error: 'JWT_SECRET is missing on the server.',
        });
    }

    if (typeof password !== 'string' || password.length === 0) {
        logFailedLoginAttempt(req, 'missing_password');
        return res.status(400).json({
            error: 'Admin password is required.',
        });
    }

    let passwordMatches = false;

    try {
        passwordMatches = await compareAdminPassword(password);
    } catch (error) {
        return res.status(500).json({
            error: error.message || 'Admin authentication is not configured correctly.',
        });
    }

    if (!passwordMatches) {
        logFailedLoginAttempt(req, 'invalid_password');
        return res.status(401).json({
            error: 'Invalid admin password.',
        });
    }

    const token = jwt.sign(
        { role: 'admin' },
        jwtSecret,
        { expiresIn: '2h' }
    );

    // HttpOnly helps block JavaScript access to the admin session cookie.
    res.cookie(ADMIN_COOKIE_NAME, token, buildAdminCookieOptions());

    return res.json({
        ok: true,
        message: 'Admin login successful.',
    });
};

const verifyAdmin = (req, res, next) => {
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        return res.status(500).json({
            error: 'JWT_SECRET is missing on the server.',
        });
    }

    const cookies = parseCookies(req.headers.cookie || '');
    const token = cookies[ADMIN_COOKIE_NAME];

    if (!token) {
        return res.status(401).json({
            error: 'Unauthorized: Admin session is missing.',
        });
    }

    try {
        const payload = jwt.verify(token, jwtSecret);

        if (payload.role !== 'admin') {
            return res.status(403).json({
                error: 'Forbidden: Admin role is required.',
            });
        }

        req.admin = payload;
        next();
    } catch {
        return res.status(401).json({
            error: 'Unauthorized: Admin session is invalid or expired.',
        });
    }
};

module.exports = {
    ADMIN_COOKIE_NAME,
    buildAdminCookieOptions,
    logFailedLoginAttempt,
    loginHandler,
    parseCookies,
    timingSafeEqualStrings,
    verifyAdmin,
};
