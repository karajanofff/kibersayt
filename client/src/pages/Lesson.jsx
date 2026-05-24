import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { apiFetch } from '../api/client';

export default function Lesson() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    apiFetch(`/api/lessons/${id}`).then((res) => setLesson(res.data));
  }, [id]);

  const markComplete = async () => {
    try {
      await apiFetch('/api/progress/update', {
        method: 'POST',
        body: JSON.stringify({ type: 'lesson', id }),
      });
      setDone(true);
    } catch {
      /* ignore */
    }
  };

  if (!lesson) return <p className="text-slate-400">Júklenbekte...</p>;

  return (
    <div>
      <Link
        to={`/modules/${lesson.moduleId}`}
        className="inline-flex items-center gap-1 text-sm text-cyber-400 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        {lesson.moduleTitle}
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-white">{lesson.title}</h1>
      <p className="mt-1 text-sm text-slate-500">{lesson.duration}</p>

      <article className="card mt-8 prose prose-invert max-w-none">
        <p className="whitespace-pre-wrap leading-relaxed text-slate-300">{lesson.content}</p>
      </article>

      <button
        type="button"
        onClick={markComplete}
        disabled={done}
        className="btn-primary mt-6"
      >
        <CheckCircle className="h-4 w-4" />
        {done ? 'Tamamlandı' : 'Darsdı tamamladım'}
      </button>
    </div>
  );
}
