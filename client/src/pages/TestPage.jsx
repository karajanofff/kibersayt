import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { apiFetch } from '../api/client';
import { useTranslation } from '../context/LanguageContext';

const emptyTests = { passingScore: 70, sections: [] };

export default function TestPage() {
  const { t, formatQuestionCount, localizeTestSection } = useTranslation();
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function load() {
      setError('');
      try {
        const tests = await apiFetch('/api/tests');
        if (!active) return;
        setData(tests.data ?? emptyTests);
      } catch (err) {
        if (!active) return;
        setError(err.message || t('errorOccurred'));
        setData(emptyTests);
        return;
      }

      try {
        const prog = await apiFetch('/api/progress');
        if (active) setProgress(prog.data);
      } catch {
        if (active) setProgress(null);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [t]);

  if (!data) {
    return <p className="text-slate-400">{t('loading')}</p>;
  }

  const sections = data.sections ?? [];

  return (
    <div>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <ClipboardCheck className="h-8 w-8 text-cyber-400" />
        {t('testsTitle')}
      </h1>
      <p className="mt-2 text-slate-400">
        {t('testsSubtitle')}: {data.passingScore ?? 70}% · {t('sectionsSeparated')}
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {error}
        </p>
      )}

      {sections.length === 0 ? (
        <p className="mt-8 text-slate-400">{t('noData')}</p>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {sections.map((section, i) => {
            const s = localizeTestSection(section);
            const result = progress?.testScores?.[s.id];
            return (
              <Link
                key={s.id}
                to={`/test/${s.id}`}
                className="card flex items-center justify-between transition hover:border-cyber-500/50"
              >
                <div className="flex-1">
                  <span className="text-xs font-medium text-purple-400">
                    {t('theme')} {i + 1}/{sections.length}
                  </span>
                  <h2 className="mt-1 text-lg font-semibold text-white">{s.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{s.description}</p>
                  <p className="mt-2 text-xs text-cyber-400">
                    {formatQuestionCount(s.questionCount ?? 0)}
                  </p>
                  {result && (
                    <p
                      className={`mt-2 flex items-center gap-1 text-sm ${
                        result.passed ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {t('testsScore')}: {result.score}%{' '}
                      {result.passed ? `· ${t('testsPassed')}` : `· ${t('testsRetry')}`}
                    </p>
                  )}
                </div>
                <ChevronRight className="h-6 w-6 shrink-0 text-cyber-400" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
