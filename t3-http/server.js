const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const { loadEnvFile } = require('process');
loadEnvFile('../.env');

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
    /* Lodash */
    const num = _.random(0, 20);
    console.log(num);

    /* Set header */
    res.setHeader('Content-Type', 'text/html');

    /* Set HTML endpoint path based on Web URL */
    let path = './views';
    switch (req.url) {
        case '/':
            path += '/index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += '/about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '/404.html';
            res.statusCode = 404;
            break;
    }

    /* Read file and send response */
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(PORT, 'localhost', () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});