const express = require('express');
const helmet = require('helmet')
const port = 3000;
const app = express();
app.use(express.json());
app.use(helmet());
app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.listen(port, console.log(`Server Running on ${port}`));
