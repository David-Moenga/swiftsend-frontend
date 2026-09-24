const runtimeApiBase = typeof window !== 'undefined'
  ? window.__SWIFTSEND_API_BASE__
  : undefined;

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL
  || runtimeApiBase
  || ''
).replace(/\/$/, '');

const collectMessages = (value) => {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(collectMessages).filter(Boolean).join(' ');
  if (value && typeof value === 'object') {
    return Object.values(value).map(collectMessages).filter(Boolean).join(' ');
  }
  return '';
};

const looksLikeDuplicateAccount = (payload) => {
  const message = collectMessages(payload);
  return /already\s+(exists|registered|taken)|already\s+been\s+taken|duplicate|unique/i.test(message);
};

export const isDuplicateRegistrationError = (payload) => looksLikeDuplicateAccount(payload);

export const getApiErrorMessage = (payload, fallback = 'Something went wrong. Please try again.') => {
  if (looksLikeDuplicateAccount(payload)) {
    return 'This email is already registered. Try logging in instead.';
  }

  return collectMessages(payload) || fallback;
};

export const apiUrl = (path) => (
  /^https?:\/\//i.test(path) ? path : `${API_BASE_URL}${path}`
);
