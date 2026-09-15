/* =========================================
   GOOGLE ACCOUNT TYPE
========================================= */

const travellerBtn = document.getElementById("travellerBtn");
const partnerBtn = document.getElementById("partnerBtn");
const accountOptions = document.getElementById("accountOptions");
const phoneStep = document.getElementById("phoneStep");
const backToChoiceBtn = document.getElementById("backToChoiceBtn");

const googlePhoneInput = document.getElementById("googlePhone");
const googleSendOtpBtn = document.getElementById("googleSendOtpBtn");
const googleOtpGroup = document.getElementById("googleOtpGroup");
const googleOtpInput = document.getElementById("googleOtp");
const googleVerifyOtpBtn = document.getElementById("googleVerifyOtpBtn");
const confirmTravellerBtn = document.getElementById("confirmTravellerBtn");

const message = document.getElementById("message");
const userInfo = document.getElementById("userInfo");

let googleUser = null;
let msg91AccessToken = "";
let phoneVerified = false;


/* =========================================
   GET GOOGLE DATA
========================================= */

const params = new URLSearchParams(window.location.search);
const encodedData = params.get("data");

if (!encodedData) {

    showError("Google signup information is missing. Please try again.");

} else {

    try {

        googleUser = JSON.parse(decodeURIComponent(encodedData));

        if (googleUser.email) {
            userInfo.textContent = `Signing up with ${googleUser.email}`;
        }

        travellerBtn.addEventListener("click", () => {
            accountOptions.style.display = "none";
            phoneStep.style.display = "block";
        });

        partnerBtn.addEventListener("click", () => {
            window.location.href =
                `google-partner-/register?data=${encodeURIComponent(
                    JSON.stringify(googleUser)
                )}`;
        });

    } catch (error) {

        console.error("Google account data error:", error);
        showError("Unable to read Google account information.");
    }
}


if (backToChoiceBtn) {
    backToChoiceBtn.addEventListener("click", () => {
        phoneStep.style.display = "none";
        accountOptions.style.display = "flex";
        clearMessage();
    });
}


/* =========================================
   PHONE HELPERS
========================================= */

function normalizePhone(phone) {

    let value = String(phone || "")
        .trim()
        .replace(/\s+/g, "")
        .replace(/-/g, "")
        .replace(/\(/g, "")
        .replace(/\)/g, "");

    if (value.startsWith("+91")) {
        value = value.substring(1);
    }

    if (value.startsWith("91") && value.length === 12) {
        return value;
    }

    if (/^\d{10}$/.test(value)) {
        return "91" + value;
    }

    return value;
}

function isValidIndianPhone(phone) {
    return /^91[6-9]\d{9}$/.test(phone);
}

function displayPhone(phone) {
    const normalized = normalizePhone(phone);

    if (normalized.startsWith("91") && normalized.length === 12) {
        return "+" + normalized;
    }

    return phone;
}


/* =========================================
   SEND OTP
========================================= */

if (googleSendOtpBtn) {

    googleSendOtpBtn.addEventListener("click", () => {

        clearMessage();

        const rawPhone = googlePhoneInput.value.trim();
        const phone = normalizePhone(rawPhone);

        if (!isValidIndianPhone(phone)) {
            showError("Please enter a valid 10-digit mobile number.");
            return;
        }

        if (typeof window.sendOtp !== "function") {
            showError("Phone verification service is not ready. Please refresh the page.");
            return;
        }

        googleSendOtpBtn.disabled = true;
        googleSendOtpBtn.textContent = "Sending...";

        try {

            window.sendOtp(
                phone,

                function () {

                    googleSendOtpBtn.disabled = false;
                    googleSendOtpBtn.textContent = "Resend OTP";

                    googleOtpGroup.style.display = "block";
                    googleOtpInput.value = "";
                    googleOtpInput.focus();

                    showSuccess(`OTP sent successfully to ${displayPhone(phone)}`);
                },

                function (error) {

                    console.error("MSG91 Send OTP error:", error);

                    googleSendOtpBtn.disabled = false;
                    googleSendOtpBtn.textContent = "Send OTP";

                    showError("Unable to send OTP. Please try again.");
                }
            );

        } catch (error) {

            console.error("MSG91 sendOtp exception:", error);

            googleSendOtpBtn.disabled = false;
            googleSendOtpBtn.textContent = "Send OTP";

            showError("Unable to send OTP. Please try again.");
        }
    });
}


