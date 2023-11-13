// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@test.ljsjpac.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const YourModel = mongoose.model('YourModel', {
  id: Number,
  value: Number,
});

app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await YourModel.updateOne({ id: Number(id) }, { $set: { value: Math.random() * (7.7 - 7.1) + 7.1 } });
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
