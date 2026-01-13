import apiClient from './client';

export interface CheckEmailRequest {
    email: string;
}

export interface VerifyEmailRequest {
    email: string;
    code: string;
}

export interface RegisterRequest {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    // Step 3 might require more fields like verification_token if the API returns one
}

export interface LoginRequest {
    email: string;
    password: string;
}

export const authService = {
    checkEmail: async (data: CheckEmailRequest) => {
        const response = await apiClient.post('/website/auth/register/check-email', data);
        return response.data;
    },

    verifyEmail: async (data: VerifyEmailRequest) => {
        const response = await apiClient.post('/website/auth/register/verify-email', data);
        return response.data;
    },

    register: async (data: RegisterRequest) => {
        const response = await apiClient.post('/website/auth/register', data);
        return response.data;
    },

    login: async (data: LoginRequest) => {
        const response = await apiClient.post('/website/auth/login', data);
        return response.data;
    },

    logout: async () => {
        const response = await apiClient.post('/website/auth/logout');
        return response.data;
    },

    getNotifications: async (params?: { page?: number; unread_only?: number }) => {
        const response = await apiClient.get('/website/me/notifications', { params });
        return response.data;
    },

    markNotificationRead: async (id: string) => {
        const response = await apiClient.post(`/website/me/notifications/${id}/read`);
        return response.data;
    },

    markAllNotificationsRead: async () => {
        const response = await apiClient.post('/website/me/notifications/read-all');
        return response.data;
    },

    getNotificationSettings: async () => {
        const response = await apiClient.get('/website/settings/notifications');
        return response.data; // { vapid_public_key, firebase_config, notification_icon }
    },

    saveFcmToken: async (data: { token: string; platform: string; device_name: string; device_id?: string }) => {
        const response = await apiClient.post('/website/me/notifications/fcm-token', data);
        return response.data;
    },
};
