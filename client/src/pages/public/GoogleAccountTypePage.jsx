import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function GoogleAccountTypePage() {
  usePageTitle("Choose Account Type | TRIPZOVA");
  useLegacyPage({ styles: ["/legacy/google-account-type.css"], scripts: ["https://verify.msg91.com/otp-provider.js", "/legacy/google-account-type.js"], beforeLoad: () => { window.__tripzovaAutoInitMsg91 = true; window.configuration = { widgetId: import.meta.env.VITE_MSG91_WIDGET_ID || '', tokenAuth: import.meta.env.VITE_MSG91_TOKEN_AUTH || '', identifier: '', exposeMethods: true, captchaRenderId: 'msg91-captcha', success: (data) => console.log('MSG91 success:', data), failure: (error) => console.error('MSG91 failure:', error) }; } });

  return (
    <>
    <main className={"account-type-page"}>
      <section className={"account-type-card"}>
        <div className={"account-type-content"}>
          <div className={"logo"}>
            TRIPZOVA
          </div>
          <h1>
            Welcome to TRIPZOVA
          </h1>
          <p className={"subtitle"}>
            Choose how you want to use TRIPZOVA
          </p>
          <div id={"userInfo"} className={"user-info"}></div>
          <div className={"account-options"} id={"accountOptions"}>
            <button type={"button"} className={"account-option"} id={"travellerBtn"}>
              <div className={"option-icon"}>
                👤
              </div>
              <div className={"option-text"}>
                <h2>
                  Continue as Traveller
                </h2>
                <p>
                  Book cars and enjoy your journey
                </p>
              </div>
              <span className={"arrow"}>
                →
              </span>
            </button>
            <button type={"button"} className={"account-option"} id={"partnerBtn"}>
              <div className={"option-icon"}>
                🚗
              </div>
              <div className={"option-text"}>
                <h2>
                  Register as Partner
                </h2>
                <p>
                  List your vehicle and earn with TRIPZOVA
                </p>
              </div>
              <span className={"arrow"}>
                →
              </span>
            </button>
          </div>
          <div className={"account-type-phone-step"} id={"phoneStep"} style={{display: "none"}}>
            <p className={"phone-step-intro"}>
              One last step - verify your phone number
                        to finish creating your account.
            </p>
            <div className={"input-group"} id={"phoneGroup"}>
              <label htmlFor={"googlePhone"}>
                Phone Number
              </label>
              <div className={"phone-row"}>
                <input type={"tel"} id={"googlePhone"} placeholder={"Enter 10-digit mobile number"} autoComplete={"tel"} maxLength={"13"} />
                <button type={"button"} id={"googleSendOtpBtn"} className={"otp-btn"}>
                  Send OTP
                </button>
              </div>
              <small className={"field-hint"}>
                We'll send a verification code to your phone.
              </small>
            </div>
            <div id={"msg91-captcha"} className={"msg91-captcha"}></div>
            <div className={"input-group"} id={"googleOtpGroup"} style={{display: "none"}}>
              <label htmlFor={"googleOtp"}>
                Verification Code
              </label>
              <div className={"phone-row"}>
                <input type={"text"} id={"googleOtp"} placeholder={"Enter OTP"} inputmode={"numeric"} autoComplete={"one-time-code"} maxLength={"9"} />
                <button type={"button"} id={"googleVerifyOtpBtn"} className={"otp-btn"}>
                  Verify OTP
                </button>
              </div>
            </div>
            <button type={"button"} className={"account-option account-option-confirm"} id={"confirmTravellerBtn"} style={{display: "none"}} disabled>
              Continue as Traveller
            </button>
            <button type={"button"} className={"back-login"} id={"backToChoiceBtn"} style={{background: "none", border: "none", cursor: "pointer"}}>
              ← Back
            </button>
          </div>
          <div id={"message"}></div>
          <a href={"/login"} className={"back-login"}>
            ← Back to Login
          </a>
        </div>
      </section>
    </main>
    </>
  );
}
