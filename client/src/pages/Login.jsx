import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogIn, GraduationCap, UserCog } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DEMO_ADMIN = { email: 'admin@cyberedu.local', password: 'admin123' };
const DEMO_STUDENT = { email: 'Allayar007@student.local', password: 'Allayar123' };

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const doLogin = async (loginEmail, loginPassword) => {
    setError('');
    setLoading(true);
    try {
      const user = await login(loginEmail, loginPassword);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doLogin(email, password);
  };

  const fillDemo = (demo) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setError('');
  };

  const quickLogin = async (demo) => {
    fillDemo(demo);
    await doLogin(demo.email, demo.password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="card w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-2 text-cyber-400">
          <Shield className="h-10 w-10" />
          <span className="text-2xl font-bold">CyberEdu</span>
        </div>
        <h1 className="text-center text-xl font-semibold text-white">Platformaga kiris</h1>

        <div className="mt-4 space-y-2 rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-sm">
          <p className="font-medium text-slate-300">Demo akkauntlar</p>
          <p className="text-slate-400">
            <span className="text-cyber-400">Oqıwshı:</span> {DEMO_STUDENT.email} / {DEMO_STUDENT.password}
          </p>
          <p className="text-slate-400">
            <span className="text-amber-400">Basqarıwshı:</span> {DEMO_ADMIN.email} / {DEMO_ADMIN.password}
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => quickLogin(DEMO_STUDENT)}
            className="btn-primary text-sm py-2"
          >
            <GraduationCap className="h-4 w-4" />
            Oqıwshı kirisi
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => quickLogin(DEMO_ADMIN)}
            className="btn-secondary text-sm py-2"
          >
            <UserCog className="h-4 w-4" />
            Basqarıwshı kirisi
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-400">Elektron pochta</label>
            <input
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@misal.local"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-400">Parol</label>
            <input
              type="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            <LogIn className="h-4 w-4" />
            {loading ? 'Kútipek...' : 'Kiris'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          <Link to="/" className="text-cyber-400 hover:underline">
            Bas betke qaytıw
          </Link>
        </p>
      </div>
    </div>
  );
}
