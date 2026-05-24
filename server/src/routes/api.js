import { Router } from 'express';
import { body, param } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validate } from '../middleware/validate.js';
import { authRequired } from '../middleware/auth.js';
import {
  getModules,
  getModuleById,
  getLessonById,
  getLabs,
  getTests,
  getTestMeta,
  getCtfPublic,
  checkCtfFlag,
  getResources,
  findUserByEmail,
  getProgress,
  updateProgress,
  getStudents,
} from '../utils/dataStore.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'CyberEdu API isleydi' });
});

router.get('/modules', (req, res) => {
  const modules = getModules().map(({ lessons, ...m }) => ({
    ...m,
    lessonCount: lessons?.length || 0,
  }));
  res.json({ success: true, data: modules });
});

router.get(
  '/modules/:id',
  param('id').notEmpty(),
  validate,
  (req, res) => {
    const mod = getModuleById(req.params.id);
    if (!mod) return res.status(404).json({ success: false, message: 'Modul tabılmadı' });
    res.json({ success: true, data: mod });
  }
);

router.get(
  '/lessons/:id',
  param('id').notEmpty(),
  validate,
  (req, res) => {
    const lesson = getLessonById(req.params.id);
    if (!lesson) return res.status(404).json({ success: false, message: 'Dars tabılmadı' });
    res.json({ success: true, data: lesson });
  }
);

router.get('/labs', (req, res) => {
  res.json({ success: true, data: getLabs() });
});

router.get('/tests', (req, res) => {
  const meta = getTestMeta();
  const questions = getTests().map(({ correctIndex, ...q }) => q);
  res.json({ success: true, data: { ...meta, questions } });
});

router.post(
  '/tests/submit',
  authRequired,
  body('answers').isArray({ min: 1 }),
  body('answers.*.questionId').notEmpty(),
  body('answers.*.selectedIndex').isInt({ min: 0 }),
  validate,
  (req, res) => {
    const questions = getTests();
    const { answers } = req.body;
    let correct = 0;
    const results = answers.map((a) => {
      const q = questions.find((x) => x.id === a.questionId);
      if (!q) return { questionId: a.questionId, correct: false };
      const ok = q.correctIndex === a.selectedIndex;
      if (ok) correct++;
      return { questionId: a.questionId, correct: ok };
    });
    const total = questions.length;
    const score = Math.round((correct / total) * 100);
    const meta = getTestMeta();
    const passed = score >= meta.passingScore;

    updateProgress(req.user.id, { testScore: score, testPassed: passed });

    res.json({
      success: true,
      data: { score, correct, total, passed, passingScore: meta.passingScore, results },
    });
  }
);

router.get('/ctf', (req, res) => {
  res.json({ success: true, data: getCtfPublic() });
});

router.get('/ctf/demo/headers', (req, res) => {
  res.set('X-Training-Flag', 'CYBER{header_found}');
  res.json({
    success: true,
    data: { message: 'Demo API javabı. Headerlardı tekseriń.', hint: 'X-Training-Flag' },
  });
});

router.get('/ctf/demo/port', (req, res) => {
  res.json({
    success: true,
    data: {
      port: 8080,
      status: 'open',
      message: 'Simulyatsiya: port 8080 ashıq. Flag formatı CYBER{...}',
    },
  });
});

router.get('/ctf/demo/metadata/:id', (req, res) => {
  if (req.params.id !== 'ctf-2') {
    return res.status(404).json({ success: false, message: 'Demo metadata tabılmadı' });
  }
  res.json({
    success: true,
    data: {
      author: 'meta_author_2026',
      created: '2026-01-15',
      hint: 'Flag formatı: CYBER{author_máni}',
    },
  });
});

router.post(
  '/ctf/check',
  authRequired,
  body('challengeId').notEmpty(),
  body('flag').isString().trim().notEmpty(),
  validate,
  (req, res) => {
    const result = checkCtfFlag(req.body.challengeId, req.body.flag);
    if (result.valid) {
      const progress = getProgress(req.user.id);
      const ctfSolved = [...new Set([...progress.ctfSolved, req.body.challengeId])];
      updateProgress(req.user.id, { ctfSolved });
    }
    res.json({ success: true, data: result });
  }
);

router.get('/resources', (req, res) => {
  res.json({ success: true, data: getResources() });
});

router.post(
  '/auth/login',
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: 4 }),
  validate,
  (req, res) => {
    const user = findUserByEmail(req.body.email);
    if (!user || user.password !== req.body.password) {
      return res.status(401).json({ success: false, message: 'Email yamasa parol nadurıs' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'cyberedu-dev-secret',
      { expiresIn: '7d' }
    );
    const { password, ...safeUser } = user;
    res.json({ success: true, data: { token, user: safeUser } });
  }
);

router.get('/progress', authRequired, (req, res) => {
  res.json({ success: true, data: getProgress(req.user.id) });
});

router.post(
  '/progress/update',
  authRequired,
  body('type').isIn(['lesson', 'lab', 'module']),
  body('id').notEmpty(),
  validate,
  (req, res) => {
    const progress = getProgress(req.user.id);
    const { type, id } = req.body;

    if (type === 'lesson') {
      const completedLessons = [...new Set([...progress.completedLessons, id])];
      updateProgress(req.user.id, { completedLessons });
    } else if (type === 'lab') {
      const completedLabs = [...new Set([...progress.completedLabs, id])];
      updateProgress(req.user.id, { completedLabs });
    } else if (type === 'module') {
      const moduleProgress = { ...progress.moduleProgress, [id]: 100 };
      updateProgress(req.user.id, { moduleProgress });
    }

    res.json({ success: true, data: getProgress(req.user.id) });
  }
);

router.get('/students', authRequired, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin huqıqı kerek' });
  }
  const students = getStudents().map(({ password, ...s }) => s);
  res.json({ success: true, data: students });
});

export default router;
