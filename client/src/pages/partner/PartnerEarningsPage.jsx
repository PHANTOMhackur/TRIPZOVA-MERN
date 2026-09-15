import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function PartnerEarningsPage() {
  usePageTitle("Earnings | TRIPZOVA Partner");
  useLegacyPage({ styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css", "/legacy/partner/css/partner.css"], scripts: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "/legacy/partner/js/partner.js", "/legacy/partner/js/earnings.js"], beforeLoad: undefined });

  return (
    <>
    <div className={"partner-sidebar-overlay"} id={"partnerSidebarOverlay"}></div>
    <aside className={"partner-sidebar"} id={"partnerSidebar"}>
      <a href={"/partner/"} className={"partner-brand"}>
        <div className={"partner-brand-logo"}>
          T
        </div>
        <div>
          <div className={"partner-brand-name"}>
            TRIPZOVA
          </div>
          <span className={"partner-brand-subtitle"}>
            PARTNER PANEL
          </span>
        </div>
      </a>
      <div className={"partner-sidebar-content"}>
        <nav className={"partner-sidebar-menu"}>
          <div className={"partner-menu-section"}>
            <div className={"partner-menu-title"}>
              MAIN
            </div>
            <a href={"/partner/"} className={"partner-nav-link"}>
              <i className={"bi bi-grid-1x2"}></i>
              <span>
                Dashboard
              </span>
            </a>
          </div>
          <div className={"partner-menu-section"}>
            <div className={"partner-menu-title"}>
              PROFILE & VEHICLES
            </div>
            <a href={"/partner/profile"} className={"partner-nav-link"}>
              <i className={"bi bi-person"}></i>
              <span>
                My Profile
              </span>
            </a>
            <a href={"/partner/vehicles"} className={"partner-nav-link"}>
              <i className={"bi bi-car-front"}></i>
              <span>
                My Vehicles
              </span>
            </a>
            <a href={"/partner/add-vehicle"} className={"partner-nav-link"}>
              <i className={"bi bi-plus-square"}></i>
              <span>
                Add Vehicle
              </span>
            </a>
          </div>
          <div className={"partner-menu-section"}>
            <div className={"partner-menu-title"}>
              BOOKINGS
            </div>
            <a href={"/partner/bookings"} className={"partner-nav-link"}>
              <i className={"bi bi-calendar-check"}></i>
              <span>
                Booking Requests
              </span>
              <span className={"partner-nav-badge"} id={"partnerPendingBookingBadge"} style={{display: "none"}}>
                0
              </span>
            </a>
            <a href={"/partner/customers"} className={"partner-nav-link"}>
              <i className={"bi bi-people"}></i>
              <span>
                Customers
              </span>
            </a>
          </div>
          <div className={"partner-menu-section"}>
            <div className={"partner-menu-title"}>
              FINANCE
            </div>
            <a href={"/partner/earnings"} className={"partner-nav-link"}>
              <i className={"bi bi-wallet2"}></i>
              <span>
                Earnings
              </span>
            </a>
          </div>
          <div className={"partner-menu-section"}>
            <div className={"partner-menu-title"}>
              MANAGEMENT
            </div>
            <a href={"/partner/reviews"} className={"partner-nav-link"}>
              <i className={"bi bi-star"}></i>
              <span>
                Reviews
              </span>
            </a>
            <a href={"/partner/notifications"} className={"partner-nav-link"}>
              <i className={"bi bi-bell"}></i>
              <span>
                Notifications
              </span>
            </a>
            <a href={"/partner/settings"} className={"partner-nav-link"}>
              <i className={"bi bi-gear"}></i>
              <span>
                Settings
              </span>
            </a>
          </div>
        </nav>
      </div>
      <div className={"partner-sidebar-bottom"}>
        <button type={"button"} className={"partner-logout-btn"} id={"partnerLogoutBtn"}>
          <i className={"bi bi-box-arrow-right"}></i>
          <span>
            Logout
          </span>
        </button>
      </div>
    </aside>
    <main className={"partner-main"}>
      <header className={"partner-navbar"}>
        <div className={"partner-navbar-left"}>
          <button type={"button"} className={"partner-menu-toggle"} id={"partnerMobileMenuBtn"}>
            <i className={"bi bi-list"}></i>
          </button>
          <div className={"partner-navbar-page-title"}>
            <span>
              Earnings
            </span>
          </div>
        </div>
        <div className={"partner-navbar-right"}>
          <button type={"button"} className={"partner-notification-btn"} title={"Notifications"} onClick={() => { window.location.href='/partner/notifications' }}>
            <i className={"bi bi-bell"}></i>
            <span className={"partner-notification-dot"}></span>
          </button>
          <div className={"partner-navbar-profile"} id={"partnerNavbarProfile"}>
            <div className={"partner-navbar-avatar"} id={"partnerNavbarAvatar"}>
              <span>
                P
              </span>
            </div>
            <div className={"partner-navbar-profile-info"}>
              <strong id={"partnerNavbarName"}>
                Partner
              </strong>
              <small>
                Partner
              </small>
            </div>
            <i className={"bi bi-chevron-down"}></i>
          </div>
        </div>
      </header>
      <div className={"partner-content"}>
        <div className={"partner-alert partner-alert-info mb-4"} id={"partnerApprovalAlert"} style={{display: "none"}}>
          <i className={"bi bi-info-circle me-1"}></i>
          <span id={"partnerApprovalMessage"}>
            Your partner account status will appear here.
          </span>
        </div>
        <div className={"partner-page-header"}>
          <div>
            <h1>
              Earnings
            </h1>
            <p>
              A summary of what you've earned on TRIPZOVA.
            </p>
          </div>
        </div>
        <div id={"earningsError"} style={{display: "none"}}></div>
        <div className={"partner-stats-grid"}>
          <div className={"partner-stat-card"}>
            <div className={"partner-stat-icon"}>
              <i className={"bi bi-wallet2"}></i>
            </div>
            <div className={"partner-stat-content"}>
              <span>
                Total Earnings
              </span>
              <strong id={"earningsTotal"}>
                ₹0
              </strong>
            </div>
          </div>
          <div className={"partner-stat-card"}>
            <div className={"partner-stat-icon"}>
              <i className={"bi bi-calendar-month"}></i>
            </div>
            <div className={"partner-stat-content"}>
              <span>
                This Month
              </span>
              <strong id={"earningsThisMonth"}>
                ₹0
              </strong>
            </div>
          </div>
          <div className={"partner-stat-card"}>
            <div className={"partner-stat-icon"}>
              <i className={"bi bi-hourglass-split"}></i>
            </div>
            <div className={"partner-stat-content"}>
              <span>
                Pending (Confirmed, Unpaid)
              </span>
              <strong id={"earningsPending"}>
                ₹0
              </strong>
            </div>
          </div>
          <div className={"partner-stat-card"}>
            <div className={"partner-stat-icon"}>
              <i className={"bi bi-check-circle"}></i>
            </div>
            <div className={"partner-stat-content"}>
              <span>
                Completed Trips
              </span>
              <strong id={"earningsTripCount"}>
                0
              </strong>
            </div>
          </div>
        </div>
        <div className={"partner-card"}>
          <div className={"partner-card-header"}>
            <div>
              <h4>
                Monthly Breakdown
              </h4>
              <p>
                Confirmed and completed bookings, last 6 months.
              </p>
            </div>
          </div>
          <div style={{padding: "20px"}}>
            <div id={"earningsChart"} className={"report-bar-chart"}></div>
          </div>
        </div>
        <div id={"earningsLoading"} className={"partner-card"}>
          <div className={"partner-loading"}>
            <div className={"partner-spinner"}></div>
            <span>
              Loading your earnings...
            </span>
          </div>
        </div>
        <div className={"partner-card"} id={"earningsTableCard"} style={{display: "none"}}>
          <div className={"partner-card-header"}>
            <div>
              <h4>
                Earning Trips
              </h4>
              <p id={"earningsResultText"}>
                Confirmed and completed bookings.
              </p>
            </div>
          </div>
          <div className={"partner-table-wrapper"}>
            <table className={"partner-table"}>
              <thead>
                <tr>
                  <th>
                    Booking
                  </th>
                  <th>
                    Customer
                  </th>
                  <th>
                    Date
                  </th>
                  <th>
                    Status
                  </th>
                  <th>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody id={"earningsTableBody"}></tbody>
            </table>
          </div>
        </div>
        <div id={"earningsEmpty"} className={"partner-card"} style={{display: "none"}}>
          <div className={"partner-empty-state"}>
            <div className={"partner-empty-icon"}>
              <i className={"bi bi-wallet2"}></i>
            </div>
            <h5>
              No earnings yet
            </h5>
            <p>
              Once you complete a paid trip, it'll show up here.
            </p>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
