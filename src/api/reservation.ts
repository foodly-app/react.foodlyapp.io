import apiClient from './client';
import { ReservationResponse, Reservation } from '../types/reservation';

export const reservationService = {
    /**
     * Get current reservations (pending, confirmed, awaiting_payment, paid)
     */
    getCurrentReservations: async (page: number = 1): Promise<ReservationResponse> => {
        const response = await apiClient.get<ReservationResponse>(
            `/website/me/reservations/current?page=${page}`
        );
        return response.data;
    },

    /**
     * Get completed reservations (completed, cancelled, no_show)
     */
    getCompletedReservations: async (page: number = 1): Promise<ReservationResponse> => {
        const response = await apiClient.get<ReservationResponse>(
            `/website/me/reservations/completed?page=${page}`
        );
        return response.data;
    },

    /**
     * Get all reservations (history)
     */
    getAllReservations: async (page: number = 1): Promise<ReservationResponse> => {
        const response = await apiClient.get<ReservationResponse>(
            `/website/me/reservations/history?page=${page}`
        );
        return response.data;
    },

    /**
     * Get all reservations with pagination
     */
    getReservations: async (page: number = 1): Promise<ReservationResponse> => {
        const response = await apiClient.get<ReservationResponse>(
            `/website/me/reservations?page=${page}`
        );
        return response.data;
    },

    /**
     * Get a single reservation by ID
     */
    getReservationById: async (id: string): Promise<{ data: Reservation }> => {
        const response = await apiClient.get<{ data: Reservation }>(
            `/website/me/reservations/${id}`
        );
        return response.data;
    },
};
