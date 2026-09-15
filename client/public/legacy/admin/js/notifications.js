// =====================================================
// TRIPZOVA ADMIN - NOTIFICATIONS
// (an activity feed derived from /api/admin/bookings and
//  /api/admin/partners - there's no push/real-time
//  notification system on the backend yet)
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    initializeAdmin();

    loadNotifications();

    document.getElementById("refreshNotificationsBtn")
        ?.addEventListener("click", loadNotifications);
});


async function loadNotifications() {

    showLoading(true);
    hideError();

    try {

        const [bookingsData, partnersData] = await Promise.all([
            adminFetch("/api/admin/bookings"),
            adminFetch("/api/admin/partners?status=pending")
        ]);

        const bookings =
            Array.isArray(bookingsData.bookings) ? bookingsData.bookings : [];

        const pendingPartners =
            Array.isArray(partnersData.partners) ? partnersData.partners : [];

        const notifications = buildNotifications(bookings, pendingPartners);

        renderNotifications(notifications);

    } catch (error) {

        console.error("Load notifications error:", error);
        showError(error.message || "Unable to load notifications.");

    } finally {

        showLoading(false);
    }
}


function buildNotifications(bookings, pendingPartners) {

    const bookingItems = [...bookings]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 15)
        .map((booking) => {

            const customer = booking.customer || {};
            const customerName =
                `${customer.firstName || ""} ${customer.lastName || ""}`.trim() || "A customer";

            let icon = "bi-calendar-plus";
            let text = `${customerName} made a new booking (#${booking.bookingNumber || ""}).`;

            if (booking.bookingStatus === "confirmed") {
                icon = "bi-check-circle";
                text = `Booking #${booking.bookingNumber || ""} was confirmed.`;
            } else if (booking.bookingStatus === "completed") {
                icon = "bi-flag";
                text = `Booking #${booking.bookingNumber || ""} was completed.`;
            } else if (booking.bookingStatus === "cancelled") {
                icon = "bi-x-circle";
                text = `Booking #${booking.bookingNumber || ""} was cancelled.`;
            }

            return { icon, text, date: booking.createdAt };
        });

    const partnerItems = pendingPartners.map((partner) => ({
        icon: "bi-person-badge",
        text: `${partner.firstName || ""} ${partner.lastName || ""}`.trim() +
            " is waiting for partner approval.",
        date: partner.createdAt
    }));

    return [...partnerItems, ...bookingItems]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 25);
}


function renderNotifications(notifications) {

    const card = document.getElementById("notificationsCard");
    const emptyState = document.getElementById("notificationsEmpty");
    const list = document.getElementById("notificationsList");

    if (!notifications.length) {
        card.style.display = "none";
        emptyState.style.display = "block";
        return;
    }

    card.style.display = "block";
    emptyState.style.display = "none";

    list.innerHTML = notifications.map((item) => `
        <div class="notification-item">
            <div class="notification-icon">
                <i class="bi ${item.icon}"></i>
            </div>
            <div class="notification-body">
                <p>${escapeHTML(item.text)}</p>
                <small>${formatDate(item.date)}</small>
            </div>
        </div>
    `).join("");
}


// =========================================================
// HELPERS
// =========================================================

function showLoading(show) {
    const el = document.getElementById("notificationsLoading");
    if (el) el.style.display = show ? "flex" : "none";
}

function showError(message) {
    const el = document.getElementById("notificationsError");
    if (!el) return;
    el.textContent = message;
    el.style.display = "block";
}

function hideError() {
    const el = document.getElementById("notificationsError");
    if (el) el.style.display = "none";
}

function formatDate(dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "-";
    return date.toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}
