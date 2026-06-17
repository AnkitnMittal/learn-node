const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { loadEnvFile } = require('process');

loadEnvFile();
const app = express();
const PORT = 3000;

/* Connect To MongoDB Database */
mongoose
  .connect(process.env.DB_ENDPOINT)
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });

/* Register view engine */
app.set('view engine', 'ejs');

/* Middleware & Static Files */
app.use(express.static('public'));
app.use(morgan('dev'));

/* Custom Middleware Logging */
app.use((req, res, next) => {
  console.log('New request made:');
  console.log('Host: ', req.hostname);
  console.log('Path: ', req.path);
  console.log('Method: ', req.method);
  next();
});

/* Mongoose & Mongo Sandbox Routes */
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'My Second Blog',
    snippet: 'This is the snippet for my second blog post.',
    body: 'This is the body of my second blog post.',
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Get all blogs */
app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Get a single blog */
app.get('/single-blog', (req, res) => {
  Blog.findById('6a32ab63e13a8d97e6a71964')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

/* Setting Server Routing using Express */
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
