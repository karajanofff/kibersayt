import { Link } from 'react-router-dom';
import { Shield, BookOpen, FlaskConical, Flag, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
        <div className="flex items-center gap-2 text-xl font-bold text-cyber-400">
          <Shield className="h-9 w-9" />
          CyberEdu
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="btn-secondary">
            Kiris
          </Link>
          <Link to="/login" className="btn-primary">
            Baslaw
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-cyber-400">
          Kiberqáwipsizlik kursı platforması
        </p>
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
          CyberEdu — Kiberqáwipsizlikke{' '}
          <span className="text-cyber-400">professionallıq</span> bilan oqıń
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Modullar, laboratoriyalar, testler hám xavfsiz CTF mashqları arqalı kiberqáwipsizlik
          bilimlerin ósiriń. Barlıq mashqlar qonuniy oquw simulyatsiyası.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/login" className="btn-primary text-lg px-8 py-3">
            Platformaga kiriw
          </Link>
          <a href="#features" className="btn-secondary text-lg px-8 py-3">
            Kóbirek bilis
          </a>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: '6 kurs moduli',
              desc: 'Har birinde 3 dars — tarmoq, web, kripto hám basqalar.',
            },
            {
              icon: FlaskConical,
              title: '5 laboratoriya',
              desc: 'Xavfsiz simulyatsiya orayında amaliy mashqlar.',
            },
            {
              icon: Flag,
              title: '8 CTF challenge',
              desc: 'Flaglar serverda saqlanadı — etikalı oquw musobaqası.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card text-left">
              <Icon className="mb-4 h-10 w-10 text-cyber-400" />
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 text-center text-sm text-slate-500">
        <p>Demo admin: admin@cyberedu.local / admin123</p>
      </section>
    </div>
  );
}
