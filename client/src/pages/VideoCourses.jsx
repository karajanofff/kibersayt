import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Video } from 'lucide-react';
import { apiFetch } from '../api/client';
import { formatVideoCount } from '../i18n/kaa';

export default function VideoCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/video-courses')
      .then((res) => setCourses(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-400">Júklenbekte...</p>;

  return (
    <div>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <Video className="h-8 w-8 text-cyber-400" />
        Video kurslar
      </h1>
      <p className="mt-2 text-slate-400">
        YouTube «Kiberxavfsizlik» playlisti — tematik video darslar
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <Link
            key={course.id}
            to={`/video-courses/${course.id}`}
            className="card flex gap-4 transition hover:border-cyber-500/50"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
              <Video className="h-7 w-7 text-red-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-white">{course.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{course.description}</p>
              <p className="mt-2 text-xs text-cyber-400">{formatVideoCount(course.videoCount)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
