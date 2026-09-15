# TRIPZOVA — MERN Stack Migration

TRIPZOVA has been migrated from a static HTML/CSS/Vanilla-JavaScript frontend served by Express into a MERN-style two-application structure:

- **Client:** React.js + Vite + JavaScript + React Router DOM
- **Server:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT + bcrypt, Google OAuth (Passport), MSG91 phone OTP

The migration intentionally preserves the existing TRIPZOVA visual structure, class names, CSS, page hierarchy, route behavior and business workflows. The original backend was already Express + MongoDB/Mongoose, so its working models/controllers were retained and reorganized rather than replaced unnecessarily.

## Project structure

```text
TRIPZOVA-MERN-ENHANCED/
├── client/
│   ├── public/
│   │   └── legacy/              # preserved page CSS and behavior modules
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   ├── admin/
│   │   │   └── partner/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── services/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── MIGRATION_REPORT.md
└── package.json
```

## Important migration note

The original HTML page bodies are now rendered as React JSX components and routing/auth guards are handled by React. To minimize visual and behavioral regression, the existing page-specific browser behavior modules are preserved under `client/public/legacy/` and are mounted/unmounted from React page lifecycle hooks. This keeps the current booking/maps, dashboard, filtering, modal, OTP and CRUD behavior consistent while the application runs inside the React/Vite architecture.

## Prerequisites

Install:

- Node.js 20+ (Node 22 recommended)
- npm
- MongoDB Community Server **or** a MongoDB Atlas cluster

External integrations used by the existing project require their own credentials:

- Google OAuth
- Google Maps JavaScript API / Places API
- MSG91 OTP
- Optional SMTP provider for real password-reset emails

## 1. Install dependencies

From the project root:

```bash
npm run install:all
```

Or install each side separately:

```bash
cd client
npm install

cd ../server
npm install
```

## 2. Configure the server

Copy:

```text
server/.env.example -> server/.env
```

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/tripzova
JWT_SECRET=replace_with_a_long_random_secret_at_least_32_characters
CLIENT_URL=http://localhost:5173

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

MSG91_WIDGET_ID=your_msg91_widget_id
MSG91_AUTHKEY=your_msg91_server_auth_key
```

For MongoDB Atlas, use the Atlas connection string for `MONGO_URI`.

### Optional SMTP password reset

If these values are configured, forgot-password requests send a real email:

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_username
SMTP_PASS=your_password
SMTP_FROM=no-reply@tripzova.com
```

Without SMTP, development mode prints/returns a development reset URL rather than pretending an email was sent.

## 3. Configure the React client

Copy:

```text
client/.env.example -> client/.env
```

Then configure:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_browser_key
VITE_MSG91_WIDGET_ID=your_msg91_widget_id
VITE_MSG91_TOKEN_AUTH=your_msg91_public_widget_token
```

Do **not** put server secrets such as `JWT_SECRET`, `GOOGLE_CLIENT_SECRET`, `MSG91_AUTHKEY`, MongoDB credentials or SMTP passwords into the client environment.

## 4. Start MongoDB

For local MongoDB, make sure the MongoDB service is running and that the configured database is reachable.

For Atlas, whitelist your development IP and use the Atlas URI in `server/.env`.

The enhanced build creates the vehicle/date reservation index automatically on server startup and synchronizes locks from existing pending/confirmed bookings. No manual database migration is required just to enable the new availability protection.

## 5. Start the backend

```bash
cd server
npm run dev
```

Backend URL:

```text
http://localhost:5000
```

Health check:

```text
GET /api/health
```

## 6. Start the React frontend

In another terminal:

```bash
cd client
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

Vite proxies `/api/*` to the Express backend during development.

## Admin account

No insecure hard-coded default password is bundled.

Set these in `server/.env`:

```env
ADMIN_EMAIL=admin@tripzova.com
ADMIN_PASSWORD=use_a_strong_password_12_chars_or_more
ADMIN_FIRST_NAME=TRIPZOVA
ADMIN_LAST_NAME=Admin
```

Then run:

```bash
cd server
npm run create-admin
```

## Main React routes

### Public / customer

