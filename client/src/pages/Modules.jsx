import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, Globe, Lock, Cloud, AlertTriangle, Network } from 'lucide-react';
import { apiFetch } from '../api/client';
import { formatLessonCount } from '../i18n/kaa';

const icons = {
  shield: Shield,
  network: Network,
  globe: Globe,
  lock: Lock,
  alert: AlertTriangle,
  cloud: Cloud,
};

export default function Modules() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/modules')
      .then((res) => setModules(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-400">Júklenbekte...</p>;

  return (
    <div>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <BookOpen className="h-8 w-8 text-cyber-400" />
        Kurs modulları
      </h1>
      <p className="mt-2 text-slate-400">6 modul, hár birinde 5 sabaq</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {modules.map((mod) => {
          const Icon = icons[mod.icon] || BookOpen;
          return (
            <Link
              key={mod.id}
              to={`/modules/${mod.id}`}
              className="card flex gap-4 transition hover:border-cyber-500/50"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-cyber-500/20">
                <Icon className="h-7 w-7 text-cyber-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{mod.title}</h2>
                <p className="mt-1 text-sm text-slate-400">{mod.description}</p>
                <p className="mt-2 text-xs text-cyber-400">{formatLessonCount(mod.lessonCount)}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
