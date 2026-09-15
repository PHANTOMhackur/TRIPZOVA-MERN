# TRIPZOVA Enhanced Build — Upgrade Notes

This build is intended to replace the previous `TRIPZOVA-MERN` source while keeping your existing MongoDB data and environment credentials.

## What changed

1. **Vehicle double-booking protection**
   - New `VehicleReservation` model with a unique vehicle/date index.
   - One-way rides block the travel date.
   - Round trips block every date through the return date.
   - Pending/confirmed bookings block availability.
   - Reject/cancel/complete releases the calendar dates.
   - Concurrent requests are protected at the MongoDB index level.
   - Server startup automatically rebuilds missing active locks and removes stale locks from finished bookings.

2. **Partner fleet availability**
   - Partner can set Available, Maintenance or Unavailable.
   - Booked Today is automatic from real booking data.
   - Vehicle cards show next booking and live status.
   - Vehicles with active bookings cannot be deleted accidentally.

3. **Customer availability UX**
   - Search can exclude vehicles already booked for the requested dates.
   - Booking page checks live availability before submit.
   - Backend repeats the check and is the final source of truth.

4. **New Contact page**
   - `/contact`
   - Phone: +91 98790 65786
   - Email: tripzovasupport@gmail.com
   - WhatsApp shortcut
   - Contact form stored in MongoDB; optional SMTP forwarding.

5. **TRIPZOVA theme polish**
   - White + cyan/teal theme across public, partner and admin areas.
   - More attractive public home page.
   - Improved cards, status badges, hover/focus states, responsive sections and reduced-motion support.

6. **Existing fixes retained**
   - Partner Reject Booking modal fix is included.
   - Root `npm run create-admin` shortcut is included.
   - MongoDB DNS handling from the working build is retained.

## Safe upgrade steps

1. Back up your current `server/.env` and `client/.env`.
2. Extract this ZIP to a new folder.
3. Copy your two working `.env` files into the new `server/` and `client/` folders.
4. Run `npm run install:all` from the project root.
5. Run `npm run dev:server` and wait for MongoDB to connect.
6. In another terminal run `npm run dev:client`.
7. Test partner vehicle availability, booking conflicts and `/contact` before deleting the old project folder.

## Important behavior

`Booked` is intentionally not a manual partner status. It is calculated automatically from real bookings so a partner cannot accidentally mark a genuinely reserved car as free. Partners control `Available`, `Maintenance` and `Unavailable`.
