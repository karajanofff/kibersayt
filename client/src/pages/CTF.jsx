import { useEffect, useState } from 'react';
import { Flag, Send, HelpCircle, KeyRound, FileText, PenLine } from 'lucide-react';
import { apiFetch } from '../api/client';
import { useTranslation } from '../context/LanguageContext';

export default function CTF() {
  const { t, localizeCtf } = useTranslation();
  const [challenges, setChallenges] = useState([]);
  const [answers, setAnswers] = useState({});
  const [messages, setMessages] = useState({});

  useEffect(() => {
    apiFetch('/api/ctf').then((res) => setChallenges(res.data));
  }, []);

  const submitAnswer = async (challengeId) => {
    const javob = answers[challengeId]?.trim();
    if (!javob) return;
    try {
      const res = await apiFetch('/api/ctf/check', {
        method: 'POST',
        body: JSON.stringify({ challengeId, flag: javob }),
      });
      setMessages((m) => ({
        ...m,
        [challengeId]: { ok: res.data.valid, text: res.data.message, points: res.data.points },
      }));
    } catch (err) {
      setMessages((m) => ({ ...m, [challengeId]: { ok: false, text: err.message } }));
    }
  };

  const getMisol = (c) => c.berilganMisol || c.ciphertext || '';

  return (
    <div>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <Flag className="h-8 w-8 text-cyber-400" />
        {t('ctfTitle')}
      </h1>
      <p className="mt-2 text-slate-400">{t('ctfSubtitle')}</p>

      <div className="card mt-6 border-cyber-500/30 bg-cyber-500/5">
        <p className="text-sm text-cyber-200">{t('ctfHowItWorks')}</p>
      </div>

      <div className="mt-8 space-y-8">
        {challenges.map((c, index) => {
          const challenge = localizeCtf(c);
          return (
            <div key={challenge.id} className="card border-slate-700">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-purple-400">
                    {t('ctfCategoryLabel')} · {t('ctfProblem')} {index + 1}/4
                  </span>
                  <h2 className="mt-1 text-xl font-semibold text-white">{challenge.title}</h2>
                </div>
                <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300">
                  {challenge.points} {t('points')}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-300">{challenge.description}</p>

              {challenge.cipherMeta && (
                <p className="mt-2 text-xs text-slate-500">
                  {t('ctfCipherType')}: <span className="text-slate-400">{challenge.cipherMeta.type}</span>
                  {challenge.cipherMeta.shift != null && ` · ${t('ctfShift')}: ${challenge.cipherMeta.shift}`}
                  {challenge.cipherMeta.key && ` · ${t('ctfKey')}: ${challenge.cipherMeta.key}`}
                </p>
              )}

              {challenge.ochiqMatn && (
                <div className="mt-5 rounded-lg border-2 border-emerald-500/40 bg-emerald-950/30 p-4">
                  <div className="mb-2 text-sm font-semibold text-emerald-400">{t('ctfPlaintext')}</div>
                  <pre className="select-all text-center font-mono text-2xl font-bold tracking-widest text-white">
                    {challenge.ochiqMatn}
                  </pre>
                </div>
              )}

              {getMisol(challenge) && (
                <div className="mt-4 rounded-lg border-2 border-cyber-500/40 bg-cyber-950/50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyber-400">
                    <FileText className="h-4 w-4" />
                    {challenge.ochiqMatn ? t('ctfAlphabetHelp') : t('ctfGivenExample')}
                  </div>
                  <pre className="select-all whitespace-pre-wrap break-all font-mono text-sm leading-relaxed text-cyber-200">
                    {getMisol(challenge)}
                  </pre>
                </div>
              )}

              {challenge.hint && (
                <p className="mt-3 flex items-start gap-2 text-sm text-amber-200/90">
                  <HelpCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong className="text-amber-300">{t('ctfHint')}:</strong> {challenge.hint}
                  </span>
                </p>
              )}

              {challenge.kriptoKomek && (
                <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-950/20 p-4 text-sm">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-amber-300">
                    <KeyRound className="h-4 w-4" />
                    {t('ctfDecodeInfo')}
                  </div>
                  <p>
                    <span className="text-slate-500">{t('ctfAlgorithm')}:</span>{' '}
                    <span className="text-slate-200">{challenge.kriptoKomek.algorithm}</span>
                  </p>
                  <p className="mt-1">
                    <span className="text-slate-500">{t('ctfKeyLabel')}:</span>{' '}
                    <code className="select-all text-cyber-300">{challenge.kriptoKomek.key}</code>
                  </p>
                  <p className="mt-1">
                    <span className="text-slate-500">{t('ctfIvLabel')}:</span>{' '}
                    <code className="select-all text-cyber-300">{challenge.kriptoKomek.iv}</code>
                  </p>
                  {challenge.kriptoKomek.qadamlar && (
                    <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-300">
                      {challenge.kriptoKomek.qadamlar.map((q) => (
                        <li key={q}>{q}</li>
                      ))}
                    </ol>
                  )}
                  <a
                    href="https://gchq.github.io/CyberChef/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-cyber-400 hover:underline"
                  >
                    {t('ctfOpenCyberChef')}
                  </a>
                </div>
              )}

              <div className="mt-5 rounded-lg border border-slate-600 bg-slate-800/30 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-400">
                  <PenLine className="h-4 w-4" />
                  {t('ctfYourAnswer')}
                </div>
                <textarea
                  className="input-field min-h-[80px] resize-y font-mono text-base uppercase"
                  placeholder={t('ctfAnswerPlaceholder')}
                  aria-label={t('ctfAnswerPlaceholder')}
                  value={answers[challenge.id] || ''}
                  onChange={(e) => setAnswers((a) => ({ ...a, [challenge.id]: e.target.value }))}
                  rows={2}
                />
                <button
                  type="button"
                  className="btn-primary mt-3 w-full sm:w-auto"
                  onClick={() => submitAnswer(challenge.id)}
                >
                  <Send className="h-4 w-4" />
                  {t('ctfSubmit')}
                </button>
              </div>

              {messages[challenge.id] && (
                <p
                  className={`mt-3 rounded-lg px-3 py-2 text-sm ${
                    messages[challenge.id].ok
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {messages[challenge.id].text}
                  {messages[challenge.id].ok && messages[challenge.id].points
                    ? ` (+${messages[challenge.id].points} ${t('points')})`
                    : ''}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
