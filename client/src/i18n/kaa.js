/** Qaraqalpaq tilindegi platforma matnlari */
export const kaa = {
  loading: 'Júklenbekte...',
  lesson: 'sabaq',
  lessons: 'sabaq',
  video: 'video',
  videos: 'video',
  backToHome: 'Bas betke qaytıw',
  backToModules: 'Modullarǵa qaytıw',
  backToLabs: 'Laboratoriyalarǵa qaytıw',
  allModules: 'Barlıq modullar →',
  roleAdmin: 'Basqarıwshı',
  roleStudent: 'Oqıwshı',
  minutes: 'min',
};

export function formatLessonCount(n) {
  return `${n} ${kaa.lesson}`;
}

export function formatVideoCount(n) {
  return `${n} ${kaa.video}`;
}
