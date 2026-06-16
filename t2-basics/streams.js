const fs = require('fs');

const readStream = fs.createReadStream('./t2-basics/docs/sample.txt', { encoding: 'utf8' });
const writeStream = fs.createWriteStream('./t2-basics/docs/sample-copy.txt');

readStream.on('data', (chunk) => {
    console.log('--- New Chunk ---');
    console.log(chunk);
    writeStream.write('\n--- New Chunk ---\n');
    writeStream.write(chunk);
});

/**
 * Pipe method is a more efficient way to pass data from
 * a readStream to a writeStream.
 */
readStream.pipe(writeStream);