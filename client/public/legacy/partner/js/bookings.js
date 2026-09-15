// =====================================================
// TRIPZOVA PARTNER BOOKINGS
// =====================================================

(function () {
    "use strict";


    // =================================================
    // STATE
    // =================================================

    let allBookings = [];

    let currentFilter = "all";


    // =================================================
    // LOAD BOOKINGS
    // =================================================

    async function loadPartnerBookings() {

        try {

            showBookingsLoading();

            hideBookingsError();

            const response =
                await partnerFetch(
                    "/api/bookings/partner"
                );


            const data =
                response.data || response;


            if (
                Array.isArray(data)
            ) {

                allBookings = data;

            } else if (
                Array.isArray(data.bookings)
            ) {

                allBookings =
                    data.bookings;

            } else {

                allBookings = [];

            }


            updateBookingStats();

            updateBookingList();


            hideBookingsLoading();

        } catch (error) {

            console.error(
                "Partner bookings error:",
                error
            );


            hideBookingsLoading();

            showBookingsError(
                error.message ||
                "Unable to load bookings."
            );

        }
    }


    // =================================================
    // UPDATE STATISTICS
    // =================================================

    function updateBookingStats() {

        const pending =
            allBookings.filter(
                booking =>
                    booking.bookingStatus ===
                    "pending"
            ).length;


        const confirmed =
            allBookings.filter(
                booking =>
                    booking.bookingStatus ===
                    "confirmed"
            ).length;


        const completed =
            allBookings.filter(
                booking =>
                    booking.bookingStatus ===
                    "completed"
            ).length;


        setText(
            "bookingPendingCount",
            formatNumber(pending)
        );


        setText(
            "bookingConfirmedCount",
            formatNumber(confirmed)
        );


        setText(
            "bookingCompletedCount",
            formatNumber(completed)
        );


        setText(
            "bookingTotalCount",
            formatNumber(
                allBookings.length
            )
        );


        // Sidebar pending badge

        const badge =
            document.getElementById(
                "partnerPendingBookingBadge"
            );


        if (badge) {

            if (pending > 0) {

                badge.textContent =
                    pending;

                badge.style.display =
                    "inline-flex";

            } else {

                badge.style.display =
                    "none";
            }
        }
    }


    // =================================================
    // FILTER BOOKINGS
    // =================================================

    function getFilteredBookings() {

        if (
            currentFilter ===
            "all"
        ) {

            return allBookings;
        }


        return allBookings.filter(
            booking =>
                booking.bookingStatus ===
                currentFilter
        );
    }


    // =================================================
    // UPDATE BOOKING LIST
    // =================================================

    function updateBookingList() {

        const container =
            document.getElementById(
                "partnerBookingsList"
            );


        const empty =
            document.getElementById(
                "partnerBookingsEmpty"
            );


        const card =
            document.getElementById(
                "partnerBookingsCard"
            );


        const resultText =
            document.getElementById(
                "partnerBookingResultText"
            );


        if (!container) {
            return;
        }


        const bookings =
            getFilteredBookings();


        if (resultText) {

            resultText.textContent =
                `${bookings.length} booking${
                    bookings.length === 1
                        ? ""
                        : "s"
                } found`;
        }


        if (
            bookings.length === 0
        ) {

            container.innerHTML = "";


            if (card) {
                card.style.display =
                    "none";
            }


            if (empty) {
                empty.style.display =
                    "block";
            }


            return;
        }


        if (empty) {
            empty.style.display =
                "none";
        }


        if (card) {
            card.style.display =
                "block";
        }


        container.innerHTML =
            bookings
                .map(
                    renderBooking
                )
                .join("");
    }


    // =================================================
    // RENDER BOOKING
    // =================================================

    function renderBooking(
        booking
    ) {

        const customer =
            booking.customer || {};


        const customerName =
            `${customer.firstName || ""} ${
                customer.lastName || ""
            }`.trim() ||
            "Customer";


        const customerEmail =
            customer.email ||
            "";


        const travelDate =
            booking.travelDate
                ? new Date(
                    booking.travelDate
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                )
                : "-";


        const createdDate =
            booking.createdAt
                ? new Date(
                    booking.createdAt
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                )
                : "-";


        const status =
            booking.bookingStatus ||
            "pending";


        const amount =
            Number(
                booking.amount || 0
            );


        const guests =
            Number(
                booking.guests || 1
            );


        const serviceName =
            booking.serviceName ||
            "-";


        const serviceType =
            booking.serviceType ||
            "";


        return `
            <div
                class="partner-booking-row"
                data-booking-id="${escapeHTML(
                    String(
                        booking._id || ""
                    )
                )}"
            >

                <!-- CUSTOMER -->

                <div class="partner-booking-customer">

                    <div class="partner-table-avatar">
                        ${escapeHTML(
                            getInitials(
                                customerName
                            )
                        )}
                    </div>


                    <div>

                        <strong>
                            ${escapeHTML(
                                customerName
                            )}
                        </strong>

                        <small>
                            ${escapeHTML(
                                customerEmail ||
                                "Customer"
                            )}
                        </small>

                    </div>

                </div>


                <!-- SERVICE -->

                <div class="partner-booking-service">

                    <strong>
                        ${escapeHTML(
                            serviceName
                        )}
                    </strong>

                    <small>
                        ${escapeHTML(
                            formatStatus(
                                serviceType
                            )
                        )}
                    </small>

                </div>


                <!-- TRAVEL DATE -->

                <div class="partner-booking-date">

                    <strong>
                        ${escapeHTML(
                            travelDate
                        )}
                    </strong>

                    <small>
                        Booked ${escapeHTML(
                            createdDate
                        )}
                    </small>

                </div>


                <!-- GUESTS -->

                <div class="partner-booking-guests">

                    <strong>
                        ${guests}
                    </strong>

                    <small>
                        ${
                            guests === 1
                                ? "guest"
                                : "guests"
                        }
                    </small>

                </div>


                <!-- AMOUNT -->

                <div class="partner-booking-amount">

                    ${formatCurrency(
                        amount
                    )}

                </div>


                <!-- STATUS -->

                <div class="partner-booking-status">

                    <span
                        class="partner-status ${getStatusClass(
                            status
                        )}"
                    >
                        ${escapeHTML(
                            formatStatus(
                                status
                            )
                        )}
                    </span>

                </div>


                <!-- ACTIONS -->

                <div class="partner-booking-actions">

                    ${renderBookingActions(
                        booking
                    )}

                </div>

            </div>
        `;
    }


    // =================================================
    // BOOKING ACTIONS
    // =================================================

    function renderBookingActions(
        booking
    ) {

        const status =
            booking.bookingStatus;


        const bookingId =
            booking._id;


        if (!bookingId) {
            return "";
        }


        const viewButton = `
            <button
                type="button"
                class="partner-btn partner-btn-sm partner-btn-outline"
                onclick="viewBookingDetails('${escapeHTML(
                    String(bookingId)
                )}')"
                title="View full trip details"
            >
                <i class="bi bi-eye"></i>
                View
            </button>
        `;


        // Pending

        if (
            status ===
            "pending"
        ) {

            return `
                ${viewButton}

                <button
                    type="button"
                    class="partner-btn partner-btn-sm partner-btn-primary"
                    onclick="openConfirmBookingModal('${escapeHTML(
                        String(bookingId)
                    )}')"
                >
                    <i class="bi bi-check-lg"></i>
                    Confirm
                </button>


                <button
                    type="button"
                    class="partner-btn partner-btn-sm partner-btn-outline"
                    onclick="openRejectBookingModal('${escapeHTML(
                        String(bookingId)
                    )}')"
                >
                    <i class="bi bi-x-lg"></i>
                    Reject
                </button>
            `;
        }


        // Confirmed

        if (
            status ===
            "confirmed"
        ) {

            return `
                ${viewButton}

                <button
                    type="button"
                    class="partner-btn partner-btn-sm partner-btn-primary"
                    onclick="completePartnerBooking('${escapeHTML(
                        String(bookingId)
                    )}')"
                >
                    <i class="bi bi-check-circle"></i>
                    Complete
                </button>
            `;
        }


        // Completed

        if (
            status ===
            "completed"
        ) {

            return `
                ${viewButton}

                <span class="partner-action-completed">
                    <i class="bi bi-check-circle-fill"></i>
                    Completed
                </span>
            `;
        }


        // Cancelled

        if (
            status ===
            "cancelled"
        ) {

            return `
                ${viewButton}

                <span class="partner-action-muted">
                    Cancelled
                </span>
            `;
        }


        // Rejected

        if (
            status ===
            "rejected"
        ) {

            return `
                ${viewButton}

                <span class="partner-action-muted">
                    Rejected
                </span>
            `;
        }


        return viewButton;
    }


    // =================================================
    // VIEW FULL BOOKING DETAILS (modal)
    // =================================================

    function viewBookingDetails(bookingId) {

        const booking = allBookings.find(
            (item) => String(item._id) === String(bookingId)
        );

        if (!booking) {
            return;
        }

        const customer = booking.customer || {};
        const vehicle = booking.vehicle || {};
        const driver = booking.driver || {};

        const customerName =
            `${customer.firstName || ""} ${customer.lastName || ""}`.trim() ||
            "Customer";

        const formatDateTime = (value) =>
            value
                ? new Date(value).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                })
                : "-";

        const distanceKm = Number(booking.distanceKm || 0);

        const pricingLine =
            booking.pricingType === "fixed_route" &&
            booking.fixedRouteMatched &&
            booking.fixedRouteMatched.price
                ? `Fixed route price (${escapeHTML(
                    booking.fixedRouteMatched.fromCity || ""
                )} &rarr; ${escapeHTML(
                    booking.fixedRouteMatched.toCity || ""
                )}): <strong>${formatCurrency(
                    booking.fixedRouteMatched.price
                )}</strong>`
                : `Per-KM rate: <strong>${formatCurrency(
                    booking.pricing ? booking.pricing.pricePerKm : 0
                )} / km</strong> &times; ${
                    booking.pricing ? booking.pricing.billableKm : distanceKm
                } km`;

        const driverBlock = driver.name
            ? `
                <div class="partner-booking-detail-section">
                    <h6>Driver Assigned</h6>
                    <div class="partner-booking-detail-grid">
                        <div><span>Name</span><strong>${escapeHTML(driver.name)}</strong></div>
                        <div><span>Phone</span><strong>${escapeHTML(driver.phone || "-")}</strong></div>
                    </div>
                </div>
            `
            : `
                <div class="partner-booking-detail-section">
                    <p class="partner-form-help mb-0">
                        No driver assigned yet. Confirm this booking to assign one.
                    </p>
                </div>
            `;

        const modalBody = document.getElementById("bookingDetailsBody");

        if (modalBody) {
            modalBody.innerHTML = `
                <div class="partner-booking-detail-section">
                    <h6>Customer</h6>
                    <div class="partner-booking-detail-grid">
                        <div><span>Name</span><strong>${escapeHTML(customerName)}</strong></div>
                        <div><span>Email</span><strong>${escapeHTML(customer.email || "-")}</strong></div>
                        <div><span>Phone</span><strong>${escapeHTML(customer.phone || "-")}</strong></div>
                    </div>
                </div>

                <div class="partner-booking-detail-section">
                    <h6>Trip</h6>
                    <div class="partner-booking-detail-grid">
                        <div><span>Vehicle</span><strong>${escapeHTML(vehicle.vehicleName || booking.serviceName || "-")}</strong></div>
                        <div><span>Trip type</span><strong>${escapeHTML(formatStatus(booking.tripType || "one_way"))}</strong></div>
                        <div><span>Pickup</span><strong>${escapeHTML(booking.pickup || "-")}</strong></div>
                        <div><span>Drop</span><strong>${escapeHTML(booking.drop || "-")}</strong></div>
                        <div><span>Distance</span><strong>${distanceKm ? distanceKm + " km" : "-"}</strong></div>
                        <div><span>Passengers</span><strong>${Number(booking.guests || 1)}</strong></div>
                        <div><span>Travel date</span><strong>${formatDateTime(booking.travelDate)}</strong></div>
                        <div><span>Pickup time</span><strong>${escapeHTML(booking.pickupTime || "-")}</strong></div>
                        ${
                            booking.tripType === "round_trip"
                                ? `<div><span>Return date</span><strong>${formatDateTime(booking.returnDate)}</strong></div>`
                                : ""
                        }
                        ${
                            booking.flightNumber
                                ? `<div><span>Flight number</span><strong>${escapeHTML(booking.flightNumber)}</strong></div>`
                                : ""
                        }
                    </div>
                </div>

                <div class="partner-booking-detail-section">
                    <h6>Pricing</h6>
                    <p class="mb-1">${pricingLine}</p>
                    <p class="mb-0">Total amount: <strong>${formatCurrency(booking.amount || 0)}</strong></p>
                </div>

                ${
                    booking.notes
                        ? `
                    <div class="partner-booking-detail-section">
                        <h6>Notes from customer</h6>
                        <p class="mb-0">${escapeHTML(booking.notes)}</p>
                    </div>
                `
                        : ""
                }

                ${driverBlock}
            `;
        }

        const modalEl = document.getElementById("bookingDetailsModal");

        if (modalEl && window.bootstrap) {
            new window.bootstrap.Modal(modalEl).show();
        }
    }


    // =================================================
    // CONFIRM BOOKING + ASSIGN DRIVER (modal)
    // =================================================

    function openConfirmBookingModal(bookingId) {

        const booking = allBookings.find(
            (item) => String(item._id) === String(bookingId)
        );

        if (!booking) {
            return;
        }

        const modalEl = document.getElementById("confirmBookingModal");

        if (!modalEl) {
            return;
        }

        modalEl.dataset.bookingId = bookingId;

        const nameInput = document.getElementById("confirmDriverName");
        const phoneInput = document.getElementById("confirmDriverPhone");
        const errorBox = document.getElementById("confirmBookingError");

        if (nameInput) nameInput.value = "";
        if (phoneInput) phoneInput.value = "";
        if (errorBox) {
            errorBox.style.display = "none";
            errorBox.textContent = "";
        }

        const summary = document.getElementById("confirmBookingSummary");

        if (summary) {
            const customer = booking.customer || {};

            const customerName =
                `${customer.firstName || ""} ${customer.lastName || ""}`.trim() ||
                "Customer";

            summary.innerHTML = `
                Confirming <strong>${escapeHTML(customerName)}</strong>'s trip
                from <strong>${escapeHTML(booking.pickup || "-")}</strong>
                to <strong>${escapeHTML(booking.drop || "-")}</strong>
                for <strong>${Number(booking.guests || 1)}</strong> passenger(s).
                Assign a driver below to confirm.
            `;
        }

        if (window.bootstrap) {
            new window.bootstrap.Modal(modalEl).show();
        }
    }

    async function submitConfirmBooking() {

        const modalEl = document.getElementById("confirmBookingModal");

        if (!modalEl) {
            return;
        }

        const bookingId = modalEl.dataset.bookingId;

        if (!bookingId) {
            return;
        }

        const nameInput = document.getElementById("confirmDriverName");
        const phoneInput = document.getElementById("confirmDriverPhone");
        const errorBox = document.getElementById("confirmBookingError");
        const submitBtn = document.getElementById("confirmBookingSubmitBtn");

        const driverName = nameInput ? nameInput.value.trim() : "";
        const driverPhone = phoneInput ? phoneInput.value.trim() : "";

        if (!driverName || !driverPhone) {
            if (errorBox) {
                errorBox.textContent =
                    "Please enter both the driver's name and phone number.";
                errorBox.style.display = "block";
            }
            return;
        }

        const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "";

        try {

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = "Confirming...";
            }

            await partnerFetch(
                `/api/bookings/${bookingId}/accept`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        driverName,
                        driverPhone
                    })
                }
            );

            if (window.bootstrap) {
                const instance =
                    window.bootstrap.Modal.getInstance(modalEl);
                if (instance) instance.hide();
            }

            await loadPartnerBookings();

            showBookingMessage(
                "Booking confirmed and driver assigned successfully.",
                "success"
            );

        } catch (error) {

            console.error(
                "Confirm booking error:",
                error
            );

            if (errorBox) {
                errorBox.textContent =
                    error.message || "Unable to confirm this booking.";
                errorBox.style.display = "block";
            }

        } finally {

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }
        }
    }


    // =================================================
    // REJECT BOOKING (modal)
    // =================================================

    function openRejectBookingModal(bookingId) {

        if (!bookingId) {
            return;
        }

        const booking = allBookings.find(
            (item) => String(item._id) === String(bookingId)
        );

        if (!booking || booking.bookingStatus !== "pending") {
            showBookingMessage(
                "Only pending bookings can be rejected.",
                "danger"
            );
            return;
        }

        const modalEl = document.getElementById("rejectBookingModal");

        if (!modalEl) {
            showBookingMessage(
                "Reject dialog is unavailable. Please refresh the page.",
                "danger"
            );
            return;
        }

        modalEl.dataset.bookingId = bookingId;

        const reasonInput = document.getElementById("rejectBookingReason");
        const errorBox = document.getElementById("rejectBookingError");
        const summary = document.getElementById("rejectBookingSummary");

        if (reasonInput) {
            reasonInput.value = "";
        }

        if (errorBox) {
            errorBox.textContent = "";
            errorBox.style.display = "none";
        }

        if (summary) {
            const customer = booking.customer || {};
            const customerName =
                `${customer.firstName || ""} ${customer.lastName || ""}`.trim() ||
                "Customer";

            summary.innerHTML = `
                Reject <strong>${escapeHTML(customerName)}</strong>'s booking
                from <strong>${escapeHTML(booking.pickup || "-")}</strong>
                to <strong>${escapeHTML(booking.drop || "-")}</strong>?
            `;
        }

        if (window.bootstrap) {
            new window.bootstrap.Modal(modalEl).show();
        }
    }


    async function submitRejectBooking() {

        const modalEl = document.getElementById("rejectBookingModal");

        if (!modalEl) {
            return;
        }

        const bookingId = modalEl.dataset.bookingId;

        if (!bookingId) {
            return;
        }

        const reasonInput = document.getElementById("rejectBookingReason");
        const errorBox = document.getElementById("rejectBookingError");
        const submitBtn = document.getElementById("rejectBookingSubmitBtn");

        const reason = reasonInput ? reasonInput.value.trim() : "";
        const originalBtnHTML = submitBtn ? submitBtn.innerHTML : "";

        try {

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                    Rejecting...
                `;
            }

            if (errorBox) {
                errorBox.style.display = "none";
                errorBox.textContent = "";
            }

            await partnerFetch(
                `/api/bookings/${bookingId}/reject`,
                {
                    method: "PUT",
                    body: JSON.stringify({ reason })
                }
            );

            if (window.bootstrap) {
                const instance = window.bootstrap.Modal.getInstance(modalEl);
                if (instance) {
                    instance.hide();
                }
            }

            await loadPartnerBookings();

            showBookingMessage(
                "Booking rejected successfully.",
                "success"
            );

        } catch (error) {

            console.error(
                "Reject booking error:",
                error
            );

            if (errorBox) {
                errorBox.textContent =
                    error.message || "Unable to reject this booking.";
                errorBox.style.display = "block";
            }

        } finally {

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
            }
        }
    }


    // =================================================
    // COMPLETE BOOKING
    // =================================================

    async function completePartnerBooking(
        bookingId
    ) {

        if (!bookingId) {
            return;
        }


        const confirmed =
            window.confirm(
                "Mark this booking as completed?"
            );


        if (!confirmed) {
            return;
        }


        try {

            setBookingActionLoading(
                bookingId,
                true
            );


            await partnerFetch(
                `/api/bookings/${bookingId}/complete`,
                {
                    method: "PUT"
                }
            );


            await loadPartnerBookings();


            showBookingMessage(
                "Booking marked as completed.",
                "success"
            );


        } catch (error) {

            console.error(
                "Complete booking error:",
                error
            );


            showBookingMessage(
                error.message ||
                "Unable to complete booking.",
                "danger"
            );


            setBookingActionLoading(
                bookingId,
                false
            );
        }
    }


    // =================================================
    // ACTION LOADING
    // =================================================

    function setBookingActionLoading(
        bookingId,
        loading
    ) {

        const row =
            document.querySelector(
                `[data-booking-id="${bookingId}"]`
            );


        if (!row) {
            return;
        }


        const buttons =
            row.querySelectorAll(
                "button"
            );


        buttons.forEach(
            button => {

                button.disabled =
                    loading;

            }
        );


        if (loading) {

            buttons.forEach(
                button => {

                    button.innerHTML =
                        `
                        <span
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        Processing...
                        `;

                }
            );
        }
    }


    // =================================================
    // FILTER BUTTONS
    // =================================================

    function initializeFilters() {

        const buttons =
            document.querySelectorAll(
                ".partner-filter-btn"
            );


        buttons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    function () {

                        const status =
                            this.dataset.status ||
                            "all";


                        currentFilter =
                            status;


                        buttons.forEach(
                            item => {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        this.classList.add(
                            "active"
                        );


                        updateBookingList();

                    }
                );

            }
        );
    }


    // =================================================
    // LOADING
    // =================================================

    function showBookingsLoading() {

        const loading =
            document.getElementById(
                "partnerBookingsLoading"
            );


        const card =
            document.getElementById(
                "partnerBookingsCard"
            );


        const empty =
            document.getElementById(
                "partnerBookingsEmpty"
            );


        if (loading) {

            loading.style.display =
                "block";
        }


        if (card) {

            card.style.display =
                "none";
        }


        if (empty) {

            empty.style.display =
                "none";
        }
    }


    function hideBookingsLoading() {

        const loading =
            document.getElementById(
                "partnerBookingsLoading"
            );


        if (loading) {

            loading.style.display =
                "none";
        }
    }


    // =================================================
    // ERROR
    // =================================================

    function showBookingsError(
        message
    ) {

        const container =
            document.getElementById(
                "partnerBookingsError"
            );


        if (!container) {
            return;
        }


        container.innerHTML = `
            <div class="partner-alert partner-alert-danger">

                <i class="bi bi-exclamation-triangle"></i>

                <span>
                    ${escapeHTML(
                        message
                    )}
                </span>


                <button
                    type="button"
                    class="partner-btn partner-btn-sm partner-btn-outline"
                    onclick="loadPartnerBookings()"
                >
                    Retry
                </button>

            </div>
        `;


        container.style.display =
            "block";
    }


    function hideBookingsError() {

        const container =
            document.getElementById(
                "partnerBookingsError"
            );


        if (container) {

            container.innerHTML =
                "";

            container.style.display =
                "none";
        }
    }


    // =================================================
    // ACTION MESSAGE
    // =================================================

    function showBookingMessage(
        message,
        type
    ) {

        const container =
            document.getElementById(
                "partnerBookingsError"
            );


        if (!container) {
            return;
        }


        const icon =
            type === "success"
                ? "bi-check-circle"
                : "bi-exclamation-triangle";


        const alertClass =
            type === "success"
                ? "partner-alert-success"
                : "partner-alert-danger";


        container.innerHTML = `
            <div class="partner-alert ${alertClass}">

                <i class="bi ${icon}"></i>

                <span>
                    ${escapeHTML(
                        message
                    )}
                </span>

            </div>
        `;


        container.style.display =
            "block";


        setTimeout(
            function () {

                hideBookingsError();

            },
            4000
        );
    }


    // =================================================
    // START
    // =================================================

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            if (
                typeof requirePartnerLogin ===
                "function"
            ) {

                if (
                    !requirePartnerLogin()
                ) {

                    return;
                }
            }


            initializeFilters();

            loadPartnerBookings();

        }
    );


    // =================================================
    // GLOBAL FUNCTIONS
    // =================================================

    window.loadPartnerBookings =
        loadPartnerBookings;


    window.viewBookingDetails =
        viewBookingDetails;


    window.openConfirmBookingModal =
        openConfirmBookingModal;


    window.submitConfirmBooking =
        submitConfirmBooking;


    window.openRejectBookingModal =
        openRejectBookingModal;


    window.submitRejectBooking =
        submitRejectBooking;


    window.completePartnerBooking =
        completePartnerBooking;

})();