// =====================================================
// TRIPZOVA - SHARED PRICING LOGIC
//
// A vehicle can have:
//   1) Fixed route prices (e.g. Surat -> Mumbai = 7000)
//   2) A fallback price-per-km (used when no fixed route matches)
//
// This file is the single source of truth for turning
// {vehicle, pickup, drop, tripType, distanceKm} into a
// final amount, so the booking controller and any future
// pricing preview endpoints always agree.
// =====================================================

// Normalize a free-text location into something comparable,
// e.g. "Surat, Gujarat" -> "surat gujarat"
function normalizeCity(value) {
    return String(value || "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

// Loose match: exact match, or either string contains the other.
// This lets a partner store "Surat" while a customer's pickup
// is a full address like "Surat Railway Station, Gujarat".
function cityMatches(locationText, cityName) {
    const location = normalizeCity(locationText);
    const city = normalizeCity(cityName);

    if (!location || !city) {
        return false;
    }

    return (
        location === city ||
        location.includes(city) ||
        city.includes(location)
    );
}

// Find a fixed route price matching the pickup/drop pair.
// Matches in either direction (Surat->Mumbai fixed price also
// covers a Mumbai->Surat booking) since return fares are usually
// the same for these point-to-point outstation trips.
function findFixedRoute(fixedRoutes, pickup, drop) {
    if (!Array.isArray(fixedRoutes) || !fixedRoutes.length) {
        return null;
    }

    for (const route of fixedRoutes) {
        if (!route) {
            continue;
        }

        const forward =
            cityMatches(pickup, route.fromCity) &&
            cityMatches(drop, route.toCity);

        const reverse =
            cityMatches(pickup, route.toCity) &&
            cityMatches(drop, route.fromCity);

        if (forward || reverse) {
            return route;
        }
    }

    return null;
}

// Calculate the final booking amount for a vehicle + trip.
// Returns a breakdown object so the caller can store it on
// the booking document for full transparency later.
function calculateBookingAmount(vehicle, tripDetails) {
    const {
        pickup = "",
        drop = "",
        tripType = "one_way",
        distanceKm = 0
    } = tripDetails || {};

    const multiplier = tripType === "round_trip" ? 2 : 1;

    const driverAllowance =
        vehicle && vehicle.driverIncluded === false
            ? Number(vehicle.driverAllowance || 0)
            : 0;

    const extraCharges = Number((vehicle && vehicle.extraCharges) || 0);

    const fixedRoutes = (vehicle && vehicle.fixedRoutes) || [];

    const matchedRoute = findFixedRoute(fixedRoutes, pickup, drop);

    if (matchedRoute) {
        const routePrice = Number(matchedRoute.price || 0);

        const amount =
            routePrice * multiplier +
            driverAllowance +
            extraCharges;

        return {
            pricingType: "fixed_route",
            matchedRoute: {
                fromCity: matchedRoute.fromCity,
                toCity: matchedRoute.toCity,
                price: routePrice
            },
            pricePerKm: 0,
            minimumKm: 0,
            billableKm: Number(distanceKm || 0),
            driverAllowance,
            extraCharges,
            amount: Math.round(amount)
        };
    }

    const pricePerKm = Number((vehicle && vehicle.pricePerKm) || 0);
    const minimumKm = Number((vehicle && vehicle.minimumKm) || 0);

    const billableKm = Math.max(Number(distanceKm || 0), minimumKm);

    const amount =
        billableKm * multiplier * pricePerKm +
        driverAllowance +
        extraCharges;

    return {
        pricingType: "per_km",
        matchedRoute: null,
        pricePerKm,
        minimumKm,
        billableKm,
        driverAllowance,
        extraCharges,
        amount: Math.round(amount)
    };
}

module.exports = {
    normalizeCity,
    cityMatches,
    findFixedRoute,
    calculateBookingAmount
};
