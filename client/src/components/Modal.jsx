export default function Modal({ open, children, className = '' }) {
  if (!open) return null;
  return <div className={className} role="dialog" aria-modal="true">{children}</div>;
}
