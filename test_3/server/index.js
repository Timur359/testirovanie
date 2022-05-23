const express = require('express');
const cors = require('cors');
const todoRouter = require('./routes/todo.routes');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', todoRouter);

app.listen(PORT, console.log(`server is starten on port ${PORT}`));
