import { useState } from 'react';
import useLegacyPage from '../../hooks/useLegacyPage';
import usePageTitle from '../../hooks/usePageTitle';

const SUPPORT_PHONE = '9879065786';
const SUPPORT_EMAIL = 'tripzovasupport@gmail.com';

export default function ContactPage() {
  usePageTitle('Contact TRIPZOVA');
  useLegacyPage({
    styles: [
      'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css',
      '/legacy/contact.css'
    ],
    scripts: [],
    beforeLoad: undefined
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitContact = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Unable to send your message.');
      }

      setStatus({
        type: 'success',
        message: data.message || 'Your message has been received.'
      });
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Unable to send your message right now.'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <header className="contact-nav-wrap">
        <div className="contact-nav">
          <a className="contact-logo" href="/">TRIPZOVA</a>
          <nav>
            <a href="/">Home</a>
            <a href="/vehicles">Vehicles</a>
            <a className="active" href="/contact">Contact</a>
          </nav>
          <a className="contact-nav-cta" href={`tel:+91${SUPPORT_PHONE}`}>
            <i className="bi bi-telephone-fill" /> Call Support
          </a>
        </div>
      </header>

      <main>
        <section className="contact-hero">
          <div className="contact-shell contact-hero-grid">
            <div className="contact-hero-copy">
              <span className="contact-kicker">TRIPZOVA SUPPORT</span>
              <h1>We’re here to make your journey easier.</h1>
              <p>
                Questions about a booking, vehicle, partner account or trip? Reach our
                support team directly or send us a message below.
              </p>
              <div className="contact-hero-actions">
                <a className="contact-primary-btn" href={`tel:+91${SUPPORT_PHONE}`}>
                  <i className="bi bi-telephone-fill" /> +91 {SUPPORT_PHONE}
                </a>
                <a className="contact-secondary-btn" href={`mailto:${SUPPORT_EMAIL}`}>
                  <i className="bi bi-envelope-fill" /> Email Support
                </a>
              </div>
            </div>
            <div className="contact-hero-card">
              <div className="contact-orbit orbit-one" />
              <div className="contact-orbit orbit-two" />
              <div className="contact-hero-icon"><i className="bi bi-headset" /></div>
              <strong>Trip support</strong>
              <span>Booking help • Vehicle help • Partner help</span>
              <div className="contact-online-pill"><span /> Support available</div>
            </div>
          </div>
        </section>

        <section className="contact-options-section">
          <div className="contact-shell contact-option-grid">
            <a className="contact-option-card" href={`tel:+91${SUPPORT_PHONE}`}>
              <div className="contact-option-icon"><i className="bi bi-telephone" /></div>
              <div><span>Call us</span><strong>+91 {SUPPORT_PHONE}</strong><small>For booking and trip support</small></div>
              <i className="bi bi-arrow-up-right" />
            </a>
            <a className="contact-option-card" href={`mailto:${SUPPORT_EMAIL}`}>
              <div className="contact-option-icon"><i className="bi bi-envelope" /></div>
              <div><span>Email us</span><strong>{SUPPORT_EMAIL}</strong><small>Send details and screenshots</small></div>
              <i className="bi bi-arrow-up-right" />
            </a>
            <a className="contact-option-card" href={`https://wa.me/91${SUPPORT_PHONE}`} target="_blank" rel="noreferrer">
              <div className="contact-option-icon"><i className="bi bi-whatsapp" /></div>
              <div><span>WhatsApp</span><strong>Chat with TRIPZOVA</strong><small>Quick support from your phone</small></div>
              <i className="bi bi-arrow-up-right" />
            </a>
          </div>
        </section>

        <section className="contact-form-section">
          <div className="contact-shell contact-form-grid">
            <div className="contact-form-copy">
              <span className="contact-kicker">SEND A MESSAGE</span>
              <h2>Tell us how we can help.</h2>
              <p>
                Your message is saved securely in TRIPZOVA so it can be followed up.
                If email forwarding is configured on the server, it is also forwarded to support.
              </p>
              <div className="contact-feature-list">
                <div><i className="bi bi-shield-check" /><span><strong>Booking assistance</strong><small>Help with availability, dates and booking status.</small></span></div>
                <div><i className="bi bi-car-front" /><span><strong>Vehicle support</strong><small>Questions about vehicles, partners or ride details.</small></span></div>
                <div><i className="bi bi-person-check" /><span><strong>Partner support</strong><small>Help for partner accounts and vehicle listings.</small></span></div>
              </div>
            </div>

            <form className="contact-form-card" onSubmit={submitContact}>
              <div className="contact-form-row">
                <label>
                  <span>Your name</span>
                  <input name="name" value={form.name} onChange={updateField} required maxLength={100} placeholder="Enter your name" />
                </label>
                <label>
                  <span>Email address</span>
                  <input type="email" name="email" value={form.email} onChange={updateField} required maxLength={180} placeholder="you@example.com" />
                </label>
              </div>
              <div className="contact-form-row">
                <label>
                  <span>Phone number</span>
                  <input name="phone" value={form.phone} onChange={updateField} maxLength={30} placeholder="Optional" />
                </label>
                <label>
                  <span>Subject</span>
                  <input name="subject" value={form.subject} onChange={updateField} required maxLength={140} placeholder="How can we help?" />
                </label>
              </div>
              <label>
                <span>Message</span>
                <textarea name="message" value={form.message} onChange={updateField} required maxLength={2000} rows={6} placeholder="Share your booking number or details if relevant." />
              </label>

              {status.message && (
                <div className={`contact-form-message ${status.type}`}>
                  <i className={`bi ${status.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`} />
                  {status.message}
                </div>
              )}

              <button className="contact-submit-btn" type="submit" disabled={submitting}>
                {submitting ? <><span className="contact-spinner" /> Sending...</> : <><i className="bi bi-send-fill" /> Send Message</>}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="contact-footer">
        <div className="contact-shell">
          <a className="contact-logo" href="/">TRIPZOVA</a>
          <p>Your journey, your way.</p>
          <div><a href={`tel:+91${SUPPORT_PHONE}`}>+91 {SUPPORT_PHONE}</a><a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></div>
        </div>
      </footer>
    </div>
  );
}
