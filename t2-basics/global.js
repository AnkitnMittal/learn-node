/* No need to explicitly mention Methods on Global Object */
console.log(global);

setTimeout(() => {
    console.log('This will run after 2 seconds');
    clearInterval(interval);
}, 3000);

const interval = setInterval(() => {
    console.log('This will run every 1 second');
}, 1000)

console.log(__dirname);
console.log(__filename);