import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reservationService } from "../../../api/reservation";
import { Reservation } from "../../../types/reservation";
import toast from "react-hot-toast";

const ReservationDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchReservationDetail();
        }
    }, [id]);

    const fetchReservationDetail = async () => {
        try {
            setLoading(true);
            const response = await reservationService.getReservationById(id!);
            setReservation(response.data);
        } catch (error: any) {
            console.error("Error fetching reservation detail:", error);
            toast.error(error.response?.data?.message || "Failed to load reservation details");
            navigate("/reservations");
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    if (loading) {
        return (
            <main className="ticket-detail">
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </main>
        );
    }

    if (!reservation) {
        return (
            <main className="ticket-detail">
                <div className="text-center py-5">
                    <p>Reservation not found</p>
                </div>
            </main>
        );
    }

    const imageUrl = reservation.restaurant_image?.startsWith("http")
        ? reservation.restaurant_image
        : `https://api.foodly.pro${reservation.restaurant_image}`;

    return (
        <>
            <main className="ticket-detail">
                <div className="page-title">
                    <button
                        onClick={handleBack}
                        type="button"
                        className="back-btn back-page-btn d-flex align-items-center justify-content-center rounded-full"
                    >
                        <img src="/assets/svg/arrow-left-black.svg" alt="arrow" />
                    </button>
                    <h3 className="main-title">Reservation Details</h3>
                </div>

                <div className="details-body">
                    <div className="invoice-number d-flex align-items-center justify-content-between pb-20">
                        <p>{reservation.display_id}</p>
                        <span style={{ backgroundColor: reservation.status_hex, color: '#ffffff' }}>
                            {reservation.status_label}
                        </span>
                    </div>

                    <section className="order-card py-12">
                        <div className="item d-flex align-items-center gap-16 w-100">
                            <div className="image shrink-0 overflow-hidden radius-8">
                                <img
                                    src={imageUrl}
                                    alt={reservation.restaurant_name}
                                    className="img-fluid w-100 h-100 object-fit-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "/assets/images/booking/loc-3.png";
                                    }}
                                />
                            </div>

                            <div className="content flex-grow">
                                <h4>{reservation.restaurant_name}</h4>
                                <p className="d-flex align-items-center gap-04 location mt-04">
                                    <img src="/assets/svg/map-marker.svg" alt="icon" />
                                    {reservation.restaurant_address}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="customer-info py-12">
                        <div className="title mb-16">
                            <h4>Customer Info</h4>
                        </div>

                        <ul>
                            <li className="d-flex align-items-center justify-content-between">
                                <p>Name</p>
                                <p>{reservation.customer.name}</p>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                                <p>Email</p>
                                <p>{reservation.customer.email}</p>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                                <p>Phone</p>
                                <p>{reservation.customer.phone}</p>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                                <p>Status</p>
                                <p className={reservation.status === "completed" ? "success" : ""}>
                                    {reservation.status_label}
                                </p>
                            </li>
                        </ul>
                    </section>

                    <section className="customer-info pt-12 pb-24">
                        <div className="title mb-16">
                            <h4>Reservation Info</h4>
                        </div>

                        <ul>
                            <li className="d-flex align-items-center justify-content-between">
                                <p>Date</p>
                                <p>{formatDate(reservation.reservation_date)}</p>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                                <p>Time</p>
                                <p>{reservation.time_from}</p>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                                <p>Guests</p>
                                <p>{reservation.guests_count} {reservation.guests_count === 1 ? 'Guest' : 'Guests'}</p>
                            </li>
                            <li className="d-flex align-items-center justify-content-between">
                                <p>Created</p>
                                <p>{formatDate(reservation.created_at)}</p>
                            </li>
                        </ul>
                    </section>

                    {reservation.payment_info?.has_payment && (
                        <>
                            <div className="price border-t d-flex align-items-center justify-content-between pt-24 pb-12">
                                <p>Subtotal</p>
                                <p>
                                    <span>₾{reservation.total_price}</span>
                                </p>
                            </div>

                            {reservation.payment_info.reservation_fee && (
                                <div className="price d-flex align-items-center justify-content-between py-12">
                                    <p>Reservation Fee</p>
                                    <p>
                                        <span>₾{reservation.payment_info.reservation_fee}</span>
                                    </p>
                                </div>
                            )}

                            <div className="price border-b pb-24 d-flex align-items-center justify-content-between pt-12">
                                <p>Payment Status</p>
                                <p>
                                    <span>{reservation.payment_info.payment_status}</span>
                                </p>
                            </div>
                        </>
                    )}

                    <div className="price d-flex align-items-center justify-content-between pt-24">
                        <p>Total Amount</p>
                        <p>
                            <span>₾{reservation.payment_info?.amount || reservation.total_price}</span>
                        </p>
                    </div>

                    {reservation.actions.can_pay && reservation.payment_info?.checkout_url && (
                        <div className="download-btn mt-64">
                            <button
                                type="button"
                                className="btn-primary"
                                onClick={() => window.open(reservation.payment_info.checkout_url!, '_blank')}
                            >
                                Pay Now
                            </button>
                        </div>
                    )}

                    {reservation.actions.can_cancel && (
                        <div className="download-btn mt-24">
                            <button
                                type="button"
                                className="btn-outline-danger"
                                onClick={() => {
                                    // TODO: Implement cancel reservation
                                    toast.error("Cancel functionality coming soon");
                                }}
                            >
                                Cancel Reservation
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default ReservationDetail;
