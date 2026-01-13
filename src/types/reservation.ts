export interface ReservationCustomer {
    id: string;
    name: string;
    phone: string;
    email: string;
}

export interface ReservationActions {
    can_pay: boolean;
    can_cancel: boolean;
    can_modify: boolean;
    payment_required: boolean;
}

export interface PaymentInfo {
    has_payment: boolean;
    payment_status: string;
    amount: string;
    deposit_type?: string;
    reservation_fee?: string;
    checkout_url: string | null;
}

export interface Reservation {
    id: string;
    display_id: string;
    reservation_date: string;
    time_from: string;
    guests_count: number;
    total_price: string;
    status: string;
    status_label: string;
    status_color: string;
    status_hex: string;
    customer: ReservationCustomer;
    restaurant_name: string;
    restaurant_image: string;
    restaurant_slug: string;
    restaurant_address: string;
    actions: ReservationActions;
    payment_info: PaymentInfo;
    created_at: string;
}

export interface ReservationMeta {
    current_page: number;
    last_page: number;
    total: number;
    per_page: number;
    from: number;
    to: number;
}

export interface ReservationResponse {
    data: Reservation[];
    meta: ReservationMeta;
}
