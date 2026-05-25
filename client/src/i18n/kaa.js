/** @deprecated — use useTranslation() from LanguageContext */
import { kaaMessages } from './messages.kaa';

export const kaa = kaaMessages;

export const resourceTypeLabels = {
  hújjet: 'Hújjet',
  hujjet: 'Hújjet',
  video: 'Video sabaq',
  standart: 'Standart',
  'qısqa qollanba': 'Qısqa qollanba',
  kurs: 'Kurs',
  maqala: 'Maqala',
  cheatsheet: 'Qısqa esletpe',
};

export function formatLessonCount(n) {
  return `${n} ${kaaMessages.lesson}`;
}

export function formatVideoCount(n) {
  return `${n} ${kaaMessages.video}`;
}

export function formatQuestionCount(n) {
  return `${n} ${kaaMessages.question}`;
}

export function formatDuration(duration) {
  if (!duration) return '';
  return String(duration).replace(/\bmin\b/gi, kaaMessages.minutes);
}
