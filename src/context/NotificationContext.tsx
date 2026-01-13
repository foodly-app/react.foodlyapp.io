import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { authService } from '../api/auth';

interface NotificationContextType {
    unreadCount: number;
    incrementUnreadCount: () => void;
    decrementUnreadCount: () => void;
    resetUnreadCount: () => void;
    refreshUnreadCount: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const [unreadCount, setUnreadCount] = useState(0);

    const refreshUnreadCount = useCallback(async () => {
        if (!isAuthenticated) return;
        try {
            const response = await authService.getNotifications({ unread_only: 1 });
            const count = response.meta?.total !== undefined ? Number(response.meta.total) : 0;
            console.log('Fetched unread count:', count);
            setUnreadCount(count);
        } catch (error) {
            console.error('Failed to fetch unread count:', error);
            setUnreadCount(0);
        }
    }, [isAuthenticated]);

    useEffect(() => {
        if (isAuthenticated) {
            refreshUnreadCount();
        } else {
            setUnreadCount(0);
        }
    }, [isAuthenticated, refreshUnreadCount]);

    const incrementUnreadCount = () => setUnreadCount(prev => prev + 1);
    const decrementUnreadCount = () => setUnreadCount(prev => Math.max(0, prev - 1));
    const resetUnreadCount = () => setUnreadCount(0);

    return (
        <NotificationContext.Provider value={{
            unreadCount,
            incrementUnreadCount,
            decrementUnreadCount,
            resetUnreadCount,
            refreshUnreadCount
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};
