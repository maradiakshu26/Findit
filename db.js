// ===========================
//  STEP 1 — Import packages
// ===========================

const mysql  = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// ===========================
//  STEP 2 — Create connection pool
// ===========================

const pool = mysql.createPool({
  host    : process.env.DB_HOST     || 'localhost',
  user    : process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME     || 'findit_db',
  waitForConnections: true,
  connectionLimit   : 10,
  queueLimit        : 0
});

// ===========================
//  STEP 3 — Convert to promises
// ===========================

const db = pool.promise();

// ===========================
//  STEP 4 — Test connection
// ===========================

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('✅ MySQL connected successfully!');
    connection.release();
  } catch (err) {
    console.error('❌ MySQL connection failed!');
    console.error('Reason : ' + err.message);
    console.error('Fix    : Check your .env file');
    process.exit(1);
  }
}

testConnection();

// ===========================
//  STEP 5 — Create tables
// ===========================

async function createTables() {
  try {

    // USERS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        name       VARCHAR(100)         NOT NULL,
        email      VARCHAR(150) UNIQUE  NOT NULL,
        password   VARCHAR(255)         NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table ready!');

    // ITEMS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS items (
        id          INT AUTO_INCREMENT PRIMARY KEY,
        user_id     INT,
        type        ENUM('lost','found') NOT NULL,
        title       VARCHAR(200)         NOT NULL,
        category    VARCHAR(100)         NOT NULL,
        description TEXT                 NOT NULL,
        location    VARCHAR(200)         NOT NULL,
        date        DATE                 NOT NULL,
        contact     VARCHAR(150)         NOT NULL,
        image_url   VARCHAR(500)         DEFAULT NULL,
        resolved    BOOLEAN              DEFAULT FALSE,
        created_at  TIMESTAMP            DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
          ON DELETE SET NULL
      )
    `);
    console.log('✅ Items table ready!');

    // REPORTS TABLE
    await db.query(`
      CREATE TABLE IF NOT EXISTS reports (
        id         INT AUTO_INCREMENT PRIMARY KEY,
        item_id    INT          NOT NULL,
        reason     VARCHAR(255) DEFAULT 'spam',
        created_at TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (item_id) REFERENCES items(id)
          ON DELETE CASCADE
      )
    `);
    console.log('✅ Reports table ready!');

  } catch (err) {
    console.error('❌ Error creating tables:', err.message);
  }
}

createTables();

// ===========================
//  STEP 6 — Export db
// ===========================

module.exports = db;