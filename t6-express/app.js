const express = require('express');
const app = express();

/* Setting Server Routing using Express */
app.get("/", (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

app.get("/about", (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
});

app.get("/contact", (req, res) => {
    res.send('<p>Contact Page</p>');
});

app.get("/about-us", (req, res) => {
    res.redirect(301, '/about');
});

app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error)
        throw error;
    console.log(`Server running on port ${PORT}`);
});