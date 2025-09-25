# SQLi-lab
A simple SQL Injection testing lab with login and registration pages for learning purposes.

## Requirements
- Node.js
- npm

`package-lock.json` is included to ensure consistent dependency versions across machines.

## Setups to run
1. Clone the repository:
```bash
git clone https://github.com/yourusername/sqli-lab.git

cd sqli-lab
```

2. Install dependencies:\
```
npm install
```
4. Initialize and seed the local database (example : user.db):\
```
node setup_db.js
```

5. Start the vulnerable server:\
```
node app_vuln.js
```

6. Open the lab in your browser:\
- Login page: `http://localhost:3000/login`
- Register page: `http://localhost:3000/register`

## Usage 
1. Create test accounts with register.html or use default credintal:`admin/adminpass, alice/alice123, bob/bob456`.
2. Test authentication and SQLi payloads on login.html (example payload: ' OR '1'='1).
3. Observe server responses and logs to learn how queries are built and why they are vulnerable.

# Security warning
**This project is intentionally vulnerable. Do not deploy it on public servers or in production. Use it only on a local or isolated lab network.**

