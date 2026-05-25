import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ExternalLink, Tag } from 'lucide-react';
import { apiFetch } from '../api/client';
import { useTranslation } from '../context/LanguageContext';

export default function VideoWatch() {
  const { t, formatDuration, localizeVideo } = useTranslation();
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    apiFetch(`/api/videos/${id}`).then((res) => setVideo(res.data));
  }, [id]);

  const markComplete = async () => {
    try {
      await apiFetch('/api/progress/update', {
        method: 'POST',
        body: JSON.stringify({ type: 'video', id }),
      });
      setDone(true);
    } catch {
      /* ignore */
    }
  };

  if (!video) return <p className="text-slate-400">{t('loading')}</p>;

  const v = localizeVideo(video);
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const embedParams = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    ...(origin ? { origin } : {}),
  });
  const embedUrl = `https://www.youtube-nocookie.com/embed/${v.youtubeId}?${embedParams}`;

  return (
    <div>
      <Link
        to={`/video-courses/${v.courseId}`}
        className="inline-flex items-center gap-1 text-sm text-cyber-400 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        {v.courseTitle}
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-white">{v.title}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <span>
          {t('videoStudyTime')}: {formatDuration(v.duration)}
        </span>
        {v.theme && (
          <span className="inline-flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-cyber-300">
            <Tag className="h-3.5 w-3.5" />
            {v.theme}
          </span>
        )}
      </div>

      <div className="card mt-6 overflow-hidden p-0">
        <div className="relative aspect-video w-full bg-black">
          <iframe
            title={v.title}
            src={embedUrl}
            className="absolute inset-0 h-full w-full border-0"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {v.description && <p className="mt-6 leading-relaxed text-slate-300">{v.description}</p>}

      <a
        href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1 text-sm text-red-400 hover:underline"
      >
        <ExternalLink className="h-4 w-4" />
        {t('videoWatchOnYoutube')}
      </a>

      <button type="button" onClick={markComplete} disabled={done} className="btn-primary mt-6">
        <CheckCircle className="h-4 w-4" />
        {done ? t('videoCompleted') : t('videoWatched')}
      </button>
    </div>
  );
}
