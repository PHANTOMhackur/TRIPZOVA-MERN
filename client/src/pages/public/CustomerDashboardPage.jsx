import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function CustomerDashboardPage() {
  usePageTitle("My Bookings | TRIPZOVA");
  useLegacyPage({ styles: ["/legacy/customer-dashboard.css"], scripts: ["/legacy/customer-dashboard.js"], beforeLoad: undefined });

  return (
    <>
    <header className={"dash-topbar"}>
      <a href={"/"} className={"dash-logo"}>
        TRIPZOVA
      </a>
      <div className={"dash-topbar-actions"}>
        <a href={"/"} className={"dash-back-link"}>
          ← Back to home
        </a>
        <button type={"button"} id={"dashLogoutBtn"} className={"dash-logout-btn"}>
          Logout
        </button>
      </div>
    </header>
    <main className={"dash-page"}>
      <h1 className={"dash-greeting"} id={"dashGreeting"}>
        Welcome back
      </h1>
      <p className={"dash-subtitle"}>
        Here's an overview of your TRIPZOVA bookings.
      </p>
      <section className={"dash-stats"}>
        <div className={"dash-stat-card"}>
          <div className={"dash-stat-value"} id={"dashStatTotal"}>
            0
          </div>
          <div className={"dash-stat-label"}>
            Total bookings
          </div>
        </div>
        <div className={"dash-stat-card"}>
          <div className={"dash-stat-value"} id={"dashStatUpcoming"}>
            0
          </div>
          <div className={"dash-stat-label"}>
            Upcoming trips
          </div>
        </div>
        <div className={"dash-stat-card"}>
          <div className={"dash-stat-value"} id={"dashStatCompleted"}>
            0
          </div>
          <div className={"dash-stat-label"}>
            Completed trips
          </div>
        </div>
      </section>
      <section>
        <div className={"dash-section-header"}>
          <h2>
            My Bookings
          </h2>
          <a href={"/user/#searchWidget"} className={"dash-new-booking-btn"}>
            + New Booking
          </a>
        </div>
        <div id={"dashLoading"} className={"dash-loading"}>
          Loading your bookings...
        </div>
        <div id={"dashError"} className={"dash-error"} style={{display: "none"}}></div>
        <div id={"dashEmpty"} className={"dash-empty"} style={{display: "none"}}>
          You haven't made any bookings yet.
          <br />
          <br />
          <a href={"/user/#searchWidget"} className={"dash-new-booking-btn"}>
            Search Vehicles
          </a>
        </div>
        <div id={"dashBookingsList"} className={"dash-bookings-list"}></div>
      </section>
    </main>
    </>
  );
}
