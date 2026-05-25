import { useTranslation } from '../context/LanguageContext';

export default function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale, t } = useTranslation();

  return (
    <div
      className={`flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-900/80 p-0.5 text-xs ${className}`}
      role="group"
      aria-label={t('langLabel')}
    >
      <button
        type="button"
        onClick={() => setLocale('kaa')}
        className={`rounded-md px-2.5 py-1.5 font-medium transition ${
          locale === 'kaa'
            ? 'bg-cyber-500/30 text-cyber-200'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-pressed={locale === 'kaa'}
      >
        {t('langKaa')}
      </button>
      <button
        type="button"
        onClick={() => setLocale('uz')}
        className={`rounded-md px-2.5 py-1.5 font-medium transition ${
          locale === 'uz'
            ? 'bg-cyber-500/30 text-cyber-200'
            : 'text-slate-400 hover:text-slate-200'
        }`}
        aria-pressed={locale === 'uz'}
      >
        {t('langUz')}
      </button>
    </div>
  );
}
