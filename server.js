
// ===========================
//  STEP 1 — Import packages
// ===========================

const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');
const path    = require('path');

// ===========================
//  STEP 2 — Load .env file
// ===========================

dotenv.config();

// ===========================
//  STEP 3 — Create app
// ===========================


const express = require('express');
const app = express();

app.use(express.static('public'));   // 👈 ADD HERE

// ===========================
//  STEP 4 — Add middleware
// ===========================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===========================
//  STEP 5 — Add routes
// ===========================

const authRouter  = require('./routes/auth');
const itemsRouter = require('./routes/items');

app.use('/api/auth',  authRouter);
app.use('/api/items', itemsRouter);

// ===========================
//  STEP 6 — Test route
// ===========================

app.get('/api/health', function(req, res) {
  res.json({
    success: true,
    message: 'FindIt server is running!'
  });
});

// ===========================
//  STEP 7 — Start server
// ===========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, function() {
  console.log('================================');
  console.log('🚀 FindIt server is running!');
  console.log('📡 Port : ' + PORT);
  console.log('🌍 URL  : http://localhost:' + PORT);
  console.log('================================');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
