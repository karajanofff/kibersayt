import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="card w-full max-w-md">
        <div className="mb-6 flex items-center justify-center gap-2 text-cyber-400">
          <Shield className="h-10 w-10" />
          <span className="text-2xl font-bold">CyberEdu</span>
        </div>
        <h1 className="text-center text-xl font-semibold text-white">Platformaga kiris</h1>
        <p className="mt-2 text-center text-sm text-slate-400">
          Demo admin: admin@cyberedu.local / admin123
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm text-slate-400">Email</label>
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
