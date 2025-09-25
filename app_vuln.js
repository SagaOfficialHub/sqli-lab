const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite3.Database('users.db');

// Serve login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve register page
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

// VULNERABLE LOGIN
app.post('/login', (req, res) => {
  const username = req.body.username || '';
  const password = req.body.password || '';
  const sql = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
  console.log('[vuln-login] SQL:', sql);

  db.get(sql, (err, row) => {
    if (err) return res.send("DB error");
    if (row) return res.send(`✅ Login successful! Welcome ${row.username}`);
    res.send('❌ Invalid credentials');
  });
});

// VULNERABLE REGISTER
app.post('/register', (req, res) => {
  const username = req.body.username || '';
  const password = req.body.password || '';
  const sql = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
  console.log('[vuln-register] SQL:', sql);

  db.run(sql, function(err) {
    if (err) return res.send("❌ Registration failed: " + err.message);
    res.send(`✅ User registered successfully! <a href="/login">Sign in</a>`);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Vulnerable SQLi lab running on http://localhost:${PORT}`));
