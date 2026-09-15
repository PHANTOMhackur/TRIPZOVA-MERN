import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function LoginPage() {
  usePageTitle("Login | TRIPZOVA");
  useLegacyPage({ styles: ["/legacy/login.css"], scripts: ["https://verify.msg91.com/otp-provider.js", "/legacy/login.js"], beforeLoad: () => { window.configuration = { widgetId: import.meta.env.VITE_MSG91_WIDGET_ID || '', tokenAuth: import.meta.env.VITE_MSG91_TOKEN_AUTH || '', identifier: '', exposeMethods: true, captchaRenderId: 'msg91-captcha', success: (data) => console.log('MSG91 success:', data), failure: (error) => console.error('MSG91 failure:', error) }; } });

  return (
    <>
    <main className={"login-page"}>
      <section className={"login-card"}>
        <div className={"login-visual"}>
          <div className={"visual-overlay"}></div>
        </div>
        <div className={"login-form-section"}>
          <a href={"/"} className={"back-button"} aria-label={"Go back"}>
            ←
          </a>
          <div className={"form-content"}>
            <h1>
              Welcome Back
            </h1>
            <p className={"signup-text"}>
              Don't have an account?
              <a href={"/register"}>
                Create one
              </a>
            </p>
            <form id={"loginForm"}>
              <div className={"input-group"}>
                <label htmlFor={"email"}>
                  Email
                </label>
                <input type={"email"} id={"email"} name={"email"} autoComplete={"email"} required />
              </div>
              <div className={"input-group"}>
                <div className={"password-label-row"}>
                  <label htmlFor={"password"}>
                    Password
                  </label>
                  <a href={"/forgot-password"}>
                    Forgot password?
                  </a>
                </div>
                <div className={"password-wrapper"}>
                  <input type={"password"} id={"password"} name={"password"} autoComplete={"current-password"} required />
                  <button type={"button"} id={"togglePassword"} className={"password-toggle"} aria-label={"Show password"}>
                    ◉
                  </button>
                </div>
              </div>
              <button type={"submit"} className={"login-btn"}>
                Log in
              </button>
            </form>
            <div id={"message"}></div>
            <button type={"button"} id={"phoneLoginToggle"} className={"phone-login-toggle"}>
              Login with mobile number
            </button>
            <div id={"phoneLoginSection"} className={"phone-login-section"} style={{display: "none"}}>
              <div className={"input-group"}>
                <label htmlFor={"loginPhone"}>
                  Mobile Number
                </label>
                <div className={"phone-row"}>
                  <input type={"tel"} id={"loginPhone"} name={"loginPhone"} placeholder={"Enter 10-digit mobile number"} autoComplete={"tel"} maxLength={"13"} />
                  <button type={"button"} id={"sendLoginOtpBtn"} className={"otp-btn"}>
                    Send OTP
                  </button>
                </div>
                <small className={"field-hint"}>
                  We'll send a verification code to your phone.
                </small>
              </div>
              <div id={"msg91-captcha"} className={"msg91-captcha"}></div>
              <div className={"input-group"} id={"loginOtpGroup"} style={{display: "none"}}>
                <label htmlFor={"loginOtp"}>
                  Verification Code
                </label>
                <div className={"phone-row"}>
                  <input type={"text"} id={"loginOtp"} name={"loginOtp"} placeholder={"Enter OTP"} inputmode={"numeric"} autoComplete={"one-time-code"} maxLength={"8"} />
                  <button type={"button"} id={"verifyLoginOtpBtn"} className={"otp-btn"}>
                    Verify OTP
                  </button>
                </div>
                <div id={"loginOtpStatus"} className={"otp-status"}></div>
              </div>
            </div>
            <div className={"divider"}>
              <span></span>
              <p>
                OR
              </p>
              <span></span>
            </div>
            <button type={"button"} className={"outline-btn"} id={"googleLogin"}>
              <span className={"google-icon"}>
                G
              </span>
              Continue with Google
            </button>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
