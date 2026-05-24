import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Video, FlaskConical, ClipboardCheck, Flag, TrendingUp } from 'lucide-react';
import { apiFetch } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { kaa, formatLessonCount, formatVideoCount } from '../i18n/kaa';

export default function Dashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState(null);
  const [modules, setModules] = useState([]);
  const [videoCourses, setVideoCourses] = useState([]);

  useEffect(() => {
    Promise.all([
      apiFetch('/api/progress'),
      apiFetch('/api/modules'),
      apiFetch('/api/video-courses'),
    ])
      .then(([p, m, v]) => {
        setProgress(p.data);
        setModules(m.data);
        setVideoCourses(v.data);
      })
      .catch(() => {});
  }, []);

  const stats = [
    {
      label: kaa.statCompletedLessons,
      value: progress?.completedLessons?.length || 0,
      icon: BookOpen,
      color: 'text-cyber-400',
    },
    {
      label: kaa.statWatchedVideos,
      value: progress?.completedVideos?.length || 0,
      icon: Video,
      color: 'text-red-400',
    },
    {
      label: kaa.statLabs,
      value: progress?.completedLabs?.length || 0,
      icon: FlaskConical,
      color: 'text-emerald-400',
    },
    {
      label: kaa.statTestAvg,
      value:
        progress?.testScores && Object.keys(progress.testScores).length > 0
          ? `${progress.testScore ?? '—'}%`
          : '—',
      icon: ClipboardCheck,
      color: 'text-amber-400',
    },
    {
      label: kaa.statCtfSolved,
      value: progress?.ctfSolved?.length || 0,
      icon: Flag,
      color: 'text-purple-400',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">
        {kaa.dashboardWelcome}, {user?.name}!
      </h1>
      <p className="mt-2 text-slate-400">{kaa.dashboardSubtitle}</p>

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
          {kaa.sectionModules}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.slice(0, 6).map((mod) => (
            <Link key={mod.id} to={`/modules/${mod.id}`} className="card transition hover:border-cyber-500/50">
              <h3 className="font-semibold text-white">{mod.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-400">{mod.description}</p>
              <p className="mt-3 text-xs text-cyber-400">{formatLessonCount(mod.lessonCount)}</p>
            </Link>
          ))}
        </div>
        <Link to="/modules" className="mt-4 inline-block text-cyber-400 hover:underline">
          {kaa.allModules}
        </Link>
      </div>

      {videoCourses.length > 0 && (
        <div className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
            <Video className="h-5 w-5 text-red-400" />
            {kaa.sectionVideoCourses}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {videoCourses.map((course) => (
              <Link
                key={course.id}
                to={`/video-courses/${course.id}`}
                className="card transition hover:border-red-500/50"
              >
                <h3 className="font-semibold text-white">{course.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-slate-400">{course.description}</p>
                <p className="mt-3 text-xs text-red-400">{formatVideoCount(course.videoCount)}</p>
              </Link>
            ))}
          </div>
          <Link to="/video-courses" className="mt-4 inline-block text-red-400 hover:underline">
            {kaa.allVideoCourses}
          </Link>
        </div>
      )}
    </div>
  );
}
