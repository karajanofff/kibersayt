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

export function getTests() {
  const data = readJson('tests');
  return data.questions;
}

export function getTestMeta() {
  const data = readJson('tests');
  return { title: data.title, passingScore: data.passingScore };
}

export function getCtfPublic() {
  return readJson('ctf').map(({ flag, hintAnswer, javobFormat, ...rest }) => rest);
}

export function checkCtfFlag(id, submittedFlag) {
  const challenges = readJson('ctf');
  const challenge = challenges.find((c) => c.id === id);
  if (!challenge) return { valid: false, message: 'Masala tabılmadı' };
  const ok =
    submittedFlag.trim().toLowerCase() === challenge.flag.toLowerCase();
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
