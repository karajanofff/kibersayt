import { Link } from 'react-router-dom';
import { Shield, BookOpen, Video, FlaskConical, Flag, ArrowRight } from 'lucide-react';
import { kaa } from '../i18n/kaa';

export default function Landing() {
  const features = [
    { icon: BookOpen, title: kaa.featureModulesTitle, desc: kaa.featureModulesDesc },
    { icon: Video, title: kaa.featureVideoTitle, desc: kaa.featureVideoDesc },
    { icon: FlaskConical, title: kaa.featureLabsTitle, desc: kaa.featureLabsDesc },
    { icon: Flag, title: kaa.featureCtfTitle, desc: kaa.featureCtfDesc },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6">
        <div className="flex items-center gap-2 text-xl font-bold text-cyber-400">
          <Shield className="h-9 w-9" />
          {kaa.brand}
        </div>
        <div className="flex gap-3">
          <Link to="/login" className="btn-secondary">
            {kaa.navLogin}
          </Link>
          <Link to="/login" className="btn-primary">
            {kaa.landingStart}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-cyber-400">
          {kaa.landingTagline}
        </p>
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
          <span className="text-cyber-400">{kaa.brand}</span>
          <span className="mt-2 block text-3xl font-semibold text-slate-200 md:text-4xl">{kaa.landingSubtitle}</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400">
          {kaa.landingIntro}
          <span className="mt-3 block">{kaa.landingDisclaimer}</span>
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/login" className="btn-primary px-8 py-3 text-lg">
            {kaa.landingStart}
          </Link>
          <a href="#features" className="btn-secondary px-8 py-3 text-lg">
            {kaa.landingLearnMore}
          </a>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card text-left">
              <Icon className="mb-4 h-10 w-10 text-cyber-400" />
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="mt-2 text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t border-slate-800 px-4 py-12 text-center text-sm text-slate-500">
        <p className="font-medium text-slate-400">{kaa.footerCreators}</p>
        <p className="mt-2">{kaa.footerFullStack}</p>
        <p className="mt-1">{kaa.footerJunior}</p>
        <p className="mt-6 text-slate-600">{kaa.footerCopyright}</p>
        <p className="mt-4 text-xs text-slate-600">{kaa.footerDemoAccounts}</p>
      </section>
    </div>
  );
}
