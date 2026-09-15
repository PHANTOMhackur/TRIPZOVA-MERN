import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function AdminUsersPage() {
  usePageTitle("Users | TRIPZOVA Admin");
  useLegacyPage({ styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css", "/legacy/admin/css/admin.css"], scripts: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "/legacy/admin/js/admin.js", "/legacy/admin/js/users.js"], beforeLoad: undefined });

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
          <a href={"/admin/users"} className={"sidebar-link active"}>
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
              Rides
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
          <button className={"sidebar-logout"} id={"logoutBtn"} type={"button"}>
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
              Users
            </div>
            <div className={"navbar-subtitle"}>
              Manage TRIPZOVA users and accounts
            </div>
          </div>
          <div className={"navbar-actions"}>
            <button className={"navbar-icon-btn"} type={"button"}>
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
                Users
              </h1>
              <p>
                View and manage all registered TRIPZOVA users.
              </p>
            </div>
            <button type={"button"} className={"admin-primary-btn"} id={"refreshUsersBtn"}>
              <i className={"bi bi-arrow-clockwise"}></i>
              Refresh
            </button>
          </div>
          <div className={"row g-4 mb-4"}>
            <div className={"col-xl-3 col-md-6"}>
              <div className={"admin-stat-card"}>
                <div className={"admin-stat-icon purple"}>
                  <i className={"bi bi-people-fill"}></i>
                </div>
                <div className={"admin-stat-content"}>
                  <span>
                    Total Users
                  </span>
                  <strong id={"totalUsers"}>
                    0
                  </strong>
                </div>
              </div>
            </div>
            <div className={"col-xl-3 col-md-6"}>
              <div className={"admin-stat-card"}>
                <div className={"admin-stat-icon blue"}>
                  <i className={"bi bi-person-fill"}></i>
                </div>
                <div className={"admin-stat-content"}>
                  <span>
                    Customers
                  </span>
                  <strong id={"customerUsers"}>
                    0
                  </strong>
                </div>
              </div>
            </div>
            <div className={"col-xl-3 col-md-6"}>
              <div className={"admin-stat-card"}>
                <div className={"admin-stat-icon green"}>
                  <i className={"bi bi-person-walking"}></i>
                </div>
                <div className={"admin-stat-content"}>
                  <span>
                    Travellers
                  </span>
                  <strong id={"travellerUsers"}>
                    0
                  </strong>
                </div>
              </div>
            </div>
            <div className={"col-xl-3 col-md-6"}>
              <div className={"admin-stat-card"}>
                <div className={"admin-stat-icon orange"}>
                  <i className={"bi bi-person-badge-fill"}></i>
                </div>
                <div className={"admin-stat-content"}>
                  <span>
                    Partners
                  </span>
                  <strong id={"partnerUsers"}>
                    0
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className={"admin-card"}>
            <div className={"admin-card-header users-toolbar"}>
              <div>
                <h3>
                  All Users
                </h3>
                <p>
                  Search and filter registered accounts.
                </p>
              </div>
              <div className={"users-toolbar-controls"}>
                <div className={"partner-search"}>
                  <i className={"bi bi-search"}></i>
                  <input type={"text"} id={"userSearch"} placeholder={"Search users..."} />
                </div>
                <select id={"userRoleFilter"} className={"partner-filter"}>
                  <option value={""}>
                    All Roles
                  </option>
                  <option value={"customer"}>
                    Customers
                  </option>
                  <option value={"traveller"}>
                    Travellers
                  </option>
                  <option value={"partner"}>
                    Partners
                  </option>
                  <option value={"admin"}>
                    Admins
                  </option>
                </select>
                <select id={"userStatusFilter"} className={"partner-filter"}>
                  <option value={""}>
                    All Status
                  </option>
                  <option value={"active"}>
                    Active
                  </option>
                  <option value={"suspended"}>
                    Suspended
                  </option>
                  <option value={"blocked"}>
                    Blocked
                  </option>
                </select>
              </div>
            </div>
            <div id={"usersLoading"} className={"admin-loading"}>
              <div className={"spinner-border"} role={"status"}></div>
              <span>
                Loading users...
              </span>
            </div>
            <div id={"usersError"} className={"admin-error"} style={{display: "none"}}></div>
            <div id={"usersTableContainer"} className={"table-responsive"}>
              <table className={"table admin-table"}>
                <thead>
                  <tr>
                    <th>
                      User
                    </th>
                    <th>
                      Phone
                    </th>
                    <th>
                      Role
                    </th>
                    <th>
                      Registered
                    </th>
                    <th>
                      Phone
                    </th>
                    <th>
                      Status
                    </th>
                    <th className={"text-end"}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody id={"usersTableBody"}></tbody>
              </table>
            </div>
            <div id={"usersEmpty"} className={"admin-empty"} style={{display: "none"}}>
              <div className={"admin-empty-icon"}>
                <i className={"bi bi-people"}></i>
              </div>
              <h4>
                No users found
              </h4>
              <p>
                No users match your current search or filters.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div className={"modal fade"} id={"userDetailsModal"} tabIndex={"-1"} aria-hidden={"true"}>
      <div className={"modal-dialog modal-lg modal-dialog-centered"}>
        <div className={"modal-content partner-modal"}>
          <div className={"modal-header"}>
            <h5 className={"modal-title"}>
              User Details
            </h5>
            <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"}></button>
          </div>
          <div className={"modal-body"}>
            <div id={"userDetailsLoading"} className={"admin-loading"}>
              <div className={"spinner-border"}></div>
              <span>
                Loading details...
              </span>
            </div>
            <div id={"userDetailsContent"} style={{display: "none"}}>
              <div className={"partner-profile-header"}>
                <div className={"partner-large-avatar"} id={"userDetailAvatar"}></div>
                <div>
                  <h3 id={"userDetailName"}>
                    -
                  </h3>
                  <p id={"userDetailEmail"}>
                    -
                  </p>
                  <span id={"userDetailRole"} className={"admin-status"}>
                    -
                  </span>
                </div>
              </div>
              <div className={"partner-details-grid"}>
                <div className={"partner-detail-item"}>
                  <span>
                    Phone
                  </span>
                  <strong id={"userDetailPhone"}>
                    -
                  </strong>
                </div>
                <div className={"partner-detail-item"}>
                  <span>
                    City
                  </span>
                  <strong id={"userDetailCity"}>
                    -
                  </strong>
                </div>
                <div className={"partner-detail-item"}>
                  <span>
                    Address
                  </span>
                  <strong id={"userDetailAddress"}>
                    -
                  </strong>
                </div>
                <div className={"partner-detail-item"}>
                  <span>
                    Registered
                  </span>
                  <strong id={"userDetailRegistered"}>
                    -
                  </strong>
                </div>
                <div className={"partner-detail-item"}>
                  <span>
                    Phone Verification
                  </span>
                  <strong id={"userDetailPhoneVerified"}>
                    -
                  </strong>
                </div>
                <div className={"partner-detail-item"}>
                  <span>
                    Account Status
                  </span>
                  <strong id={"userDetailStatus"}>
                    -
                  </strong>
                </div>
                <div className={"partner-detail-item"}>
                  <span>
                    Authentication
                  </span>
                  <strong id={"userDetailAuth"}>
                    -
                  </strong>
                </div>
                <div className={"partner-detail-item"}>
                  <span>
                    Partner Status
                  </span>
                  <strong id={"userDetailPartnerStatus"}>
                    -
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className={"modal-footer"}>
            <div className={"user-status-actions"} id={"userStatusActions"}></div>
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
