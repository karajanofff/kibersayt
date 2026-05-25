import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { apiFetch } from '../api/client';
import { useTranslation } from '../context/LanguageContext';

function renderContent(text) {
  if (!text) return null;
  return text.split('\n\n').map((block, i) => {
    const lines = block.split('\n');
    const isList = lines.every((l) => l.startsWith('•') || l.startsWith('-') || /^\d+\./.test(l));
    if (isList) {
      return (
        <ul key={i} className="my-4 list-inside space-y-2 text-slate-300">
          {lines.map((line) => (
            <li key={line} className="leading-relaxed">
              {line.replace(/^[•\-]\s*/, '').replace(/^\d+\.\s*/, '')}
            </li>
          ))}
        </ul>
      );
    }
    if (block.startsWith('Qorındı:')) {
      return (
        <p key={i} className="my-4 rounded-lg border border-cyber-500/30 bg-cyber-500/10 p-4 font-medium text-cyber-200">
          {block}
        </p>
      );
    }
    return (
      <p key={i} className="my-4 leading-relaxed text-slate-300">
        {block}
      </p>
    );
  });
}

export default function Lesson() {
  const { t, formatDuration } = useTranslation();
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

  if (!lesson) return <p className="text-slate-400">{t('loading')}</p>;

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
      <p className="mt-1 text-sm text-slate-500">
        {t('lessonStudyTime')}: {formatDuration(lesson.duration)}
      </p>

      <article className="card mt-8 max-w-none">{renderContent(lesson.content)}</article>

      <button type="button" onClick={markComplete} disabled={done} className="btn-primary mt-6">
        <CheckCircle className="h-4 w-4" />
        {done ? t('lessonCompleted') : t('lessonComplete')}
      </button>
    </div>
  );
}
