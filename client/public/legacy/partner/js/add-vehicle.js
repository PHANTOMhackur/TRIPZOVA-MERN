// =====================================================
// TRIPZOVA PARTNER - ADD / EDIT VEHICLE
// =====================================================

(function () {
    "use strict";


    // =================================================
    // STATE
    // =================================================

    const params = new URLSearchParams(window.location.search);
    const editingVehicleId = params.get("id");

    let selectedVehiclePhotoFile = null;
    let vehiclePhotoObjectUrl = null;


    // =================================================
    // FIXED ROUTE ROWS
    // =================================================

    function routeRowTemplate(route) {
        route = route || {};

        return `
            <div class="partner-route-row" data-route-row>

                <input
                    type="text"
                    class="partner-form-control partner-route-from"
                    placeholder="From city e.g. Surat"
                    value="${escapeAttr(route.fromCity)}"
                >

                <span class="partner-route-arrow">
                    <i class="bi bi-arrow-right"></i>
                </span>

                <input
                    type="text"
                    class="partner-form-control partner-route-to"
                    placeholder="To city e.g. Mumbai"
                    value="${escapeAttr(route.toCity)}"
                >

                <input
                    type="number"
                    class="partner-form-control partner-route-price"
                    placeholder="₹ price"
                    min="0"
                    step="1"
                    value="${
                        route.price !== undefined && route.price !== null
                            ? route.price
                            : ""
                    }"
                >

                <button
                    type="button"
                    class="partner-route-remove"
                    title="Remove this route"
                    data-remove-route
                >
                    <i class="bi bi-trash"></i>
                </button>

            </div>
        `;
    }

    function escapeAttr(value) {
        return String(value ?? "").replace(/"/g, "&quot;");
    }

    function addRouteRow(route) {
        const list = document.getElementById("fixedRoutesList");
        if (!list) return;

        list.insertAdjacentHTML("beforeend", routeRowTemplate(route));
    }

    function renderRouteRows(routes) {
        const list = document.getElementById("fixedRoutesList");
        if (!list) return;

        list.innerHTML = "";

        if (Array.isArray(routes) && routes.length) {
            routes.forEach(addRouteRow);
        } else {
            // Always keep at least one empty row so the form
            // doesn't look broken/empty on first load.
            addRouteRow();
        }
    }

    function collectFixedRoutes() {
        const rows = document.querySelectorAll(
            "#fixedRoutesList [data-route-row]"
        );

        const routes = [];

        rows.forEach((row) => {
            const fromCity = row
                .querySelector(".partner-route-from")
                .value.trim();

            const toCity = row
                .querySelector(".partner-route-to")
                .value.trim();

            const priceValue = row
                .querySelector(".partner-route-price")
                .value;

            // Skip a row only if it's completely empty.
            if (!fromCity && !toCity && priceValue === "") {
                return;
            }

            routes.push({
                fromCity,
                toCity,
                price: Number(priceValue || 0)
            });
        });

        return routes;
    }

    function initRouteRowEvents() {
        const addBtn = document.getElementById("addRouteBtn");

        if (addBtn) {
            addBtn.addEventListener("click", () => addRouteRow());
        }

        const list = document.getElementById("fixedRoutesList");

        if (list) {
            list.addEventListener("click", (event) => {
                const removeBtn = event.target.closest(
                    "[data-remove-route]"
                );

                if (!removeBtn) return;

                const rows = list.querySelectorAll(
                    "[data-route-row]"
                );

                // Keep at least one row visible - just clear it
                // instead of removing the very last one.
                if (rows.length <= 1) {
                    removeBtn
                        .closest("[data-route-row]")
                        .querySelectorAll("input")
                        .forEach((input) => (input.value = ""));
                    return;
                }

                removeBtn.closest("[data-route-row]").remove();
            });
        }
    }


    // =================================================
    // VEHICLE PHOTO UPLOAD + PREVIEW
    // =================================================

    const VEHICLE_PHOTO_MAX_BYTES = 5 * 1024 * 1024;
    const VEHICLE_PHOTO_TYPES = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ];

    function setUploadStatus(message, type) {
        const status = document.getElementById("vehiclePhotoUploadStatus");
        if (!status) return;

        status.textContent = message || "";
        status.className = "tripzova-upload-status";

        if (message && type) {
            status.classList.add(`tripzova-upload-status-${type}`);
        }
    }

    function revokeVehiclePhotoObjectUrl() {
        if (vehiclePhotoObjectUrl) {
            URL.revokeObjectURL(vehiclePhotoObjectUrl);
            vehiclePhotoObjectUrl = null;
        }
    }

    function showVehiclePhotoPreview(src, options = {}) {
        const previewWrap = document.getElementById("vehiclePhotoPreviewWrap");
        const preview = document.getElementById("vehiclePhotoPreview");
        const emptyState = document.getElementById("vehiclePhotoEmptyState");

        if (!previewWrap || !preview || !emptyState) return;

        preview.src = src;
        previewWrap.style.display = "block";
        emptyState.style.display = "none";

        if (options.fileName) {
            setUploadStatus(`${options.fileName} selected. It will upload when you save.`, "ready");
        }
    }

    function clearVehiclePhoto() {
        selectedVehiclePhotoFile = null;
        revokeVehiclePhotoObjectUrl();
        setValue("vehiclePhotoUrl", "");

        const fileInput = document.getElementById("vehiclePhotoFile");
        const previewWrap = document.getElementById("vehiclePhotoPreviewWrap");
        const preview = document.getElementById("vehiclePhotoPreview");
        const emptyState = document.getElementById("vehiclePhotoEmptyState");

        if (fileInput) fileInput.value = "";
        if (preview) preview.removeAttribute("src");
        if (previewWrap) previewWrap.style.display = "none";
        if (emptyState) emptyState.style.display = "flex";

        setUploadStatus("Photo removed.", "muted");
    }

    function validateVehiclePhoto(file) {
        if (!file) {
            return "Please select an image.";
        }

        if (!VEHICLE_PHOTO_TYPES.includes(file.type)) {
            return "Please choose a JPG, PNG or WEBP image.";
        }

        if (file.size > VEHICLE_PHOTO_MAX_BYTES) {
            return "Vehicle photo must be 5 MB or smaller.";
        }

        return "";
    }

    function selectVehiclePhoto(file) {
        const error = validateVehiclePhoto(file);

        if (error) {
            setUploadStatus(error, "danger");
            return;
        }

        selectedVehiclePhotoFile = file;
        revokeVehiclePhotoObjectUrl();
        vehiclePhotoObjectUrl = URL.createObjectURL(file);
        showVehiclePhotoPreview(vehiclePhotoObjectUrl, {
            fileName: file.name
        });
    }

    function getVehicleUploadUrl() {
        const apiBaseInput = document.getElementById("tripzovaApiBase");
        const apiBase = (apiBaseInput && apiBaseInput.value) || "/api";

        return `${apiBase.replace(/\/$/, "")}/partners/uploads/vehicle-image`;
    }

    async function uploadSelectedVehiclePhoto() {
        if (!selectedVehiclePhotoFile) {
            return getValue("vehiclePhotoUrl").trim();
        }

        const token = localStorage.getItem("tripzovaToken");

        if (!token) {
            throw new Error("Authentication required.");
        }

        const formData = new FormData();
        formData.append("image", selectedVehiclePhotoFile);

        setUploadStatus("Uploading vehicle photo...", "uploading");

        const response = await fetch(getVehicleUploadUrl(), {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        });

        let data = {};

        try {
            data = await response.json();
        } catch (error) {
            data = {};
        }

        if (!response.ok) {
            throw new Error(
                data.message || "Unable to upload vehicle photo."
            );
        }

        const uploadedUrl = data.url || data.secureUrl || "";

        if (!uploadedUrl) {
            throw new Error("Image upload completed without a usable URL.");
        }

        setValue("vehiclePhotoUrl", uploadedUrl);
        selectedVehiclePhotoFile = null;
        revokeVehiclePhotoObjectUrl();
        showVehiclePhotoPreview(uploadedUrl);
        setUploadStatus("Vehicle photo uploaded successfully.", "success");

        return uploadedUrl;
    }

    function initVehiclePhotoUpload() {
        const fileInput = document.getElementById("vehiclePhotoFile");
        const chooseBtn = document.getElementById("chooseVehiclePhotoBtn");
        const changeBtn = document.getElementById("changeVehiclePhotoBtn");
        const removeBtn = document.getElementById("removeVehiclePhotoBtn");
        const dropZone = document.getElementById("vehiclePhotoDropZone");

        if (!fileInput || !dropZone) return;

        const openPicker = (event) => {
            if (event) event.stopPropagation();
            fileInput.click();
        };

        if (chooseBtn) chooseBtn.addEventListener("click", openPicker);
        if (changeBtn) changeBtn.addEventListener("click", openPicker);

        if (removeBtn) {
            removeBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                clearVehiclePhoto();
            });
        }

        fileInput.addEventListener("change", () => {
            const file = fileInput.files && fileInput.files[0];
            if (file) selectVehiclePhoto(file);
        });

        dropZone.addEventListener("click", (event) => {
            if (event.target.closest("button")) return;
            openPicker(event);
        });

        dropZone.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPicker(event);
            }
        });

        ["dragenter", "dragover"].forEach((eventName) => {
            dropZone.addEventListener(eventName, (event) => {
                event.preventDefault();
                dropZone.classList.add("is-dragging");
            });
        });

        ["dragleave", "drop"].forEach((eventName) => {
            dropZone.addEventListener(eventName, (event) => {
                event.preventDefault();
                dropZone.classList.remove("is-dragging");
            });
        });

        dropZone.addEventListener("drop", (event) => {
            const file = event.dataTransfer && event.dataTransfer.files[0];
            if (file) selectVehiclePhoto(file);
        });
    }


    // =================================================
    // LOAD EXISTING VEHICLE (edit mode)
    // =================================================

    async function loadVehicleForEdit() {

        if (!editingVehicleId) {
            return;
        }

        setText("addVehiclePageTitle", "Edit Vehicle");
        setText("addVehicleHeading", "Edit Vehicle");
        setText("saveVehicleBtnText", "Save Changes");

        try {

            const data =
                await partnerFetch(
                    `/api/partners/vehicles/${editingVehicleId}`
                );

            const vehicle = data.vehicle || data;

            fillForm(vehicle);

        } catch (error) {

            console.error("Load vehicle error:", error);

            showMessage(
                error.message || "Unable to load this vehicle.",
                "danger"
            );
        }
    }


    function fillForm(vehicle) {

        setValue("vehicleName", vehicle.vehicleName);
        setValue("vehicleNumber", vehicle.vehicleNumber);
        setValue("vehicleBrand", vehicle.brand);
        setValue("vehicleModel", vehicle.model);
        setValue("vehicleType", vehicle.vehicleType);
        setValue("seatCapacity", vehicle.seatCapacity);
        setValue("airConditioning", vehicle.airConditioning || "ac");
        setValue("fuelType", vehicle.fuelType);
        setValue("pricePerKm", vehicle.pricePerKm);
        setValue("minimumKm", vehicle.minimumKm);
        setValue(
            "driverIncluded",
            vehicle.driverIncluded === false ? "false" : "true"
        );
        setValue("driverAllowance", vehicle.driverAllowance);
        setValue("extraCharges", vehicle.extraCharges);
        setValue("vehicleDescription", vehicle.description);

        renderRouteRows(vehicle.fixedRoutes);

        if (
            Array.isArray(vehicle.vehiclePhotos) &&
            vehicle.vehiclePhotos.length
        ) {
            const existingPhoto = vehicle.vehiclePhotos[0];
            setValue("vehiclePhotoUrl", existingPhoto);
            showVehiclePhotoPreview(existingPhoto);
            setUploadStatus("Current vehicle photo.", "muted");
        }
    }


    // =================================================
    // SUBMIT
    // =================================================

    async function handleSubmit(event) {

        event.preventDefault();

        hideMessage();

        const vehicleName = getValue("vehicleName").trim();
        const vehicleNumber = getValue("vehicleNumber").trim();
        const vehicleType = getValue("vehicleType");
        const seatCapacity = getValue("seatCapacity");
        const fuelType = getValue("fuelType");
        const pricePerKmValue = getValue("pricePerKm");
        const pricePerKm = pricePerKmValue === "" ? 0 : Number(pricePerKmValue);

        if (!vehicleName || !vehicleNumber || !vehicleType || !fuelType) {
            showMessage(
                "Please fill in all required fields.",
                "danger"
            );
            return;
        }

        if (!seatCapacity || Number(seatCapacity) < 1) {
            showMessage(
                "Seat capacity must be at least 1.",
                "danger"
            );
            return;
        }

        if (Number.isNaN(pricePerKm) || pricePerKm < 0) {
            showMessage(
                "Please enter a valid price per KM (or leave it blank).",
                "danger"
            );
            return;
        }

        const fixedRoutes = collectFixedRoutes();

        for (const route of fixedRoutes) {
            if (!route.fromCity || !route.toCity) {
                showMessage(
                    "Each fixed route needs both a from-city and a to-city.",
                    "danger"
                );
                return;
            }

            if (Number.isNaN(route.price) || route.price < 0) {
                showMessage(
                    `Please enter a valid price for the ${route.fromCity} to ${route.toCity} route.`,
                    "danger"
                );
                return;
            }
        }

        if (pricePerKm <= 0 && fixedRoutes.length === 0) {
            showMessage(
                "Add at least one fixed route price, or set a price per KM.",
                "danger"
            );
            return;
        }

        const payload = {
            vehicleName,
            vehicleNumber,
            brand: getValue("vehicleBrand").trim(),
            model: getValue("vehicleModel").trim(),
            vehicleType,
            seatCapacity: Number(seatCapacity),
            airConditioning: getValue("airConditioning"),
            fuelType,
            pricePerKm,
            fixedRoutes,
            minimumKm: Number(getValue("minimumKm") || 0),
            driverIncluded: getValue("driverIncluded") === "true",
            driverAllowance: Number(getValue("driverAllowance") || 0),
            extraCharges: Number(getValue("extraCharges") || 0),
            description: getValue("vehicleDescription").trim(),
            vehiclePhotos: []
        };

        const saveButton = document.getElementById("saveVehicleBtn");

        if (saveButton) {
            saveButton.disabled = true;
        }

        setText(
            "saveVehicleBtnText",
            editingVehicleId ? "Saving..." : "Adding..."
        );

        try {

            const photoUrl = await uploadSelectedVehiclePhoto();
            payload.vehiclePhotos = photoUrl ? [photoUrl] : [];

            if (editingVehicleId) {

                await partnerFetch(
                    `/api/partners/vehicles/${editingVehicleId}`,
                    {
                        method: "PUT",
                        body: JSON.stringify(payload)
                    }
                );

                showMessage(
                    "Vehicle updated and submitted for admin approval.",
                    "success"
                );

            } else {

                await partnerFetch(
                    "/api/partners/vehicles",
                    {
                        method: "POST",
                        body: JSON.stringify(payload)
                    }
                );

                showMessage(
                    "Vehicle added successfully and submitted for admin approval.",
                    "success"
                );

                document.getElementById("vehicleForm").reset();
                clearVehiclePhoto();
                setUploadStatus("");
                renderRouteRows([]);
            }

            setTimeout(() => {
                window.location.href = "/partner/vehicles";
            }, 1200);

        } catch (error) {

            console.error("Save vehicle error:", error);

            showMessage(
                error.message || "Unable to save this vehicle.",
                "danger"
            );

        } finally {

            if (saveButton) {
                saveButton.disabled = false;
            }

            setText(
                "saveVehicleBtnText",
                editingVehicleId ? "Save Changes" : "Add Vehicle"
            );
        }
    }


    // =================================================
    // HELPERS
    // =================================================

    function getValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : "";
    }

    function setValue(id, value) {
        const element = document.getElementById(id);
        if (element && value !== undefined && value !== null) {
            element.value = value;
        }
    }

    function showMessage(text, type) {
        const messageEl = document.getElementById("addVehicleMessage");
        if (!messageEl) return;

        messageEl.style.display = "block";
        messageEl.className = `partner-alert partner-alert-${type} mb-4`;
        messageEl.textContent = text;

        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function hideMessage() {
        const messageEl = document.getElementById("addVehicleMessage");
        if (messageEl) {
            messageEl.style.display = "none";
        }
    }


    // =================================================
    // START
    // =================================================

    document.addEventListener("DOMContentLoaded", () => {

        if (
            typeof requirePartnerLogin === "function" &&
            !requirePartnerLogin()
        ) {
            return;
        }

        initRouteRowEvents();
        initVehiclePhotoUpload();

        if (!editingVehicleId) {
            // Fresh "Add Vehicle" form - start with one empty route row.
            renderRouteRows([]);
        }

        loadVehicleForEdit();

        const form = document.getElementById("vehicleForm");

        if (form) {
            form.addEventListener("submit", handleSubmit);
        }
    });

})();
