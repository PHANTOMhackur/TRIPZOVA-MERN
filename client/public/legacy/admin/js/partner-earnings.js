// =====================================================
// TRIPZOVA ADMIN - PARTNER EARNINGS
// (derived from /api/admin/bookings - no separate
//  payouts/earnings ledger exists on the backend yet)
// =====================================================

let earningsByPartner = [];

document.addEventListener("DOMContentLoaded", () => {
    initializeAdmin();

    loadEarnings();

    document.getElementById("earningsSearch")
        ?.addEventListener("input", applyEarningsSearch);

    document.getElementById("refreshEarningsBtn")
        ?.addEventListener("click", loadEarnings);
});


async function loadEarnings() {

    showLoading(true);
    hideError();

    try {

        const data = await adminFetch("/api/admin/bookings");

        const bookings =
            Array.isArray(data.bookings) ? data.bookings : [];

        earningsByPartner = buildPartnerEarnings(bookings);

        renderSummary(earningsByPartner);
        renderTable(earningsByPartner);

        document.getElementById("earningsBody").style.display = "block";

    } catch (error) {

        console.error("Load partner earnings error:", error);
        showError(error.message || "Unable to load earnings.");

    } finally {

        showLoading(false);
    }
}


function buildPartnerEarnings(bookings) {

    const byPartner = new Map();

    bookings.forEach((booking) => {

        const partner = booking.partner;
        if (!partner || !partner._id) return;

        if (!byPartner.has(partner._id)) {
            byPartner.set(partner._id, {
                id: partner._id,
                name: `${partner.firstName || ""} ${partner.lastName || ""}`.trim() || "Partner",
                email: partner.email || "",
                total: 0,
                confirmed: 0,
                completed: 0,
                earned: 0
            });
        }

        const entry = byPartner.get(partner._id);
        entry.total += 1;

        if (booking.bookingStatus === "confirmed") {
            entry.confirmed += 1;
            entry.earned += Number(booking.amount || 0);
        }

        if (booking.bookingStatus === "completed") {
            entry.completed += 1;
            entry.earned += Number(booking.amount || 0);
        }
    });

    return Array.from(byPartner.values())
        .filter((p) => p.earned > 0)
        .sort((a, b) => b.earned - a.earned);
}


function renderSummary(partners) {

    const totalPaid = partners.reduce((sum, p) => sum + p.earned, 0);
    const count = partners.length;
    const avg = count ? totalPaid / count : 0;

    setText("earningsTotalPaid", formatCurrency(totalPaid));
    setText("earningsPartnerCount", count);
    setText("earningsAvgPerPartner", formatCurrency(avg));
}


function applyEarningsSearch() {

    const query =
        (document.getElementById("earningsSearch")?.value || "")
            .trim().toLowerCase();

    if (!query) {
        renderTable(earningsByPartner);
        return;
    }

    const filtered = earningsByPartner.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.email.toLowerCase().includes(query)
    );

    renderTable(filtered);
}


function renderTable(partners) {

    const tbody = document.getElementById("earningsTableBody");
    const emptyState = document.getElementById("earningsEmpty");
    const container = document.getElementById("earningsTableContainer");

    if (!partners.length) {
        tbody.innerHTML = "";
        container.style.display = "none";
        emptyState.style.display = "block";
        return;
    }

    container.style.display = "block";
    emptyState.style.display = "none";

    tbody.innerHTML = partners.map((p) => `
        <tr>
            <td>
                <div>${escapeHTML(p.name)}</div>
                <div class="text-muted small">${escapeHTML(p.email)}</div>
            </td>
            <td>${p.total}</td>
            <td>${p.confirmed}</td>
            <td>${p.completed}</td>
            <td><strong>${formatCurrency(p.earned)}</strong></td>
        </tr>
    `).join("");
}


// =========================================================
// HELPERS
// =========================================================

function showLoading(show) {
    const el = document.getElementById("earningsLoading");
    if (el) el.style.display = show ? "flex" : "none";
}

function showError(message) {
    const el = document.getElementById("earningsError");
    if (!el) return;
    el.textContent = message;
    el.style.display = "block";
}

function hideError() {
    const el = document.getElementById("earningsError");
    if (el) el.style.display = "none";
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent =
            value === undefined || value === null || value === "" ? "-" : value;
    }
}
