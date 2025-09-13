/*
Express Resource Library - single-file example
Features:
- SQLite (sqlite3) storage (file: library.db)
- User registration, login, session-based auth
- Browse resources (articles, books, etc.)
- Add / edit / delete resources (only for logged-in users)
- Simple HTML frontend served from template literals (no view files)

Dependencies (install with npm):
  npm init -y
  npm install express sqlite3 bcrypt express-session body-parser connect-sqlite3

Run:
  node express_resource_library_server.js

Open http://localhost:3000
*/

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  store: new SQLiteStore({ db: 'sessions.sqlite' }),
  secret: process.env.SESSION_SECRET || 'change_this_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Create / open database
const dbFile = path.join(__dirname, 'library.db');
const db = new sqlite3.Database(dbFile);

// Initialize tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    display_name TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS resources (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    link TEXT,
    created_by INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(created_by) REFERENCES users(id)
  )`);

  // Seed a demo user and some resources if empty
  db.get('SELECT COUNT(*) AS cnt FROM users', (err, row) => {
    if (err) return console.error(err);
    if (row.cnt === 0) {
      const demoPass = 'password123';
      bcrypt.hash(demoPass, 10).then(hash => {
        db.run('INSERT INTO users (username, password_hash, display_name) VALUES (?, ?, ?)', ['demo', hash, 'Demo User']);
        console.log("Created demo user -> username: demo, password: password123");
      });
    }
  });

  db.get('SELECT COUNT(*) AS cnt FROM resources', (err, row) => {
    if (err) return console.error(err);
    if (row.cnt === 0) {
      const stmt = db.prepare('INSERT INTO resources (title, type, description, link, created_by) VALUES (?, ?, ?, ?, ?)');
      stmt.run('Understanding JavaScript Promises', 'article', 'A gentle guide to promises', 'https://example.com/promises', 1);
      stmt.run('Intro to Databases', 'book', 'Basics of SQL and NoSQL', 'https://example.com/databases', 1);
      stmt.run('Advanced CSS Techniques', 'article', 'Grid, Flexbox and more', '', 1);
      stmt.finalize();
      console.log('Seeded demo resources');
    }
  });
});

// Utility middleware
function requireLogin(req, res, next) {
  if (req.session && req.session.userId) return next();
  res.redirect('/login');
}

function renderPage(title, bodyHtml, req) {
  const user = req.session && req.session.username ? `<div>Signed in as ${escapeHtml(req.session.username)} — <a href="/account">Account</a> | <a href="/logout">Logout</a></div>` : `<div><a href="/login">Login</a> | <a href="/register">Register</a></div>`;
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <style>
    body{font-family: Arial,Helvetica,sans-serif;max-width:900px;margin:20px auto;padding:0 16px}
    header{display:flex;justify-content:space-between;align-items:center}
    .resource{border:1px solid #ddd;padding:12px;margin:8px 0;border-radius:6px}
    form input, form textarea, form select{display:block;width:100%;margin:6px 0;padding:8px}
    .small{font-size:0.9em;color:#666}
  </style>
</head>
<body>
  <header>
    <h1><a href="/">Resource Library</a></h1>
    ${user}
  </header>
  <hr/>
  ${bodyHtml}
  <hr/>
  <footer class="small">Built with Express & SQLite — single-file demo</footer>
</body>
</html>`;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text).replace(/[&<>\"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
}

// Routes
app.get('/', (req, res) => {
  const q = req.query.q ? `%${req.query.q}%` : '%';
  db.all('SELECT id, title, type, description, link FROM resources WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC', [q, q], (err, rows) => {
    if (err) return res.status(500).send('DB error');
    const list = rows.map(r => `
      <div class="resource">
        <h3><a href="/resource/${r.id}">${escapeHtml(r.title)}</a> <small>(${escapeHtml(r.type)})</small></h3>
        <p>${escapeHtml(r.description || '')}</p>
        ${r.link ? `<div><a href="${escapeHtml(r.link)}" target="_blank">Open link</a></div>` : ''}
      </div>`).join('\n');

    const addBtn = req.session && req.session.userId ? `<p><a href="/add">+ Add Resource</a></p>` : '';

    const body = `
      <form method="get" action="/">
        <input name="q" placeholder="Search resources" value="${escapeHtml(req.query.q || '')}" />
        <button type="submit">Search</button>
      </form>
      ${addBtn}
      ${list}
    `;

    res.send(renderPage('Browse Resources', body, req));
  });
});

app.get('/resource/:id', (req, res) => {
  const id = Number(req.params.id);
  db.get('SELECT r.*, u.username AS author FROM resources r LEFT JOIN users u ON r.created_by = u.id WHERE r.id = ?', [id], (err, row) => {
    if (err) return res.status(500).send('DB error');
    if (!row) return res.status(404).send('Not found');
    const editControls = req.session && req.session.userId ? `<p><a href="/resource/${id}/edit">Edit</a> | <a href="/resource/${id}/delete" onclick="return confirm('Delete?');">Delete</a></p>` : '';
    const body = `
      <h2>${escapeHtml(row.title)}</h2>
      <p class="small">Type: ${escapeHtml(row.type)} | Author: ${escapeHtml(row.author || 'unknown')} | Created: ${escapeHtml(row.created_at)}</p>
      <p>${escapeHtml(row.description || '')}</p>
      ${row.link ? `<p><a href="${escapeHtml(row.link)}" target="_blank">Open resource link</a></p>` : ''}
      ${editControls}
    `;
    res.send(renderPage(row.title, body, req));
  });
});

// Add resource
app.get('/add', requireLogin, (req, res) => {
  const body = `
    <h2>Add Resource</h2>
    <form method="post" action="/add">
      <label>Title</label>
      <input name="title" required />
      <label>Type (article/book/video/other)</label>
      <input name="type" required />
      <label>Description</label>
      <textarea name="description"></textarea>
      <label>Link (optional)</label>
      <input name="link" />
      <button type="submit">Add</button>
    </form>
  `;
  res.send(renderPage('Add Resource', body, req));
});

app.post('/add', requireLogin, (req, res) => {
  const { title, type, description, link } = req.body;
  db.run('INSERT INTO resources (title, type, description, link, created_by) VALUES (?, ?, ?, ?, ?)', [title, type, description, link, req.session.userId], function(err) {
    if (err) return res.status(500).send('DB error');
    res.redirect(`/resource/${this.lastID}`);
  });
});

// Edit resource
app.get('/resource/:id/edit', requireLogin, (req, res) => {
  const id = Number(req.params.id);
  db.get('SELECT * FROM resources WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).send('DB error');
    if (!row) return res.status(404).send('Not found');
    const body = `
      <h2>Edit Resource</h2>
      <form method="post" action="/resource/${id}/edit">
        <label>Title</label>
        <input name="title" required value="${escapeHtml(row.title)}" />
        <label>Type</label>
        <input name="type" required value="${escapeHtml(row.type)}" />
        <label>Description</label>
        <textarea name="description">${escapeHtml(row.description)}</textarea>
        <label>Link</label>
        <input name="link" value="${escapeHtml(row.link)}" />
        <button type="submit">Save</button>
      </form>
    `;
    res.send(renderPage('Edit Resource', body, req));
  });
});

