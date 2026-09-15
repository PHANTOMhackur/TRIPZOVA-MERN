/* =========================================
   TRIPZOVA USER WEBSITE
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   ACCORDION
========================================= */

const accordionButtons =
    document.querySelectorAll(".accordion-button");


accordionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const currentItem =
            button.closest(".accordion-item");


        const isAlreadyOpen =
            currentItem.classList.contains("active");


        // Close every accordion item
        document
            .querySelectorAll(".accordion-item")
            .forEach((item) => {

                item.classList.remove("active");

                const itemButton =
                    item.querySelector(".accordion-button");

                if (itemButton) {
                    itemButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            });


        // Open clicked item
        if (!isAlreadyOpen) {

            currentItem.classList.add("active");

            button.setAttribute(
                "aria-expanded",
                "true"
            );

        }

    });

});


/* =========================================
   MOBILE NAVIGATION
========================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const navLinks =
    document.querySelector(".nav-links");

const authButtons =
    document.querySelector(".auth-buttons");


if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle(
                "mobile-active"
            );

            authButtons.classList.toggle(
                "mobile-active"
            );

        }
    );

}


/* =========================================
   CLOSE MOBILE MENU AFTER CLICK
========================================= */

document
    .querySelectorAll(".nav-links a")
    .forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove(
                "mobile-active"
            );

            authButtons.classList.remove(
                "mobile-active"
            );

        });

    });

    /* =========================================
   AUTHENTICATION STATE
========================================= */

const guestButtons =
    document.getElementById("guestButtons");

const userButtons =
    document.getElementById("userButtons");

const userGreeting =
    document.getElementById("userGreeting");

const logoutButton =
    document.getElementById("logoutButton");


function updateAuthenticationState() {

    const token =
        localStorage.getItem("tripzovaToken");

    const storedUser =
        localStorage.getItem("tripzovaUser");


    // User is logged in
    if (token && storedUser) {

        try {

            const user =
                JSON.parse(storedUser);

            guestButtons.style.display = "none";

            userButtons.style.display = "flex";


            const name =
                user.name ||
                user.firstName ||
                user.email ||
                "User";


            userGreeting.textContent =
                `Hi, ${name}`;


            // Route the nav link to the right dashboard
            // for this account's role (customer/partner/admin).
            const dashboardLink =
                document.getElementById("dashboardLink");

            if (dashboardLink) {

                if (user.role === "admin") {

                    dashboardLink.href = "/admin/";
                    dashboardLink.textContent = "Admin Panel";

                } else if (user.role === "partner") {

                    dashboardLink.href = "/partner/";
                    dashboardLink.textContent = "Partner Panel";

                } else {

                    dashboardLink.href = "/dashboard";
                    dashboardLink.textContent = "My Bookings";
                }
            }


        } catch (error) {

            console.error(
                "Unable to read user data:",
                error
            );

            showGuestButtons();
        }

    } else {

        showGuestButtons();
    }
}


function showGuestButtons() {

    guestButtons.style.display = "flex";

    userButtons.style.display = "none";
}


/* =========================================
   LOGOUT
========================================= */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "tripzovaToken"
            );

            localStorage.removeItem(
                "tripzovaUser"
            );

            window.location.href =
                "/";
        }
    );

}


/* =========================================
   INITIALIZE AUTH STATE
========================================= */

updateAuthenticationState();

/* =========================================
   QUICK SEARCH + AVAILABILITY-FIRST FLOW
========================================= */

const destinationChips =
    document.querySelectorAll(".destination-chip");

const browseAllVehiclesBtn =
    document.getElementById("browseAllVehiclesBtn");

const searchFormMessage =
    document.getElementById("searchFormMessage");

const tripQuickSearchForm =
    document.getElementById("tripQuickSearchForm");

const quickPickup =
    document.getElementById("quickPickup");

const quickDrop =
    document.getElementById("quickDrop");

const quickTravelDate =
    document.getElementById("quickTravelDate");

