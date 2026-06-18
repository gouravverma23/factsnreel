const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api').replace(/\/$/, '');

const request = async (path, options = {}) => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        credentials: 'include',
        ...options,
    });

    if (!response.ok) {
        let message = 'Request failed';

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

export const apiConfig = {
    baseUrl: API_BASE_URL,
};

export const getPosts = () => request('/posts');
export const getFacts = () => request('/facts');

export const createPost = (post) => request('/posts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
});

export const updatePost = (id, post) => request(`/posts/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
});

export const deletePost = (id) => request(`/posts/${id}`, {
    method: 'DELETE',
});

export const createFact = (fact) => request('/facts', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(fact),
});

export const updateFact = (id, fact) => request(`/facts/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(fact),
});

export const deleteFact = (id) => request(`/facts/${id}`, {
    method: 'DELETE',
});
