import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function BookingStatusPage() {
  usePageTitle("Booking Status - TRIPZOVA");
  useLegacyPage({ styles: ["/legacy/customer-dashboard.css", "/legacy/booking-status.css"], scripts: ["/legacy/booking-status.js"], beforeLoad: undefined });

  return (
    <>
    <header className={"dash-topbar"}>
      <div className={"dash-logo"}>
        TRIPZOVA
      </div>
      <div className={"dash-topbar-actions"}>
        <a href={"/dashboard"} className={"dash-back-link"}>
          ← My Bookings
        </a>
      </div>
    </header>
    <main className={"dash-page bstat-page"}>
      <div id={"bstatLoading"} className={"dash-loading"}>
        Loading your booking...
      </div>
      <div id={"bstatError"} className={"dash-error"} style={{display: "none"}}></div>
      <div id={"bstatContent"} style={{display: "none"}}>
        <div className={"bstat-header"}>
          <div>
            <h1 id={"bstatVehicleName"} className={"dash-greeting"}>
              Booking
            </h1>
            <div className={"bstat-number"}>
              Booking #
              <span id={"bstatBookingNumber"}>
                -
              </span>
            </div>
          </div>
          <span id={"bstatStatusBadge"} className={"dash-status"}>
            -
          </span>
        </div>
        <div id={"bstatEditBanner"} className={"bstat-edit-banner"} style={{display: "none"}}>
          <div>
            <strong>
              You can still modify or cancel this booking.
            </strong>
            <div className={"bstat-countdown-line"}>
              Time remaining:
              <span id={"bstatCountdown"}>
                --:--
              </span>
            </div>
          </div>
          <div className={"bstat-edit-banner-actions"}>
            <button id={"bstatEditBtn"} type={"button"} className={"dash-new-booking-btn"}>
              Modify Booking
            </button>
            <button id={"bstatCancelBtn"} type={"button"} className={"dash-cancel-btn"}>
              Cancel Booking
            </button>
          </div>
        </div>
        <div id={"bstatLockedBanner"} className={"bstat-locked-banner"} style={{display: "none"}}>
          The 5-minute modification window for this booking has closed.
                Contact your partner or TRIPZOVA support for any further changes.
        </div>
        <div className={"bstat-card"}>
          <h2>
            Trip Details
          </h2>
          <div className={"bstat-grid"} id={"bstatDetailsGrid"}></div>
        </div>
        <div className={"bstat-card"} id={"bstatDriverCard"} style={{display: "none"}}>
          <h2>
            Your Driver
          </h2>
          <div className={"bstat-grid"} id={"bstatDriverGrid"}></div>
        </div>
        <div className={"bstat-card"} id={"bstatEditForm"} style={{display: "none"}}>
          <h2>
            Modify Your Booking
          </h2>
          <div id={"bstatEditError"} className={"dash-error"} style={{display: "none"}}></div>
          <div className={"bstat-form-grid"}>
            <div>
              <label htmlFor={"editPickup"}>
                Pickup Location
              </label>
              <input type={"text"} id={"editPickup"} />
            </div>
            <div>
              <label htmlFor={"editDrop"}>
                Drop Location
              </label>
              <input type={"text"} id={"editDrop"} />
            </div>
            <div>
              <label htmlFor={"editTravelDate"}>
                Travel Date
              </label>
              <input type={"date"} id={"editTravelDate"} />
            </div>
            <div>
              <label htmlFor={"editPickupTime"}>
                Pickup Time
              </label>
              <input type={"time"} id={"editPickupTime"} />
            </div>
            <div id={"editReturnDateWrap"} style={{display: "none"}}>
              <label htmlFor={"editReturnDate"}>
                Return Date
              </label>
              <input type={"date"} id={"editReturnDate"} />
            </div>
            <div>
              <label htmlFor={"editGuests"}>
                Passengers
              </label>
              <input type={"number"} id={"editGuests"} min={"1"} />
            </div>
          </div>
          <div className={"bstat-form-actions"}>
            <button id={"bstatSaveBtn"} type={"button"} className={"dash-new-booking-btn"}>
              Save Changes
            </button>
            <button id={"bstatCancelEditBtn"} type={"button"} className={"dash-cancel-btn"}>
              Discard
            </button>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