app.post('/resource/:id/edit', requireLogin, (req, res) => {
  const id = Number(req.params.id);
  const { title, type, description, link } = req.body;
  db.run('UPDATE resources SET title = ?, type = ?, description = ?, link = ? WHERE id = ?', [title, type, description, link, id], function(err) {
    if (err) return res.status(500).send('DB error');
    res.redirect(`/resource/${id}`);
  });
});

// Delete resource
app.get('/resource/:id/delete', requireLogin, (req, res) => {
  const id = Number(req.params.id);
  db.run('DELETE FROM resources WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).send('DB error');
    res.redirect('/');
  });
});

// Auth routes
app.get('/register', (req, res) => {
  const body = `
    <h2>Register</h2>
    <form method="post" action="/register">
      <label>Username</label>
      <input name="username" required />
      <label>Display name</label>
      <input name="display_name" />
      <label>Password</label>
      <input type="password" name="password" required />
      <button type="submit">Create account</button>
    </form>
  `;
  res.send(renderPage('Register', body, req));
});

app.post('/register', (req, res) => {
  const { username, password, display_name } = req.body;
  if (!username || !password) return res.status(400).send('Missing');
  bcrypt.hash(password, 10).then(hash => {
    db.run('INSERT INTO users (username, password_hash, display_name) VALUES (?, ?, ?)', [username, hash, display_name || null], function(err) {
      if (err) return res.status(400).send('Username already exists');
      // Auto-login
      req.session.userId = this.lastID;
      req.session.username = username;
      res.redirect('/');
    });
  });
});

