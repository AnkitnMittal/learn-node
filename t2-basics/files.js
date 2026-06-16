const fs = require('fs');

/* Reading Files */
fs.readFile('./t2-basics/docs/blog.txt', (err, data) => {
    if (err)
        console.log(err);

    console.log(data.toString());
});

console.log('readFile() is asynchronous, so this line will be printed first');


/* Writing Files */
fs.writeFile('./t2-basics/docs/blog.txt', 'Hello World!', (err) => {
    if (err)
        console.log(err);
    console.log('File written successfully');
});


/* Directories */
if (fs.existsSync('./t2-basics/assets')) {
    fs.rmdir('./t2-basics/assets', (err) => {
        if (err)
            console.log(err);
        console.log('Directory deleted successfully');
    });
} else {
    fs.mkdir('./t2-basics/assets', (err) => {
        if (err)
            console.log(err);
        console.log('Directory created successfully');
    });
}


/* Deleting Files */
if (fs.existsSync('./t2-basics/docs/deleteme.txt')) {
    fs.unlink('./t2-basics/docs/deleteme.txt', (err) => {
        if (err)
            console.log(err);
        console.log('File deleted successfully');
    });
}