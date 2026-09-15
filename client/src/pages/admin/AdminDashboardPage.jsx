import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function AdminDashboardPage() {
  usePageTitle("TRIPZOVA Admin Dashboard");
  useLegacyPage({ styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css", "/legacy/admin/css/admin.css"], scripts: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "/legacy/admin/js/admin.js", "/legacy/admin/js/dashboard.js"], beforeLoad: undefined });

  return (
    <>
    <div className={"sidebar-overlay"} id={"sidebarOverlay"}></div>
    <aside className={"admin-sidebar"} id={"adminSidebar"}>
      <div className={"sidebar-brand"}>
        <a href={"/admin/"}>
          <span className={"brand-icon"}>
            <i className={"bi bi-airplane-fill"}></i>
          </span>
          <span className={"brand-name"}>
            TRIPZOVA
          </span>
        </a>
        <button type={"button"} className={"sidebar-close"} id={"sidebarClose"}>
          <i className={"bi bi-x-lg"}></i>
        </button>
      </div>
      <div className={"sidebar-content"}>
        <div className={"sidebar-section-title"}>
          MAIN
        </div>
        <nav className={"sidebar-nav"}>
          <a href={"/admin/"} className={"sidebar-link active"}>
            <i className={"bi bi-grid-1x2-fill"}></i>
            <span>
              Dashboard
            </span>
          </a>
        </nav>
        <div className={"sidebar-section-title"}>
          USERS & PARTNERS
        </div>
        <nav className={"sidebar-nav"}>
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
            <span className={"sidebar-badge"} id={"pendingPartnerBadge"}>
              0
            </span>
          </a>
          <a href={"/admin/users"} className={"sidebar-link"}>
            <i className={"bi bi-person-walking"}></i>
            <span>
              Travellers
            </span>
          </a>
        </nav>
        <div className={"sidebar-section-title"}>
          TRIPZOVA SERVICES
        </div>
        <nav className={"sidebar-nav"}>
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
          <a href={"/admin/bookings"} className={"sidebar-link"}>
            <i className={"bi bi-calendar-check-fill"}></i>
            <span>
              Bookings
            </span>
          </a>
        </nav>
        <div className={"sidebar-section-title"}>
          FINANCE
        </div>
        <nav className={"sidebar-nav"}>
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
        </nav>
        <div className={"sidebar-section-title"}>
          MANAGEMENT
        </div>
        <nav className={"sidebar-nav"}>
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
        </nav>
      </div>
      <div className={"sidebar-footer"}>
        <button type={"button"} className={"logout-button"} id={"logoutButton"}>
          <i className={"bi bi-box-arrow-left"}></i>
          <span>
            Logout
          </span>
        </button>
      </div>
    </aside>
    <main className={"admin-main"}>
      <header className={"admin-navbar"}>
        <div className={"navbar-left"}>
          <button type={"button"} className={"mobile-menu-button"} id={"mobileMenuButton"}>
            <i className={"bi bi-list"}></i>
          </button>
          <div>
            <h1>
              Dashboard
            </h1>
            <p>
              Welcome back to TRIPZOVA Admin
            </p>
          </div>
        </div>
        <div className={"navbar-right"}>
          <button type={"button"} className={"navbar-icon-button"} title={"Notifications"}>
            <i className={"bi bi-bell"}></i>
            <span className={"notification-dot"}></span>
          </button>
          <div className={"admin-profile"}>
            <div className={"admin-avatar"}>
              <i className={"bi bi-person-fill"}></i>
            </div>
            <div className={"admin-profile-info"}>
              <strong id={"adminName"}>
                Admin
              </strong>
              <span>
                Administrator
              </span>
            </div>
            <i className={"bi bi-chevron-down profile-arrow"}></i>
          </div>
        </div>
      </header>
      <div className={"admin-content"}>
        <section className={"dashboard-welcome"}>
          <div>
            <h2>
              Good morning, Admin 👋
            </h2>
            <p>
              Here's what's happening with TRIPZOVA today.
            </p>
          </div>
          <div className={"dashboard-date"}>
            <i className={"bi bi-calendar3"}></i>
            <span id={"currentDate"}>
              --
            </span>
          </div>
        </section>
        <section className={"stats-grid"}>
          <div className={"stat-card"}>
            <div className={"stat-card-top"}>
              <div className={"stat-icon users-icon"}>
                <i className={"bi bi-people-fill"}></i>
              </div>
              <span className={"stat-change positive"}>
                <i className={"bi bi-arrow-up"}></i>
                <span id={"usersChange"}>
                  0%
                </span>
              </span>
            </div>
            <div className={"stat-card-body"}>
              <span className={"stat-label"}>
                Total Users
              </span>
              <strong className={"stat-number"} id={"totalUsers"}>
                0
              </strong>
            </div>
            <a href={"/admin/users"} className={"stat-card-link"}>
              View users
              <i className={"bi bi-arrow-right"}></i>
            </a>
          </div>
          <div className={"stat-card"}>
            <div className={"stat-card-top"}>
              <div className={"stat-icon partners-icon"}>
                <i className={"bi bi-person-badge-fill"}></i>
              </div>
              <span className={"stat-change positive"}>
                <i className={"bi bi-arrow-up"}></i>
                <span id={"partnersChange"}>
                  0%
                </span>
              </span>
            </div>
            <div className={"stat-card-body"}>
              <span className={"stat-label"}>
                Approved Partners
              </span>
              <strong className={"stat-number"} id={"totalPartners"}>
                0
              </strong>
            </div>
            <a href={"/admin/partners"} className={"stat-card-link"}>
              Manage partners
              <i className={"bi bi-arrow-right"}></i>
            </a>
          </div>
          <div className={"stat-card"}>
            <div className={"stat-card-top"}>
              <div className={"stat-icon pending-icon"}>
                <i className={"bi bi-hourglass-split"}></i>
              </div>
              <span className={"stat-change neutral"}>
                Review
              </span>
            </div>
            <div className={"stat-card-body"}>
              <span className={"stat-label"}>
                Pending Partners
              </span>
              <strong className={"stat-number"} id={"pendingPartners"}>
                0
              </strong>
            </div>
            <a href={"/admin/partners?status=pending"} className={"stat-card-link"}>
              Review requests
              <i className={"bi bi-arrow-right"}></i>
            </a>
          </div>
          <div className={"stat-card"}>
            <div className={"stat-card-top"}>
              <div className={"stat-icon bookings-icon"}>
                <i className={"bi bi-calendar-check-fill"}></i>
              </div>
              <span className={"stat-change positive"}>
                <i className={"bi bi-arrow-up"}></i>
                <span id={"bookingsChange"}>
                  0%
                </span>
              </span>
            </div>
            <div className={"stat-card-body"}>
              <span className={"stat-label"}>
                Total Bookings
              </span>
              <strong className={"stat-number"} id={"totalBookings"}>
                0
              </strong>
            </div>
            <a href={"/admin/bookings"} className={"stat-card-link"}>
              View bookings
              <i className={"bi bi-arrow-right"}></i>
            </a>
          </div>
        </section>
        <section className={"dashboard-grid"}>
          <div className={"dashboard-card revenue-card"}>
            <div className={"dashboard-card-header"}>
              <div>
                <h3>
                  Revenue Overview
                </h3>
                <p>
                  TRIPZOVA platform revenue
                </p>
              </div>
              <select id={"revenuePeriod"}>
                <option value={"7"}>
                  Last 7 days
                </option>
                <option value={"30"} selected>
                  Last 30 days
                </option>
                <option value={"90"}>
                  Last 3 months
                </option>
                <option value={"365"}>
                  Last year
                </option>
              </select>
            </div>
            <div className={"revenue-summary"}>
              <div>
                <span>
                  Total Revenue
                </span>
                <strong id={"totalRevenue"}>
                  ₹0
                </strong>
              </div>
              <div>
                <span>
                  Today
                </span>
                <strong id={"todayRevenue"}>
                  ₹0
                </strong>
              </div>
            </div>
            <div className={"chart-placeholder"} id={"revenueChart"}>
              <div className={"chart-empty"}>
                <i className={"bi bi-bar-chart-line"}></i>
                <span>
                  Revenue chart will appear here
                </span>
              </div>
            </div>
          </div>
          <div className={"dashboard-card"}>
            <div className={"dashboard-card-header"}>
              <div>
                <h3>
                  User Distribution
                </h3>
                <p>
                  Users by account type
                </p>
              </div>
              <button className={"card-menu-button"} type={"button"}>
                <i className={"bi bi-three-dots-vertical"}></i>
              </button>
            </div>
            <div className={"user-distribution"}>
              <div className={"distribution-circle"}>
                <div>
                  <strong id={"customerPercentage"}>
                    0%
                  </strong>
                  <span>
                    Customers
                  </span>
                </div>
              </div>
              <div className={"distribution-list"}>
                <div className={"distribution-item"}>
                  <span>
                    <i className={"distribution-dot customer"}></i>
                    Customers
                  </span>
                  <strong id={"customerCount"}>
                    0
                  </strong>
                </div>
                <div className={"distribution-item"}>
                  <span>
                    <i className={"distribution-dot traveller"}></i>
                    Travellers
                  </span>
                  <strong id={"travellerCount"}>
                    0
                  </strong>
                </div>
                <div className={"distribution-item"}>
                  <span>
                    <i className={"distribution-dot partner"}></i>
                    Partners
                  </span>
                  <strong id={"partnerCount"}>
                    0
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={"dashboard-grid dashboard-grid-bottom"}>
          <div className={"dashboard-card recent-card"}>
            <div className={"dashboard-card-header"}>
              <div>
                <h3>
                  Recent Partner Requests
                </h3>
                <p>
                  Latest applications waiting for review
                </p>
              </div>
              <a href={"/admin/partners"}>
                View all
              </a>
            </div>
            <div className={"table-responsive"}>
              <table className={"admin-table"}>
                <thead>
                  <tr>
                    <th>
                      Partner
                    </th>
                    <th>
                      Phone
                    </th>
                    <th>
                      City
                    </th>
                    <th>
                      Status
                    </th>
                    <th>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody id={"recentPartnersTable"}>
                  <tr>
                    <td colSpan={"5"}>
                      <div className={"table-loading"}>
                        <span className={"spinner-border spinner-border-sm"}></span>
                        Loading partner requests...
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={"dashboard-card quick-actions-card"}>
            <div className={"dashboard-card-header"}>
              <div>
                <h3>
                  Quick Actions
                </h3>
                <p>
                  Common admin tasks
                </p>
              </div>
            </div>
            <div className={"quick-actions"}>
              <a href={"/admin/partners"} className={"quick-action"}>
                <div className={"quick-action-icon"}>
                  <i className={"bi bi-person-check-fill"}></i>
                </div>
                <div>
                  <strong>
                    Review Partners
                  </strong>
                  <span>
                    Approve or reject applications
                  </span>
                </div>
                <i className={"bi bi-chevron-right"}></i>
              </a>
              <a href={"/admin/users"} className={"quick-action"}>
                <div className={"quick-action-icon"}>
                  <i className={"bi bi-people-fill"}></i>
                </div>
                <div>
                  <strong>
                    Manage Users
                  </strong>
                  <span>
                    View and manage accounts
                  </span>
                </div>
                <i className={"bi bi-chevron-right"}></i>
              </a>
              <a href={"/admin/tours"} className={"quick-action"}>
                <div className={"quick-action-icon"}>
                  <i className={"bi bi-map-fill"}></i>
                </div>
                <div>
                  <strong>
                    Manage Tours
                  </strong>
                  <span>
                    Add and manage tour listings
                  </span>
                </div>
                <i className={"bi bi-chevron-right"}></i>
              </a>
              <a href={"/admin/reports"} className={"quick-action"}>
                <div className={"quick-action-icon"}>
                  <i className={"bi bi-bar-chart-fill"}></i>
                </div>
                <div>
                  <strong>
                    View Reports
                  </strong>
                  <span>
                    Platform performance reports
                  </span>
                </div>
                <i className={"bi bi-chevron-right"}></i>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
    </>
  );
}
