import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function HomePage() {
  usePageTitle('TRIPZOVA | Travel Your Way');
  useLegacyPage({
    styles: [
      'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css',
      '/legacy/user/css/style.css'
    ],
    scripts: ['/legacy/user/js/main.js'],
    beforeLoad: undefined
  });

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <a href="/" className="logo">TRIPZOVA</a>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#explore">Explore</a>
            <a href="#how-it-works">How it works</a>
            <a href="#why-tripzova">Why TRIPZOVA</a>
            <a href="/contact">Contact</a>
          </nav>
          <div className="auth-buttons" id="authButtons">
            <div id="guestButtons">
              <a href="/login" className="btn-signin">Sign In</a>
              <a href="/register" className="btn-signup">Sign Up</a>
            </div>
            <div id="userButtons" className="user-menu">
              <span id="userGreeting" />
              <a href="/dashboard" id="dashboardLink" className="btn-signin">My Bookings</a>
              <button type="button" id="logoutButton" className="btn-signout">Logout</button>
            </div>
          </div>
          <button className="mobile-menu-button" id="mobileMenuButton" type="button" aria-label="Open menu">
            <i className="bi bi-list" />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-trust-pill"><span /> Smart vehicle availability</div>
              <p className="hero-eyebrow">TRAVEL. EXPLORE. EXPERIENCE.</p>
              <h1>
                Your journey,<br />
                <span>your way.</span>
              </h1>
              <p className="hero-description">
                Book comfortable rides with trusted travel partners, clear pricing and
                real date-wise vehicle availability — all in one place.
              </p>
              <div className="hero-buttons">
                <a href="#searchWidget" className="btn-primary">Find a Ride <i className="bi bi-arrow-right" /></a>
                <a href="#explore" className="btn-secondary">Explore TRIPZOVA</a>
              </div>
              <div className="hero-mini-features">
                <span><i className="bi bi-shield-check" /> Verified partners</span>
                <span><i className="bi bi-calendar2-check" /> Live availability</span>
                <span><i className="bi bi-receipt" /> Transparent pricing</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-card">
                <div className="hero-road-line" />
                <div className="hero-floating-card hero-floating-one">
                  <i className="bi bi-check-circle-fill" />
                  <div><small>Vehicle status</small><strong>Available</strong></div>
                </div>
                <div className="hero-floating-card hero-floating-two">
                  <i className="bi bi-calendar-event" />
                  <div><small>Booking</small><strong>Date protected</strong></div>
                </div>
                <div className="hero-card-content">
                  <span>EXPLORE</span>
                  <h2>Where will<br />you go next?</h2>
                  <p>From city rides to outstation journeys.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="quick-search" id="searchWidget">
            <div className="quick-search-inner">
              <div className="quick-search-heading">
                <div>
                  <span className="search-kicker">PLAN YOUR RIDE</span>
                  <h2>Find an available vehicle</h2>
                </div>
                <span className="availability-note"><i className="bi bi-shield-check" /> Double-booking protected</span>
              </div>

              <form className="ride-search-form" id="rideSearchForm">
                <label>
                  <span><i className="bi bi-geo-alt" /> Pickup</span>
                  <input id="homePickup" type="text" placeholder="e.g. Surat" autoComplete="off" />
                </label>
                <label>
                  <span><i className="bi bi-geo" /> Drop</span>
                  <input id="homeDrop" type="text" placeholder="e.g. Mumbai" autoComplete="off" />
                </label>
                <label>
                  <span><i className="bi bi-calendar3" /> Travel date</span>
                  <input id="homeTravelDate" type="date" required />
                </label>
                <label>
                  <span><i className="bi bi-people" /> Travellers</span>
                  <input id="homeMembers" type="number" min="1" max="60" defaultValue="1" required />
                </label>
                <button className="ride-search-submit" type="submit">
                  Search Vehicles <i className="bi bi-arrow-right" />
                </button>
              </form>

              <div className="quick-search-divider"><span>Popular destinations</span></div>
              <div className="quick-search-chips" id="destinationChips">
                <button type="button" className="destination-chip" data-destination="Mumbai"><span className="chip-emoji">🌆</span>Mumbai</button>
                <button type="button" className="destination-chip" data-destination="Delhi"><span className="chip-emoji">🏛️</span>Delhi</button>
                <button type="button" className="destination-chip" data-destination="Goa"><span className="chip-emoji">🏖️</span>Goa</button>
                <button type="button" className="destination-chip" data-destination="Jaipur"><span className="chip-emoji">🏰</span>Jaipur</button>
                <button type="button" className="destination-chip" data-destination="Bangalore"><span className="chip-emoji">🌳</span>Bangalore</button>
                <button type="button" className="destination-chip" data-destination="Manali"><span className="chip-emoji">⛰️</span>Manali</button>
              </div>
              <button type="button" className="quick-search-cta" id="browseAllVehiclesBtn">
                <span className="cta-icon"><i className="bi bi-car-front-fill" /></span>
                <span><strong>Browse All Vehicles</strong><small>Explore approved vehicles from TRIPZOVA partners</small></span>
                <span className="cta-arrow">→</span>
              </button>
              <p id="searchFormMessage" className="search-widget-message" />
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="section-container trust-grid">
            <div><i className="bi bi-person-check" /><span><strong>Verified Partners</strong><small>Approved travel providers</small></span></div>
            <div><i className="bi bi-calendar2-check" /><span><strong>Date-wise Availability</strong><small>Booked vehicles are blocked</small></span></div>
            <div><i className="bi bi-cash-coin" /><span><strong>Clear Pricing</strong><small>See trip pricing before booking</small></span></div>
            <div><i className="bi bi-headset" /><span><strong>Direct Support</strong><small>Phone, email and WhatsApp</small></span></div>
          </div>
        </section>

        <section className="explore-section" id="explore">
          <div className="section-container">
            <div className="section-heading">
              <p>DISCOVER</p>
              <h2>Travel options built around your journey.</h2>
              <span>Choose the experience that fits your trip, group and destination.</span>
            </div>
            <div className="explore-grid">
              <article className="explore-card featured">
                <div className="card-icon"><i className="bi bi-car-front-fill" /></div>
                <span className="card-tag">POPULAR</span>
                <h3>Outstation Rides</h3>
                <p>Search vehicles by date and group size, then book with live availability protection.</p>
                <a href="#searchWidget">Find a vehicle →</a>
              </article>
              <article className="explore-card">
                <div className="card-icon"><i className="bi bi-airplane-fill" /></div>
                <h3>Airport & City Travel</h3>
                <p>Plan reliable pickups and comfortable rides for airport and city journeys.</p>
                <a href="#searchWidget">Plan a ride →</a>
              </article>
              <article className="explore-card">
                <div className="card-icon"><i className="bi bi-buildings-fill" /></div>
                <h3>Become a Partner</h3>
                <p>Manage vehicles, booking requests, availability and customers from one dashboard.</p>
                <a href="/register?mode=partner">Join TRIPZOVA →</a>
              </article>
            </div>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section-container">
            <div className="section-heading centered">
              <p>SIMPLE BOOKING</p>
              <h2>From search to journey in three steps.</h2>
              <span>TRIPZOVA keeps the flow simple while protecting vehicle availability.</span>
            </div>
            <div className="how-grid">
              <article><span className="step-number">01</span><div className="step-icon"><i className="bi bi-search" /></div><h3>Search your trip</h3><p>Enter pickup, drop, travel date and group size.</p></article>
              <article><span className="step-number">02</span><div className="step-icon"><i className="bi bi-car-front" /></div><h3>Choose a vehicle</h3><p>Only approved and operationally available vehicles are shown.</p></article>
              <article><span className="step-number">03</span><div className="step-icon"><i className="bi bi-calendar-check" /></div><h3>Book with confidence</h3><p>Your selected vehicle is protected from another booking on the same date.</p></article>
            </div>
          </div>
        </section>

        <section className="why-section" id="why-tripzova">
          <div className="section-container">
            <div className="why-grid">
              <div className="why-heading">
                <p>WHY TRIPZOVA</p>
                <h2>A smarter way to manage every ride.</h2>
                <span>Customers get clarity. Partners stay in control. Availability stays accurate.</span>
                <div className="why-support-card">
                  <i className="bi bi-headset" />
                  <div><strong>Need help?</strong><small>Call +91 9879065786 or email tripzovasupport@gmail.com</small></div>
                  <a href="/contact">Contact us</a>
                </div>
              </div>
              <div className="accordion" id="whyAccordion">
                <div className="accordion-item">
                  <button className="accordion-button" type="button" aria-expanded="false"><span><strong><i className="bi bi-shield-check" /></strong>Verified Partners</span><span className="accordion-icon">+</span></button>
                  <div className="accordion-content"><p>Partner approval and vehicle approval help keep listings controlled and trustworthy.</p></div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button" type="button" aria-expanded="false"><span><strong><i className="bi bi-calendar2-check" /></strong>Protected Availability</span><span className="accordion-icon">+</span></button>
                  <div className="accordion-content"><p>Once a vehicle is reserved for a date, another customer cannot reserve that same vehicle for an overlapping date.</p></div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button" type="button" aria-expanded="false"><span><strong><i className="bi bi-tools" /></strong>Partner Vehicle Controls</span><span className="accordion-icon">+</span></button>
                  <div className="accordion-content"><p>Partners can mark vehicles Available, Maintenance or Unavailable, while Booked status is managed automatically.</p></div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button" type="button" aria-expanded="false"><span><strong><i className="bi bi-cash-stack" /></strong>Transparent Pricing</span><span className="accordion-icon">+</span></button>
                  <div className="accordion-content"><p>TRIPZOVA supports fixed-route and per-kilometre pricing so customers can understand trip costs before confirming.</p></div>
                </div>
                <div className="accordion-item">
                  <button className="accordion-button" type="button" aria-expanded="false"><span><strong><i className="bi bi-headset" /></strong>Trip Support</span><span className="accordion-icon">+</span></button>
                  <div className="accordion-content"><p>Reach TRIPZOVA through phone, email, WhatsApp or the contact form whenever you need assistance.</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="support-banner-section">
          <div className="section-container">
            <div className="support-banner">
              <div className="support-banner-icon"><i className="bi bi-chat-heart-fill" /></div>
              <div><span>TRIPZOVA SUPPORT</span><h2>Questions before you book?</h2><p>Talk to us directly and we’ll help you with your trip.</p></div>
              <div className="support-banner-actions"><a href="tel:+919879065786"><i className="bi bi-telephone-fill" /> Call</a><a href="/contact"><i className="bi bi-chat-dots-fill" /> Contact</a></div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="section-container">
            <div className="cta-card">
              <div className="cta-orb" />
              <p>READY TO TRAVEL?</p>
              <h2>Your next journey starts with the right ride.</h2>
              <div className="cta-actions"><a href="#searchWidget" className="btn-primary">Search Vehicles</a><a href="/contact" className="cta-link">Need help? Contact us →</a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand-block">
            <a href="/" className="logo">TRIPZOVA</a>
            <p>Your journey, your way.</p>
            <div className="footer-contact-mini"><a href="tel:+919879065786"><i className="bi bi-telephone" /> +91 9879065786</a><a href="mailto:tripzovasupport@gmail.com"><i className="bi bi-envelope" /> tripzovasupport@gmail.com</a></div>
          </div>
          <div className="footer-link-groups">
            <div><strong>Explore</strong><a href="#home">Home</a><a href="#explore">Services</a><a href="/vehicles">Vehicles</a></div>
            <div><strong>Account</strong><a href="/login">Sign In</a><a href="/register">Sign Up</a><a href="/register?mode=partner">Become a Partner</a></div>
            <div><strong>Support</strong><a href="/contact">Contact Us</a><a href="mailto:tripzovasupport@gmail.com">Email Support</a><a href="https://wa.me/919879065786" target="_blank" rel="noreferrer">WhatsApp</a></div>
          </div>
        </div>
        <div className="footer-bottom"><p>© 2026 TRIPZOVA. All rights reserved.</p><span>Built for smoother journeys.</span></div>
      </footer>
    </>
  );
}
