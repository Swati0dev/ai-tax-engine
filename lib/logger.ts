/**
 * Simple centralized logger for Phase 9 Observability.
 * In a real production app, this could integrate with Sentry, Axiom, or Datadog.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'safety';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: unknown;
  timestamp: string;
}

export const logger = {
  log: (level: LogLevel, message: string, context?: unknown) => {
    const entry: LogEntry = {
      level,
      message,
      context,
      timestamp: new Date().toISOString(),
    };

    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      const colors = {
        info: '\x1b[32m', // Green
        warn: '\x1b[33m', // Yellow
        error: '\x1b[31m', // Red
        safety: '\x1b[35m', // Magenta
      };
      const reset = '\x1b[0m';
      console.log(`${colors[level]}[${level.toUpperCase()}]${reset} ${message}`, context || '');
    } else {
      // In production, we just use standard console methods for Vercel Logs
      if (level === 'error') {
        console.error(JSON.stringify(entry));
      } else if (level === 'warn') {
        console.warn(JSON.stringify(entry));
      } else {
        console.log(JSON.stringify(entry));
      }
    }
  },

  info: (message: string, context?: unknown) => logger.log('info', message, context),
  warn: (message: string, context?: unknown) => logger.log('warn', message, context),
  error: (message: string, context?: unknown) => logger.log('error', message, context),
  safety: (message: string, context?: unknown) => logger.log('safety', message, context),
};