app.get('/login', (req, res) => {
  const body = `
    <h2>Login</h2>
    <form method="post" action="/login">
      <label>Username</label>
      <input name="username" required />
      <label>Password</label>
      <input type="password" name="password" required />
      <button type="submit">Login</button>
    </form>
  `;
  res.send(renderPage('Login', body, req));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get('SELECT id, password_hash FROM users WHERE username = ?', [username], (err, row) => {
    if (err) return res.status(500).send('DB error');
    if (!row) return res.status(400).send('Invalid credentials');
    bcrypt.compare(password, row.password_hash).then(ok => {
      if (!ok) return res.status(400).send('Invalid credentials');
      req.session.userId = row.id;
      req.session.username = username;
      res.redirect('/');
    });
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

// Account management
app.get('/account', requireLogin, (req, res) => {
  db.get('SELECT id, username, display_name FROM users WHERE id = ?', [req.session.userId], (err, row) => {
    if (err) return res.status(500).send('DB error');
    const body = `
      <h2>Account</h2>
      <form method="post" action="/account">
        <label>Display name</label>
        <input name="display_name" value="${escapeHtml(row.display_name)}" />
        <label>Change password (leave blank to keep)</label>
        <input type="password" name="password" />
        <button type="submit">Save</button>
      </form>
      <h3>Your resources</h3>
    `;
    db.all('SELECT id, title FROM resources WHERE created_by = ? ORDER BY created_at DESC', [row.id], (err2, rows) => {
      if (err2) return res.status(500).send('DB error');
      const list = rows.map(r => `<div><a href="/resource/${r.id}">${escapeHtml(r.title)}</a></div>`).join('\n') || '<div class="small">None yet</div>';
      res.send(renderPage('Account', body + list, req));
    });
  });
});

app.post('/account', requireLogin, (req, res) => {
  const { display_name, password } = req.body;
  if (password) {
    bcrypt.hash(password, 10).then(hash => {
      db.run('UPDATE users SET display_name = ?, password_hash = ? WHERE id = ?', [display_name || null, hash, req.session.userId], function(err) {
        if (err) return res.status(500).send('DB error');
        res.redirect('/account');
      });
    });
  } else {
    db.run('UPDATE users SET display_name = ? WHERE id = ?', [display_name || null, req.session.userId], function(err) {
      if (err) return res.status(500).send('DB error');
      res.redirect('/account');
    });
  }
});

// Simple REST API endpoints (JSON)
app.get('/api/resources', (req, res) => {
  db.all('SELECT id,title,type,description,link FROM resources ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: 'db' });
    res.json(rows);
  });
});

app.get('/api/resources/:id', (req, res) => {
  db.get('SELECT id,title,type,description,link FROM resources WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: 'db' });
    if (!row) return res.status(404).json({ error: 'not found' });
    res.json(row);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
