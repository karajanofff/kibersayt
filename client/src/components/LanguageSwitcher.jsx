import { Languages } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';

export default function LanguageSwitcher({ className = '', prominent = false }) {
  const { locale, setLocale, t } = useTranslation();

  const base =
    'flex items-center gap-2 rounded-xl border bg-slate-900/90 p-1 shadow-sm ' +
    (prominent ? 'border-cyber-500/40 shadow-cyber-500/10' : 'border-slate-700');

  const btnBase = prominent
    ? 'rounded-lg px-3 py-2 text-sm font-semibold transition sm:px-4'
    : 'rounded-md px-2.5 py-1.5 text-xs font-medium transition';

  return (
    <div className={`${base} ${className}`} role="group" aria-label={t('langLabel')}>
      <span
        className={`hidden items-center gap-1.5 pl-2 font-medium text-slate-400 sm:flex ${
          prominent ? 'text-sm' : 'text-xs'
        }`}
      >
        <Languages className={`${prominent ? 'h-4 w-4' : 'h-3.5 w-3.5'} text-cyber-400`} />
        {t('langLabel')}
      </span>
      <button
        type="button"
        onClick={() => setLocale('kaa')}
        className={`${btnBase} ${
          locale === 'kaa'
            ? 'bg-cyber-500 text-white shadow-md shadow-cyber-500/30'
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
        }`}
        aria-pressed={locale === 'kaa'}
        title={t('langKaa')}
      >
        <span className="sm:hidden">QAA</span>
        <span className="hidden sm:inline">{t('langKaa')}</span>
      </button>
      <button
        type="button"
        onClick={() => setLocale('uz')}
        className={`${btnBase} ${
          locale === 'uz'
            ? 'bg-cyber-500 text-white shadow-md shadow-cyber-500/30'
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
        }`}
        aria-pressed={locale === 'uz'}
        title={t('langUz')}
      >
        <span className="sm:hidden">UZ</span>
        <span className="hidden sm:inline">{t('langUz')}</span>
      </button>
    </div>
  );
}
