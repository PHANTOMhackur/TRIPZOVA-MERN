export default function Loader({ label = 'Loading...' }) {
  return <div className="text-center py-5" aria-live="polite">{label}</div>;
}
