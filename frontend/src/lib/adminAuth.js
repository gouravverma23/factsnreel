import { apiConfig } from './api';

const authRequest = async (path, options = {}) => {
    const response = await fetch(`${apiConfig.baseUrl}${path}`, {
        credentials: 'include',
        ...options,
    });

    if (!response.ok) {
        let message = 'Authentication failed';

        try {
            const data = await response.json();
            message = data.error || message;
        } catch {
            message = response.statusText || message;
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
};

export const clearStoredAdminPassword = async () => authRequest('/admin/logout', {
    method: 'POST',
});

export const loginAdmin = (password) => authRequest('/admin/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
});

export const verifyAdminSession = () => authRequest('/admin/session');
