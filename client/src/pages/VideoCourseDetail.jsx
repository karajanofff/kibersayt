import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, PlayCircle, ExternalLink, Tag } from 'lucide-react';
import { apiFetch } from '../api/client';
import { useTranslation } from '../context/LanguageContext';

export default function VideoCourseDetail() {
  const { t, formatDuration, localizeVideoCourse, localizeVideo } = useTranslation();
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    apiFetch(`/api/video-courses/${id}`).then((res) => setCourse(res.data));
  }, [id]);

  if (!course) return <p className="text-slate-400">{t('loading')}</p>;

  const c = localizeVideoCourse(course);

  return (
    <div>
      <Link
        to="/video-courses"
        className="inline-flex items-center gap-1 text-sm text-cyber-400 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('backToVideoCourses')}
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-white">{c.title}</h1>
      <p className="mt-2 text-slate-400">{c.description}</p>
      {c.playlistUrl && (
        <a
          href={c.playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1 text-sm text-red-400 hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          {t('videoFullPlaylist')}
        </a>
      )}

      <div className="mt-8 space-y-3">
        {c.videos?.map((video, i) => {
          const v = localizeVideo(video);
          return (
            <Link
              key={v.id}
              to={`/videos/${v.id}`}
              className="card flex items-center justify-between gap-4 transition hover:border-cyber-500/50"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-300">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="font-medium text-white">{v.title}</h3>
                  <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
                    <span>{formatDuration(v.duration)}</span>
                    {v.theme && (
                      <span className="inline-flex items-center gap-1 rounded bg-slate-800 px-2 py-0.5 text-xs text-cyber-300">
                        <Tag className="h-3 w-3" />
                        {v.theme}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <PlayCircle className="h-6 w-6 shrink-0 text-red-400" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
