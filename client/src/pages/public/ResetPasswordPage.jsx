import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

export default function ResetPasswordPage() {
  usePageTitle("Reset Password | TRIPZOVA");
  useLegacyPage({ styles: ["/legacy/reset-password.css"], scripts: ["/legacy/reset-password.js"], beforeLoad: undefined });

  return (
    <>
    <main className={"reset-page"}>
      <section className={"reset-card"}>
        <div className={"reset-visual"}>
          <div className={"visual-overlay"}></div>
        </div>
        <div className={"reset-form-section"}>
          <a href={"/login"} className={"back-button"}>
            ←
          </a>
          <div className={"form-content"}>
            <h1>
              Reset your password
            </h1>
            <p className={"description"}>
              Create a new password for your TRIPZOVA account.
            </p>
            <form id={"resetPasswordForm"}>
              <div className={"input-group"}>
                <label htmlFor={"password"}>
                  New password
                </label>
                <div className={"password-wrapper"}>
                  <input type={"password"} id={"password"} required minLength={"8"} />
                  <button type={"button"} id={"togglePassword"} className={"password-toggle"}>
                    ◉
                  </button>
                </div>
              </div>
              <div className={"input-group"}>
                <label htmlFor={"confirmPassword"}>
                  Confirm password
                </label>
                <div className={"password-wrapper"}>
                  <input type={"password"} id={"confirmPassword"} required minLength={"8"} />
                  <button type={"button"} id={"toggleConfirmPassword"} className={"password-toggle"}>
                    ◉
                  </button>
                </div>
              </div>
              <button type={"submit"} className={"reset-btn"}>
                Reset password
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
