import { Link } from 'react-router-dom';
import { Shield, BookOpen, Video, FlaskConical, Flag, ArrowRight } from 'lucide-react';

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
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-cyber-400">
          Kiberqáwipsizlik kursı platforması
        </p>
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
          <span className="text-cyber-400">CyberEdu</span>
          <span className="mt-2 block text-3xl font-semibold text-slate-200 md:text-4xl">
            — Kiberqáwipsizlikti kásiplik dárejede úyreniń
          </span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400">
          Modullar, laboratoriya jumısları, testler hám qáwipsiz CTF shınıǵıwları arqalı
          kiberqáwipsizlik boyınsha bilimlerińizdi arttırıń.
          <span className="mt-3 block">
            Barlıq tapsırmalar nızamlı oqıw simulyaciyası retinde dúzilgen.
          </span>
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/login" className="btn-primary text-lg px-8 py-3">
            Platformaǵa kiriw
          </Link>
          <a href="#features" className="btn-secondary text-lg px-8 py-3">
            Kóbirek biliw
          </a>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: '6 kurs moduli',
              desc: 'Hár birinde 5 sabaq — tolıq teoriya hám amaliy maǵlıwmat.',
            },
            {
              icon: Video,
              title: 'Video kurslar',
              desc: 'YouTube «Kiberxavfsizlik» playlisti — 5 tematik video dars.',
            },
            {
              icon: FlaskConical,
              title: '5 laboratoriya',
              desc: 'Qáwipsiz simulyatsiya ishinde amaliy jumıslar.',
            },
            {
              icon: Flag,
              title: '4 CTF — Kriptologiya',
              desc: 'Sezer, ROT13, Vejiner hám AES masalaları.',
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

      <section className="mx-auto max-w-7xl border-t border-slate-800 px-4 py-12 text-center text-sm text-slate-500">
        <p className="font-medium text-slate-400">Platforma tiykarshıları</p>
        <p className="mt-2">Full-Stack programmist: Bektemir Karajanov</p>
        <p className="mt-1">Junior programmist: Allayar Xamdullaev</p>
        <p className="mt-6 text-slate-600">
          © 2026 Kiberqáwipsizlik injiniringi kafedrasi. Barlıq huqıqlar qorǵalǵan.
        </p>
        <p className="mt-4 text-xs text-slate-600">
          Demo oqıwshı: Allayar007@student.local / Allayar123 · Demo basqarıwshı:
          admin@cyberedu.local / admin123
        </p>
      </section>
    </div>
  );
}
