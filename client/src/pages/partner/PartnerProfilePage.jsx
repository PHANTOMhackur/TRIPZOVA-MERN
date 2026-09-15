import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function PartnerProfilePage() {
  usePageTitle("My Profile - TRIPZOVA Partner");
  useLegacyPage({ styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css", "/legacy/partner/css/partner.css"], scripts: ["/legacy/partner/js/partner.js", "/legacy/partner/js/profile.js"], beforeLoad: undefined });

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
      <div className={"partner-sidebar-menu"}>
        <div className={"partner-menu-section"}>
          MAIN
        </div>
        <a href={"/partner/"} className={"partner-nav-link"}>
          <i className={"bi bi-grid-1x2"}></i>
          <span>
            Dashboard
          </span>
        </a>
        <div className={"partner-menu-section"}>
          PROFILE & VEHICLES
        </div>
        <a href={"/partner/profile"} className={"partner-nav-link active"}>
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
          <i className={"bi bi-plus-circle"}></i>
          <span>
            Add Vehicle
          </span>
        </a>
        <div className={"partner-menu-section"}>
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
        <div className={"partner-menu-section"}>
          FINANCE
        </div>
        <a href={"/partner/earnings"} className={"partner-nav-link"}>
          <i className={"bi bi-wallet2"}></i>
          <span>
            Earnings
          </span>
        </a>
        <div className={"partner-menu-section"}>
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
        <div className={"partner-sidebar-bottom"}>
          <button type={"button"} id={"partnerLogoutBtn"} className={"partner-nav-link partner-logout-btn"}>
            <i className={"bi bi-box-arrow-right"}></i>
            <span>
              Logout
            </span>
          </button>
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
          <div className={"partner-navbar-page-title"}>
            My Profile
          </div>
        </div>
        <div className={"partner-navbar-right"}>
          <button type={"button"} className={"partner-notification-btn"} title={"Notifications"}>
            <i className={"bi bi-bell"}></i>
            <span className={"partner-notification-dot"}></span>
          </button>
          <button type={"button"} className={"partner-navbar-profile"} id={"partnerNavbarProfile"}>
            <div className={"partner-navbar-avatar"} id={"partnerNavbarAvatar"}>
              <span id={"partnerNavbarInitials"}>
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
          </button>
        </div>
      </nav>
      <div className={"partner-content"}>
        <div className={"partner-page-header"}>
          <div>
            <h1>
              My Profile
            </h1>
            <p>
              Manage your TRIPZOVA partner profile and information.
            </p>
          </div>
        </div>
        <div id={"partnerProfileError"} style={{display: "none"}}></div>
        <div id={"partnerProfileSuccess"} style={{display: "none"}}></div>
        <div className={"partner-card"}>
          <div className={"partner-card-header"}>
            <div>
              <h4>
                Profile Information
              </h4>
              <p>
                Keep your profile information up to date.
              </p>
            </div>
            <span className={"partner-status partner-status-pending"} id={"profileStatus"}>
              Pending
            </span>
          </div>
          <div className={"partner-card-body"}>
            <div className={"partner-profile-picture-section"}>
              <div className={"partner-profile-avatar large"} id={"profileAvatar"}>
                <span id={"profileInitials"}>
                  P
                </span>
              </div>
              <div className={"partner-profile-picture-info"}>
                <h5>
                  Profile Picture
                </h5>
                <p>
                  Add a professional photo so customers
                            can recognize you.
                </p>
                <div className={"partner-upload-buttons"}>
                  <label htmlFor={"profilePicture"} className={"partner-btn partner-btn-outline"}>
                    <i className={"bi bi-camera"}></i>
                    Choose Photo
                  </label>
                  <input type={"file"} id={"profilePicture"} accept={"image/*"} hidden />
                  <button type={"button"} id={"removeProfilePictureBtn"} className={"partner-btn partner-btn-light"}>
                    Remove
                  </button>
                </div>
                <small>
                  JPG, PNG or WEBP. Recommended square image.
                </small>
              </div>
            </div>
            <hr />
            <form id={"partnerProfileForm"} noValidate>
              <div className={"row g-4"}>
                <div className={"col-md-6"}>
                  <label htmlFor={"displayName"} className={"partner-form-label"}>
                    Display Name
                    <span>
                      *
                    </span>
                  </label>
                  <input type={"text"} id={"displayName"} className={"partner-form-control"} placeholder={"Enter your name"} required />
                  <small className={"partner-form-help"}>
                    This name will be visible to customers.
                  </small>
                </div>
                <div className={"col-md-6"}>
                  <label htmlFor={"businessName"} className={"partner-form-label"}>
                    Business Name
                  </label>
                  <input type={"text"} id={"businessName"} className={"partner-form-control"} placeholder={"Your business or agency name"} />
                </div>
                <div className={"col-md-6"}>
                  <label htmlFor={"phone"} className={"partner-form-label"}>
                    Phone Number
                  </label>
                  <input type={"tel"} id={"phone"} className={"partner-form-control"} placeholder={"Enter phone number"} />
                </div>
                <div className={"col-md-6"}>
                  <label htmlFor={"email"} className={"partner-form-label"}>
                    Email Address
                  </label>
                  <input type={"email"} id={"email"} className={"partner-form-control"} placeholder={"Enter email address"} />
                </div>
                <div className={"col-md-6"}>
                  <label htmlFor={"city"} className={"partner-form-label"}>
                    City
                  </label>
                  <input type={"text"} id={"city"} className={"partner-form-control"} placeholder={"Enter city"} />
                </div>
                <div className={"col-md-6"}>
                  <label htmlFor={"partnerType"} className={"partner-form-label"}>
                    Partner Type
                  </label>
                  <select id={"partnerType"} className={"partner-form-control"}>
                    <option value={"individual"}>
                      Individual
                    </option>
                    <option value={"business"}>
                      Business
                    </option>
                    <option value={"travel_agency"}>
                      Travel Agency
                    </option>
                  </select>
                </div>
                <div className={"col-12"}>
                  <label htmlFor={"address"} className={"partner-form-label"}>
                    Address
                  </label>
                  <textarea id={"address"} className={"partner-form-control"} rows={"3"} placeholder={"Enter your full address"}></textarea>
                </div>
                <div className={"col-12"}>
                  <label htmlFor={"about"} className={"partner-form-label"}>
                    About You
                  </label>
                  <textarea id={"about"} className={"partner-form-control"} rows={"5"} placeholder={"Tell customers about yourself, your services and travel experience..."}></textarea>
                </div>
                <div className={"col-md-6"}>
                  <label htmlFor={"experienceYears"} className={"partner-form-label"}>
                    Experience
                  </label>
                  <div className={"input-group"}>
                    <input type={"number"} id={"experienceYears"} className={"partner-form-control"} min={"0"} max={"100"} placeholder={"0"} />
                    <span className={"input-group-text"}>
                      Years
                    </span>
                  </div>
                </div>
                <div className={"col-md-6"}>
                  <label htmlFor={"languages"} className={"partner-form-label"}>
                    Languages
                  </label>
                  <input type={"text"} id={"languages"} className={"partner-form-control"} placeholder={"English, Hindi, Gujarati"} />
                  <small className={"partner-form-help"}>
                    Separate languages with commas.
                  </small>
                </div>
              </div>
              <div className={"partner-form-actions"}>
                <button type={"button"} id={"cancelProfileBtn"} className={"partner-btn partner-btn-light"}>
                  Cancel
                </button>
                <button type={"submit"} id={"saveProfileBtn"} className={"partner-btn partner-btn-primary"}>
                  <i className={"bi bi-check-lg"}></i>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={"partner-card mt-4"}>
          <div className={"partner-card-header"}>
            <div>
              <h4>
                Profile Visibility
              </h4>
              <p>
                Information customers may see when choosing
                        your services.
              </p>
            </div>
          </div>
          <div className={"partner-card-body"}>
            <div className={"row g-4"}>
              <div className={"col-md-4"}>
                <div className={"partner-info-box"}>
                  <i className={"bi bi-person-badge"}></i>
                  <div>
                    <strong>
                      Public Name
                    </strong>
                    <span id={"visibilityName"}>
                      -
                    </span>
                  </div>
                </div>
              </div>
              <div className={"col-md-4"}>
                <div className={"partner-info-box"}>
                  <i className={"bi bi-geo-alt"}></i>
                  <div>
                    <strong>
                      Location
                    </strong>
                    <span id={"visibilityLocation"}>
                      -
                    </span>
                  </div>
                </div>
              </div>
              <div className={"col-md-4"}>
                <div className={"partner-info-box"}>
                  <i className={"bi bi-briefcase"}></i>
                  <div>
                    <strong>
                      Partner Type
                    </strong>
                    <span id={"visibilityType"}>
                      -
                    </span>
                  </div>
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
