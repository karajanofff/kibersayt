import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ClipboardCheck, ArrowLeft } from 'lucide-react';
import { apiFetch } from '../api/client';
import { kaa, formatQuestionCount } from '../i18n/kaa';

export default function TestTake() {
  const { id } = useParams();
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setResult(null);
    setAnswers({});
    apiFetch(`/api/tests/${id}`).then((res) => setTest(res.data));
  }, [id]);

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
      alert(kaa.testsAnswerAll);
      return;
    }
    setSubmitting(true);
    try {
      const res = await apiFetch('/api/tests/submit', {
        method: 'POST',
        body: JSON.stringify({ testId: id, answers: payload }),
      });
      setResult(res.data);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!test) return <p className="text-slate-400">{kaa.loading}</p>;

  if (result) {
    return (
      <div>
        <Link to="/test" className="inline-flex items-center gap-1 text-sm text-cyber-400 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          {kaa.backToTests}
        </Link>
        <div className="card mx-auto mt-6 max-w-lg text-center">
          <ClipboardCheck className="mx-auto h-16 w-16 text-cyber-400" />
          <h2 className="mt-4 text-2xl font-bold text-white">{test.title}</h2>
          <p className="mt-1 text-sm text-slate-500">{kaa.testsResult}</p>
          <p className="mt-4 text-4xl font-bold text-cyber-400">{result.score}%</p>
          <p className="mt-2 text-slate-400">
            {result.correct} / {result.total} {kaa.testsCorrect}
          </p>
          <p className={`mt-4 text-lg ${result.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
            {result.passed
              ? kaa.testsPassSuccess
              : `${kaa.testsPassMin} ${result.passingScore}% kerek`}
          </p>
          <Link to="/test" className="btn-primary mt-6 inline-flex">
            {kaa.testsOther}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Link to="/test" className="inline-flex items-center gap-1 text-sm text-cyber-400 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        {kaa.backToTests}
      </Link>
      <h1 className="mt-4 flex items-center gap-2 text-3xl font-bold text-white">
        <ClipboardCheck className="h-8 w-8 text-cyber-400" />
        {test.title}
      </h1>
      <p className="mt-2 text-slate-400">{test.description}</p>
      <p className="mt-1 text-sm text-slate-500">
        {formatQuestionCount(test.questions.length)} · {kaa.testsSubtitle}: {test.passingScore}%
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
        {submitting ? kaa.submitting : kaa.testsSubmit}
      </button>
    </div>
  );
}
