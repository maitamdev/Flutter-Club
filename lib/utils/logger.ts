// Logger utility
const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const
type LogLevel = keyof typeof LOG_LEVELS

const currentLevel: LogLevel = process.env.NODE_ENV === 'production' ? 'warn' : 'debug'

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel]
}

export const logger = {
  debug: (message: string, ...args: unknown[]) => { if (shouldLog('debug')) console.debug('[DEBUG]', message, ...args) },
  info: (message: string, ...args: unknown[]) => { if (shouldLog('info')) console.info('[INFO]', message, ...args) },
  warn: (message: string, ...args: unknown[]) => { if (shouldLog('warn')) console.warn('[WARN]', message, ...args) },
  error: (message: string, ...args: unknown[]) => { if (shouldLog('error')) console.error('[ERROR]', message, ...args) },
}
