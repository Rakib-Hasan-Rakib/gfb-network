const express = require('express');
const pool = require('./db');
const path = require('path');
const cors = require('cors')

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors())

// Registration
app.post('/register', async (req, res) => {
  const { fullName, password,email } = req.body;
  try {
    await pool.query('INSERT INTO users (fullName, password,email) VALUES ($1, $2,$3)', [fullName, password,email]);
    res.json({ success: true, message: 'User registered' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});

// Login
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    if (result.rows.length > 0) {
      res.json({ success: true, user: { id: result.rows[0].id, email: result.rows[0].email } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});


app.post('/donate', async (req, res) => {
  const {donorName,donorEmail,donateAmount,donateCurrency,donateMessage} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO donations (donorName, donorEmail, donateAmount,donateCurrency,donateMessage) VALUES ($1, $2, $3,$4,$5) RETURNING *',
      [donorName,donorEmail, donateAmount, donateCurrency,donateMessage]
    );
    res.status(200).json({ success: true, donation: result.rows[0] });
  } catch (err) {
    console.error('Error inserting donation:', err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
});

app.get('/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

app.post('/services/:id/like', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('INSERT INTO likes (service_id) VALUES ($1)', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error liking service' });
  }
});

app.get('/services/:id/likes', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT COUNT(*) FROM likes WHERE service_id = $1', [id]);
    res.json({ likes: parseInt(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch likes' });
  }
});


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
