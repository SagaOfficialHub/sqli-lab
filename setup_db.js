// setup_db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db');

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS users");
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)");

  const stmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
  stmt.run("admin", "adminpass");
  stmt.run("alice", "alice123");
  stmt.run("bob", "bob456");
  stmt.finalize();
});

db.close();
console.log("✅ users.db created with test users: admin/adminpass, alice/alice123, bob/bob456");
