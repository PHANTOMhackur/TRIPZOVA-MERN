import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function ForgotPasswordPage() {
  usePageTitle("Forgot Password | TRIPZOVA");
  useLegacyPage({ styles: ["/legacy/forgot-password.css"], scripts: ["/legacy/forgot-password.js"], beforeLoad: undefined });

  return (
    <>
    <main className={"forgot-page"}>
      <section className={"forgot-card"}>
        <div className={"forgot-visual"}>
          <div className={"visual-overlay"}></div>
        </div>
        <div className={"forgot-form-section"}>
          <a href={"/login"} className={"back-button"}>
            ←
          </a>
          <div className={"form-content"}>
            <h1>
              Forgot your password?
            </h1>
            <p className={"description"}>
              Enter the email address associated with your
                        TRIPZOVA account and we'll help you reset your password.
            </p>
            <form id={"forgotPasswordForm"}>
              <div className={"input-group"}>
                <label htmlFor={"email"}>
                  Email
                </label>
                <input type={"email"} id={"email"} name={"email"} placeholder={"Enter your email"} required />
              </div>
              <button type={"submit"} className={"reset-btn"}>
                Send reset link
              </button>
            </form>
            <div id={"message"}></div>
            <p className={"back-login"}>
              Remember your password?
              <a href={"/login"}>
                Log in
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
