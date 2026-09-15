import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function RegisterPage() {
  usePageTitle("Create Account | TRIPZOVA");
  useLegacyPage({ styles: ["/legacy/register.css"], scripts: ["https://verify.msg91.com/otp-provider.js", "/legacy/register.js"], beforeLoad: () => { window.__tripzovaAutoInitMsg91 = true; window.configuration = { widgetId: import.meta.env.VITE_MSG91_WIDGET_ID || '', tokenAuth: import.meta.env.VITE_MSG91_TOKEN_AUTH || '', identifier: '', exposeMethods: true, captchaRenderId: 'msg91-captcha', success: (data) => console.log('MSG91 success:', data), failure: (error) => console.error('MSG91 failure:', error) }; } });

  return (
    <>
    <main className={"register-page"}>
      <section className={"register-card"}>
        <div className={"register-visual"}>
          <div className={"visual-overlay"}></div>
        </div>
        <div className={"register-form-section"}>
          <a href={"/"} className={"back-button"} aria-label={"Go back"}>
            ←
          </a>
          <div className={"form-content"}>
            <h1>
              Create an Account
            </h1>
            <p className={"login-text"}>
              Already have an account?
              <a href={"/login"}>
                Log in
              </a>
            </p>
            <form id={"registerForm"} noValidate>
              <div className={"name-row"}>
                <div className={"input-group"}>
                  <label htmlFor={"firstName"}>
                    First Name
                  </label>
                  <input type={"text"} id={"firstName"} name={"firstName"} autoComplete={"given-name"} required />
                </div>
                <div className={"input-group"}>
                  <label htmlFor={"lastName"}>
                    Last Name
                  </label>
                  <input type={"text"} id={"lastName"} name={"lastName"} autoComplete={"family-name"} required />
                </div>
              </div>
              <div className={"input-group"}>
                <label htmlFor={"email"}>
                  Email
                </label>
                <input type={"email"} id={"email"} name={"email"} autoComplete={"email"} required />
              </div>
              <div className={"input-group"} id={"phoneGroup"}>
                <label htmlFor={"phone"}>
                  Phone Number
                </label>
                <div className={"phone-row"}>
                  <input type={"tel"} id={"phone"} name={"phone"} placeholder={"Enter 10-digit mobile number"} autoComplete={"tel"} maxLength={"13"} required />
                  <button type={"button"} id={"sendOtpBtn"} className={"otp-btn"}>
                    Send OTP
                  </button>
                </div>
                <small className={"field-hint"}>
                  We'll send a verification code
                            to your phone.
                </small>
              </div>
              <div id={"msg91-captcha"} className={"msg91-captcha"}></div>
              <div className={"input-group"} id={"otpGroup"} style={{display: "none"}}>
                <label htmlFor={"otp"}>
                  Verification Code
                </label>
                <div className={"phone-row"}>
                  <input type={"text"} id={"otp"} name={"otp"} placeholder={"Enter OTP"} inputmode={"numeric"} autoComplete={"one-time-code"} maxLength={"9"} />
                  <button type={"button"} id={"verifyOtpBtn"} className={"otp-btn"}>
                    Verify OTP
                  </button>
                </div>
                <div id={"otpStatus"} className={"otp-status"}></div>
              </div>
              <div className={"input-group"} id={"cityGroup"} style={{display: "none"}}>
                <label htmlFor={"city"}>
                  City
                </label>
                <input type={"text"} id={"city"} name={"city"} placeholder={"Enter your city"} autoComplete={"address-level2"} />
              </div>
              <div className={"input-group"} id={"addressGroup"} style={{display: "none"}}>
                <label htmlFor={"address"}>
                  Address
                </label>
                <input type={"text"} id={"address"} name={"address"} placeholder={"Enter your address"} autoComplete={"street-address"} />
              </div>
              <div className={"input-group"}>
                <label htmlFor={"password"}>
                  Password
                </label>
                <div className={"password-wrapper"}>
                  <input type={"password"} id={"password"} name={"password"} autoComplete={"new-password"} required />
                  <button type={"button"} id={"togglePassword"} className={"password-toggle"} aria-label={"Show password"}>
                    ◉
                  </button>
                </div>
              </div>
              <button type={"submit"} className={"create-account-btn"} id={"createAccountBtn"}>
                Create account
              </button>
              <label className={"terms"}>
                <input type={"checkbox"} id={"terms"} required />
                <span>
                  I agree to the
                  <a href={"#"}>
                    Terms & Condition
                  </a>
                </span>
              </label>
            </form>
            <div id={"message"}></div>
            <div className={"divider"}>
              <span></span>
              <p>
                OR
              </p>
              <span></span>
            </div>
            <div className={"alternative-actions"}>
              <button type={"button"} className={"outline-btn"} id={"googleSignup"}>
                <span className={"google-icon"}>
                  G
                </span>
                Continue with Google
              </button>
              <button type={"button"} className={"outline-btn"} id={"partnerSignup"}>
                <span>
                  ▣
                </span>
                Register as partner
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
