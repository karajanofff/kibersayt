import { useEffect, useState } from 'react';
import { Flag, Send, HelpCircle, KeyRound } from 'lucide-react';
import { apiFetch } from '../api/client';

export default function CTF() {
  const [challenges, setChallenges] = useState([]);
  const [flags, setFlags] = useState({});
  const [messages, setMessages] = useState({});
  const [hints, setHints] = useState({});

  useEffect(() => {
    apiFetch('/api/ctf').then((res) => setChallenges(res.data));
  }, []);

  const submitFlag = async (challengeId) => {
    const flag = flags[challengeId]?.trim();
    if (!flag) return;
    try {
      const res = await apiFetch('/api/ctf/check', {
        method: 'POST',
        body: JSON.stringify({ challengeId, flag }),
      });
      setMessages((m) => ({
        ...m,
        [challengeId]: { ok: res.data.valid, text: res.data.message, points: res.data.points },
      }));
    } catch (err) {
      setMessages((m) => ({ ...m, [challengeId]: { ok: false, text: err.message } }));
    }
  };

  const showAesDemo = async (challengeId) => {
    try {
      const res = await apiFetch('/api/ctf/demo/aes');
      setHints((h) => ({ ...h, [challengeId]: JSON.stringify(res.data, null, 2) }));
    } catch {
      setHints((h) => ({ ...h, [challengeId]: 'AES demo maǵlıwmat alınbadı' }));
    }
  };

  return (
    <div>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <Flag className="h-8 w-8 text-cyber-400" />
        CTF — Kriptologiya
      </h1>
      <p className="mt-2 text-slate-400">
        4 ta kriptologiya masalası. Flaglar serverda tekseriledi.
      </p>

      <div className="card mt-6 border-cyber-500/30 bg-cyber-500/5">
        <p className="text-sm text-cyber-200">
          Sezer, ROT13, Vejiner hám AES — oquw simulyatsiyası. Flag formatı:{' '}
          <code className="text-cyber-300">CYBER{'{...}'}</code>
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {challenges.map((c, index) => (
          <div key={c.id} className="card">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="text-xs uppercase tracking-wide text-purple-400">
                  KRIPTOLOGIYA · {index + 1}/4
                </span>
                <h2 className="text-lg font-semibold text-white">{c.title}</h2>
              </div>
              <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300">
                {c.points} ball
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{c.description}</p>

            {c.ciphertext && (
              <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-700 bg-slate-800 p-4 font-mono text-sm text-cyber-300">
                {c.ciphertext}
              </pre>
            )}

            {c.cipherMeta && (
              <p className="mt-2 text-xs text-slate-500">
                Túri: {c.cipherMeta.type}
                {c.cipherMeta.shift != null && ` · siljisiw: ${c.cipherMeta.shift}`}
                {c.cipherMeta.key && ` · kalit: ${c.cipherMeta.key}`}
              </p>
            )}

            {c.hint && (
              <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                <HelpCircle className="h-3 w-3 shrink-0" />
                {c.hint}
              </p>
            )}

            {c.id === 'ctf-4' && (
              <button
                type="button"
                className="btn-secondary mt-4 text-sm"
                onClick={() => showAesDemo(c.id)}
              >
                <KeyRound className="h-4 w-4" />
                AES demo (kalit, IV)
              </button>
            )}

            {hints[c.id] && (
              <pre className="mt-2 overflow-x-auto rounded bg-slate-800 p-3 text-xs text-amber-200">
                {hints[c.id]}
              </pre>
            )}

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                className="input-field flex-1"
                placeholder="CYBER{...}"
                value={flags[c.id] || ''}
                onChange={(e) => setFlags((f) => ({ ...f, [c.id]: e.target.value }))}
              />
              <button type="button" className="btn-primary" onClick={() => submitFlag(c.id)}>
                <Send className="h-4 w-4" />
                Tekseriw
              </button>
            </div>
            {messages[c.id] && (
              <p className={`mt-2 text-sm ${messages[c.id].ok ? 'text-emerald-400' : 'text-red-400'}`}>
                {messages[c.id].text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
