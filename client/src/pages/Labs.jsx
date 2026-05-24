import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical, Clock } from 'lucide-react';
import { apiFetch } from '../api/client';

const diffColors = {
  basta: 'bg-emerald-500/20 text-emerald-300',
  orta: 'bg-amber-500/20 text-amber-300',
  joqarı: 'bg-red-500/20 text-red-300',
};

const diffLabels = {
  basta: 'Baslanğısh',
  orta: 'Orta',
  joqarı: 'Joqarı',
};

export default function Labs() {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    apiFetch('/api/labs').then((res) => setLabs(res.data));
  }, []);

  return (
    <div>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <FlaskConical className="h-8 w-8 text-cyber-400" />
        Laboratoriya
      </h1>
      <p className="mt-2 text-slate-400">Qáwipsiz simulyatsiya mashqları — 5 laboratoriya</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {labs.map((lab) => (
          <Link key={lab.id} to={`/labs/${lab.id}`} className="card transition hover:border-cyber-500/50">
            <div className="flex items-start justify-between">
              <h2 className="text-lg font-semibold text-white">{lab.title}</h2>
              <span className={`rounded-full px-2 py-0.5 text-xs ${diffColors[lab.difficulty]}`}>
                {diffLabels[lab.difficulty] || lab.difficulty}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400">{lab.description}</p>
            <p className="mt-3 flex items-center gap-1 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              {lab.duration}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
