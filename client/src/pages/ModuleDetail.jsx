import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, PlayCircle } from 'lucide-react';
import { apiFetch } from '../api/client';

export default function ModuleDetail() {
  const { id } = useParams();
  const [mod, setMod] = useState(null);

  useEffect(() => {
    apiFetch(`/api/modules/${id}`).then((res) => setMod(res.data));
  }, [id]);

  if (!mod) return <p className="text-slate-400">Júklenbekte...</p>;

  return (
    <div>
      <Link to="/modules" className="inline-flex items-center gap-1 text-sm text-cyber-400 hover:underline">
        <ArrowLeft className="h-4 w-4" />
        Modullarǵa qaytıw
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-white">{mod.title}</h1>
      <p className="mt-2 text-slate-400">{mod.description}</p>

      <div className="mt-8 space-y-3">
        {mod.lessons?.map((lesson, i) => (
          <Link
            key={lesson.id}
            to={`/lessons/${lesson.id}`}
            className="card flex items-center justify-between transition hover:border-cyber-500/50"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyber-500/20 text-cyber-300">
                {i + 1}
              </span>
              <div>
                <h3 className="font-medium text-white">{lesson.title}</h3>
                <p className="text-sm text-slate-500">{lesson.duration}</p>
              </div>
            </div>
            <PlayCircle className="h-6 w-6 text-cyber-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
