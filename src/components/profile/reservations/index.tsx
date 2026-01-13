import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { reservationService } from "../../../api/reservation";
import { Reservation } from "../../../types/reservation";
import toast from "react-hot-toast";

const Reservations = () => {
    const [activeTab, setActiveTab] = useState<"current" | "history">("current");
    const [currentReservations, setCurrentReservations] = useState<Reservation[]>([]);
    const [historyReservations, setHistoryReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const currentPage = 1;
    const historyPage = 1;

    useEffect(() => {
        fetchCurrentReservations();
    }, [currentPage]);

    useEffect(() => {
        if (activeTab === "history") {
            fetchHistoryReservations();
        }
    }, [activeTab, historyPage]);

    const fetchCurrentReservations = async () => {
        try {
            setLoading(true);
            const response = await reservationService.getCurrentReservations(currentPage);
            setCurrentReservations(response.data);
        } catch (error: any) {
            console.error("Error fetching current reservations:", error);
            toast.error(error.response?.data?.message || "Failed to load reservations");
        } finally {
            setLoading(false);
        }
    };

    const fetchHistoryReservations = async () => {
        try {
            setLoading(true);
            const response = await reservationService.getCompletedReservations(historyPage);
            setHistoryReservations(response.data);
        } catch (error: any) {
            console.error("Error fetching history reservations:", error);
            toast.error(error.response?.data?.message || "Failed to load history");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "short",
        });
    };

    const getStatusBadgeClass = (status: string) => {
        const statusMap: { [key: string]: string } = {
            pending: "status-pending",
            confirmed: "status-confirmed",
            awaiting_payment: "status-awaiting",
            paid: "status-paid",
            completed: "status-completed",
            cancelled: "status-cancelled",
            no_show: "status-no-show",
        };
        return statusMap[status] || "";
    };

    const renderReservationCard = (reservation: Reservation, isHistory: boolean = false) => {
        const imageUrl = reservation.restaurant_image?.startsWith("http")
            ? reservation.restaurant_image
            : `https://api.foodly.pro${reservation.restaurant_image}`;

        return (
            <div
                key={reservation.id}
                className={`ticket-card radius-8 ${isHistory ? "history" : ""}`}
            >
                <div className="card-title d-flex align-items-center justify-content-between">
                    <p>{formatDate(reservation.reservation_date)}</p>
                    <span
                        className={getStatusBadgeClass(reservation.status)}
                        style={{ backgroundColor: reservation.status_hex, color: '#ffffff' }}
                    >
                        {reservation.status_label}
                    </span>
                </div>

                <div className="card-item d-flex align-items-center gap-16 w-100">
                    <div className="image shrink-0 overflow-hidden radius-8">
                        <img
                            src={imageUrl}
                            alt={reservation.restaurant_name}
                            className="img-fluid w-100 h-100 object-fit-cover"
                            onError={(e) => {
                                e.currentTarget.src = "/assets/images/ticket/img-1.png";
                            }}
                        />
                    </div>

                    <div className="content flex-grow">
                        <h4>{reservation.restaurant_name}</h4>
                        <p className="d-flex align-items-center gap-04 location mt-04">
                            <img src="/assets/svg/map-marker.svg" alt="icon" />
                            {reservation.restaurant_address}
                        </p>
                        <p className="rating d-flex align-items-center gap-04 mt-16">
                            <img src="/assets/svg/clock.svg" alt="icon" />
                            {reservation.time_from} • {reservation.guests_count} Guests
                        </p>
                    </div>
                </div>

                <div className={`card-footer ${isHistory ? "" : "d-flex align-items-center justify-content-between"}`}>
                    {isHistory ? (
                        <>
                            <div className="top d-flex align-items-center justify-content-between">
                                <div>
                                    <p>Total Price</p>
                                    <h3>₾{reservation.total_price}</h3>
                                </div>
                                {reservation.status === "completed" && (
                                    <button
                                        type="button"
                                        className="rating"
                                        data-bs-toggle="modal"
                                        data-bs-target="#reviewModal"
                                    >
                                        Rating
                                    </button>
                                )}
                            </div>
                            <Link to={`/reservation-detail/${reservation.id}`}>Detail</Link>
                        </>
                    ) : (
                        <>
                            <div>
                                <p>Total Price</p>
                                <h3>₾{reservation.total_price}</h3>
                            </div>
                            <Link to={`/reservation-detail/${reservation.id}`}>Detail</Link>
                        </>
                    )}
                </div>
            </div>
        );
    };

    return (
        <>
            <main className="ticket">
                <div className="page-title">
                    <h3 className="main-title">My Reservations</h3>
                </div>

                <section className="ticket-tab">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "current" ? "active" : ""}`}
                                id="current-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#current-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="current-tab-pane"
                                aria-selected={activeTab === "current"}
                                onClick={() => setActiveTab("current")}
                            >
                                Current
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === "history" ? "active" : ""}`}
                                id="history-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#history-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="history-tab-pane"
                                aria-selected={activeTab === "history"}
                                onClick={() => setActiveTab("history")}
                            >
                                History
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content" id="myTabContent">
                        {/* Current Reservations Tab */}
                        <div
                            className={`tab-pane fade ${activeTab === "current" ? "show active" : ""}`}
                            id="current-tab-pane"
                            role="tabpanel"
                            aria-labelledby="current-tab"
                            tabIndex={-1}
                        >
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : currentReservations.length > 0 ? (
                                currentReservations.map((reservation) =>
                                    renderReservationCard(reservation, false)
                                )
                            ) : (
                                <div className="text-center py-5">
                                    <p>No current reservations found</p>
                                </div>
                            )}
                        </div>

                        {/* History Tab */}
                        <div
                            className={`tab-pane fade ${activeTab === "history" ? "show active" : ""}`}
                            id="history-tab-pane"
                            role="tabpanel"
                            aria-labelledby="history-tab"
                            tabIndex={-1}
                        >
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : historyReservations.length > 0 ? (
                                historyReservations.map((reservation) =>
                                    renderReservationCard(reservation, true)
                                )
                            ) : (
                                <div className="text-center py-5">
                                    <p>No reservation history found</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bottom-nav">
                <ul className="d-flex align-items-center justify-content-around w-100 h-100">
                    <li>
                        <Link to="/home">
                            <img src="/assets/svg/bottom-nav/home.svg" alt="home" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/explore">
                            <img src="/assets/svg/bottom-nav/category.svg" alt="category" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/reservations">
                            <img
                                src="/assets/svg/bottom-nav/ticket-active.svg"
                                alt="ticket"
                            />
                        </Link>
                    </li>
                    <li>
                        <Link to="/wishlist">
                            <img src="/assets/svg/bottom-nav/heart.svg" alt="heart" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/user-profile">
                            <img src="/assets/svg/bottom-nav/profile.svg" alt="profile" />
                        </Link>
                    </li>
                </ul>
            </footer>

            {/* Review Modal */}
            <div
                className="modal fade reviewModal bottomModal"
                id="reviewModal"
                tabIndex={-1}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="modal-close rounded-full"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <img src="/assets/svg/close-black.svg" alt="Close" />
                            </button>
                            <h1 className="modal-title">Give a Review</h1>
                        </div>
                        <div className="modal-body">
                            <ul className="ratingW d-flex align-items-center justify-content-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <li key={star} className={star <= 3 ? "on" : ""}>
                                        <a href="javascript:void(0);">
                                            <img
                                                src="/assets/svg/star-yellow-big.svg"
                                                className="star-yellow"
                                                alt="Star"
                                            />
                                            <img
                                                src="/assets/svg/star-gray.svg"
                                                className="star-gray"
                                                alt="Star"
                                            />
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="msg">
                                <h6>Detail Review</h6>
                                <textarea placeholder="Give a Review"></textarea>
                            </div>
                            <button
                                type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                className="btn-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Reservations;
