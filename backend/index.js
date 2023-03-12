const exprees = require("express");
const data = require("../db.json");

const PORT = process.env.PORT || 3001;
const app = exprees();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "X-Request-With, content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.listen(PORT, () => {
  console.log(`server starting is ${PORT}`);
});

app.get("/", (req, res) => {
  res.json(data);
});
