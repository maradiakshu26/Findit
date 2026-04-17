const express = require('express');
const cors    = require('cors');
const dotenv  = require('dotenv');
const path    = require('path');

// Load environment variables
dotenv.config();

// Create app
const app = express();

// Serve frontend
app.use(express.static('public'));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRouter  = require('./routes/auth');
const itemsRouter = require('./routes/items');

app.use('/api/auth',  authRouter);
app.use('/api/items', itemsRouter);

// Test route
app.get('/api/health', function(req, res) {
  res.json({
    success: true,
    message: 'FindIt server is running!'
  });
});

// Start server (ONLY ONCE)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('================================');
  console.log('🚀 FindIt server is running!');
  console.log('📡 Port : ' + PORT);
  console.log('================================');
});
