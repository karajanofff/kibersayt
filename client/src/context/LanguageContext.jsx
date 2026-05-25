import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  getLocale as readStoredLocale,
  getMessages,
  setStoredLocale,
  translateKey,
} from '../i18n/store';
import {
  localizeCtf,
  localizeLab,
  localizeModule,
  localizeResource,
  localizeTestSection,
  localizeVideo,
  localizeVideoCourse,
} from '../i18n/content';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(readStoredLocale);

  const setLocale = useCallback((next) => {
    const value = next === 'uz' ? 'uz' : 'kaa';
    setStoredLocale(value);
    setLocaleState(value);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'uz' ? 'uz' : 'kaa';
  }, [locale]);

  const messages = useMemo(() => getMessages(locale), [locale]);

  const t = useCallback((key) => translateKey(key, locale), [locale]);

  const formatLessonCount = useCallback(
    (n) => `${n} ${messages.lesson}`,
    [messages.lesson],
  );

  const formatVideoCount = useCallback(
    (n) => `${n} ${messages.video}`,
    [messages.video],
  );

  const formatQuestionCount = useCallback(
    (n) => `${n} ${messages.question}`,
    [messages.question],
  );

  const formatDuration = useCallback(
    (duration) => {
      if (!duration) return '';
      const unit = locale === 'uz' ? 'daq' : 'mın';
      return String(duration).replace(/\bmin\b/gi, unit).replace(/\bmın\b/gi, unit);
    },
    [locale],
  );

  const getResourceTypeLabel = useCallback(
    (type) => {
      const key = String(type || '').toLowerCase();
      const map = {
        hújjet: messages.resourceTypeHujjet,
        hujjet: messages.resourceTypeHujjet,
        video: messages.resourceTypeVideo,
        standart: messages.resourceTypeStandart,
        'qısqa qollanba': messages.resourceTypeQollanba,
        kurs: messages.resourceTypeKurs,
        maqala: messages.resourceTypeMaqala,
        cheatsheet: messages.resourceTypeCheatsheet,
      };
      return map[key] || type;
    },
    [messages],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      messages,
      formatLessonCount,
      formatVideoCount,
      formatQuestionCount,
      formatDuration,
      getResourceTypeLabel,
      localizeModule: (mod) => localizeModule(locale, mod),
      localizeTestSection: (section) => localizeTestSection(locale, section),
      localizeLab: (lab) => localizeLab(locale, lab),
      localizeVideoCourse: (course) => localizeVideoCourse(locale, course),
      localizeVideo: (video) => localizeVideo(locale, video),
      localizeCtf: (challenge) => localizeCtf(locale, challenge),
      localizeResource: (resource) => localizeResource(locale, resource),
    }),
    [
      locale,
      setLocale,
      t,
      messages,
      formatLessonCount,
      formatVideoCount,
      formatQuestionCount,
      formatDuration,
      getResourceTypeLabel,
    ],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }
  return ctx;
}
