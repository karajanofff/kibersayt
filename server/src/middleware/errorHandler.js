export function notFound(req, res, next) {
  res.status(404).json({ success: false, message: 'API jol tabılmadı' });
}

export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === 'production' && status === 500
      ? 'Server qáteligi'
      : err.message || 'Server qáteligi';

  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }

  res.status(status).json({ success: false, message });
}
