import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { apiFetch } from '../api/client';

export default function TestPage() {
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    Promise.all([apiFetch('/api/tests'), apiFetch('/api/progress')])
      .then(([tests, prog]) => {
        setData(tests.data);
        setProgress(prog.data);
      })
      .catch(() => {});
  }, []);

  if (!data) return <p className="text-slate-400">Júklenbekte...</p>;

  return (
    <div>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <ClipboardCheck className="h-8 w-8 text-cyber-400" />
        Testler
      </h1>
      <p className="mt-2 text-slate-400">
        Hár tema boyınsha 10 soraw · Ótish ballı: {data.passingScore}% · Bólimler ajratılǵan
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {data.sections.map((section, i) => {
          const result = progress?.testScores?.[section.id];
          return (
            <Link
              key={section.id}
              to={`/test/${section.id}`}
              className="card flex items-center justify-between transition hover:border-cyber-500/50"
            >
              <div className="flex-1">
                <span className="text-xs font-medium text-purple-400">Tema {i + 1}/6</span>
                <h2 className="mt-1 text-lg font-semibold text-white">{section.title}</h2>
                <p className="mt-1 text-sm text-slate-400">{section.description}</p>
                <p className="mt-2 text-xs text-cyber-400">{section.questionCount} soraw</p>
                {result && (
                  <p
                    className={`mt-2 flex items-center gap-1 text-sm ${
                      result.passed ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Ball: {result.score}% {result.passed ? '· Ótti' : '· Qayta urınıń'}
                  </p>
                )}
              </div>
              <ChevronRight className="h-6 w-6 shrink-0 text-cyber-400" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
