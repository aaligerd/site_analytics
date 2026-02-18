const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// Allow both www and non-www if needed
const allowedOrigins = [
  "https://eisamay.com",
  "https://www.eisamay.com",
  "https://eisamay-demo-account.madrid.quintype.io"
];

app.use(express.text({ type: "*/*" }));

app.use(
  cors({
    origin: function (origin, callback) {
      // allow non-browser tools like curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST"],
    credentials: false
  })
);

app.use(express.text({ type: "*/*" }));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://eisamay-demo-account.madrid.quintype.io"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});




app.post("/s5/api/track", (req, res) => {
  try {
    const data = JSON.parse(req.body);
    console.log("Tracked:", data);
  } catch (e) {}

  res.status(204).end();
});


app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});