import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function AdminPartnersPage() {
  usePageTitle("Partners | TRIPZOVA Admin");
  useLegacyPage({ styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css", "/legacy/admin/css/admin.css"], scripts: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "/legacy/admin/js/admin.js", "/legacy/admin/js/partners.js"], beforeLoad: undefined });

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
          <a href={"/admin/partners"} className={"sidebar-link active"}>
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
              Partners
            </div>
            <div className={"navbar-subtitle"}>
              Manage TRIPZOVA partner applications
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
                Partners
              </h1>
              <p>
                Review and manage partner registrations.
              </p>
            </div>
            <button type={"button"} className={"admin-primary-btn"} id={"refreshPartnersBtn"}>
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
                    Total Partners
                  </span>
                  <strong id={"totalPartners"}>
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
                  <strong id={"pendingPartners"}>
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
                    Approved
                  </span>
                  <strong id={"approvedPartners"}>
                    0
                  </strong>
                </div>
              </div>
            </div>
            <div className={"col-xl-3 col-md-6"}>
              <div className={"admin-stat-card"}>
                <div className={"admin-stat-icon red"}>
                  <i className={"bi bi-x-circle-fill"}></i>
                </div>
                <div className={"admin-stat-content"}>
                  <span>
                    Rejected
                  </span>
                  <strong id={"rejectedPartners"}>
                    0
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className={"admin-card"}>
            <div className={"admin-card-header partner-toolbar"}>
              <div>
                <h3>
                  Partner Applications
                </h3>
                <p>
                  View and manage all partner accounts.
                </p>
              </div>
              <div className={"partner-toolbar-controls"}>
                <div className={"partner-search"}>
                  <i className={"bi bi-search"}></i>
                  <input type={"text"} id={"partnerSearch"} placeholder={"Search partners..."} />
                </div>
                <select id={"partnerStatusFilter"} className={"partner-filter"}>
                  <option value={""}>
                    All Status
                  </option>
                  <option value={"pending"}>
                    Pending
                  </option>
                  <option value={"approved"}>
                    Approved
                  </option>
                  <option value={"rejected"}>
                    Rejected
                  </option>
                </select>
              </div>
            </div>
            <div id={"partnersLoading"} className={"admin-loading"}>
              <div className={"spinner-border"} role={"status"}></div>
              <span>
                Loading partners...
              </span>
            </div>
            <div id={"partnersError"} className={"admin-error"} style={{display: "none"}}></div>
            <div className={"table-responsive"} id={"partnersTableContainer"}>
              <table className={"table admin-table"}>
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
                      Registered
                    </th>
                    <th>
                      Status
                    </th>
                    <th className={"text-end"}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody id={"partnersTableBody"}></tbody>
              </table>
            </div>
            <div id={"partnersEmpty"} className={"admin-empty"} style={{display: "none"}}>
              <div className={"admin-empty-icon"}>
                <i className={"bi bi-person-badge"}></i>
              </div>
              <h4>
                No partners found
              </h4>
              <p>
                There are no partner applications matching your filters.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div className={"modal fade"} id={"partnerDetailsModal"} tabIndex={"-1"} aria-hidden={"true"}>
      <div className={"modal-dialog modal-lg modal-dialog-centered"}>
        <div className={"modal-content partner-modal"}>
          <div className={"modal-header"}>
            <h5 className={"modal-title"}>
              Partner Details
            </h5>
            <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"}></button>
          </div>
          <div className={"modal-body"}>
            <div id={"partnerDetailsLoading"} className={"admin-loading"}>
              <div className={"spinner-border"}></div>
              <span>
                Loading details...
              </span>
            </div>
            <div id={"partnerDetailsContent"} style={{display: "none"}}>
              <div className={"partner-profile-header"}>
                <div className={"partner-large-avatar"} id={"detailAvatar"}></div>
                <div>
                  <h3 id={"detailName"}>
                    -
                  </h3>
                  <p id={"detailEmail"}>
                    -
                  </p>
                  <span id={"detailStatus"} className={"admin-status"}>
                    -
                  </span>
                </div>
              </div>
              <div className={"partner-details-grid"}>
                <div className={"partner-detail-item"}>
                  <span>
                    Phone
                  </span>
                  <strong id={"detailPhone"}>
                    -
                  </strong>
                </div>
                <div className={"partner-detail-item"}>
                  <span>
                    City
                  </span>
                  <strong id={"detailCity"}>
                    -
                  </strong>
                </div>
                <div className={"partner-detail-item"}>
                  <span>
                    Address
                  </span>
                  <strong id={"detailAddress"}>
                    -
                  </strong>
                </div>
                <div className={"partner-detail-item"}>
                  <span>
                    Registered
                  </span>
                  <strong id={"detailRegistered"}>
                    -
                  </strong>
                </div>
                <div className={"partner-detail-item"}>
                  <span>
                    Phone Verified
                  </span>
                  <strong id={"detailPhoneVerified"}>
                    -
                  </strong>
                </div>
                <div className={"partner-detail-item"}>
                  <span>
                    Account Status
                  </span>
                  <strong id={"detailAccountStatus"}>
                    -
                  </strong>
                </div>
              </div>
            </div>
          </div>
          <div className={"modal-footer"}>
            <button type={"button"} className={"btn btn-light"} data-bs-dismiss={"modal"}>
              Close
            </button>
            <button type={"button"} className={"admin-danger-btn"} id={"modalRejectBtn"}>
              <i className={"bi bi-x-lg"}></i>
              Reject
            </button>
            <button type={"button"} className={"admin-success-btn"} id={"modalApproveBtn"}>
              <i className={"bi bi-check-lg"}></i>
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
