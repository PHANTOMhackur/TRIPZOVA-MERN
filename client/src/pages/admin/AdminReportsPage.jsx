import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function AdminReportsPage() {
  usePageTitle("Reports | TRIPZOVA Admin");
  useLegacyPage({ styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css", "/legacy/admin/css/admin.css"], scripts: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "/legacy/admin/js/admin.js", "/legacy/admin/js/reports.js"], beforeLoad: undefined });

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
              Reports
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
          <a href={"/admin/reports"} className={"sidebar-link active"}>
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
              Reports
            </div>
            <div className={"navbar-subtitle"}>
              All point-to-point ride bookings
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
                Reports
              </h1>
              <p>
                Platform-wide performance at a glance.
              </p>
            </div>
            <button type={"button"} className={"admin-primary-btn"} id={"refreshReportsBtn"}>
              <i className={"bi bi-arrow-clockwise"}></i>
              Refresh
            </button>
          </div>
          <div id={"reportsLoading"} className={"admin-loading"}>
            <div className={"spinner-border"} role={"status"}></div>
            <span>
              Crunching the numbers...
            </span>
          </div>
          <div id={"reportsError"} className={"admin-error"} style={{display: "none"}}></div>
          <div id={"reportsBody"} style={{display: "none"}}>
            <div className={"row g-4 mb-4"}>
              <div className={"col-xl-3 col-md-6"}>
                <div className={"admin-stat-card"}>
                  <div className={"admin-stat-icon purple"}>
                    <i className={"bi bi-calendar-check-fill"}></i>
                  </div>
                  <div className={"admin-stat-content"}>
                    <span>
                      Total Bookings
                    </span>
                    <strong id={"reportTotalBookings"}>
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
                      Total Revenue
                    </span>
                    <strong id={"reportTotalRevenue"}>
                      ₹0
                    </strong>
                  </div>
                </div>
              </div>
              <div className={"col-xl-3 col-md-6"}>
                <div className={"admin-stat-card"}>
                  <div className={"admin-stat-icon orange"}>
                    <i className={"bi bi-graph-up"}></i>
                  </div>
                  <div className={"admin-stat-content"}>
                    <span>
                      Avg. Booking Value
                    </span>
                    <strong id={"reportAvgValue"}>
                      ₹0
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
                      Completion Rate
                    </span>
                    <strong id={"reportCompletionRate"}>
                      0%
                    </strong>
                  </div>
                </div>
              </div>
            </div>
            <div className={"row g-4"}>
              <div className={"col-lg-7"}>
                <div className={"admin-card"}>
                  <div className={"admin-card-header"}>
                    <div>
                      <h3>
                        Revenue by Month
                      </h3>
                      <p>
                        Confirmed and completed bookings, last 6 months.
                      </p>
                    </div>
                  </div>
                  <div style={{padding: "20px"}}>
                    <div id={"revenueChart"} className={"report-bar-chart"}></div>
                  </div>
                </div>
              </div>
              <div className={"col-lg-5"}>
                <div className={"admin-card"}>
                  <div className={"admin-card-header"}>
                    <div>
                      <h3>
                        Bookings by Status
                      </h3>
                      <p>
                        Where every booking currently stands.
                      </p>
                    </div>
                  </div>
                  <div style={{padding: "20px"}}>
                    <div id={"statusBreakdown"} className={"report-status-list"}></div>
                  </div>
                </div>
              </div>
              <div className={"col-lg-6"}>
                <div className={"admin-card"}>
                  <div className={"admin-card-header"}>
                    <div>
                      <h3>
                        Rides vs Tours
                      </h3>
                      <p>
                        Booking volume by service type.
                      </p>
                    </div>
                  </div>
                  <div style={{padding: "20px"}}>
                    <div id={"serviceSplit"} className={"report-status-list"}></div>
                  </div>
                </div>
              </div>
              <div className={"col-lg-6"}>
                <div className={"admin-card"}>
                  <div className={"admin-card-header"}>
                    <div>
                      <h3>
                        Top Partners by Revenue
                      </h3>
                      <p>
                        Confirmed and completed bookings only.
                      </p>
                    </div>
                  </div>
                  <div className={"table-responsive"} style={{padding: "0 8px 8px"}}>
                    <table className={"table admin-table"}>
                      <thead>
                        <tr>
                          <th>
                            Partner
                          </th>
                          <th>
                            Bookings
                          </th>
                          <th>
                            Revenue
                          </th>
                        </tr>
                      </thead>
                      <tbody id={"topPartnersBody"}></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div className={"sidebar-overlay"} id={"sidebarOverlay"}></div>
    </>
  );
}
