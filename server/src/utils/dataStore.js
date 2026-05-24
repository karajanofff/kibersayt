import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', '..', 'data');

function readJson(name) {
  const path = join(DATA_DIR, `${name}.json`);
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function writeJson(name, data) {
  const path = join(DATA_DIR, `${name}.json`);
  writeFileSync(path, JSON.stringify(data, null, 2), 'utf-8');
}

export function getModules() {
  return readJson('modules');
}

export function getModuleById(id) {
  const modules = getModules();
  return modules.find((m) => m.id === id) || null;
}

export function getLessonById(id) {
  const modules = getModules();
  for (const mod of modules) {
    const lesson = mod.lessons?.find((l) => l.id === id);
    if (lesson) return { ...lesson, moduleId: mod.id, moduleTitle: mod.title };
  }
  return null;
}

export function getLabs() {
  return readJson('labs');
}

function getTestsData() {
  return readJson('tests');
}

export function getTestSections() {
  return getTestsData().sections.map(({ questions, ...section }) => ({
    ...section,
    questionCount: questions.length,
  }));
}

export function getTestSectionById(id) {
  const section = getTestsData().sections.find((s) => s.id === id);
  if (!section) return null;
  const questions = section.questions.map(({ correctIndex, ...q }) => q);
  return {
    id: section.id,
    moduleId: section.moduleId,
    title: section.title,
    description: section.description,
    passingScore: getTestsData().passingScore,
    questions,
  };
}

export function getTestSectionQuestions(id) {
  const section = getTestsData().sections.find((s) => s.id === id);
  return section?.questions || [];
}

export function getTestPassingScore() {
  return getTestsData().passingScore;
}

export function getCtfPublic() {
  return readJson('ctf').map(({ flag, hintAnswer, javobFormat, acceptAliases, ...rest }) => rest);
}

export function checkCtfFlag(id, submittedFlag) {
  const challenges = readJson('ctf');
  const challenge = challenges.find((c) => c.id === id);
  if (!challenge) return { valid: false, message: 'Masala tabılmadı' };
  const submitted = submittedFlag.trim().toLowerCase();
  const accepted = [challenge.flag, ...(challenge.acceptAliases || [])].map((f) =>
    f.toLowerCase()
  );
  const ok = accepted.includes(submitted);
  return {
    valid: ok,
    message: ok ? 'Flag durıs! Qutlıqlısız!' : 'Flag nadurıs. Qayta urınıp kóriń.',
    points: ok ? challenge.points : 0,
  };
}

export function getResources() {
  return readJson('resources');
}

export function getUsers() {
  return readJson('users');
}

export function findUserByEmail(email) {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function getProgress(userId) {
  const all = existsSync(join(DATA_DIR, 'progress.json'))
    ? readJson('progress')
    : {};
  return all[userId] || {
    completedLessons: [],
    completedLabs: [],
    testScore: null,
    testPassed: null,
    testScores: {},
    ctfSolved: [],
    moduleProgress: {},
  };
}

export function updateProgress(userId, updates) {
  const path = join(DATA_DIR, 'progress.json');
  const all = existsSync(path) ? readJson('progress') : {};
  const current = getProgress(userId);
  all[userId] = { ...current, ...updates, updatedAt: new Date().toISOString() };
  writeJson('progress', all);
  return all[userId];
}

export function getStudents() {
  return getUsers().filter((u) => u.role === 'student');
}
