const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

const Blog = require('./models/blog');

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/blogWebsite', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// App config
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Routes
app.get('/', async (req, res) => {
    const blogs = await Blog.find({});
    res.render('index', { blogs });
});

app.get('/blogs/new', (req, res) => {
    res.render('new');
});

app.post('/blogs', async (req, res) => {
    await Blog.create(req.body.blog);
    res.redirect('/');
});

app.get('/blogs/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('show', { blog });
});

app.get('/blogs/:id/edit', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('edit', { blog });
});

app.put('/blogs/:id', async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, req.body.blog);
    res.redirect('/');
});

app.delete('/blogs/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Blog Website running on http://localhost:3000');
});
