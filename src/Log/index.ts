import fs from 'fs';

import { CSV as CSVo } from '../index';

export enum Level {
  INFO,
  OK,
  WARN,
  ERROR,
  DEBUG,
}

export type Payload = {
  message: string;
  level: Level;
  meta?: any;
};

export class Logger {
  transports: Transporter[] = [];

  constructor(options: { t: Transporter[] }) {
    if (options.t) {
      this.transports = options.t;
    }
  }

  addTransport({ t }: { t: Transporter }) {
    if (this.transports === undefined) {
      this.transports = [];
    }
    this.transports.push(t);
  }

  log(message: string, l = Level.INFO) {
    this.transports.forEach((t) => {
      if (t.reacToLevels.includes(l)) t.send({ message, level: l });
    });
  }

  catch(err: Error) {
    this.transports.forEach((t) => {
      if (t.reacToLevels.includes(Level.ERROR)) t.catch(err);
    });
  }
}

export abstract class Transporter {
  protected level = {
    [Level.INFO]: {
      title: 'INFO',
      emoji: 'ℹ️ ',
    },
    [Level.OK]: {
      title: 'OK',
      emoji: '✅',
    },
    [Level.WARN]: {
      title: 'WARN',
      emoji: '🚨',
    },
    [Level.ERROR]: {
      title: 'ERROR',
      emoji: '❌',
    },
    [Level.DEBUG]: {
      title: 'DEBUG',
      emoji: '🐛',
    },
  };

  reacToLevels: Level[];

  constructor({ l }: { l: Level[] } = { l: [] }) {
    if (l === undefined || l.length === 0) {
      l = [Level.INFO, Level.OK, Level.WARN, Level.ERROR, Level.DEBUG];
    }
    this.reacToLevels = l;
  }

  abstract send(log: Payload): void;
  catch(err: Error) {
    this.send({ message: err.message, level: Level.ERROR });
  }
}

export class Console extends Transporter {
  async send(log: Payload) {
    const { message, level: l } = log;
    if (l === Level.DEBUG && process.env.NODE_ENV !== 'development') return;
    const { title, emoji } = this.level[l] || this.level[Level.ERROR];
    const out = `${emoji}[${title}] ${message}`;
    console.log(out);
  }

  async catch(err: Error) {
    this.send({ message: err.message, level: Level.ERROR });
  }
}

export class File extends Transporter {
  private path: string;

  constructor({ l, path }: { l?: Level[]; path: string }) {
    super({ l: l || [] });
    this.path = path;
  }

  send(log: Payload) {
    const { message, level: l } = log;
    if (l === Level.DEBUG && process.env.NODE_ENV !== 'development') return;
    const { title } = this.level[l] || this.level[Level.ERROR];
    const out = `[${title}] ${message}`;
    fs.appendFile(this.path, out + '\n', (err) => {
      if (err) throw err;
    });
  }

  catch(err: Error) {
    this.send({ message: err.message, level: Level.ERROR });
  }
}

export class Csv extends Transporter {
  private path: string;
  private csv: CSVo;

  constructor({ l, path }: { l?: Level[]; path: string }) {
    super({ l: l || [] });
    this.csv = new CSVo({ header: ['date', 'level', 'message', 'meta'] });
    this.path = path;
  }

  send(log: Payload) {
    const { message, level: l, meta } = log;
    const { title } = this.level[l] || this.level[Level.ERROR];
    const date = new Date().toISOString();

    this.csv.addLine([date, title, message, JSON.stringify(meta)]);

    if (!fs.existsSync(this.path) || fs.statSync(this.path).size === 0) {
      const csvString = this.csv.toString(';');
      fs.writeFileSync(this.path, csvString, 'utf8');
    } else {
      const csvString = '\r\n' + this.csv.toString(';', false);
      fs.appendFileSync(this.path, csvString, 'utf8');
    }

    this.csv.clear();
  }
}

export class Json extends Transporter {
  private path: string;

  constructor({ l, path }: { l?: Level[]; path: string }) {
    super({ l: l || [] });
    this.path = path;
  }

  send(log: Payload) {
    const { message, level: l, meta } = log;
    const { title } = this.level[l] || this.level[Level.ERROR];
    const date = new Date().toISOString();

    const logLine = {
      date,
      level: title,
      message,
      meta,
    };

    if (!fs.existsSync(this.path) || fs.statSync(this.path).size === 0) {
      fs.writeFileSync(this.path, JSON.stringify([logLine]), 'utf8');
    } else {
      const data = JSON.parse(fs.readFileSync(this.path, 'utf8'));
      data.push(logLine);
      fs.writeFileSync(this.path, JSON.stringify(data), 'utf8');
    }
  }
}
