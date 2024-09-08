### Log

Easily log to various outputs.

```typescript
import { Log } from "lv00/toolkit";

const {Logger, Console, Level, File, Csv, Json} = Log;

// Define the endpoint of the log (transporter)
const logger = new Logger({
  t: [
    new Console(), // Log all levels to the console
    new File({ l: [Level.INFO], path: 'log.txt' }), // Log only INFO to a text based file
    new Csv({ l: [Level.ERROR], path: 'log.csv' }), // Log only ERROR to a CSV file
    new Json({ l: [Level.DEBUG], path: 'log.json' }), // Log only DEBUG to a JSON file
  ]
});

logger.log('Hello, World!'); // log to all transports registered for the level INFO
logger.log('Hello, World!', Level.ERROR); // log to all transports registered for the level ERROR

logger.info('Hello, World!');
logger.ok('Hello, World!');
logger.warn('Hello, World!');
logger.error('Hello, World!');
logger.debug('Hello, World!'); 

// Log an error
new Promise((_, reject) => {
  reject(new Error('Promise Error'));
}).catch((e) => logger.catch(e)) 
```
