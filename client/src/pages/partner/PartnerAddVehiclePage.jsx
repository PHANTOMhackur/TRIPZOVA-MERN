import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function PartnerAddVehiclePage() {
  usePageTitle("Add Vehicle | TRIPZOVA Partner");
  useLegacyPage({ styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css", "/legacy/partner/css/partner.css"], scripts: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "/legacy/partner/js/partner.js", "/legacy/partner/js/add-vehicle.js"], beforeLoad: undefined });

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
            <span id={"addVehiclePageTitle"}>
              Add Vehicle
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
            <h1 id={"addVehicleHeading"}>
              Add Vehicle
            </h1>
            <p>
              New vehicles are submitted for
                        admin approval before they go live.
            </p>
          </div>
          <a href={"/partner/vehicles"} className={"partner-btn partner-btn-light"}>
            <i className={"bi bi-arrow-left"}></i>
            Back to My Vehicles
          </a>
        </div>
        <div id={"addVehicleMessage"} style={{display: "none"}}></div>
        <div className={"partner-card"}>
          <div className={"partner-card-header"}>
            <div>
              <h4>
                Vehicle Details
              </h4>
              <p>
                Fill in accurate details - customers see this information when booking.
              </p>
            </div>
          </div>
          <form id={"vehicleForm"} noValidate>
            <div className={"row g-4"}>
              <div className={"col-md-6"}>
                <label htmlFor={"vehicleName"} className={"partner-form-label"}>
                  Vehicle Name
                  <span>
                    *
                  </span>
                </label>
                <input type={"text"} id={"vehicleName"} className={"partner-form-control"} placeholder={"e.g. Toyota Innova Crysta"} required />
              </div>
              <div className={"col-md-6"}>
                <label htmlFor={"vehicleNumber"} className={"partner-form-label"}>
                  Registration Number
                  <span>
                    *
                  </span>
                </label>
                <input type={"text"} id={"vehicleNumber"} className={"partner-form-control"} placeholder={"e.g. GJ05AB1234"} required />
              </div>
              <div className={"col-md-6"}>
                <label htmlFor={"vehicleBrand"} className={"partner-form-label"}>
                  Brand
                </label>
                <input type={"text"} id={"vehicleBrand"} className={"partner-form-control"} placeholder={"e.g. Toyota"} />
              </div>
              <div className={"col-md-6"}>
                <label htmlFor={"vehicleModel"} className={"partner-form-label"}>
                  Model
                </label>
                <input type={"text"} id={"vehicleModel"} className={"partner-form-control"} placeholder={"e.g. Crysta"} />
              </div>
              <div className={"col-md-6"}>
                <label htmlFor={"vehicleType"} className={"partner-form-label"}>
                  Vehicle Type
                  <span>
                    *
                  </span>
                </label>
                <select id={"vehicleType"} className={"partner-form-select"} required>
                  <option value={""}>
                    Select type
                  </option>
                  <option value={"hatchback"}>
                    Hatchback
                  </option>
                  <option value={"sedan"}>
                    Sedan
                  </option>
                  <option value={"suv"}>
                    SUV
                  </option>
                  <option value={"muv"}>
                    MUV
                  </option>
                  <option value={"tempo_traveller"}>
                    Tempo Traveller
                  </option>
                  <option value={"minibus"}>
                    Minibus
                  </option>
                  <option value={"bus"}>
                    Bus
                  </option>
                  <option value={"other"}>
                    Other
                  </option>
                </select>
              </div>
              <div className={"col-md-6"}>
                <label htmlFor={"seatCapacity"} className={"partner-form-label"}>
                  Seat Capacity
                  <span>
                    *
                  </span>
                </label>
                <input type={"number"} id={"seatCapacity"} className={"partner-form-control"} min={"1"} placeholder={"e.g. 7"} required />
              </div>
              <div className={"col-md-6"}>
                <label htmlFor={"airConditioning"} className={"partner-form-label"}>
                  Air Conditioning
                </label>
                <select id={"airConditioning"} className={"partner-form-select"}>
                  <option value={"ac"}>
                    AC
                  </option>
                  <option value={"non_ac"}>
                    Non-AC
                  </option>
                </select>
              </div>
              <div className={"col-md-6"}>
                <label htmlFor={"fuelType"} className={"partner-form-label"}>
                  Fuel Type
                  <span>
                    *
                  </span>
                </label>
                <select id={"fuelType"} className={"partner-form-select"} required>
                  <option value={""}>
                    Select fuel type
                  </option>
                  <option value={"petrol"}>
                    Petrol
                  </option>
                  <option value={"diesel"}>
                    Diesel
                  </option>
                  <option value={"cng"}>
                    CNG
                  </option>
                  <option value={"electric"}>
                    Electric
                  </option>
                  <option value={"hybrid"}>
                    Hybrid
                  </option>
                  <option value={"other"}>
                    Other
                  </option>
                </select>
              </div>
              <div className={"col-12"}>
                <div className={"partner-pricing-divider"}>
                  <i className={"bi bi-tag"}></i>
                  Pricing
                </div>
                <p className={"partner-form-help mb-0"}>
                  Set an exact fixed price for specific routes
                                (recommended for outstation trips), and/or a
                                fallback price per KM for everything else.
                                At least one of the two is required.
                </p>
              </div>
              <div className={"col-12"}>
                <label className={"partner-form-label"}>
                  Fixed Route Prices
                </label>
                <div id={"fixedRoutesList"} className={"partner-route-list"}></div>
                <button type={"button"} id={"addRouteBtn"} className={"partner-btn partner-btn-outline partner-btn-sm"}>
                  <i className={"bi bi-plus-lg"}></i>
                  Add Route Price
                </button>
                <small className={"partner-form-help d-block mt-2"}>
                  Example: From
                  <strong>
                    Surat
                  </strong>
                  to
                  <strong>
                    Mumbai
                  </strong>
                  — ₹7000. From
                  <strong>
                    Surat
                  </strong>
                  to
                  <strong>
                    Ahmedabad
                  </strong>
                  — ₹5500. A
                                customer's trip is matched automatically
                                if their pickup/drop matches a route here.
                </small>
              </div>
              <div className={"col-md-6"}>
                <label htmlFor={"pricePerKm"} className={"partner-form-label"}>
                  Fallback Price per KM (₹)
                </label>
                <input type={"number"} id={"pricePerKm"} className={"partner-form-control"} min={"0"} step={"0.01"} placeholder={"e.g. 14"} />
                <small className={"partner-form-help"}>
                  Used only when a trip doesn't match any
                                fixed route above.
                </small>
              </div>
              <div className={"col-md-6"}>
                <label htmlFor={"minimumKm"} className={"partner-form-label"}>
                  Minimum KM (per day/trip)
                </label>
                <input type={"number"} id={"minimumKm"} className={"partner-form-control"} min={"0"} placeholder={"e.g. 250"} />
                <small className={"partner-form-help"}>
                  Only applies to the fallback per-KM rate.
                </small>
              </div>
              <div className={"col-md-6"}>
                <label htmlFor={"driverIncluded"} className={"partner-form-label"}>
                  Driver Included
                </label>
                <select id={"driverIncluded"} className={"partner-form-select"}>
                  <option value={"true"}>
                    Yes
                  </option>
                  <option value={"false"}>
                    No
                  </option>
                </select>
              </div>
              <div className={"col-md-6"}>
                <label htmlFor={"driverAllowance"} className={"partner-form-label"}>
                  Driver Allowance (₹ / day)
                </label>
                <input type={"number"} id={"driverAllowance"} className={"partner-form-control"} min={"0"} placeholder={"e.g. 300"} />
              </div>
              <div className={"col-md-6"}>
                <label htmlFor={"extraCharges"} className={"partner-form-label"}>
                  Extra Charges (₹)
                </label>
                <input type={"number"} id={"extraCharges"} className={"partner-form-control"} min={"0"} placeholder={"e.g. 0"} />
                <small className={"partner-form-help"}>
                  Tolls, parking, night charges, etc. Optional.
                </small>
              </div>
              <div className={"col-12"}>
                <label className={"partner-form-label"}>
                  Vehicle Photo
                </label>
                <input type={"hidden"} id={"vehiclePhotoUrl"} />
                <input type={"hidden"} id={"tripzovaApiBase"} value={import.meta.env.VITE_API_URL || "/api"} readOnly />
                <input
                  type={"file"}
                  id={"vehiclePhotoFile"}
                  accept={"image/jpeg,image/png,image/webp"}
                  hidden
                />
                <div
                  className={"tripzova-vehicle-upload"}
                  id={"vehiclePhotoDropZone"}
                  role={"button"}
                  tabIndex={0}
                  aria-label={"Choose a vehicle photo"}
                >
                  <div className={"tripzova-vehicle-upload-empty"} id={"vehiclePhotoEmptyState"}>
                    <div className={"tripzova-vehicle-upload-icon"}>
                      <i className={"bi bi-cloud-arrow-up"}></i>
                    </div>
                    <div>
                      <strong>Upload vehicle photo</strong>
                      <p>Click to choose or drag & drop a JPG, PNG or WEBP image.</p>
                      <span>Maximum file size: 5 MB</span>
                    </div>
                    <button type={"button"} className={"partner-btn partner-btn-outline partner-btn-sm"} id={"chooseVehiclePhotoBtn"}>
                      <i className={"bi bi-image"}></i>
                      Choose Image
                    </button>
                  </div>
                  <div className={"tripzova-vehicle-preview"} id={"vehiclePhotoPreviewWrap"} style={{display: "none"}}>
                    <img id={"vehiclePhotoPreview"} alt={"Vehicle preview"} />
                    <div className={"tripzova-vehicle-preview-overlay"}>
                      <button type={"button"} className={"tripzova-photo-action"} id={"changeVehiclePhotoBtn"}>
                        <i className={"bi bi-arrow-repeat"}></i>
                        Change
                      </button>
                      <button type={"button"} className={"tripzova-photo-action tripzova-photo-action-danger"} id={"removeVehiclePhotoBtn"}>
                        <i className={"bi bi-trash"}></i>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
                <div className={"tripzova-upload-status"} id={"vehiclePhotoUploadStatus"} aria-live={"polite"}></div>
                <small className={"partner-form-help"}>
                  Your photo is uploaded securely when you save the vehicle.
                </small>
              </div>
              <div className={"col-12"}>
                <label htmlFor={"vehicleDescription"} className={"partner-form-label"}>
                  Description
                </label>
                <textarea id={"vehicleDescription"} className={"partner-form-textarea"} rows={"4"} placeholder={"Anything customers should know - luggage space, amenities, etc."}></textarea>
              </div>
            </div>
            <div className={"partner-form-actions"}>
              <a href={"/partner/vehicles"} className={"partner-btn partner-btn-light"}>
                Cancel
              </a>
              <button type={"submit"} id={"saveVehicleBtn"} className={"partner-btn partner-btn-primary"}>
                <i className={"bi bi-check-lg"}></i>
                <span id={"saveVehicleBtnText"}>
                  Add Vehicle
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
    </>
  );
}
