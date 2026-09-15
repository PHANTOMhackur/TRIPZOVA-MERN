import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function AdminPaymentsPage() {
  usePageTitle("Payments | TRIPZOVA Admin");
  useLegacyPage({ styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css", "/legacy/admin/css/admin.css"], scripts: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "/legacy/admin/js/admin.js", "/legacy/admin/js/payments.js"], beforeLoad: undefined });

  return (
    <>
    <div className={"admin-layout"}>
      <aside className={"admin-sidebar"} id={"adminSidebar"}>
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
            <i className={"bi bi-grid-1x2-fill"}></i>
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
            <span className={"sidebar-badge"} id={"sidebarPendingBadge"}>
              0
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
              Payments
            </span>
          </a>
          <a href={"/admin/bookings"} className={"sidebar-link"}>
            <i className={"bi bi-calendar-check-fill"}></i>
            <span>
              Bookings
            </span>
          </a>
          <div className={"sidebar-section-title"}>
            FINANCE
          </div>
          <a href={"/admin/payments"} className={"sidebar-link active"}>
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
          <button className={"sidebar-logout"} id={"logoutBtn"}>
            <i className={"bi bi-box-arrow-left"}></i>
            <span>
              Logout
            </span>
          </button>
        </div>
      </aside>
      <main className={"admin-main"}>
        <header className={"admin-navbar"}>
          <button className={"mobile-menu-btn"} id={"mobileMenuBtn"} type={"button"}>
            <i className={"bi bi-list"}></i>
          </button>
          <div className={"navbar-page-title"}>
            <div className={"navbar-title"}>
              Payments
            </div>
            <div className={"navbar-subtitle"}>
              Payment status across every booking
            </div>
          </div>
          <div className={"navbar-actions"}>
            <button className={"navbar-icon-btn"}>
              <i className={"bi bi-bell"}></i>
              <span className={"notification-dot"}></span>
            </button>
            <div className={"admin-profile"}>
              <div className={"admin-profile-avatar"}>
                <i className={"bi bi-person-fill"}></i>
              </div>
              <div className={"admin-profile-info"}>
                <strong id={"adminName"}>
                  TRIPZOVA Admin
                </strong>
                <small>
                  Administrator
                </small>
              </div>
              <i className={"bi bi-chevron-down profile-arrow"}></i>
            </div>
          </div>
        </header>
        <div className={"admin-content"}>
          <div className={"page-heading-row"}>
            <div>
              <h1>
                Payments
              </h1>
              <p>
                A ledger view of every booking's payment status.
              </p>
            </div>
            <button type={"button"} className={"admin-primary-btn"} id={"refreshPaymentsBtn"}>
              <i className={"bi bi-arrow-clockwise"}></i>
              Refresh
            </button>
          </div>
          <div className={"row g-4 mb-4"}>
            <div className={"col-xl-3 col-md-6"}>
              <div className={"admin-stat-card"}>
                <div className={"admin-stat-icon purple"}>
                  <i className={"bi bi-car-front-fill"}></i>
                </div>
                <div className={"admin-stat-content"}>
                  <span>
                    Total Bookings
                  </span>
                  <strong id={"totalPayments"}>
                    0
                  </strong>
                </div>
              </div>
            </div>
            <div className={"col-xl-3 col-md-6"}>
              <div className={"admin-stat-card"}>
                <div className={"admin-stat-icon green"}>
                  <i className={"bi bi-check-circle-fill"}></i>
                </div>
                <div className={"admin-stat-content"}>
                  <span>
                    Paid
                  </span>
                  <strong id={"paidPayments"}>
                    0
                  </strong>
                </div>
              </div>
            </div>
            <div className={"col-xl-3 col-md-6"}>
              <div className={"admin-stat-card"}>
                <div className={"admin-stat-icon orange"}>
                  <i className={"bi bi-hourglass-split"}></i>
                </div>
                <div className={"admin-stat-content"}>
                  <span>
                    Pending
                  </span>
                  <strong id={"pendingPayments"}>
                    0
                  </strong>
                </div>
              </div>
            </div>
            <div className={"col-xl-3 col-md-6"}>
              <div className={"admin-stat-card"}>
                <div className={"admin-stat-icon green"}>
                  <i className={"bi bi-cash-stack"}></i>
                </div>
                <div className={"admin-stat-content"}>
                  <span>
                    Total Collected
                  </span>
                  <strong id={"paymentsRevenue"}>
                    ₹0
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className={"admin-card"}>
            <div className={"admin-card-header partner-toolbar"}>
              <div>
                <h3>
                  All Payments
                </h3>
                <p>
                  Payment details for every booking on the platform.
                </p>
              </div>
              <div className={"partner-toolbar-controls"}>
                <div className={"partner-search"}>
                  <i className={"bi bi-search"}></i>
                  <input type={"text"} id={"paymentSearch"} placeholder={"Search bookings..."} />
                </div>
                <select id={"paymentStatusFilter"} className={"partner-filter"}>
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
              </div>
            </div>
            <div id={"paymentsLoading"} className={"admin-loading"}>
              <div className={"spinner-border"} role={"status"}></div>
              <span>
                Loading payments...
              </span>
            </div>
            <div id={"paymentsError"} className={"admin-error"} style={{display: "none"}}></div>
            <div className={"table-responsive"} id={"paymentsTableContainer"}>
              <table className={"table admin-table"}>
                <thead>
                  <tr>
                    <th>
                      Booking
                    </th>
                    <th>
                      Customer
                    </th>
                    <th>
                      Amount
                    </th>
                    <th>
                      Method
                    </th>
                    <th>
                      Payment Status
                    </th>
                    <th>
                      Booking Status
                    </th>
                    <th>
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody id={"paymentsTableBody"}></tbody>
              </table>
            </div>
            <div id={"paymentsEmpty"} className={"admin-empty"} style={{display: "none"}}>
              <div className={"admin-empty-icon"}>
                <i className={"bi bi-car-front"}></i>
              </div>
              <h4>
                No payments found
              </h4>
              <p>
                No bookings match the current filters.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div className={"sidebar-overlay"} id={"sidebarOverlay"}></div>
    </>
  );
}
