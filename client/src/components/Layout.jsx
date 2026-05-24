import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  ClipboardCheck,
  Flag,
  Library,
  Settings,
  LogIn,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const nav = [
  { to: '/dashboard', label: 'Basqarıw paneli', icon: LayoutDashboard },
  { to: '/modules', label: 'Kurs modulları', icon: BookOpen },
  { to: '/labs', label: 'Laboratoriya', icon: FlaskConical },
  { to: '/test', label: 'Test', icon: ClipboardCheck },
  { to: '/ctf', label: 'Kripto CTF', icon: Flag },
  { to: '/resources', label: 'Resurslar', icon: Library },
];

export default function Layout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-bold text-cyber-400">
            <Shield className="h-8 w-8" />
            <span>CyberEdu</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition ${
                    isActive ? 'bg-cyber-500/20 text-cyber-300' : 'text-slate-400 hover:text-slate-100'
                  }`
                }
              >
                <Icon className="h-4 w-4" />
                {label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition ${
                    isActive ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-amber-300'
                  }`
                }
              >
                <Settings className="h-4 w-4" />
                Basqarıw
              </NavLink>
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <span className="text-sm text-slate-400">{user.name}</span>
                <button type="button" onClick={handleLogout} className="btn-secondary text-sm">
                  <LogOut className="h-4 w-4" />
                  Shıǵıw
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary text-sm">
                <LogIn className="h-4 w-4" />
                Kiris
              </Link>
            )}
          </div>

          <button
            type="button"
            className="md:hidden text-slate-300"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menyu"
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-800 px-4 py-3 md:hidden">
            {nav.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-slate-300"
              >
                {label}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink to="/admin" onClick={() => setMobileOpen(false)} className="block py-2 text-amber-300">
                Basqarıw
              </NavLink>
            )}
            {user ? (
              <button type="button" onClick={handleLogout} className="mt-2 text-sm text-red-400">
                Shıǵıw
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="mt-2 block text-cyber-400">
                Kiris
              </Link>
            )}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-slate-800 py-8 text-center text-sm text-slate-500">
        <p>© 2026 CyberEdu — Kiberqáwipsizlik kursı platforması</p>
        <p className="mt-1">Barlıq tapsırmalar nızamlı oqıw simulyaciyası retinde dúzilgen.</p>
      </footer>
    </div>
  );
}
