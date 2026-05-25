import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  BookOpen,
  Video,
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
import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Layout() {
  const { user, logout, isAdmin } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = useMemo(
    () => [
      { to: '/dashboard', label: t('navDashboard'), icon: LayoutDashboard },
      { to: '/modules', label: t('navModules'), icon: BookOpen },
      { to: '/video-courses', label: t('navVideoCourses'), icon: Video },
      { to: '/labs', label: t('navLabs'), icon: FlaskConical },
      { to: '/test', label: t('navTests'), icon: ClipboardCheck },
      { to: '/ctf', label: t('navCtf'), icon: Flag },
      { to: '/resources', label: t('navResources'), icon: Library },
    ],
    [t],
  );

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
            <span>{t('brand')}</span>
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
                {t('navAdmin')}
              </NavLink>
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            {user ? (
              <>
                <span className="text-sm text-slate-400">{user.name}</span>
                <button type="button" onClick={handleLogout} className="btn-secondary text-sm">
                  <LogOut className="h-4 w-4" />
                  {t('navLogout')}
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary text-sm">
                <LogIn className="h-4 w-4" />
                {t('navLogin')}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="text-slate-300"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={t('menu')}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
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
                {t('navAdmin')}
              </NavLink>
            )}
            {user ? (
              <button type="button" onClick={handleLogout} className="mt-2 text-sm text-red-400">
                {t('navLogout')}
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="mt-2 block text-cyber-400">
                {t('navLogin')}
              </Link>
            )}
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-slate-800 py-10 text-center text-sm text-slate-500">
        <p className="font-medium text-slate-400">{t('footerCreators')}</p>
        <p className="mt-2">{t('footerFullStack')}</p>
        <p className="mt-1">{t('footerJunior')}</p>
        <p className="mt-6 text-slate-600">{t('footerCopyright')}</p>
      </footer>
    </div>
  );
}
