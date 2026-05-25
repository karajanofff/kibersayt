import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Video, FlaskConical, ClipboardCheck, Flag, TrendingUp } from 'lucide-react';
import { apiFetch } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { t, formatLessonCount, formatVideoCount, localizeModule, localizeVideoCourse } =
    useTranslation();
  const [progress, setProgress] = useState(null);
  const [modules, setModules] = useState([]);
  const [videoCourses, setVideoCourses] = useState([]);

  useEffect(() => {
    let active = true;

    async function load() {
      const tasks = [
        apiFetch('/api/modules').then((m) => active && setModules(m.data ?? [])),
        apiFetch('/api/video-courses').then((v) => active && setVideoCourses(v.data ?? [])),
        apiFetch('/api/progress')
          .then((p) => active && setProgress(p.data))
          .catch(() => active && setProgress(null)),
      ];
      await Promise.allSettled(tasks);
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const stats = useMemo(
    () => [
      {
        label: t('statCompletedLessons'),
        value: progress?.completedLessons?.length || 0,
        icon: BookOpen,
        color: 'text-cyber-400',
      },
      {
        label: t('statWatchedVideos'),
        value: progress?.completedVideos?.length || 0,
        icon: Video,
        color: 'text-red-400',
      },
      {
        label: t('statLabs'),
        value: progress?.completedLabs?.length || 0,
        icon: FlaskConical,
        color: 'text-emerald-400',
      },
      {
        label: t('statTestAvg'),
        value:
          progress?.testScores && Object.keys(progress.testScores).length > 0
            ? `${progress.testScore ?? '—'}%`
            : '—',
        icon: ClipboardCheck,
        color: 'text-amber-400',
      },
      {
        label: t('statCtfSolved'),
        value: progress?.ctfSolved?.length || 0,
        icon: Flag,
        color: 'text-purple-400',
      },
    ],
    [t, progress],
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">
        {t('dashboardWelcome')}, {user?.name}!
      </h1>
      <p className="mt-2 text-slate-400">{t('dashboardSubtitle')}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card">
            <Icon className={`h-8 w-8 ${color}`} />
            <p className="mt-3 text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
          <TrendingUp className="h-5 w-5 text-cyber-400" />
          {t('sectionModules')}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.slice(0, 6).map((mod) => {
            const m = localizeModule(mod);
            return (
              <Link key={m.id} to={`/modules/${m.id}`} className="card transition hover:border-cyber-500/50">
                <h3 className="font-semibold text-white">{m.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">{m.description}</p>
                <p className="mt-3 text-xs text-cyber-400">{formatLessonCount(m.lessonCount)}</p>
              </Link>
            );
          })}
        </div>
        <Link to="/modules" className="mt-4 inline-block text-cyber-400 hover:underline">
          {t('allModules')}
        </Link>
      </div>

      {videoCourses.length > 0 && (
        <div className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
            <Video className="h-5 w-5 text-red-400" />
            {t('sectionVideoCourses')}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {videoCourses.map((course) => {
              const c = localizeVideoCourse(course);
              return (
                <Link
                  key={c.id}
                  to={`/video-courses/${c.id}`}
                  className="card transition hover:border-red-500/50"
                >
                  <h3 className="font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-400">{c.description}</p>
                  <p className="mt-3 text-xs text-red-400">{formatVideoCount(c.videoCount)}</p>
                </Link>
              );
            })}
          </div>
          <Link to="/video-courses" className="mt-4 inline-block text-red-400 hover:underline">
            {t('allVideoCourses')}
          </Link>
        </div>
      )}
    </div>
  );
}
