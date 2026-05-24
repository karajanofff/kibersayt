import { useEffect, useState } from 'react';
import { Flag, Send, HelpCircle } from 'lucide-react';
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

  const showDemo = async (type, challengeId) => {
    try {
      if (type === 'header') {
        const res = await fetch('/api/ctf/demo/headers');
        const flagHeader = res.headers.get('X-Training-Flag');
        const body = await res.json();
        setHints((h) => ({
          ...h,
          [challengeId]: `Javap header: X-Training-Flag = ${flagHeader || '(tabılmadı)'}\n${JSON.stringify(body.data, null, 2)}`,
        }));
        return;
      }
      const path =
        type === 'metadata'
          ? `/api/ctf/demo/metadata/${challengeId}`
          : '/api/ctf/demo/port';
      const res = await apiFetch(path);
      setHints((h) => ({ ...h, [challengeId]: JSON.stringify(res.data, null, 2) }));
    } catch {
      setHints((h) => ({ ...h, [challengeId]: 'Demo maǵlıwmat alınbadı' }));
    }
  };

  return (
    <div>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <Flag className="h-8 w-8 text-cyber-400" />
        CTF — Xavfsiz oquw musobaqası
      </h1>
      <p className="mt-2 text-slate-400">
        8 ta challenge. Flaglar serverda tekseriledi — frontendda ochiq emas.
      </p>

      <div className="card mt-6 border-cyber-500/30 bg-cyber-500/5">
        <p className="text-sm text-cyber-200">
          Barlıq topshiriqlar qonuniy oquw simulyatsiyası. Haqıqıy hujum, parol buzish yamasa
          noqonuniy ekspluatatsiya boyınsha ko‘rsatmalar jo‘q.
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {challenges.map((c) => (
          <div key={c.id} className="card">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <span className="text-xs uppercase text-slate-500">{c.category}</span>
                <h2 className="text-lg font-semibold text-white">{c.title}</h2>
              </div>
              <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm text-purple-300">
                {c.points} ball
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{c.description}</p>

            {c.encoded && (
              <pre className="mt-3 overflow-x-auto rounded bg-slate-800 p-3 text-xs text-cyber-300">
                {c.encoded}
              </pre>
            )}
            {c.metadata && (
              <pre className="mt-3 overflow-x-auto rounded bg-slate-800 p-3 text-xs text-slate-400">
                {JSON.stringify(c.metadata, null, 2)}
              </pre>
            )}
            {c.hint && (
              <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                <HelpCircle className="h-3 w-3" />
                {c.hint}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {c.id === 'ctf-2' && (
                <button
                  type="button"
                  className="btn-secondary text-sm"
                  onClick={() => showDemo('metadata', c.id)}
                >
                  Metadata demo
                </button>
              )}
              {c.id === 'ctf-3' && (
                <button
                  type="button"
                  className="btn-secondary text-sm"
                  onClick={() => showDemo('header', c.id)}
                >
                  Demo header tekseriw
                </button>
              )}
              {c.id === 'ctf-5' && (
                <button
                  type="button"
                  className="btn-secondary text-sm"
                  onClick={() => showDemo('port', c.id)}
                >
                  Port simulyatsiyası
                </button>
              )}
              {c.id === 'ctf-7' && (
                <button
                  type="button"
                  className="btn-secondary text-sm"
                  onClick={() =>
                    setHints((h) => ({
                      ...h,
                      [c.id]: 'Steganografiya simulyatsiyası: LSB usulında jasırın matn bar. Topilgan flagni serverda tekseriń.',
                    }))
                  }
                >
                  Stego demo
                </button>
              )}
            </div>

            {hints[c.id] && (
              <pre className="mt-2 rounded bg-slate-800 p-2 text-xs text-amber-200">{hints[c.id]}</pre>
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
