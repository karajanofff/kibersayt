import { useEffect, useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { apiFetch } from '../api/client';

export default function TestPage() {
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiFetch('/api/tests').then((res) => setTest(res.data));
  }, []);

  const select = (questionId, index) => {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
  };

  const submit = async () => {
    if (!test) return;
    const payload = test.questions.map((q) => ({
      questionId: q.id,
      selectedIndex: answers[q.id] ?? -1,
    }));
    if (payload.some((a) => a.selectedIndex < 0)) {
      alert('Barlıq sorawlarga juwap beriń!');
      return;
    }
    setSubmitting(true);
    try {
      const res = await apiFetch('/api/tests/submit', {
        method: 'POST',
        body: JSON.stringify({ answers: payload }),
      });
      setResult(res.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!test) return <p className="text-slate-400">Júklenbekte...</p>;

  if (result) {
    return (
      <div className="card max-w-lg mx-auto text-center">
        <ClipboardCheck className="mx-auto h-16 w-16 text-cyber-400" />
        <h2 className="mt-4 text-2xl font-bold text-white">Test nátijesi</h2>
        <p className="mt-4 text-4xl font-bold text-cyber-400">{result.score}%</p>
        <p className="mt-2 text-slate-400">
          {result.correct} / {result.total} durıs juwap
        </p>
        <p className={`mt-4 text-lg ${result.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
          {result.passed ? 'Tabıslı óttińiz!' : `Ótish ushın minimum ${result.passingScore}% kerek`}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <ClipboardCheck className="h-8 w-8 text-cyber-400" />
        {test.title}
      </h1>
      <p className="mt-2 text-slate-400">
        {test.questions.length} soraw · Ótish ballı: {test.passingScore}%
      </p>

      <div className="mt-8 space-y-8">
        {test.questions.map((q, qi) => (
          <div key={q.id} className="card">
            <p className="font-medium text-white">
              {qi + 1}. {q.text}
            </p>
            <div className="mt-4 space-y-2">
              {q.options.map((opt, oi) => (
                <label
                  key={opt}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition ${
                    answers[q.id] === oi
                      ? 'border-cyber-500 bg-cyber-500/10'
                      : 'border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={answers[q.id] === oi}
                    onChange={() => select(q.id, oi)}
                    className="text-cyber-500"
                  />
                  <span className="text-slate-300">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button type="button" onClick={submit} disabled={submitting} className="btn-primary mt-8">
        {submitting ? 'Jiberilbekte...' : 'Testti jiberiw'}
      </button>
    </div>
  );
}
