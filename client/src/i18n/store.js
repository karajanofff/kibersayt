import { kaaMessages } from './messages.kaa';
import { uzMessages } from './messages.uz';

export const STORAGE_KEY = 'cyberedu_lang';
export const LOCALES = ['kaa', 'uz'];

const messages = { kaa: kaaMessages, uz: uzMessages };

export function getLocale() {
  if (typeof window === 'undefined') return 'kaa';
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'uz' ? 'uz' : 'kaa';
}

export function setStoredLocale(locale) {
  localStorage.setItem(STORAGE_KEY, locale === 'uz' ? 'uz' : 'kaa');
}

export function getMessages(locale = getLocale()) {
  return messages[locale] || messages.kaa;
}

export function translateKey(key, locale = getLocale()) {
  return getMessages(locale)[key] ?? messages.kaa[key] ?? key;
}
