require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views folder
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts for layout support
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Import routes
const profileRoutes = require('./routes/profile');
const skillsRoutes = require('./routes/skills');
const contactRoutes = require('./routes/contact');

// Use routes
app.use('/', profileRoutes);
app.use('/skills', skillsRoutes);
app.use('/contact', contactRoutes);

// Projects route (important!)
app.get("/projects", (req, res) => {
    res.render("projects", { 
        title: "Projects",
        activePage: "projects"
    });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


