import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ListChecks } from 'lucide-react';
import { apiFetch } from '../api/client';

export default function LabDetail() {
  const { id } = useParams();
  const [lab, setLab] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    apiFetch('/api/labs').then((res) => {
      const found = res.data.find((l) => l.id === id);
      setLab(found);
    });
  }, [id]);

  const complete = async () => {
    await apiFetch('/api/progress/update', {
      method: 'POST',
      body: JSON.stringify({ type: 'lab', id }),
    });
    setDone(true);
  };

  if (!lab) return <p className="text-slate-400">Júklenbekte...</p>;

  return (
    <div>
      <Link to="/labs" className="inline-flex items-center gap-1 text-sm text-cyber-400 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Laboratoriyalarǵa qaytıw
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-white">{lab.title}</h1>
      <p className="mt-2 text-slate-400">{lab.description}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card">
          <h2 className="font-semibold text-white">Maqsatlar</h2>
          <ul className="mt-3 space-y-2">
            {lab.objectives?.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm text-slate-300">
                <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-cyber-400" />
                {o}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="font-semibold text-white">Qadamlar</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-300">
            {lab.steps?.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="card mt-6 border-amber-500/30 bg-amber-500/5">
        <p className="text-sm text-amber-200">
          Esletpe: Bul laboratoriya faqat oqıw simulyatsiyası. Haqıyqıy sistemalarga ruxsatsız
          kiriw qadaǵanlanǵan.
        </p>
      </div>

      <button type="button" onClick={complete} disabled={done} className="btn-primary mt-6">
        <CheckCircle className="h-4 w-4" />
        {done ? 'Tamamlandı' : 'Laboratoriyanı tamamladım'}
      </button>
    </div>
  );
}
