import { useEffect, useMemo, useState } from 'react';
import { Settings, Users, BookOpen, Flag } from 'lucide-react';
import { apiFetch } from '../api/client';
import { useTranslation } from '../context/LanguageContext';

export default function Admin() {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ modules: 6, labs: 5, ctf: 4 });

  const roleLabels = useMemo(
    () => ({
      admin: t('roleAdmin'),
      student: t('roleStudent'),
    }),
    [t],
  );

  useEffect(() => {
    apiFetch('/api/students')
      .then((res) => setStudents(res.data))
      .catch(() => {});
    Promise.all([
      apiFetch('/api/modules'),
      apiFetch('/api/labs'),
      apiFetch('/api/ctf'),
    ]).then(([m, l, c]) => {
      setStats({ modules: m.data.length, labs: l.data.length, ctf: c.data.length });
    });
  }, []);

  return (
    <div>
      <h1 className="flex items-center gap-2 text-3xl font-bold text-white">
        <Settings className="h-8 w-8 text-amber-400" />
        {t('adminTitle')}
      </h1>
      <p className="mt-2 text-slate-400">{t('adminSubtitle')}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: t('adminStatModules'), value: stats.modules, icon: BookOpen },
          { label: t('adminStatLabs'), value: stats.labs, icon: Settings },
          { label: t('adminStatCtf'), value: stats.ctf, icon: Flag },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="card border-amber-500/20">
            <Icon className="h-8 w-8 text-amber-400" />
            <p className="mt-2 text-2xl font-bold text-white">{value}</p>
            <p className="text-sm text-slate-400">{label}</p>
          </div>
        ))}
      </div>

      <div className="card mt-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-white">
          <Users className="h-5 w-5 text-amber-400" />
          {t('adminStudents')} ({students.length})
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="py-2 pr-4">{t('adminColName')}</th>
                <th className="py-2 pr-4">{t('adminColEmail')}</th>
                <th className="py-2">{t('adminColRole')}</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b border-slate-800">
                  <td className="py-3 pr-4 text-white">{s.name}</td>
                  <td className="py-3 pr-4 text-slate-400">{s.email}</td>
                  <td className="py-3 text-cyber-400">{roleLabels[s.role] || s.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-slate-500">{t('adminDemoPassword')}</p>
      </div>
    </div>
  );
}
