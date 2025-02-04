import express from 'express';

import cors from 'cors';
const app = express();
const PORT = 3000;

app.use(cors());
app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' } as any);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
