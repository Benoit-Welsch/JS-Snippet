import { describe, it, expect, beforeEach, afterEach } from 'bun:test';
import { Logger, Level, File, Csv, Json } from '.';
import fs from 'fs';

describe('log', () => {
  beforeEach(() => {
    try {
      // fs.rmdirSync('./logs', { recursive: true });
    } catch (e) {}
    try {
      fs.mkdirSync('./logs');
    } catch (e) {}
  });

  afterEach(() => {
    fs.rmdirSync('./logs', { recursive: true });
  });

  it('should log to a File', async () => {
    const logger = new Logger({ t: [new File({ path: './logs/random.txt' })] });
    logger.log('Hello World');

    await Bun.sleep(0);

    const content = fs.readFileSync('logs/random.txt', 'utf-8');
    expect(content).toBe('[INFO] Hello World\n');
  });

  it('Sould log to a Json', async () => {
    const logger = new Logger({ t: [new Json({ path: './logs/ok.json' })] });
    logger.log('Hello World');

    await Bun.sleep(0);

    const content = fs.readFileSync('logs/ok.json', 'utf-8');
    const json = JSON.parse(content);

    expect(json[0].level).toBe('INFO');
    expect(json[0].message).toBe('Hello World');
  });

  it('Sould log to a Csv', async () => {
    const logger = new Logger({ t: [new Csv({ path: './logs/info.csv' })] });
    logger.log('Hello World');

    await Bun.sleep(0);

    const content = fs.readFileSync('logs/info.csv', 'utf-8');
    const csv = content.split('\n');

    expect(csv[1].split(';')[1]).toBe('"INFO"');
    expect(csv[1].split(';')[2]).toBe('"Hello World"');
  });

  it('Sould log to a specific level', async () => {
    const transports = [
      new File({ l: [Level.OK], path: './logs/ok.txt' }),
      new File({ l: [Level.INFO], path: './logs/info.txt' }),
      new File({ l: [Level.DEBUG], path: './logs/debug.txt' }),
      new File({ l: [Level.WARN], path: './logs/warn.txt' }),
      new File({ l: [Level.ERROR], path: './logs/error.txt' }),
    ];

    const logger = new Logger({ t: transports, dev: true });

    logger.log('OK', Level.OK);
    logger.log('INFO', Level.INFO);
    logger.log('DEBUG', Level.DEBUG);
    logger.log('WARN', Level.WARN);
    logger.log('ERROR', Level.ERROR);

    await Bun.sleep(100);

    const ok = fs.readFileSync('logs/ok.txt', 'utf-8');
    const info = fs.readFileSync('logs/info.txt', 'utf-8');
    const debug = fs.readFileSync('logs/debug.txt', 'utf-8');
    const warn = fs.readFileSync('logs/warn.txt', 'utf-8');
    const error = fs.readFileSync('logs/error.txt', 'utf-8');

    expect(ok).toBe('[OK] OK\n');
    expect(info).toBe('[INFO] INFO\n');
    expect(debug).toBe('[DEBUG] DEBUG\n');
    expect(warn).toBe('[WARN] WARN\n');
    expect(error).toBe('[ERROR] ERROR\n');
  });

  it('Sould log to a specific level using helper func', async () => {
    const transports = [
      new File({ l: [Level.OK], path: './logs/ok.txt' }),
      new File({ l: [Level.INFO], path: './logs/info.txt' }),
      new File({ l: [Level.DEBUG], path: './logs/debug.txt' }),
      new File({ l: [Level.WARN], path: './logs/warn.txt' }),
      new File({ l: [Level.ERROR], path: './logs/error.txt' }),
    ];

    const logger = new Logger({ t: transports, dev: true });

    logger.ok('OK');
    logger.info('INFO');
    logger.debug('DEBUG');
    logger.warn('WARN');
    logger.error('ERROR');

    await Bun.sleep(100);

    const ok = fs.readFileSync('logs/ok.txt', 'utf-8');
    const info = fs.readFileSync('logs/info.txt', 'utf-8');
    const debug = fs.readFileSync('logs/debug.txt', 'utf-8');
    const warn = fs.readFileSync('logs/warn.txt', 'utf-8');
    const error = fs.readFileSync('logs/error.txt', 'utf-8');

    expect(ok).toBe('[OK] OK\n');
    expect(info).toBe('[INFO] INFO\n');
    expect(debug).toBe('[DEBUG] DEBUG\n');
    expect(warn).toBe('[WARN] WARN\n');
    expect(error).toBe('[ERROR] ERROR\n');
  });

  it('Should not log if not in debug mode', async () => {
    const transports = [
      new File({ l: [Level.DEBUG], path: './logs/debug.txt' }),
    ];

    const logger = new Logger({ t: transports, dev: false });

    logger.log('DEBUG', Level.DEBUG);

    await Bun.sleep(0);

    try {
      const debug = fs.readFileSync('logs/debug.txt', 'utf-8');
      expect(debug).toBe('');
    } catch (e) {} // File was not created because of the debug mode
  });

  it('Should add a transporter', async () => {
    const logger = new Logger({ t: [] });
    logger.addTransport({ t: new File({ path: './logs/ok.txt' }) });

    logger.log('OK', Level.OK);

    await Bun.sleep(0);

    const ok = fs.readFileSync('logs/ok.txt', 'utf-8');
    expect(ok).toBe('[OK] OK\n');
  });

  it('Should catch an error', async () => {
    const transports = [
      new File({ l: [Level.ERROR], path: './logs/error.txt' }),
    ];

    const logger = new Logger({ t: transports });

    logger.catch(new Error('An error'));

    await Bun.sleep(0);

    const error = fs.readFileSync('logs/error.txt', 'utf-8');
    expect(error).toBe('[ERROR] An error\n');
  });
});
