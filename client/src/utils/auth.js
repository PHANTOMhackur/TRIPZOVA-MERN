export function getStoredUser() {
  try {
    const raw = localStorage.getItem('tripzovaUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getStoredToken() {
  return localStorage.getItem('tripzovaToken');
}

export function clearStoredAuth() {
  localStorage.removeItem('tripzovaToken');
  localStorage.removeItem('tripzovaUser');
}

export function roleHome(role) {
  if (role === 'admin') return '/admin/';
  if (role === 'partner') return '/partner/';
  return '/';
}
