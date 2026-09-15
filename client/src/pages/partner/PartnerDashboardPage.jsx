import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function PartnerDashboardPage() {
  usePageTitle("Partner Dashboard | TRIPZOVA");
  useLegacyPage({ styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css", "/legacy/partner/css/partner.css"], scripts: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "/legacy/partner/js/partner.js", "/legacy/partner/js/dashboard.js"], beforeLoad: undefined });

  return (
    <>
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
        <div className={"partner-sidebar-section"}>
          <div className={"partner-sidebar-title"}>
            Main
          </div>
          <ul className={"partner-nav"}>
            <li className={"partner-nav-item"}>
              <a href={"/partner/"} className={"partner-nav-link active"}>
                <span className={"partner-nav-icon"}>
                  <i className={"bi bi-grid-1x2-fill"}></i>
                </span>
                <span className={"partner-nav-text"}>
                  Dashboard
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className={"partner-sidebar-section"}>
          <div className={"partner-sidebar-title"}>
            Profile & Vehicles
          </div>
          <ul className={"partner-nav"}>
            <li className={"partner-nav-item"}>
              <a href={"/partner/profile"} className={"partner-nav-link"}>
                <span className={"partner-nav-icon"}>
                  <i className={"bi bi-person-circle"}></i>
                </span>
                <span className={"partner-nav-text"}>
                  My Profile
                </span>
              </a>
            </li>
            <li className={"partner-nav-item"}>
              <a href={"/partner/vehicles"} className={"partner-nav-link"}>
                <span className={"partner-nav-icon"}>
                  <i className={"bi bi-car-front-fill"}></i>
                </span>
                <span className={"partner-nav-text"}>
                  My Vehicles
                </span>
              </a>
            </li>
            <li className={"partner-nav-item"}>
              <a href={"/partner/add-vehicle"} className={"partner-nav-link"}>
                <span className={"partner-nav-icon"}>
                  <i className={"bi bi-plus-circle"}></i>
                </span>
                <span className={"partner-nav-text"}>
                  Add Vehicle
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className={"partner-sidebar-section"}>
          <div className={"partner-sidebar-title"}>
            Bookings
          </div>
          <ul className={"partner-nav"}>
            <li className={"partner-nav-item"}>
              <a href={"/partner/bookings"} className={"partner-nav-link"}>
                <span className={"partner-nav-icon"}>
                  <i className={"bi bi-calendar-check"}></i>
                </span>
                <span className={"partner-nav-text"}>
                  Booking Requests
                </span>
                <span className={"partner-nav-badge"} id={"pendingBookingBadge"} style={{display: "none"}}>
                  0
                </span>
              </a>
            </li>
            <li className={"partner-nav-item"}>
              <a href={"/partner/customers"} className={"partner-nav-link"}>
                <span className={"partner-nav-icon"}>
                  <i className={"bi bi-people"}></i>
                </span>
                <span className={"partner-nav-text"}>
                  Customers
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className={"partner-sidebar-section"}>
          <div className={"partner-sidebar-title"}>
            Finance
          </div>
          <ul className={"partner-nav"}>
            <li className={"partner-nav-item"}>
              <a href={"/partner/earnings"} className={"partner-nav-link"}>
                <span className={"partner-nav-icon"}>
                  <i className={"bi bi-wallet2"}></i>
                </span>
                <span className={"partner-nav-text"}>
                  Earnings
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className={"partner-sidebar-section"}>
          <div className={"partner-sidebar-title"}>
            Management
          </div>
          <ul className={"partner-nav"}>
            <li className={"partner-nav-item"}>
              <a href={"/partner/reviews"} className={"partner-nav-link"}>
                <span className={"partner-nav-icon"}>
                  <i className={"bi bi-star"}></i>
                </span>
                <span className={"partner-nav-text"}>
                  Reviews
                </span>
              </a>
            </li>
            <li className={"partner-nav-item"}>
              <a href={"/partner/notifications"} className={"partner-nav-link"}>
                <span className={"partner-nav-icon"}>
                  <i className={"bi bi-bell"}></i>
                </span>
                <span className={"partner-nav-text"}>
                  Notifications
                </span>
              </a>
            </li>
            <li className={"partner-nav-item"}>
              <a href={"/partner/settings"} className={"partner-nav-link"}>
                <span className={"partner-nav-icon"}>
                  <i className={"bi bi-gear"}></i>
                </span>
                <span className={"partner-nav-text"}>
                  Settings
                </span>
              </a>
            </li>
          </ul>
        </div>
        <div className={"partner-sidebar-section"}>
          <ul className={"partner-nav"}>
            <li className={"partner-nav-item"}>
              <a href={"#"} className={"partner-nav-link"} id={"partnerLogoutBtn"}>
                <span className={"partner-nav-icon"}>
                  <i className={"bi bi-box-arrow-right"}></i>
                </span>
                <span className={"partner-nav-text"}>
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <div className={"partner-sidebar-overlay"} id={"partnerSidebarOverlay"}></div>
    <main className={"partner-main"}>
      <nav className={"partner-navbar"}>
        <div className={"partner-navbar-left"}>
          <button type={"button"} className={"partner-menu-toggle"} id={"partnerMenuToggle"}>
            <i className={"bi bi-list"}></i>
          </button>
          <h1 className={"partner-page-title"}>
            Dashboard
          </h1>
        </div>
        <div className={"partner-navbar-right"}>
          <button type={"button"} className={"partner-notification-btn"} title={"Notifications"} onClick={() => { window.location.href='/partner/notifications' }}>
            <i className={"bi bi-bell"}></i>
            <span className={"partner-notification-badge"} id={"notificationBadge"} style={{display: "none"}}>
              0
            </span>
          </button>
          <div className={"partner-navbar-profile"} id={"partnerNavbarProfile"}>
            <div className={"partner-navbar-avatar"} id={"partnerNavbarAvatar"}>
              <span id={"partnerNavbarInitials"}>
                P
              </span>
            </div>
            <div className={"partner-navbar-user"}>
              <div className={"partner-navbar-name"} id={"partnerNavbarName"}>
                Partner
              </div>
              <div className={"partner-navbar-role"}>
                Partner
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className={"partner-content"}>
        <div className={"partner-content-header"}>
          <div>
            <h2 className={"partner-content-heading"}>
              Welcome back,
              <span id={"welcomePartnerName"}>
                Partner
              </span>
              👋
            </h2>
            <p className={"partner-content-description"}>
              Manage your vehicles, bookings, customers and earnings from one place.
            </p>
          </div>
          <div>
            <a href={"/partner/add-vehicle"} className={"partner-btn partner-btn-primary"}>
              <i className={"bi bi-plus-lg"}></i>
              Add Vehicle
            </a>
          </div>
        </div>
        <div className={"partner-alert partner-alert-info mb-4"} id={"partnerApprovalAlert"} style={{display: "none"}}>
          <i className={"bi bi-info-circle me-1"}></i>
          <span id={"partnerApprovalMessage"}>
            Your partner account status will appear here.
          </span>
        </div>
        <div className={"row g-3 mb-4"}>
          <div className={"col-xl-3 col-md-6"}>
            <div className={"partner-stat-card"}>
              <div className={"partner-stat-top"}>
                <div>
                  <div className={"partner-stat-label"}>
                    My Vehicles
                  </div>
                  <div className={"partner-stat-value"} id={"totalVehicles"}>
                    0
                  </div>
                </div>
                <div className={"partner-stat-icon"}>
                  <i className={"bi bi-car-front-fill"}></i>
                </div>
              </div>
              <div className={"partner-stat-footer"}>
                <span id={"activeVehicles"}>
                  0
                </span>
                active vehicles
              </div>
            </div>
          </div>
          <div className={"col-xl-3 col-md-6"}>
            <div className={"partner-stat-card"}>
              <div className={"partner-stat-top"}>
                <div>
                  <div className={"partner-stat-label"}>
                    Total Bookings
                  </div>
                  <div className={"partner-stat-value"} id={"totalBookings"}>
                    0
                  </div>
                </div>
                <div className={"partner-stat-icon"}>
                  <i className={"bi bi-calendar-check"}></i>
                </div>
              </div>
              <div className={"partner-stat-footer"}>
                <span id={"pendingBookings"}>
                  0
                </span>
                pending requests
              </div>
            </div>
          </div>
          <div className={"col-xl-3 col-md-6"}>
            <div className={"partner-stat-card"}>
              <div className={"partner-stat-top"}>
                <div>
                  <div className={"partner-stat-label"}>
                    Customers
                  </div>
                  <div className={"partner-stat-value"} id={"totalCustomers"}>
                    0
                  </div>
                </div>
                <div className={"partner-stat-icon"}>
                  <i className={"bi bi-people-fill"}></i>
                </div>
              </div>
              <div className={"partner-stat-footer"}>
                Unique customers
              </div>
            </div>
          </div>
          <div className={"col-xl-3 col-md-6"}>
            <div className={"partner-stat-card"}>
              <div className={"partner-stat-top"}>
                <div>
                  <div className={"partner-stat-label"}>
                    Total Revenue
                  </div>
                  <div className={"partner-stat-value"} id={"totalRevenue"}>
                    ₹0
                  </div>
                </div>
                <div className={"partner-stat-icon"}>
                  <i className={"bi bi-currency-rupee"}></i>
                </div>
              </div>
              <div className={"partner-stat-footer"}>
                <strong>
                  Trip revenue
                </strong>
              </div>
            </div>
          </div>
        </div>
        <div className={"row g-4 mb-4"}>
          <div className={"col-xl-5"}>
            <div className={"partner-card h-100"}>
              <div className={"partner-card-header"}>
                <div>
                  <h3 className={"partner-card-title"}>
                    Partner Profile
                  </h3>
                  <p className={"partner-card-subtitle"}>
                    Your public partner information
                  </p>
                </div>
                <a href={"/partner/profile"} className={"partner-btn partner-btn-secondary partner-btn-sm"}>
                  Edit Profile
                </a>
              </div>
              <div className={"partner-card-body"}>
                <div className={"partner-profile-header"}>
                  <div className={"partner-profile-avatar"} id={"partnerProfileAvatar"}>
                    <span id={"partnerProfileInitials"}>
                      P
                    </span>
                  </div>
                  <div>
                    <h3 className={"partner-profile-name"} id={"partnerProfileName"}>
                      Partner
                    </h3>
                    <div className={"partner-profile-location"} id={"partnerProfileLocation"}>
                      Location not added
                    </div>
                    <div className={"partner-profile-status"}>
                      <span className={"partner-status partner-status-pending"} id={"partnerProfileStatus"}>
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
                <hr className={"my-4"} />
                <div className={"row g-3"}>
                  <div className={"col-6"}>
                    <div className={"partner-stat-label"}>
                      Partner Type
                    </div>
                    <div className={"mt-1 fw-semibold"} id={"partnerType"}>
                      Individual
                    </div>
                  </div>
                  <div className={"col-6"}>
                    <div className={"partner-stat-label"}>
                      Experience
                    </div>
                    <div className={"mt-1 fw-semibold"} id={"partnerExperience"}>
                      0 years
                    </div>
                  </div>
                  <div className={"col-12"}>
                    <div className={"partner-stat-label"}>
                      Business Name
                    </div>
                    <div className={"mt-1 fw-semibold"} id={"partnerBusinessName"}>
                      Not added
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"col-xl-7"}>
            <div className={"partner-card h-100"}>
              <div className={"partner-card-header"}>
                <div>
                  <h3 className={"partner-card-title"}>
                    Quick Actions
                  </h3>
                  <p className={"partner-card-subtitle"}>
                    Manage your TRIPZOVA partner account
                  </p>
                </div>
              </div>
              <div className={"partner-card-body"}>
                <div className={"row g-3"}>
                  <div className={"col-md-6"}>
                    <a href={"/partner/add-vehicle"} className={"partner-quick-action"}>
                      <div className={"partner-quick-action-icon"}>
                        <i className={"bi bi-car-front"}></i>
                      </div>
                      <div>
                        <h4 className={"partner-quick-action-title"}>
                          Add Vehicle
                        </h4>
                        <p className={"partner-quick-action-text"}>
                          Add a new vehicle to your fleet.
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className={"col-md-6"}>
                    <a href={"/partner/vehicles"} className={"partner-quick-action"}>
                      <div className={"partner-quick-action-icon"}>
                        <i className={"bi bi-list-ul"}></i>
                      </div>
                      <div>
                        <h4 className={"partner-quick-action-title"}>
                          Manage Vehicles
                        </h4>
                        <p className={"partner-quick-action-text"}>
                          View and update your vehicles.
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className={"col-md-6"}>
                    <a href={"/partner/bookings"} className={"partner-quick-action"}>
                      <div className={"partner-quick-action-icon"}>
                        <i className={"bi bi-calendar-check"}></i>
                      </div>
                      <div>
                        <h4 className={"partner-quick-action-title"}>
                          Booking Requests
                        </h4>
                        <p className={"partner-quick-action-text"}>
                          Accept or reject customer requests.
                        </p>
                      </div>
                    </a>
                  </div>
                  <div className={"col-md-6"}>
                    <a href={"/partner/profile"} className={"partner-quick-action"}>
                      <div className={"partner-quick-action-icon"}>
                        <i className={"bi bi-person-gear"}></i>
                      </div>
                      <div>
                        <h4 className={"partner-quick-action-title"}>
                          Update Profile
                        </h4>
                        <p className={"partner-quick-action-text"}>
                          Keep your partner details updated.
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={"partner-card mb-4"}>
          <div className={"partner-card-header"}>
            <div>
              <h3 className={"partner-card-title"}>
                Recent Booking Requests
              </h3>
              <p className={"partner-card-subtitle"}>
                Your latest customer booking activity
              </p>
            </div>
            <a href={"/partner/bookings"} className={"partner-btn partner-btn-secondary partner-btn-sm"}>
              View All
            </a>
          </div>
          <div className={"partner-table-wrapper"} id={"recentBookingsContainer"}>
            <div className={"partner-empty-state"}>
              <div className={"partner-empty-icon"}>
                <i className={"bi bi-calendar3"}></i>
              </div>
              <h4 className={"partner-empty-title"}>
                No bookings yet
              </h4>
              <p className={"partner-empty-text"}>
                Customer booking requests will appear here once your approved vehicles are available.
              </p>
            </div>
          </div>
        </div>
        <div className={"partner-card"}>
          <div className={"partner-card-header"}>
            <div>
              <h3 className={"partner-card-title"}>
                My Vehicles
              </h3>
              <p className={"partner-card-subtitle"}>
                Recently added vehicles
              </p>
            </div>
            <a href={"/partner/vehicles"} className={"partner-btn partner-btn-secondary partner-btn-sm"}>
              View All
            </a>
          </div>
          <div className={"partner-card-body"}>
            <div className={"row g-3"} id={"dashboardVehicles"}>
              <div className={"col-12"}>
                <div className={"partner-empty-state"}>
                  <div className={"partner-empty-icon"}>
                    <i className={"bi bi-car-front"}></i>
                  </div>
                  <h4 className={"partner-empty-title"}>
                    No vehicles added
                  </h4>
                  <p className={"partner-empty-text"}>
                    Add your first vehicle so customers can discover your service.
                  </p>
                  <a href={"/partner/add-vehicle"} className={"partner-btn partner-btn-primary"}>
                    <i className={"bi bi-plus-lg"}></i>
                    Add Vehicle
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
