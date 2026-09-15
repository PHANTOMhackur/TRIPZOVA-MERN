import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function PartnerBookingsPage() {
  usePageTitle("Booking Requests | TRIPZOVA Partner");
  useLegacyPage({ styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css", "/legacy/partner/css/partner.css"], scripts: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "/legacy/partner/js/partner.js", "/legacy/partner/js/bookings.js"], beforeLoad: undefined });

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
            <a href={"/partner/bookings"} className={"partner-nav-link active"}>
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
              Booking Requests
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
        <div className={"partner-page-header"}>
          <div>
            <h1>
              Booking Requests
            </h1>
            <p>
              Manage customer booking requests,
                        confirmed trips and completed bookings.
            </p>
          </div>
        </div>
        <div id={"partnerBookingsError"} style={{display: "none"}}></div>
        <div className={"partner-stats-grid"}>
          <div className={"partner-stat-card"}>
            <div className={"partner-stat-icon"}>
              <i className={"bi bi-hourglass-split"}></i>
            </div>
            <div className={"partner-stat-content"}>
              <span>
                Pending Requests
              </span>
              <strong id={"bookingPendingCount"}>
                0
              </strong>
            </div>
          </div>
          <div className={"partner-stat-card"}>
            <div className={"partner-stat-icon"}>
              <i className={"bi bi-calendar-check"}></i>
            </div>
            <div className={"partner-stat-content"}>
              <span>
                Confirmed
              </span>
              <strong id={"bookingConfirmedCount"}>
                0
              </strong>
            </div>
          </div>
          <div className={"partner-stat-card"}>
            <div className={"partner-stat-icon"}>
              <i className={"bi bi-check-circle"}></i>
            </div>
            <div className={"partner-stat-content"}>
              <span>
                Completed
              </span>
              <strong id={"bookingCompletedCount"}>
                0
              </strong>
            </div>
          </div>
          <div className={"partner-stat-card"}>
            <div className={"partner-stat-icon"}>
              <i className={"bi bi-journal-text"}></i>
            </div>
            <div className={"partner-stat-content"}>
              <span>
                Total Bookings
              </span>
              <strong id={"bookingTotalCount"}>
                0
              </strong>
            </div>
          </div>
        </div>
        <div className={"partner-card"}>
          <div className={"partner-card-header"}>
            <div>
              <h4>
                All Bookings
              </h4>
              <p>
                View and manage your booking activity.
              </p>
            </div>
          </div>
          <div className={"partner-booking-filters"}>
            <button type={"button"} className={"partner-filter-btn active"} data-status={"all"}>
              All
            </button>
            <button type={"button"} className={"partner-filter-btn"} data-status={"pending"}>
              Pending
            </button>
            <button type={"button"} className={"partner-filter-btn"} data-status={"confirmed"}>
              Confirmed
            </button>
            <button type={"button"} className={"partner-filter-btn"} data-status={"completed"}>
              Completed
            </button>
            <button type={"button"} className={"partner-filter-btn"} data-status={"cancelled"}>
              Cancelled
            </button>
            <button type={"button"} className={"partner-filter-btn"} data-status={"rejected"}>
              Rejected
            </button>
          </div>
        </div>
        <div id={"partnerBookingsLoading"} className={"partner-card"} style={{display: "none"}}>
          <div className={"partner-loading"}>
            <div className={"partner-spinner"}></div>
            <span>
              Loading bookings...
            </span>
          </div>
        </div>
        <div className={"partner-card"} id={"partnerBookingsCard"}>
          <div className={"partner-card-header"}>
            <div>
              <h4>
                Booking List
              </h4>
              <p id={"partnerBookingResultText"}>
                Loading bookings...
              </p>
            </div>
          </div>
          <div className={"partner-table-wrapper"}>
            <div className={"partner-booking-row partner-booking-list-header"}>
              <span>
                Customer
              </span>
              <span>
                Service
              </span>
              <span>
                Travel Date
              </span>
              <span style={{textAlign: "center"}}>
                Guests
              </span>
              <span>
                Amount
              </span>
              <span>
                Status
              </span>
              <span style={{textAlign: "right"}}>
                Actions
              </span>
            </div>
            <div className={"partner-booking-list"} id={"partnerBookingsList"}></div>
          </div>
        </div>
        <div className={"partner-card"} id={"partnerBookingsEmpty"} style={{display: "none"}}>
          <div className={"partner-empty-state"}>
            <div className={"partner-empty-icon"}>
              <i className={"bi bi-calendar-x"}></i>
            </div>
            <h5>
              No bookings found
            </h5>
            <p>
              Booking requests from customers
                        will appear here.
            </p>
          </div>
        </div>
      </div>
    </main>
    <div className={"modal fade"} id={"bookingDetailsModal"} tabIndex={"-1"} aria-hidden={"true"}>
      <div className={"modal-dialog modal-dialog-scrollable modal-lg"}>
        <div className={"modal-content"}>
          <div className={"modal-header"}>
            <h5 className={"modal-title"}>
              Trip Details
            </h5>
            <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}></button>
          </div>
          <div className={"modal-body"} id={"bookingDetailsBody"}></div>
          <div className={"modal-footer"}>
            <button type={"button"} className={"partner-btn partner-btn-outline"} data-bs-dismiss={"modal"}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className={"modal fade"} id={"confirmBookingModal"} tabIndex={"-1"} aria-hidden={"true"}>
      <div className={"modal-dialog"}>
        <div className={"modal-content"}>
          <div className={"modal-header"}>
            <h5 className={"modal-title"}>
              Confirm Booking & Assign Driver
            </h5>
            <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}></button>
          </div>
          <div className={"modal-body"}>
            <p id={"confirmBookingSummary"} className={"partner-form-help"}></p>
            <div id={"confirmBookingError"} className={"partner-alert partner-alert-danger"} style={{display: "none", marginBottom: "14px"}}></div>
            <div className={"mb-3"}>
              <label htmlFor={"confirmDriverName"} className={"partner-form-label"}>
                Driver Name
                <span>
                  *
                </span>
              </label>
              <input type={"text"} id={"confirmDriverName"} className={"partner-form-control"} placeholder={"e.g. Ramesh Bhai"} />
            </div>
            <div className={"mb-1"}>
              <label htmlFor={"confirmDriverPhone"} className={"partner-form-label"}>
                Driver Phone
                <span>
                  *
                </span>
              </label>
              <input type={"tel"} id={"confirmDriverPhone"} className={"partner-form-control"} placeholder={"e.g. 9876543210"} />
            </div>
          </div>
          <div className={"modal-footer"}>
            <button type={"button"} className={"partner-btn partner-btn-outline"} data-bs-dismiss={"modal"}>
              Cancel
            </button>
            <button type={"button"} id={"confirmBookingSubmitBtn"} className={"partner-btn partner-btn-primary"} onClick={() => { window.submitConfirmBooking?.() }}>
              <i className={"bi bi-check-lg"}></i>
              Confirm & Assign Driver
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className={"modal fade"} id={"rejectBookingModal"} tabIndex={"-1"} aria-hidden={"true"}>
      <div className={"modal-dialog modal-dialog-centered"}>
        <div className={"modal-content"}>
          <div className={"modal-header"}>
            <h5 className={"modal-title"}>
              Reject Booking
            </h5>
            <button type={"button"} className={"btn-close"} data-bs-dismiss={"modal"} aria-label={"Close"}></button>
          </div>
          <div className={"modal-body"}>
            <p id={"rejectBookingSummary"} className={"partner-form-help"}></p>
            <div id={"rejectBookingError"} className={"partner-alert partner-alert-danger"} style={{display: "none", marginBottom: "14px"}}></div>
            <div className={"mb-1"}>
              <label htmlFor={"rejectBookingReason"} className={"partner-form-label"}>
                Rejection Reason
              </label>
              <textarea id={"rejectBookingReason"} className={"partner-form-control"} rows={4} placeholder={"Optional: tell the customer why this booking cannot be accepted"}></textarea>
              <small className={"partner-form-help"}>
                Reason is optional.
              </small>
            </div>
          </div>
          <div className={"modal-footer"}>
            <button type={"button"} className={"partner-btn partner-btn-outline"} data-bs-dismiss={"modal"}>
              Cancel
            </button>
            <button type={"button"} id={"rejectBookingSubmitBtn"} className={"partner-btn partner-btn-danger"} onClick={() => { window.submitRejectBooking?.() }}>
              <i className={"bi bi-x-lg"}></i>
              Reject Booking
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
