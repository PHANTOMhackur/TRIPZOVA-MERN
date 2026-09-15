import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function AdminBookingsPage() {
  usePageTitle("Bookings | TRIPZOVA Admin");
  useLegacyPage({ styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css", "/legacy/admin/css/admin.css"], scripts: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "/legacy/admin/js/admin.js", "/legacy/admin/js/bookings.js"], beforeLoad: undefined });

  return (
    <>
    <div className={"admin-layout"}>
      <aside className={"admin-sidebar"}>
        <div className={"sidebar-brand"}>
          <div className={"brand-icon"}>
            <i className={"bi bi-airplane-fill"}></i>
          </div>
          <span>
            TRIPZOVA
          </span>
        </div>
        <div className={"sidebar-content"}>
          <div className={"sidebar-section-title"}>
            MAIN
          </div>
          <a href={"/admin/"} className={"sidebar-link"}>
            <i className={"bi bi-grid-fill"}></i>
            <span>
              Dashboard
            </span>
          </a>
          <div className={"sidebar-section-title"}>
            USERS & PARTNERS
          </div>
          <a href={"/admin/users"} className={"sidebar-link"}>
            <i className={"bi bi-people-fill"}></i>
            <span>
              Users
            </span>
          </a>
          <a href={"/admin/partners"} className={"sidebar-link"}>
            <i className={"bi bi-person-badge-fill"}></i>
            <span>
              Partners
            </span>
          </a>
          <a href={"/admin/users"} className={"sidebar-link"}>
            <i className={"bi bi-person-walking"}></i>
            <span>
              Travellers
            </span>
          </a>
          <div className={"sidebar-section-title"}>
            TRIPZOVA SERVICES
          </div>
          <a href={"/admin/vehicles"} className={"sidebar-link"}>
            <i className={"bi bi-car-front-fill"}></i>
            <span>
              Vehicles
            </span>
            <span className={"sidebar-badge"} id={"sidebarVehiclePendingBadge"}>
              0
            </span>
          </a>
          <a href={"/admin/tours"} className={"sidebar-link"}>
            <i className={"bi bi-map-fill"}></i>
            <span>
              Tours
            </span>
          </a>
          <a href={"/admin/rides"} className={"sidebar-link"}>
            <i className={"bi bi-car-front-fill"}></i>
            <span>
              Rides
            </span>
          </a>
          <a href={"/admin/bookings"} className={"sidebar-link active"}>
            <i className={"bi bi-calendar-check-fill"}></i>
            <span>
              Bookings
            </span>
          </a>
          <div className={"sidebar-section-title"}>
            FINANCE
          </div>
          <a href={"/admin/payments"} className={"sidebar-link"}>
            <i className={"bi bi-credit-card-fill"}></i>
            <span>
              Payments
            </span>
          </a>
          <a href={"/admin/partner-earnings"} className={"sidebar-link"}>
            <i className={"bi bi-wallet2"}></i>
            <span>
              Partner Earnings
            </span>
          </a>
          <div className={"sidebar-section-title"}>
            MANAGEMENT
          </div>
          <a href={"/admin/reports"} className={"sidebar-link"}>
            <i className={"bi bi-bar-chart-fill"}></i>
            <span>
              Reports
            </span>
          </a>
          <a href={"/admin/reviews"} className={"sidebar-link"}>
            <i className={"bi bi-star-fill"}></i>
            <span>
              Reviews
            </span>
          </a>
          <a href={"/admin/notifications"} className={"sidebar-link"}>
            <i className={"bi bi-bell-fill"}></i>
            <span>
              Notifications
            </span>
          </a>
          <a href={"/admin/settings"} className={"sidebar-link"}>
            <i className={"bi bi-gear-fill"}></i>
            <span>
              Settings
            </span>
          </a>
        </div>
        <div className={"sidebar-footer"}>
          <button type={"button"} className={"sidebar-logout"} id={"logoutBtn"}>
            <i className={"bi bi-box-arrow-left"}></i>
            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>
      <main className={"admin-main"}>
        <header className={"admin-navbar"}>
          <div>
            <h1 className={"admin-page-title"}>
              Bookings
            </h1>
            <p className={"admin-page-subtitle"}>
              Manage all TRIPZOVA bookings
            </p>
          </div>
          <div className={"admin-navbar-right"}>
            <div className={"admin-notification"}>
              <i className={"bi bi-bell"}></i>
              <span></span>
            </div>
            <div className={"admin-profile"}>
              <div className={"admin-profile-icon"}>
                <i className={"bi bi-person-fill"}></i>
              </div>
              <div>
                <strong id={"adminName"}>
                  TRIPZOVA Admin
                </strong>
                <small>
                  Administrator
                </small>
              </div>
            </div>
          </div>
        </header>
        <section className={"admin-content"}>
          <div className={"admin-content-header"}>
            <div>
              <h2>
                Bookings
              </h2>
              <p>
                View and manage customer bookings.
              </p>
            </div>
            <button className={"admin-primary-btn"} id={"refreshBookingsBtn"}>
              <i className={"bi bi-arrow-clockwise"}></i>
              Refresh
            </button>
          </div>
          <div className={"admin-stat-grid"}>
            <div className={"admin-stat-card"}>
              <div className={"admin-stat-icon purple"}>
                <i className={"bi bi-calendar-check"}></i>
              </div>
              <div>
                <span>
                  Total Bookings
                </span>
                <strong id={"totalBookings"}>
                  0
                </strong>
              </div>
            </div>
            <div className={"admin-stat-card"}>
              <div className={"admin-stat-icon orange"}>
                <i className={"bi bi-hourglass-split"}></i>
              </div>
              <div>
                <span>
                  Pending
                </span>
                <strong id={"pendingBookings"}>
                  0
                </strong>
              </div>
            </div>
            <div className={"admin-stat-card"}>
              <div className={"admin-stat-icon green"}>
                <i className={"bi bi-check-circle"}></i>
              </div>
              <div>
                <span>
                  Confirmed
                </span>
                <strong id={"confirmedBookings"}>
                  0
                </strong>
              </div>
            </div>
            <div className={"admin-stat-card"}>
              <div className={"admin-stat-icon red"}>
                <i className={"bi bi-x-circle"}></i>
              </div>
              <div>
                <span>
                  Cancelled
                </span>
                <strong id={"cancelledBookings"}>
                  0
                </strong>
              </div>
            </div>
          </div>
          <div className={"admin-filter-card"}>
            <div className={"admin-search-box"}>
              <i className={"bi bi-search"}></i>
              <input type={"text"} id={"bookingSearch"} placeholder={"Search booking number or service..."} />
            </div>
            <select id={"bookingStatusFilter"} className={"admin-filter-select"}>
              <option value={""}>
                All Booking Status
              </option>
              <option value={"pending"}>
                Pending
              </option>
              <option value={"confirmed"}>
                Confirmed
              </option>
              <option value={"completed"}>
                Completed
              </option>
              <option value={"cancelled"}>
                Cancelled
              </option>
            </select>
            <select id={"paymentStatusFilter"} className={"admin-filter-select"}>
              <option value={""}>
                All Payment Status
              </option>
              <option value={"pending"}>
                Pending
              </option>
              <option value={"paid"}>
                Paid
              </option>
              <option value={"failed"}>
                Failed
              </option>
              <option value={"refunded"}>
                Refunded
              </option>
            </select>
            <select id={"serviceTypeFilter"} className={"admin-filter-select"}>
              <option value={""}>
                All Services
              </option>
              <option value={"tour"}>
                Tours
              </option>
              <option value={"ride"}>
                Rides
              </option>
            </select>
          </div>
          <div className={"admin-table-card"}>
            <div className={"admin-table-wrapper"}>
              <table className={"admin-table"}>
                <thead>
                  <tr>
                    <th>
                      BOOKING
                    </th>
                    <th>
                      CUSTOMER
                    </th>
                    <th>
                      SERVICE
                    </th>
                    <th>
                      DATE
                    </th>
                    <th>
                      AMOUNT
                    </th>
                    <th>
                      PAYMENT
                    </th>
                    <th>
                      STATUS
                    </th>
                    <th>
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody id={"bookingsTableBody"}>
                  <tr>
                    <td colSpan={"8"} className={"admin-table-loading"}>
                      Loading bookings...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
    <div className={"modal fade"} id={"bookingDetailsModal"} tabIndex={"-1"}>
      <div className={"modal-dialog modal-lg modal-dialog-centered"}>
        <div className={"modal-content admin-modal"}>
          <div className={"modal-header"}>
            <h5 className={"modal-title"}>
              Booking Details
            </h5>
            <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"}></button>
          </div>
          <div className={"modal-body"}>
            <div id={"bookingDetailsContent"}>
              Loading...
            </div>
          </div>
          <div className={"modal-footer"}>
            <div id={"bookingStatusActions"} className={"booking-status-actions"}></div>
            <button type={"button"} className={"btn btn-light"} data-bs-dismiss={"modal"}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
