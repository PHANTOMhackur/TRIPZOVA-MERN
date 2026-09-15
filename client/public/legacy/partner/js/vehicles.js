// =====================================================
// TRIPZOVA PARTNER - MY VEHICLES
// =====================================================

(function () {
    "use strict";

    let allVehicles = [];
    let pendingDeleteId = null;

    async function loadVehicles() {
        showLoading(true);
        hideError();

        try {
            const data = await partnerFetch("/api/partners/vehicles");

            allVehicles = Array.isArray(data.vehicles)
                ? data.vehicles
                : [];

            updateStats();
            renderVehicles();
        } catch (error) {
            console.error("Load vehicles error:", error);
            showError(error.message || "Unable to load your vehicles.");
        } finally {
            showLoading(false);
        }
    }

    function updateStats() {
        const total = allVehicles.length;
        const available = allVehicles.filter(
            (vehicle) =>
                vehicle.adminApproval === "approved" &&
                vehicle.vehicleStatus === "active" &&
                vehicle.displayAvailability === "available"
        ).length;
        const booked = allVehicles.filter(
            (vehicle) => vehicle.displayAvailability === "booked"
        ).length;
        const maintenance = allVehicles.filter(
            (vehicle) => vehicle.availabilityStatus === "maintenance"
        ).length;
        const pending = allVehicles.filter(
            (vehicle) =>
                vehicle.adminApproval === "pending" ||
                vehicle.vehicleStatus === "pending"
        ).length;
        const rejected = allVehicles.filter(
            (vehicle) =>
                vehicle.adminApproval === "rejected" ||
                vehicle.vehicleStatus === "rejected"
        ).length;

        setText("vehicleTotalCount", total);
        setText("vehicleAvailableCount", available);
        setText("vehicleBookedCount", booked);
        setText("vehicleMaintenanceCount", maintenance);
        setText("vehiclePendingCount", pending);
        setText("vehicleRejectedCount", rejected);
    }

    function renderVehicles() {
        const grid = document.getElementById("vehiclesGrid");
        const emptyState = document.getElementById("vehiclesEmpty");

        if (!grid) return;

        if (!allVehicles.length) {
            grid.innerHTML = "";
            if (emptyState) emptyState.style.display = "block";
            return;
        }

        if (emptyState) emptyState.style.display = "none";

        grid.innerHTML = allVehicles.map(renderVehicleCard).join("");

        grid.querySelectorAll("[data-edit-id]").forEach((button) => {
            button.addEventListener("click", () => {
                window.location.href =
                    `/partner/add-vehicle?id=${button.getAttribute("data-edit-id")}`;
            });
        });

        grid.querySelectorAll("[data-delete-id]").forEach((button) => {
            button.addEventListener("click", () => {
                openDeleteModal(
                    button.getAttribute("data-delete-id"),
                    button.getAttribute("data-delete-name")
                );
            });
        });

        grid.querySelectorAll("[data-availability-id]").forEach((select) => {
            select.addEventListener("change", async () => {
                const vehicleId = select.getAttribute("data-availability-id");
                const previousValue = select.getAttribute("data-current-status") || "available";
                const nextValue = select.value;

                if (!vehicleId || nextValue === previousValue) return;

                select.disabled = true;

                try {
                    const data = await partnerFetch(
                        `/api/partners/vehicles/${vehicleId}/availability`,
                        {
                            method: "PATCH",
                            body: JSON.stringify({
                                availabilityStatus: nextValue
                            })
                        }
                    );

                    showSuccess(data.message || "Vehicle availability updated.");
                    await loadVehicles();
                } catch (error) {
                    select.value = previousValue;
                    select.disabled = false;
                    showError(error.message || "Unable to update vehicle availability.");
                }
            });
        });
    }

    function renderVehicleCard(vehicle) {
        const photo =
            Array.isArray(vehicle.vehiclePhotos) && vehicle.vehiclePhotos.length
                ? vehicle.vehiclePhotos[0]
                : "";

        const imageHTML = photo
            ? `
                <img
                    src="${escapeHTML(photo)}"
                    alt="${escapeHTML(vehicle.vehicleName)}"
                    class="partner-vehicle-image"
                >
            `
            : `
                <div class="partner-vehicle-placeholder">
                    <i class="bi bi-car-front"></i>
                </div>
            `;

        const approvalStatus =
            vehicle.adminApproval === "rejected"
                ? "rejected"
                : vehicle.adminApproval === "pending"
                    ? "pending"
                    : vehicle.vehicleStatus || "active";

        const operationalStatus = vehicle.displayAvailability ||
            vehicle.availabilityStatus ||
            "available";

        const approved =
            vehicle.adminApproval === "approved" &&
            vehicle.vehicleStatus === "active";

        const nextBooking = vehicle.nextBooking;
        const nextBookingHTML = nextBooking
            ? `
                <div class="partner-vehicle-next-booking">
                    <i class="bi bi-calendar2-check"></i>
                    <div>
                        <span>Next booking</span>
                        <strong>${escapeHTML(formatBookingRange(nextBooking))}</strong>
                    </div>
                </div>
            `
            : `
                <div class="partner-vehicle-next-booking is-free">
                    <i class="bi bi-calendar2-heart"></i>
                    <div>
                        <span>Calendar</span>
                        <strong>No upcoming reservation</strong>
                    </div>
                </div>
            `;

        const availabilityControl = approved
            ? `
                <div class="partner-availability-control">
                    <div class="partner-availability-copy">
                        <span>Customer visibility</span>
                        <small>Booked is managed automatically by TRIPZOVA.</small>
                    </div>
                    <select
                        class="partner-availability-select"
                        data-availability-id="${escapeHTML(vehicle._id)}"
                        data-current-status="${escapeHTML(vehicle.availabilityStatus || "available")}" 
                    >
                        <option value="available" ${(vehicle.availabilityStatus || "available") === "available" ? "selected" : ""}>Available</option>
                        <option value="maintenance" ${vehicle.availabilityStatus === "maintenance" ? "selected" : ""}>Maintenance</option>
                        <option value="unavailable" ${vehicle.availabilityStatus === "unavailable" ? "selected" : ""}>Unavailable</option>
                    </select>
                </div>
            `
            : `
                <div class="partner-availability-control is-disabled">
                    <div class="partner-availability-copy">
                        <span>Customer visibility</span>
                        <small>Available after admin approval.</small>
                    </div>
                    <select class="partner-availability-select" disabled>
                        <option>${escapeHTML(formatStatus(approvalStatus))}</option>
                    </select>
                </div>
            `;

        return `
            <div class="partner-vehicle-card">
                <div class="partner-vehicle-photo">
                    ${imageHTML}
                    <span class="tripzova-live-status tripzova-live-status-${escapeHTML(operationalStatus)}">
                        <span class="tripzova-status-dot"></span>
                        ${escapeHTML(formatAvailability(operationalStatus))}
                    </span>
                </div>

                <div class="partner-vehicle-content">
                    <div class="partner-vehicle-header">
                        <h5 class="partner-vehicle-name">
                            ${escapeHTML(vehicle.vehicleName)}
                        </h5>
                        <span class="partner-status ${getStatusClass(approvalStatus)}">
                            ${escapeHTML(formatStatus(approvalStatus))}
                        </span>
                    </div>

                    <div class="partner-vehicle-number">
                        ${escapeHTML(vehicle.vehicleNumber || "")}
                    </div>

                    <div class="partner-vehicle-meta">
                        <span class="partner-vehicle-meta-item">
                            <i class="bi bi-people"></i>
                            ${Number(vehicle.seatCapacity || 0)} Seats
                        </span>
                        <span class="partner-vehicle-meta-item">
                            <i class="bi bi-snow"></i>
                            ${vehicle.airConditioning === "ac" ? "AC" : "Non-AC"}
                        </span>
                        <span class="partner-vehicle-meta-item">
                            <i class="bi bi-fuel-pump"></i>
                            ${escapeHTML(formatStatus(vehicle.fuelType || "other"))}
                        </span>
                    </div>

                    <div class="partner-vehicle-price">
                        <strong>${formatCurrency(vehicle.pricePerKm || 0)}</strong>
                        <span>/ km fallback</span>
                    </div>

                    ${nextBookingHTML}
                    ${availabilityControl}

                    <div class="partner-vehicle-actions">
                        <button
                            type="button"
                            class="partner-btn partner-btn-outline partner-btn-sm"
                            data-edit-id="${escapeHTML(vehicle._id)}"
                        >
                            <i class="bi bi-pencil"></i>
                            Edit
                        </button>

                        <button
                            type="button"
                            class="partner-btn partner-btn-danger partner-btn-sm"
                            data-delete-id="${escapeHTML(vehicle._id)}"
                            data-delete-name="${escapeHTML(vehicle.vehicleName)}"
                        >
                            <i class="bi bi-trash"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function formatAvailability(status) {
        switch (String(status || "").toLowerCase()) {
            case "booked": return "Booked today";
            case "maintenance": return "Maintenance";
            case "unavailable": return "Unavailable";
            default: return "Available";
        }
    }

    function formatBookingRange(booking) {
        const start = formatDate(booking.travelDate);
        const end = booking.returnDate ? formatDate(booking.returnDate) : "";
        const time = booking.pickupTime ? ` • ${booking.pickupTime}` : "";
        return end && end !== start
            ? `${start} – ${end}${time}`
            : `${start}${time}`;
    }

    function formatDate(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return "Upcoming";
        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    function openDeleteModal(vehicleId, vehicleName) {
        pendingDeleteId = vehicleId;
        setText("deleteVehicleName", vehicleName || "this vehicle");

        const modalElement = document.getElementById("deleteVehicleModal");
        if (modalElement && window.bootstrap) {
            new window.bootstrap.Modal(modalElement).show();
        }
    }

    async function confirmDelete() {
        if (!pendingDeleteId) return;

        const confirmButton = document.getElementById("confirmDeleteVehicleBtn");
        if (confirmButton) {
            confirmButton.disabled = true;
            confirmButton.textContent = "Deleting...";
        }

        try {
            await partnerFetch(
                `/api/partners/vehicles/${pendingDeleteId}`,
                { method: "DELETE" }
            );

            const modalElement = document.getElementById("deleteVehicleModal");
            if (modalElement && window.bootstrap) {
                const instance = window.bootstrap.Modal.getInstance(modalElement);
                if (instance) instance.hide();
            }

            pendingDeleteId = null;
            await loadVehicles();
        } catch (error) {
            console.error("Delete vehicle error:", error);
            showError(error.message || "Unable to delete this vehicle.");
        } finally {
            if (confirmButton) {
                confirmButton.disabled = false;
                confirmButton.textContent = "Delete";
            }
        }
    }

    function showLoading(isLoading) {
        const loadingEl = document.getElementById("vehiclesLoading");
        if (loadingEl) loadingEl.style.display = isLoading ? "block" : "none";
    }

    function showError(message) {
        const errorEl = document.getElementById("vehiclesError");
        if (errorEl) {
            errorEl.style.display = "block";
            errorEl.className = "partner-alert partner-alert-danger mb-4";
            errorEl.textContent = message;
            errorEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }

    function showSuccess(message) {
        const errorEl = document.getElementById("vehiclesError");
        if (errorEl) {
            errorEl.style.display = "block";
            errorEl.className = "partner-alert partner-alert-success mb-4";
            errorEl.textContent = message;

            window.setTimeout(() => {
                if (errorEl.classList.contains("partner-alert-success")) {
                    errorEl.style.display = "none";
                }
            }, 3500);
        }
    }

    function hideError() {
        const errorEl = document.getElementById("vehiclesError");
        if (errorEl) errorEl.style.display = "none";
    }

    document.addEventListener("DOMContentLoaded", () => {
        if (
            typeof requirePartnerLogin === "function" &&
            !requirePartnerLogin()
        ) {
            return;
        }

        loadVehicles();

        const confirmButton = document.getElementById("confirmDeleteVehicleBtn");
        if (confirmButton) {
            confirmButton.addEventListener("click", confirmDelete);
        }
    });
})();
