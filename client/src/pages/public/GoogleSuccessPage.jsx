import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';
import { useEffect } from 'react';

export default function GoogleSuccessPage() {
  usePageTitle("Signing you in... | TRIPZOVA");
  useLegacyPage({ styles: [], scripts: [], beforeLoad: undefined });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const userParam = params.get('user');
    if (token) localStorage.setItem('tripzovaToken', token);
    if (userParam) {
      try { localStorage.setItem('tripzovaUser', decodeURIComponent(userParam)); } catch { localStorage.setItem('tripzovaUser', userParam); }
    }
    let user = null;
    try { user = JSON.parse(localStorage.getItem('tripzovaUser') || 'null'); } catch {}
    const destination = user?.role === 'admin' ? '/admin/' : user?.role === 'partner' ? '/partner/' : '/';
    const timer = setTimeout(() => window.location.replace(destination), 250);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <div className={"success-card"}>
      <div className={"spinner"} id={"spinner"}></div>
      <h1 id={"statusHeading"}>
        Signing you in...
      </h1>
      <p id={"statusMessage"}>
        Please wait while we finish logging you in with Google.
      </p>
      <div className={"error-box"} id={"errorBox"}>
        <p>
          <a href={"/login"}>
            Back to login
          </a>
        </p>
      </div>
    </div>
    </>
  );
}
