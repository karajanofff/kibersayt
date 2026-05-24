import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import apiRouter from './routes/api.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : process.env.RENDER_EXTERNAL_URL
    ? [process.env.RENDER_EXTERNAL_URL]
    : ['http://localhost:5173'];

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.use('/api', apiRouter);

const staticDirs = [
  join(__dirname, '..', 'client-dist'),
  join(__dirname, '..', '..', 'client', 'dist'),
];

const staticDir = staticDirs.find((d) => existsSync(join(d, 'index.html')));

if (staticDir) {
  app.use(
    express.static(staticDir, {
      maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
      setHeaders(res, filePath) {
        if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
          res.setHeader('Cache-Control', 'public, max-age=86400');
        }
      },
    })
  );
}

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  if (!staticDir) return next();
  res.sendFile(join(staticDir, 'index.html'), (err) => {
    if (err) next(err);
  });
});

app.use('/api', notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`CyberEdu server: http://localhost:${PORT}`);
  if (!staticDir && process.env.NODE_ENV === 'production') {
    console.warn('Frontend build topılmadı. npm run build isletiń.');
  }
});
