import LanguageSwitcher from './LanguageSwitcher';

/** Sahifa yuqorisidagi til tanlash qatori (header ichida ishlatiladi) */
export default function TopLanguageBar() {
  return (
    <div className="border-b border-slate-800/90 bg-slate-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-2.5">
        <LanguageSwitcher prominent />
      </div>
    </div>
  );
}
