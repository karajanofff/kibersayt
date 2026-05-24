/** Qaraqalpaq tilindegi platforma matnlari */
export const kaa = {
  loading: 'Júklenbekte...',
  lesson: 'sabaq',
  lessons: 'sabaq',
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