const quickMembers =
    document.getElementById("quickMembers");

function localDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

if (quickTravelDate) {
    quickTravelDate.min = localDateString(new Date());
}

function showSearchMessage(message, isError = false) {
    if (!searchFormMessage) return;
    searchFormMessage.textContent = message || "";
    searchFormMessage.classList.toggle("is-error", Boolean(isError));
}

function goToVehicleList(options = {}) {
    const params = new URLSearchParams();

    if (options.destination) {
        params.set("destination", options.destination);
    }

    if (options.pickup) {
        params.set("pickup", options.pickup);
    }

    if (options.drop) {
        params.set("drop", options.drop);
    }

    if (options.travelDate) {
        params.set("travelDate", options.travelDate);
    }

    if (options.members) {
        params.set("members", String(options.members));
    }

    const query = params.toString();
    window.location.href = `/vehicles${query ? `?${query}` : ""}`;
}

if (tripQuickSearchForm) {
    tripQuickSearchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const pickup = quickPickup?.value.trim() || "";
        const drop = quickDrop?.value.trim() || "";
        const travelDate = quickTravelDate?.value || "";
        const members = Number(quickMembers?.value || 1);

        if (!pickup) {
            showSearchMessage("Please enter your pickup city or location.", true);
            quickPickup?.focus();
            return;
        }

        if (!drop) {
            showSearchMessage("Please enter your destination.", true);
            quickDrop?.focus();
            return;
        }

        if (!travelDate) {
            showSearchMessage("Please choose your travel date.", true);
            quickTravelDate?.focus();
            return;
        }

        if (!Number.isInteger(members) || members < 1) {
            showSearchMessage("Travellers must be at least 1.", true);
            quickMembers?.focus();
            return;
        }

        showSearchMessage("Checking live vehicle availability...");
        goToVehicleList({ pickup, drop, travelDate, members });
    });
}

destinationChips.forEach((chip) => {
    chip.addEventListener("click", () => {
        destinationChips.forEach((item) => item.classList.remove("chip-active"));
        chip.classList.add("chip-active");

        const destination = chip.getAttribute("data-destination") || "";

        if (quickDrop) {
            quickDrop.value = destination;
            quickDrop.focus();
        }

        showSearchMessage(
            destination
                ? `${destination} selected. Add pickup and date to check availability.`
                : ""
        );
    });
});

if (browseAllVehiclesBtn) {
    browseAllVehiclesBtn.addEventListener("click", () => {
        browseAllVehiclesBtn.classList.add("cta-active");
        setTimeout(() => goToVehicleList({}), 120);
    });
}

/* =========================================
   ENHANCED RIDE SEARCH
========================================= */

const rideSearchForm = document.getElementById("rideSearchForm");
const homeTravelDate = document.getElementById("homeTravelDate");

function getLocalDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

if (homeTravelDate) {
    homeTravelDate.min = getLocalDateKey(new Date());
}

if (rideSearchForm) {
    rideSearchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const pickup = String(document.getElementById("homePickup")?.value || "").trim();
        const drop = String(document.getElementById("homeDrop")?.value || "").trim();
        const travelDate = String(document.getElementById("homeTravelDate")?.value || "").trim();
        const members = Math.max(1, Number(document.getElementById("homeMembers")?.value || 1));

        if (!pickup || !drop || !travelDate) {
            if (searchFormMessage) {
                searchFormMessage.textContent = "Please enter pickup, drop and travel date.";
            }
            return;
        }

        if (travelDate < getLocalDateKey(new Date())) {
            if (searchFormMessage) {
                searchFormMessage.textContent = "Please choose today or a future travel date.";
            }
            return;
        }

        if (searchFormMessage) {
            searchFormMessage.textContent = "";
        }

        const params = new URLSearchParams({
            pickup,
            drop,
            destination: drop,
            travelDate,
            members: String(members),
            tripType: "one_way"
        });

        window.location.href = `/vehicles?${params.toString()}`;
    });
}
