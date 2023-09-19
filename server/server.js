const express = require('express');
const app = express();
const cors = require('cors'); // Import the cors package

const port = 5000; 

// Use the cors middleware with options to allow requests from your React app
app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
