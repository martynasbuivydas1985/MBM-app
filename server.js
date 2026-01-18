const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, "public");

app.use(express.static(publicDir));

app.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "mbm-app",
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`MBM app running at http://localhost:${port}`);
});
