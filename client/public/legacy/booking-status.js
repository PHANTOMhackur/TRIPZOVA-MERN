(function () {
    "use strict";

    /* =====================================================
       AUTH GUARD (same pattern as customer-dashboard.js)
    ===================================================== */

    function getToken() {
        return localStorage.getItem("tripzovaToken");
    }

    function getStoredUser() {
        try {
            const raw = localStorage.getItem("tripzovaUser");
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            return null;
        }
    }

    const token = getToken();
    const storedUser = getStoredUser();

    if (!token) {
        const returnTo = encodeURIComponent(
            window.location.pathname + window.location.search
        );
        window.location.replace(`/login?redirect=${returnTo}`);
        return;
    }

    if (storedUser && storedUser.role === "admin") {
        window.location.replace("/admin/");
        return;
    }

    if (storedUser && storedUser.role === "partner") {
        window.location.replace("/partner/");
        return;
    }


    /* =====================================================
       API HELPER
    ===================================================== */

    async function customerFetch(url, options = {}) {
        const response = await fetch(url, {
            ...options,
            headers: {
                ...(options.headers || {}),
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        let data = {};
        try {
            data = await response.json();
        } catch (error) {
            data = {};
        }

        if (response.status === 401) {
            localStorage.removeItem("tripzovaToken");
            localStorage.removeItem("tripzovaUser");

            const returnTo = encodeURIComponent(
                window.location.pathname + window.location.search
            );
            window.location.replace(`/login?redirect=${returnTo}`);
            throw new Error("Session expired.");
        }

        if (!response.ok) {
            throw new Error(data.message || "Request failed.");
        }

        return data;
    }


    /* =====================================================
       HELPERS
    ===================================================== */

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(Number(value || 0));
    }

    function formatDate(value) {
        if (!value) return "-";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "-";
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    function toDateInputValue(value) {
        if (!value) return "";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "";
        return date.toISOString().slice(0, 10);
    }

    function formatStatus(value) {
        if (!value) return "Unknown";
        return String(value)
            .replace(/_/g, " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    }


    /* =====================================================
       STATE
    ===================================================== */

    const params = new URLSearchParams(window.location.search);
    const bookingId = params.get("id");

    let currentBooking = null;
    let countdownTimer = null;
    let refreshTimer = null;

    if (!bookingId) {
        showError("No booking was specified.");
        return;
    }


    /* =====================================================
       LOAD BOOKING
    ===================================================== */

    async function loadBooking(silent) {
        if (!silent) {
            document.getElementById("bstatLoading").style.display = "block";
        }

        document.getElementById("bstatError").style.display = "none";

        try {
            const data = await customerFetch(`/api/bookings/${bookingId}`);

            currentBooking = data.booking || null;

            if (!currentBooking) {
                throw new Error("Booking not found.");
            }

            document.getElementById("bstatLoading").style.display = "none";
            document.getElementById("bstatContent").style.display = "block";

            renderBooking(currentBooking);

        } catch (error) {
            console.error("Load booking error:", error);

            document.getElementById("bstatLoading").style.display = "none";
            showError(error.message || "Unable to load this booking.");
        }
    }

    function showError(message) {
        const errorEl = document.getElementById("bstatError");
        errorEl.textContent = message;
        errorEl.style.display = "block";
    }


    /* =====================================================
       RENDER
    ===================================================== */

    function renderBooking(booking) {
        const vehicle = booking.vehicle || {};

        const vehicleName =
            vehicle.vehicleName ||
            [vehicle.brand, vehicle.model].filter(Boolean).join(" ") ||
            booking.serviceName ||
            "Your Ride";

        document.getElementById("bstatVehicleName").textContent = vehicleName;
        document.getElementById("bstatBookingNumber").textContent =
            booking.bookingNumber || "-";

        const status = booking.bookingStatus || "pending";
        const statusBadge = document.getElementById("bstatStatusBadge");
        statusBadge.textContent = formatStatus(status);
        statusBadge.className = `dash-status dash-status-${escapeHTML(status)}`;

        renderDetailsGrid(booking, vehicle);
        renderDriver(booking);
        renderEditBanner(booking);

        // Keep polling gently while the booking is still pending, so
        // the customer sees the moment a partner confirms it -
        // but not while they're mid-edit.
        clearTimeout(refreshTimer);

        const editFormOpen =
            document.getElementById("bstatEditForm").style.display !== "none";

        if (status === "pending" && !editFormOpen) {
            refreshTimer = setTimeout(() => loadBooking(true), 15000);
        }
    }

    function renderDetailsGrid(booking, vehicle) {
        const distanceKm = Number(booking.distanceKm || 0);

        const pricingLine =
            booking.pricingType === "fixed_route" &&
            booking.fixedRouteMatched &&
            booking.fixedRouteMatched.price
                ? `Fixed price: ${escapeHTML(
                      booking.fixedRouteMatched.fromCity || ""
                  )} &rarr; ${escapeHTML(booking.fixedRouteMatched.toCity || "")}`
                : "Per-KM rate";

        const rows = [
            ["Pickup", booking.pickup || "-"],
            ["Drop", booking.drop || "-"],
            ["Travel Date", formatDate(booking.travelDate)],
            ["Pickup Time", booking.pickupTime || "-"],
            ["Trip Type", formatStatus(booking.tripType || "one_way")],
            ["Passengers", Number(booking.guests || 1)],
            ["Distance", distanceKm ? `${distanceKm} km` : "-"],
            ["Amount", formatCurrency(booking.amount || 0)]
        ];

        if (booking.tripType === "round_trip") {
            rows.splice(5, 0, ["Return Date", formatDate(booking.returnDate)]);
        }

        if (booking.flightNumber) {
            rows.push(["Flight Number", booking.flightNumber]);
        }

        const grid = document.getElementById("bstatDetailsGrid");

        grid.innerHTML = rows
            .map(
                ([label, value]) => `
                    <div>
                        <span>${escapeHTML(label)}</span>
                        <strong>${
                            typeof value === "string" ? escapeHTML(value) : value
                        }</strong>
                    </div>
                `
            )
            .join("") +
            `
                <div>
                    <span>Pricing</span>
                    <strong>${pricingLine}</strong>
                </div>
            `;
    }

    function renderDriver(booking) {
        const driver = booking.driver || {};
        const card = document.getElementById("bstatDriverCard");

        if (!driver.name) {
            card.style.display = "none";
            return;
        }

        card.style.display = "block";

        document.getElementById("bstatDriverGrid").innerHTML = `
            <div>
                <span>Driver Name</span>
                <strong>${escapeHTML(driver.name)}</strong>
            </div>
            <div>
                <span>Driver Phone</span>
                <strong>${escapeHTML(driver.phone || "-")}</strong>
            </div>
        `;
    }

    function renderEditBanner(booking) {
        clearInterval(countdownTimer);

        const editBanner = document.getElementById("bstatEditBanner");
        const lockedBanner = document.getElementById("bstatLockedBanner");
        const editForm = document.getElementById("bstatEditForm");

        const isPending = booking.bookingStatus === "pending";
        const editableUntil = booking.editableUntil
            ? new Date(booking.editableUntil).getTime()
            : 0;

        const msRemaining = editableUntil - Date.now();

        if (isPending && msRemaining > 0) {
            editBanner.style.display = "flex";
            lockedBanner.style.display = "none";

            tickCountdown(editableUntil);
            countdownTimer = setInterval(() => tickCountdown(editableUntil), 1000);

        } else {
            editBanner.style.display = "none";
            editForm.style.display = "none";

            // Only show the "window closed" note for bookings that
            // are still pending (not for already confirmed/cancelled/
            // rejected/completed ones, where it's simply not relevant).
            lockedBanner.style.display = isPending ? "block" : "none";
        }
    }

    function tickCountdown(editableUntil) {
        const msRemaining = editableUntil - Date.now();

        if (msRemaining <= 0) {
            clearInterval(countdownTimer);
            // Window just expired - re-render to lock the UI.
            if (currentBooking) {
                renderEditBanner(currentBooking);
            }
            return;
        }

        const totalSeconds = Math.floor(msRemaining / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        document.getElementById("bstatCountdown").textContent =
            `${minutes}:${String(seconds).padStart(2, "0")}`;
    }


    /* =====================================================
       EDIT FORM
    ===================================================== */

    function openEditForm() {
        if (!currentBooking) return;

        document.getElementById("editPickup").value = currentBooking.pickup || "";
        document.getElementById("editDrop").value = currentBooking.drop || "";
        document.getElementById("editTravelDate").value = toDateInputValue(
            currentBooking.travelDate
        );
        document.getElementById("editPickupTime").value =
            currentBooking.pickupTime || "";
        document.getElementById("editGuests").value = Number(
            currentBooking.guests || 1
        );

        const returnWrap = document.getElementById("editReturnDateWrap");

        if (currentBooking.tripType === "round_trip") {
            returnWrap.style.display = "block";
            document.getElementById("editReturnDate").value = toDateInputValue(
                currentBooking.returnDate
            );
        } else {
            returnWrap.style.display = "none";
        }

        document.getElementById("bstatEditError").style.display = "none";
        document.getElementById("bstatEditForm").style.display = "block";

        clearTimeout(refreshTimer);
    }

    function closeEditForm() {
        document.getElementById("bstatEditForm").style.display = "none";

        if (currentBooking && currentBooking.bookingStatus === "pending") {
            refreshTimer = setTimeout(() => loadBooking(true), 15000);
        }
    }

    async function saveEdit() {
        const saveBtn = document.getElementById("bstatSaveBtn");
        const errorBox = document.getElementById("bstatEditError");

        const guests = Number(document.getElementById("editGuests").value);

        if (!Number.isInteger(guests) || guests < 1) {
            errorBox.textContent = "Passengers must be at least 1.";
            errorBox.style.display = "block";
            return;
        }

        const payload = {
            pickup: document.getElementById("editPickup").value.trim(),
            drop: document.getElementById("editDrop").value.trim(),
            travelDate: document.getElementById("editTravelDate").value,
            pickupTime: document.getElementById("editPickupTime").value.trim(),
            guests
        };

        if (currentBooking.tripType === "round_trip") {
            payload.returnDate =
                document.getElementById("editReturnDate").value || null;
        }

        const originalText = saveBtn.textContent;

        try {
            saveBtn.disabled = true;
            saveBtn.textContent = "Saving...";
            errorBox.style.display = "none";

            const data = await customerFetch(`/api/bookings/${bookingId}`, {
                method: "PUT",
                body: JSON.stringify(payload)
            });

            currentBooking = data.booking || currentBooking;

            document.getElementById("bstatEditForm").style.display = "none";

            renderBooking(currentBooking);

        } catch (error) {
            console.error("Update booking error:", error);
            errorBox.textContent =
                error.message || "Unable to update this booking.";
            errorBox.style.display = "block";

        } finally {
            saveBtn.disabled = false;
            saveBtn.textContent = originalText;
        }
    }

    async function cancelThisBooking() {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this booking?"
        );

        if (!confirmed) return;

        const cancelBtn = document.getElementById("bstatCancelBtn");
        const originalText = cancelBtn.textContent;

        try {
            cancelBtn.disabled = true;
            cancelBtn.textContent = "Cancelling...";

            await customerFetch(`/api/bookings/${bookingId}/cancel`, {
                method: "PUT",
                body: JSON.stringify({ reason: "Cancelled by customer" })
            });

            await loadBooking();

        } catch (error) {
            console.error("Cancel booking error:", error);
            alert(error.message || "Unable to cancel this booking.");

        } finally {
            cancelBtn.disabled = false;
            cancelBtn.textContent = originalText;
        }
    }


    /* =====================================================
       INIT
    ===================================================== */

    document.addEventListener("DOMContentLoaded", () => {
        loadBooking();

        document.getElementById("bstatEditBtn").addEventListener("click", openEditForm);
        document.getElementById("bstatCancelEditBtn").addEventListener("click", closeEditForm);
        document.getElementById("bstatSaveBtn").addEventListener("click", saveEdit);
        document.getElementById("bstatCancelBtn").addEventListener("click", cancelThisBooking);
    });

})();
