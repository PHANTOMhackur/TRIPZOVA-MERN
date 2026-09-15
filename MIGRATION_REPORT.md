# TRIPZOVA Migration Report

## Current technology detected

### Supplied frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Bootstrap 5 / Bootstrap Icons on Admin and Partner panels
- Google Maps JavaScript API + Places
- MSG91 OTP widget

### Supplied backend
- Node.js
- Express.js 5
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Passport Google OAuth
- Helmet
- express-rate-limit

The supplied backend was already a Node/Express/MongoDB backend. The migration therefore focused on moving the UI into React/Vite without unnecessarily replacing working backend business logic.

## Important screens detected

36 HTML files were supplied. The meaningful screens include:

### Public/customer
Home, Login, Register, Forgot Password, Reset Password, Google account type, Google success, Vehicle list/search, Booking, Booking status, Customer bookings dashboard.

### Partner
Dashboard, Booking requests, Vehicles, Add vehicle, Customers, Earnings, Profile, Notifications, Reviews, Settings.

### Admin
Dashboard, Users, Partners, Vehicles, Bookings, Tours, Rides, Payments, Partner earnings, Reports, Reviews, Notifications, Settings.

`admin/partner-requests.html` was effectively empty/unused; its React route now points to the actual partner management page instead of dropping the feature.

## Database structure detected

### User
Identity, email, Google ID, phone verification, location, password/auth provider, role, partner status, account status, password-reset token/expiry.

### PartnerProfile
User reference, profile/business details, contact details, city/address/about, experience, languages, partner type, completion status.

### Vehicle
Partner reference, photos, vehicle identity/type/capacity/fuel/AC, per-km pricing, fixed routes, minimum km, driver/extra charges, description, status and admin approval.

### Booking
Booking number, customer/partner/vehicle references, service/trip type, pickup/drop, dates/time, guests, distance, pricing breakdown, fixed-route match, driver assignment, edit window, payment status/method, booking status and cancellation/rejection/completion metadata.

## Main functionality detected

- Customer registration
- Email/password login
- Phone OTP login
- Google OAuth login/account creation
- JWT authentication
- Customer/traveller/partner/admin roles
- Partner approval workflow
- User account status management
- Vehicle CRUD
- Vehicle approval/status management
- Vehicle search/filtering
- Per-km and fixed-route pricing
- Ride/tour booking
- Customer booking history
- Customer booking edit/cancel window
- Partner accept/reject/complete workflow
- Driver assignment
- Admin dashboard metrics
- Partner dashboard metrics
- Booking-derived payments/reports/earnings/notifications

## Authentication detected

- JWT bearer token stored by the existing browser client
- bcrypt password hashing
- server-side account status checks
- admin middleware
- partner middleware
- Google OAuth through Passport
- MSG91 access-token verification for phone OTP

## React architecture created

- Route-based React pages
- React Router DOM
- Auth context
- ProtectedRoute component
- page-title hook
- page lifecycle/resource hook
- centralized Axios service with bearer token injection
- public/customer, admin and partner page folders
- reusable component/layout folders
- Vite environment configuration

## MongoDB collections

No collection redesign was necessary because the supplied backend already used MongoDB. Core collections remain:

- User
- PartnerProfile
- Vehicle
- Booking

Enhanced build adds:

- VehicleReservation — one unique vehicle/date lock per active reservation date
- ContactMessage — public support/contact requests

An optional Mongo-to-Mongo migration script is included for moving existing data to a new cluster/database while preserving `_id` references.

## API groups retained

- `/api/auth/*`
- `/api/users/*`
- `/api/vehicles/*`
- `/api/bookings/*`
- `/api/partners/*`
- `/api/admin/*`
- `/api/contact/*`

Added:

- `GET /api/health`
- `GET /api/auth/me`

## Technical issues found and addressed

1. Static frontend was tightly coupled to Express and `.html` navigation paths.
2. React/Vite development needs CORS/proxy separation.
3. Browser integration credentials were hard-coded in HTML.
4. Backend `.env` was inside the supplied ZIP.
5. Admin bootstrap script contained an insecure hard-coded password.
6. Password-reset flow generated only a development link instead of optionally sending email.
7. Existing route guards were mostly browser-side; React route protection has now been added in addition to backend enforcement.
8. The old empty Admin partner-request page is now routed to the actual partner management interface.
9. The backend already used MongoDB, so an unnecessary relational-to-Mongo rewrite was avoided.


## Enhanced build additions

- Vehicle date reservations prevent two customers from booking the same vehicle for the same calendar date, including race-condition protection through a unique MongoDB index.
- Round-trip bookings reserve every date from departure through return.
- Partner vehicle operational states now include Available, Maintenance and Unavailable; Booked is derived automatically from real active bookings.
- Public vehicle search can filter out cars already reserved for the requested date range.
- The booking page performs a live availability pre-check and the backend repeats the validation before creating the booking.
- New `/contact` page includes direct phone, email and WhatsApp support plus a MongoDB-backed contact form.
- Public, partner and admin surfaces were polished toward the TRIPZOVA white/cyan visual system without replacing the established layouts.
