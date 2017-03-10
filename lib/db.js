const sqlite3 = require('sqlite3');

const db = new Promise((resolve, reject) => {
	let conn = new sqlite3.Database('data.sqlite');
	conn.serialize(() => {
		conn.run(
      `CREATE TABLE IF NOT EXISTS data
			(
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				username TEXT,
				email TEXT,
        publicKey TEXT,
				name TEXT,
				bio TEXT,
				avatar TEXT
			)`,
      err => err ? reject(err) : resolve(conn));
	});
});

module.exports = db;
