'use client';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-stone-900 dark:bg-stone-950 text-stone-400 dark:text-stone-500 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <span className="text-white font-semibold text-base">{t('footer.brand')}</span>
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        <div className="flex gap-6">
          <a href="#rooms" className="hover:text-white transition-colors">
            {t('footer.rooms')}
          </a>
          <a href="#amenities" className="hover:text-white transition-colors">
            {t('footer.amenities')}
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            {t('footer.contact')}
          </a>
        </div>
      </div>
    </footer>
  );
}
