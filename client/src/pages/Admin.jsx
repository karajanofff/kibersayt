import { useEffect, useState } from 'react';
import { Settings, Users, BookOpen, Flag } from 'lucide-react';
import { apiFetch } from '../api/client';
import { kaa } from '../i18n/kaa';

const roleLabels = {
  admin: kaa.roleAdmin,
  student: kaa.roleStudent,
};

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ modules: 6, labs: 5, ctf: 4 });

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
        Basqarıwshı paneli
      </h1>
      <p className="mt-2 text-slate-400">Platforma basqarıwı — demo rejim</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Modullar', value: stats.modules, icon: BookOpen },
          { label: 'Laboratoriyalar', value: stats.labs, icon: Settings },
          { label: 'Kripto CTF', value: stats.ctf, icon: Flag },
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
          Demo oqıwshılar ({students.length})
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-700 text-slate-400">
                <th className="py-2 pr-4">Atı</th>
                <th className="py-2 pr-4">Elektron pochta</th>
                <th className="py-2">Roli</th>
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
        <p className="mt-4 text-xs text-slate-500">Demo oqıwshı paroli: student123</p>
      </div>
    </div>
  );
}
