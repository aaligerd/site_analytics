import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

// 🔒 Allowed domain
// const ALLOWED_ORIGIN = "https://yournewsdomain.com";

// Trust proxy (if behind nginx/cloudflare)
app.set("trust proxy", true);

// Parse JSON
app.use(express.json({ limit: "10kb" }));

// Strict CORS
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || origin === ALLOWED_ORIGIN) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["POST"],
//   })
// );

// Tracking endpoint
app.post("/s5/api/track", (req, res) => {
  const { url, headline, author, ts } = req.body;

  if (!url) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  // Get real IP
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const userAgent = req.headers["user-agent"] || "";

  // Basic bot filter
  if (/bot|crawler|spider|crawling/i.test(userAgent)) {
    return res.status(204).end();
  }

  console.log("New Hit:");
  console.log({
    url,
    headline,
    author,
    ip,
    userAgent,
    time: new Date().toISOString()
  });

  // 🔥 Later replace this with Redis increment

  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Tracking server running on port ${PORT}`);
});
