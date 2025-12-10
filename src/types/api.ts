export interface Translation {
    locale: string;
    name: string;
    address: string;
}

export interface Restaurant {
    id: number;
    rank: number;
    slug: string;
    status: string;
    logo: string;
    image: string;
    discount_rate: number;
    price_per_person: string | null;
    latitude: string | null;
    longitude: string | null;
    time_zone: string;
    reservation_type: string;
    translations: Translation[];
}

export interface ApiResponse {
    data: Restaurant[];
    success: boolean;
    message: string;
    meta?: {
        total: number;
        per_page: number;
        current_page: number;
        last_page: number;
    };
}