/* =========================================
   VERIFY OTP
========================================= */

if (googleVerifyOtpBtn) {

    googleVerifyOtpBtn.addEventListener("click", () => {

        clearMessage();

        const otp = googleOtpInput.value.trim();

        if (!otp) {
            showError("Please enter the OTP.");
            return;
        }

        if (!/^\d{4,9}$/.test(otp)) {
            showError("Please enter a valid OTP.");
            return;
        }

        if (typeof window.verifyOtp !== "function") {
            showError("Phone verification service is not ready. Please refresh the page.");
            return;
        }

        googleVerifyOtpBtn.disabled = true;
        googleVerifyOtpBtn.textContent = "Verifying...";

        try {

            window.verifyOtp(
                otp,

                function (data) {

                    const token = extractAccessToken(data);

                    googleVerifyOtpBtn.disabled = false;
                    googleVerifyOtpBtn.textContent = "Verify OTP";

                    if (!token) {
                        showError("Verification failed. Please try again.");
                        return;
                    }

                    msg91AccessToken = token;
                    phoneVerified = true;

                    showSuccess("Phone number verified.");

                    confirmTravellerBtn.style.display = "block";
                    confirmTravellerBtn.disabled = false;
                },

                function (error) {

                    console.error("MSG91 Verify OTP error:", error);

                    googleVerifyOtpBtn.disabled = false;
                    googleVerifyOtpBtn.textContent = "Verify OTP";

                    showError("Incorrect OTP. Please try again.");
                }
            );

        } catch (error) {

            console.error("MSG91 verifyOtp exception:", error);

            googleVerifyOtpBtn.disabled = false;
            googleVerifyOtpBtn.textContent = "Verify OTP";

            showError("Unable to verify OTP. Please try again.");
        }
    });
}


/* =========================================
   EXTRACT ACCESS TOKEN (from MSG91 response)
========================================= */

function extractAccessToken(data) {

    if (!data) return "";

    if (typeof data === "string") {
        const value = data.trim();
        return value.split(".").length === 3 ? value : "";
    }

    if (data.accessToken) return data.accessToken;
    if (data.access_token) return data.access_token;
    if (data.token) return data.token;

    if (data.message && typeof data.message === "string") {
        const value = data.message.trim();
        if (value.split(".").length === 3) return value;
    }

    if (data.data) {

        if (typeof data.data === "string") {
            const value = data.data.trim();
            if (value.split(".").length === 3) return value;
        }

        if (data.data.accessToken) return data.data.accessToken;
        if (data.data.access_token) return data.data.access_token;
    }

    return "";
}


/* =========================================
   CREATE GOOGLE TRAVELLER ACCOUNT
========================================= */

if (confirmTravellerBtn) {

    confirmTravellerBtn.addEventListener("click", async () => {

        if (!phoneVerified || !msg91AccessToken) {
            showError("Please verify your phone number first.");
            return;
        }

        const phone = normalizePhone(googlePhoneInput.value.trim());

        confirmTravellerBtn.disabled = true;
        confirmTravellerBtn.textContent = "Creating account...";

        try {

            const response = await fetch("/api/auth/google/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    googleId: googleUser.googleId,
                    email: googleUser.email,
                    firstName: googleUser.firstName,
                    lastName: googleUser.lastName,
                    phone,
                    role: "traveller",
                    msg91AccessToken
                })
            });

            const data = await response.json();

            if (!response.ok) {
                showError(data.message || "Unable to create account.");
                confirmTravellerBtn.disabled = false;
                confirmTravellerBtn.textContent = "Continue as Traveller";
                return;
            }

            localStorage.setItem("tripzovaToken", data.token);
            localStorage.setItem("tripzovaUser", JSON.stringify(data.user));

            window.location.href = "/";

        } catch (error) {

            console.error("Google account creation error:", error);

            showError("Unable to connect to TRIPZOVA. Please try again.");

            confirmTravellerBtn.disabled = false;
            confirmTravellerBtn.textContent = "Continue as Traveller";
        }
    });
}


/* =========================================
   MESSAGES
========================================= */

function showError(text) {
    message.innerHTML = `<div class="message-error">${text}</div>`;
}

function showSuccess(text) {
    message.innerHTML = `<div class="message-success">${text}</div>`;
}

function clearMessage() {
    message.innerHTML = "";
}
