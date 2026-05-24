import { useEffect, useState } from 'react';
import { Flag, Send, HelpCircle, KeyRound, FileText, PenLine } from 'lucide-react';
import { apiFetch } from '../api/client';

export default function CTF() {
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
        CTF — Kriptologiya
      </h1>
      <p className="mt-2 text-slate-400">
        4 ta masala. Berilgan misoldı yeshiń, javobıńızdı tekst kórinishinde jiberiń.
      </p>

      <div className="card mt-6 border-cyber-500/30 bg-cyber-500/5">
        <p className="text-sm text-cyber-200">
          <strong>Qanday isleydi:</strong> Berilgan misoldı óqiń, shifrlań yamasa dekodlań.
          «Javobıńız» maydanına natijeni tekst kórinishinde jazıp, «Javobni jiberiw» basıń.
        </p>
      </div>

      <div className="mt-8 space-y-8">
        {challenges.map((c, index) => (
          <div key={c.id} className="card border-slate-700">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wide text-purple-400">
                  KRIPTOLOGIYA · Masala {index + 1}/4
                </span>
                <h2 className="mt-1 text-xl font-semibold text-white">{c.title}</h2>
              </div>
              <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300">
                {c.points} ball
              </span>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-slate-300">{c.description}</p>

            {c.cipherMeta && (
              <p className="mt-2 text-xs text-slate-500">
                Shifrlaw túri: <span className="text-slate-400">{c.cipherMeta.type}</span>
                {c.cipherMeta.shift != null && ` · siljisiw: ${c.cipherMeta.shift}`}
                {c.cipherMeta.key && ` · kalit: ${c.cipherMeta.key}`}
              </p>
            )}

            {c.ochiqMatn && (
              <div className="mt-5 rounded-lg border-2 border-emerald-500/40 bg-emerald-950/30 p-4">
                <div className="mb-2 text-sm font-semibold text-emerald-400">Ashıq matn:</div>
                <pre className="select-all text-center font-mono text-2xl font-bold tracking-widest text-white">
                  {c.ochiqMatn}
                </pre>
              </div>
            )}

            {getMisol(c) && (
              <div className="mt-4 rounded-lg border-2 border-cyber-500/40 bg-cyber-950/50 p-4">
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-cyber-400">
                  <FileText className="h-4 w-4" />
                  {c.ochiqMatn ? 'Alfavit (kómek)' : 'Berilgan misol (shifrlangan matn)'}
                </div>
                <pre className="select-all whitespace-pre-wrap break-all font-mono text-sm leading-relaxed text-cyber-200">
                  {getMisol(c)}
                </pre>
              </div>
            )}

            {c.hint && (
              <p className="mt-3 flex items-start gap-2 text-sm text-amber-200/90">
                <HelpCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <strong className="text-amber-300">Kómek:</strong> {c.hint}
                </span>
              </p>
            )}

            {c.kriptoKomek && (
              <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-950/20 p-4 text-sm">
                <div className="mb-2 flex items-center gap-2 font-semibold text-amber-300">
                  <KeyRound className="h-4 w-4" />
                  Dekodlaw ushın málimotlar (tayar)
                </div>
                <p>
                  <span className="text-slate-500">Algoritm:</span>{' '}
                  <span className="text-slate-200">{c.kriptoKomek.algorithm}</span>
                </p>
                <p className="mt-1">
                  <span className="text-slate-500">Kalit (Key):</span>{' '}
                  <code className="select-all text-cyber-300">{c.kriptoKomek.key}</code>
                </p>
                <p className="mt-1">
                  <span className="text-slate-500">IV:</span>{' '}
                  <code className="select-all text-cyber-300">{c.kriptoKomek.iv}</code>
                </p>
                {c.kriptoKomek.qadamlar && (
                  <ol className="mt-3 list-decimal space-y-1 pl-5 text-slate-300">
                    {c.kriptoKomek.qadamlar.map((q) => (
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
                  CyberChef saytın ashıw →
                </a>
              </div>
            )}

            {/* Javob */}
            <div className="mt-5 rounded-lg border border-slate-600 bg-slate-800/30 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-400">
                <PenLine className="h-4 w-4" />
                Javobıńız (tekst kórinishinde)
              </div>
              <textarea
                className="input-field min-h-[80px] resize-y font-mono text-base uppercase"
                placeholder="Durıs javobtı kiritiń"
                aria-label="Durıs javobtı kiritiń"
                value={answers[c.id] || ''}
                onChange={(e) => setAnswers((a) => ({ ...a, [c.id]: e.target.value }))}
                rows={2}
              />
              <button
                type="button"
                className="btn-primary mt-3 w-full sm:w-auto"
                onClick={() => submitAnswer(c.id)}
              >
                <Send className="h-4 w-4" />
                Javobni jiberiw
              </button>
            </div>

            {messages[c.id] && (
              <p
                className={`mt-3 rounded-lg px-3 py-2 text-sm ${
                  messages[c.id].ok
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-red-500/10 text-red-400'
                }`}
              >
                {messages[c.id].text}
                {messages[c.id].ok && messages[c.id].points
                  ? ` (+${messages[c.id].points} ball)`
                  : ''}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
