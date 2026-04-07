'use client';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      {/* gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800/80 to-amber-900/40" />

      {/* background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <span className="inline-block bg-amber-600/20 text-amber-300 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border border-amber-500/30">
          {t('hero.badge')}
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          {t('hero.heading')} <br />
          <span className="text-amber-400">{t('hero.headingAccent')}</span>
        </h1>
        <p className="text-stone-300 text-lg md:text-xl leading-relaxed mb-10">
          {t('hero.body')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#rooms"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
          >
            {t('hero.cta_rooms')}
          </a>
          <a
            href="#contact"
            className="border border-white/30 hover:border-white/60 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base backdrop-blur-sm"
          >
            {t('hero.cta_contact')}
          </a>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 text-xs">
        <span>{t('hero.scroll')}</span>
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
