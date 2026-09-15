import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function BookingPage() {
  usePageTitle("Book Your Ride | TRIPZOVA");
  useLegacyPage({ styles: ["/legacy/booking.css"], scripts: ["/legacy/booking.js"], beforeLoad: () => { const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; window.__tripzovaGoogleMapsSrc = key ? `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&libraries=places&callback=initBookingMap` : ''; } });


  return (
    <>
    <main className={"booking-page"}>
      <div className={"booking-container"}>
        <a href={"/"} className={"back-button"}>
          ← Back to TRIPZOVA
        </a>
        <div className={"booking-header"}>
          <p className={"booking-eyebrow"}>
            TRIPZOVA
          </p>
          <h1>
            Book your ride
          </h1>
          <p>
            Plan your journey with a trusted TRIPZOVA partner.
          </p>
        </div>
        <div className={"booking-vehicle-summary"} id={"bookingVehicleSummary"}>
          <img id={"bookingVehicleImage"} alt={"Selected vehicle"} style={{display: "none"}} />
          <div>
            <strong id={"bookingVehicleName"}>
              Loading selected vehicle...
            </strong>
            <div className={"booking-vehicle-meta"}>
              <span id={"bookingVehiclePrice"}></span>
              <span id={"bookingVehicleSeats"}></span>
              <span id={"bookingVehiclePartner"}></span>
            </div>
          </div>
        </div>
        <div className={"trip-toggle"}>
          <button type={"button"} className={"trip-option active"} id={"roundTripBtn"}>
            Round-Trip / Stay
          </button>
          <button type={"button"} className={"trip-option"} id={"oneWayBtn"}>
            One-Way Drop
          </button>
        </div>
        <div className={"booking-grid"}>
          <div className={"booking-field"}>
            <label htmlFor={"pickupInput"}>
              Pickup From
            </label>
            <div className={"booking-input"}>
              <span>
                📍
              </span>
              <input type={"text"} id={"pickupInput"} placeholder={"Enter pickup location"} autoComplete={"off"} />
            </div>
          </div>
          <div className={"booking-field"}>
            <label htmlFor={"dropInput"}>
              Drop To
            </label>
            <div className={"booking-input"}>
              <span>
                📍
              </span>
              <input type={"text"} id={"dropInput"} placeholder={"Enter drop location"} autoComplete={"off"} />
            </div>
          </div>
        </div>
        <div className={"booking-map-section"}>
          <div id={"map"} className={"booking-map"}></div>
          <div id={"routeInfo"} className={"route-info"}>
            <strong id={"routeDistance"}>
              —
            </strong>
            <span id={"routeTime"}>
              —
            </span>
          </div>
        </div>
        <div id={"mapPicker"} className={"map-picker"}>
          <div className={"map-picker-pin"}>
            📍
          </div>
          <div className={"map-picker-top"}>
            <button type={"button"} id={"closeMapPicker"} className={"map-picker-close"}>
              ✕
            </button>
            <div>
              <strong>
                Select location
              </strong>
              <small>
                Move the map to place the pin
              </small>
            </div>
          </div>
          <div id={"mapPickerAddress"} className={"map-picker-address"}>
            Move the map to select a location
          </div>
          <button type={"button"} id={"confirmMapLocation"} className={"confirm-map-location"}>
            CONFIRM LOCATION
          </button>
        </div>
        <div className={"flight-info"}>
          <div className={"flight-title"}>
            ✈️ Flight Number
            <span>
              (Recommended)
            </span>
          </div>
          <p>
            Provide your flight number so your host can
                    track delays and ensure a smooth pickup.
            <strong>
              (Optional)
            </strong>
          </p>
          <input type={"text"} id={"flightNumber"} placeholder={"Enter flight number"} />
        </div>
        <div className={"booking-grid"}>
          <div className={"booking-field"}>
            <label htmlFor={"journeyDate"}>
              Journey Date
            </label>
            <div className={"booking-input"}>
              <span>
                📅
              </span>
              <input type={"date"} id={"journeyDate"} />
            </div>
          </div>
          <div className={"booking-field"} id={"returnDateField"}>
            <label htmlFor={"returnDate"}>
              Return Date
            </label>
            <div className={"booking-input"}>
              <span>
                📅
              </span>
              <input type={"date"} id={"returnDate"} />
            </div>
          </div>
        </div>
        <div className={"booking-field pickup-time-field"}>
          <label htmlFor={"pickupTime"}>
            Pickup Time
          </label>
          <div className={"booking-input"}>
            <span>
              🕐
            </span>
            <input type={"time"} id={"pickupTime"} />
          </div>
        </div>
        <div className={"passenger-field"}>
          <label>
            Passengers
          </label>
          <button type={"button"} id={"passengerButton"} className={"passenger-button"}>
            <span id={"passengerText"}>
              1 Adult, 0 Kids
            </span>
            <span>
              ⌄
            </span>
          </button>
          <div className={"passenger-menu"} id={"passengerMenu"}>
            <div className={"passenger-row"}>
              <div>
                <strong>
                  Adults
                </strong>
                <small>
                  13+ years
                </small>
              </div>
              <div className={"counter"}>
                <button type={"button"} id={"adultMinus"}>
                  −
                </button>
                <span id={"adultCount"}>
                  1
                </span>
                <button type={"button"} id={"adultPlus"}>
                  +
                </button>
              </div>
            </div>
            <div className={"passenger-row"}>
              <div>
                <strong>
                  Kids
                </strong>
                <small>
                  2–12 years
                </small>
              </div>
              <div className={"counter"}>
                <button type={"button"} id={"kidMinus"}>
                  −
                </button>
                <span id={"kidCount"}>
                  0
                </span>
                <button type={"button"} id={"kidPlus"}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <button type={"button"} className={"book-ride-button"} id={"bookRideButton"}>
          BOOK THE RIDE
        </button>
        <div id={"bookingMessage"} className={"booking-message"}></div>
      </div>
    </main>
    </>
  );
}
