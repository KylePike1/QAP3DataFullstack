const express = require('express');
const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const db = pgp('postgresql://localhost:5432/QAP4 Database');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Example API endpoint
app.get('/api/menu_items', async (req, res) => {
  try {
    const items = await db.any('SELECT * FROM menu_items');
    res.json(items);
  } catch (error) {
    console.error('Error retrieving items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


//second


// Example: Create user API endpoint
app.post('/api/menu_items', async (req, res) => {
    const { name, price } = req.body;
    try {
      const newItem = await db.one('INSERT INTO menu_items(item_name, price) VALUES($1, $2) RETURNING *', [name, price]);
      res.json(newItem);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Example: Update user API endpoint
  app.put('/api/menu_items/:id', async (req, res) => {
    const itemId = parseInt(req.params.id);
    const { name, price } = req.body;
    try {
      const updatedItem = await db.one('UPDATE menu_items SET item_name = $1, price = $2 WHERE id = $3 RETURNING *', [name, price, itemId]);
      res.json(updatedItem);
    } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Example: Delete user API endpoint
  app.delete('/api/menu_items/:id', async (req, res) => {
    const itemId = parseInt(req.params.id);
    try {
      await db.none('DELETE FROM menu_items WHERE id = $1', [itemId]);
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  