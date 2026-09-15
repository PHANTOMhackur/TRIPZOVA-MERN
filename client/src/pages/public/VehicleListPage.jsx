import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function VehicleListPage() {
  usePageTitle("Choose Your Vehicle - TRIPZOVA");
  useLegacyPage({ styles: ["https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css", "/legacy/vehicle-list.css"], scripts: ["/legacy/vehicle-list.js"], beforeLoad: undefined });

  return (
    <>
    <nav className={"tripzova-navbar"}>
      <div className={"tripzova-container"}>
        <a href={"/"} className={"tripzova-logo"}>
          <span className={"tripzova-logo-icon"}>
            <i className={"bi bi-airplane"}></i>
          </span>
          <span>
            TRIPZOVA
          </span>
        </a>
        <div className={"tripzova-navbar-right"}>
          <a href={"/"} className={"tripzova-back-link"}>
            <i className={"bi bi-arrow-left"}></i>
            Back to Search
          </a>
        </div>
      </div>
    </nav>
    <main className={"vehicle-page"}>
      <div className={"tripzova-container"}>
        <section className={"vehicle-search-summary"}>
          <div>
            <span className={"summary-label"}>
              Your Trip
            </span>
            <h1>
              Choose your vehicle
            </h1>
            <p id={"vehicleSearchSummary"}>
              Finding the best vehicles for your trip...
            </p>
          </div>
          <div className={"summary-members"}>
            <div className={"summary-members-icon"}>
              <i className={"bi bi-people-fill"}></i>
            </div>
            <div>
              <span>
                Travellers
              </span>
              <div className={"member-stepper"}>
                <button type={"button"} className={"member-stepper-btn"} id={"memberDecreaseBtn"} aria-label={"Decrease travellers"}>
                  −
                </button>
                <strong id={"summaryMemberCount"}>
                  1
                </strong>
                <button type={"button"} className={"member-stepper-btn"} id={"memberIncreaseBtn"} aria-label={"Increase travellers"}>
                  +
                </button>
              </div>
            </div>
          </div>
        </section>
        <form className={"availability-search-bar"} id={"vehicleAvailabilitySearchForm"}>
          <div className={"availability-search-copy"}>
            <span><i className={"bi bi-calendar2-check"}></i> Check date availability</span>
            <small>Choose your dates to automatically hide vehicles that are already booked.</small>
          </div>
          <label>
            <span>Travel date</span>
            <input type={"date"} id={"vehicleTravelDateFilter"} />
          </label>
          <label>
            <span>Trip type</span>
            <select id={"vehicleTripTypeFilter"}>
              <option value={"one_way"}>One way</option>
              <option value={"round_trip"}>Round trip</option>
            </select>
          </label>
          <label id={"vehicleReturnDateWrap"} style={{display: "none"}}>
            <span>Return date</span>
            <input type={"date"} id={"vehicleReturnDateFilter"} />
          </label>
          <button type={"submit"} className={"availability-search-btn"}>
            <i className={"bi bi-search"}></i> Check Availability
          </button>
        </form>
        <div id={"vehicleError"} className={"vehicle-alert vehicle-alert-danger"} style={{display: "none"}}>
          <i className={"bi bi-exclamation-triangle"}></i>
          <span id={"vehicleErrorMessage"}>
            Unable to load vehicles.
          </span>
          <button type={"button"} className={"vehicle-btn vehicle-btn-outline vehicle-btn-sm"} onClick={() => { window.loadVehicles?.() }}>
            Retry
          </button>
        </div>
        <div id={"vehicleLoading"} className={"vehicle-loading"}>
          <div className={"spinner-border"} role={"status"}></div>
          <h5>
            Finding available vehicles
          </h5>
          <p>
            We're looking for vehicles suitable for your group.
          </p>
        </div>
        <div id={"vehicleContent"} style={{display: "none"}}>
          <div className={"vehicle-layout"}>
            <aside className={"vehicle-filter-sidebar"}>
              <div className={"filter-card"}>
                <div className={"filter-card-header"}>
                  <h3>
                    <i className={"bi bi-sliders"}></i>
                    Filters
                  </h3>
                  <button type={"button"} id={"clearFilters"} className={"clear-filter-btn"}>
                    Clear
                  </button>
                </div>
                <div className={"filter-group"}>
                  <h4>
                    Vehicle Type
                  </h4>
                  <label className={"filter-checkbox"}>
                    <input type={"checkbox"} value={"hatchback"} data-filter={"vehicleType"} />
                    <span>
                      Hatchback
                    </span>
                  </label>
                  <label className={"filter-checkbox"}>
                    <input type={"checkbox"} value={"sedan"} data-filter={"vehicleType"} />
                    <span>
                      Sedan
                    </span>
                  </label>
                  <label className={"filter-checkbox"}>
                    <input type={"checkbox"} value={"suv"} data-filter={"vehicleType"} />
                    <span>
                      SUV
                    </span>
                  </label>
                  <label className={"filter-checkbox"}>
                    <input type={"checkbox"} value={"muv"} data-filter={"vehicleType"} />
                    <span>
                      MUV
                    </span>
                  </label>
                  <label className={"filter-checkbox"}>
                    <input type={"checkbox"} value={"tempo_traveller"} data-filter={"vehicleType"} />
                    <span>
                      Tempo Traveller
                    </span>
                  </label>
                  <label className={"filter-checkbox"}>
                    <input type={"checkbox"} value={"minibus"} data-filter={"vehicleType"} />
                    <span>
                      Mini Bus
                    </span>
                  </label>
                  <label className={"filter-checkbox"}>
                    <input type={"checkbox"} value={"bus"} data-filter={"vehicleType"} />
                    <span>
                      Bus
                    </span>
                  </label>
                </div>
                <div className={"filter-group"}>
                  <h4>
                    Air Conditioning
                  </h4>
                  <label className={"filter-checkbox"}>
                    <input type={"checkbox"} value={"ac"} data-filter={"ac"} />
                    <span>
                      AC
                    </span>
                  </label>
                  <label className={"filter-checkbox"}>
                    <input type={"checkbox"} value={"non_ac"} data-filter={"ac"} />
                    <span>
                      Non-AC
                    </span>
                  </label>
                </div>
                <div className={"filter-group"}>
                  <h4>
                    Driver
                  </h4>
                  <label className={"filter-checkbox"}>
                    <input type={"checkbox"} id={"driverIncludedFilter"} />
                    <span>
                      Driver included
                    </span>
                  </label>
                </div>
              </div>
            </aside>
            <section className={"vehicle-results"}>
              <div className={"vehicle-results-header"}>
                <div>
                  <span id={"vehicleResultCount"} className={"vehicle-result-count"}>
                    0 vehicles
                  </span>
                  <h2>
                    Available vehicles
                  </h2>
                </div>
                <div className={"vehicle-sort"}>
                  <label htmlFor={"vehicleSort"}>
                    Sort by
                  </label>
                  <select id={"vehicleSort"}>
                    <option value={"recommended"}>
                      Recommended
                    </option>
                    <option value={"price-low"}>
                      Price: Low to High
                    </option>
                    <option value={"price-high"}>
                      Price: High to Low
                    </option>
                    <option value={"capacity"}>
                      Seating Capacity
                    </option>
                  </select>
                </div>
              </div>
              <div id={"vehicleList"} className={"vehicle-list"}></div>
              <div id={"vehicleNoResults"} className={"vehicle-no-results"} style={{display: "none"}}>
                <div className={"no-results-icon"}>
                  <i className={"bi bi-car-front"}></i>
                </div>
                <h3>
                  No vehicles found
                </h3>
                <p>
                  Try changing your filters to see more vehicles.
                </p>
                <button type={"button"} id={"resetVehicleFilters"} className={"vehicle-btn vehicle-btn-primary"}>
                  Reset Filters
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