- `/` — main TRIPZOVA website
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password`
- `/google-account-type`
- `/google-success`
- `/vehicles`
- `/contact`
- `/booking`
- `/booking-status`
- `/dashboard`

Protected customer pages require a JWT and customer/traveller role.

### Partner

- `/partner/`
- `/partner/bookings`
- `/partner/vehicles`
- `/partner/add-vehicle`
- `/partner/customers`
- `/partner/earnings`
- `/partner/profile`
- `/partner/notifications`
- `/partner/reviews`
- `/partner/settings`

All partner routes are frontend-protected and all partner API routes are also backend-protected.

### Admin

- `/admin/`
- `/admin/users`
- `/admin/partners`
- `/admin/vehicles`
- `/admin/bookings`
- `/admin/tours`
- `/admin/rides`
- `/admin/payments`
- `/admin/partner-earnings`
- `/admin/reports`
- `/admin/reviews`
- `/admin/notifications`
- `/admin/settings`

All admin routes require an admin account. Backend `/api/admin/*` routes remain protected by admin middleware.

## Important API routes

### Authentication

```text
POST /api/auth/login
POST /api/auth/phone-login
POST /api/auth/otp/verify
GET  /api/auth/google
GET  /api/auth/google/callback
POST /api/auth/google/create
GET  /api/auth/me
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/users/register
```

### Vehicles

```text
GET /api/vehicles/search
GET /api/vehicles/:id
GET /api/vehicles/:id/availability
```

### Customer / partner bookings

```text
POST /api/bookings
GET  /api/bookings/my
GET  /api/bookings/partner
GET  /api/bookings/:id
PUT  /api/bookings/:id
PUT  /api/bookings/:id/accept
PUT  /api/bookings/:id/reject
PUT  /api/bookings/:id/cancel
PUT  /api/bookings/:id/complete
```

### Partner

```text
GET    /api/partners/dashboard
GET    /api/partners/profile
PUT    /api/partners/profile
GET    /api/partners/vehicles
GET    /api/partners/vehicles/:id
POST   /api/partners/vehicles
PUT    /api/partners/vehicles/:id
DELETE /api/partners/vehicles/:id
PATCH  /api/partners/vehicles/:id/availability
```

### Contact support API

```text
POST /api/contact
GET  /api/contact    # admin only
```

### Admin

```text
GET /api/admin/dashboard
GET /api/admin/dashboard/recent-partners
GET /api/admin/users
GET /api/admin/users/:id
PUT /api/admin/users/:id/status
GET /api/admin/partners
GET /api/admin/partners/:id
PUT /api/admin/partners/:id/approve
PUT /api/admin/partners/:id/reject
GET /api/admin/bookings
GET /api/admin/bookings/:id
PUT /api/admin/bookings/:id/status
GET /api/admin/vehicles
GET /api/admin/vehicles/:id
PUT /api/admin/vehicles/:id/approve
PUT /api/admin/vehicles/:id/reject
PUT /api/admin/vehicles/:id/status
```

## MongoDB collections

The existing project was already MongoDB-based, so the schema relationships remain intact:

- `users`
- `partnerprofiles`
- `vehicles`
- `bookings`
- `vehiclereservations` — generated date-level vehicle locks used to prevent double booking
- `contactmessages` — messages submitted from the public Contact page

Important references:

- `PartnerProfile.user -> User`
- `Vehicle.partner -> User`
- `Booking.customer -> User`
- `Booking.partner -> User`
- `Booking.vehicle -> Vehicle`

## Existing database migration

If you are keeping the same `MONGO_URI`, no data migration is necessary.

If you want to copy the existing MongoDB database to a new database/cluster, set:

```env
LEGACY_MONGO_URI=mongodb://.../old_tripzova
MONGO_URI=mongodb://.../new_tripzova
```

Then run:

```bash
cd server
npm run migrate
```

The migration copies the four active TRIPZOVA collections while retaining MongoDB `_id` values so references remain valid.

## Production build

Build the client:

```bash
cd client
npm run build
```

Then start Express in production mode. `server/server.js` is configured to serve `client/dist` when `NODE_ENV=production`.

Example:

```bash
cd server
NODE_ENV=production npm start
```

On Windows PowerShell:

```powershell
$env:NODE_ENV="production"
npm start
```

## Security changes included

- JWT remains backend-verified on protected APIs
- bcrypt password hashing retained
- role checks retained for admin and partner APIs
- React protected routes added
- CORS configured through `CLIENT_URL`
- Helmet retained
- API/auth rate limiting retained and narrowed to sensitive auth endpoints
- input sanitization retained
- hard-coded admin password removed
- browser-facing integration values moved to Vite env variables
- backend `.env` and secrets are not included in this migrated package
- optional SMTP password-reset delivery added
- centralized Express error fallback added

## Notes

1. The old project already used MongoDB/Mongoose, so there was no SQL-to-Mongo schema conversion to perform.
2. Google Maps and MSG91 require valid credentials before those integrations can work locally.
3. Reviews did not have a dedicated database model/API in the supplied project; the existing review screens are therefore preserved as they were rather than inventing fake review data.
4. Payments, earnings, reports and several notification views are derived from booking data in the supplied implementation and continue to use that same business logic.

## Enhanced availability, booking safety and UI update

This build adds a database-backed availability layer without changing the core TRIPZOVA workflow.

### No double booking

Ride bookings now reserve the selected vehicle's calendar date(s) in the `VehicleReservation` collection.

- A one-way booking reserves the full travel date.
- A round trip reserves every calendar date from the travel date through the return date, inclusive.
- `pending` and `confirmed` bookings block those dates.
- Rejected and cancelled bookings release their reservations.
- A database-level unique index on `(vehicle, dateKey)` prevents two near-simultaneous requests from reserving the same vehicle/date.
- Existing active bookings are automatically synced into the reservation calendar when the API starts.
- Public vehicle search can exclude vehicles already reserved for the selected travel date(s).
- The booking page performs a live availability check, while the backend remains the final authority.

The current booking model does not contain trip duration/end-time data, so availability is deliberately **date-level rather than hourly**. This is safer than allowing two rides on the same day without reliable duration information.

### Partner vehicle availability

Approved partner vehicles now have an operational availability setting:

- `Available` — visible/bookable when the selected dates are free.
- `Maintenance` — hidden from customer search and blocked from new bookings.
- `Unavailable` — temporarily hidden/blocked by the partner.
- `Booked today` — calculated automatically from active bookings and cannot be manually faked.

Partners can change this directly from **Partner → My Vehicles**. The page also shows live availability stats and the next booking for each vehicle.

### Contact and support

A new public route is available:

```text
/contact
```

It includes direct support actions for:

- Phone: `+91 98790 65786`
- Email: `tripzovasupport@gmail.com`
- WhatsApp support

The contact form stores inquiries in MongoDB through `POST /api/contact`. If SMTP is configured, the message is also forwarded to `SUPPORT_EMAIL`.

### UI/theme improvements

The public home page, vehicle discovery screens, partner panel and admin panel use a more consistent TRIPZOVA white + cyan/teal visual system. Existing layouts and workflows are retained, with improved hover/focus states, spacing, responsive behavior, search presentation, status badges and reduced-motion accessibility support.

## Upgrading from the previous TRIPZOVA-MERN build

Before replacing your existing project, keep copies of your working:

```text
server/.env
client/.env
```

The enhanced ZIP intentionally does **not** contain your real secret `.env` files.

After extracting the enhanced project, restore those two `.env` files and run:

```bash
npm run install:all
npm run dev:server
```

The backend automatically creates/synchronizes the new vehicle reservation calendar. No manual MongoDB migration is required for this feature.

In a second terminal run:

```bash
npm run dev:client
```

Root-level admin creation is now also available:

```bash
npm run create-admin
```

## New/updated API endpoints

```text
GET   /api/vehicles/search
GET   /api/vehicles/:id/availability
PATCH /api/partners/vehicles/:id/availability
POST  /api/contact
GET   /api/contact                         # admin only
```


## Enhanced availability and support APIs

- `GET /api/vehicles/search?travelDate=YYYY-MM-DD&tripType=one_way` — returns only operational vehicles that are free for the selected date(s).
- `GET /api/vehicles/:id/availability` — live availability check for booking screens.
- `PATCH /api/partners/vehicles/:id/availability` — partner-controlled Available / Maintenance / Unavailable state.
- `POST /api/contact` — public contact form; persists the enquiry in MongoDB and optionally forwards it by SMTP.
- `GET /api/contact` — admin-only support-message feed.

`Booked` is intentionally computed from active reservations rather than being a partner-controlled value. This prevents a partner from accidentally overriding a real reservation.
