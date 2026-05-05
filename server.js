const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors({
  origin: ["https://www.prevent-ing.rs", "https://prevent-ing.rs"],
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
console.log("FORM DATA:", req.body);

return res.json({
  ok: true,
  message: "Radi bez emaila"
});

return res.json({
  ok: true,
  message: "Backend prima podatke"
});
    const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || "false") === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  socketTimeout: 20000
});

    await transporter.sendMail({
      from: `"Prevent-ing" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: "Novi upit",
      html: `
        <h3>Novi kontakt</h3>
        <p>${name}</p>
        <p>${email}</p>
        <p>${phone}</p>
        <p>${message}</p>
      `
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false });
  }
});

app.get("/", (req, res) => {
  res.send("Backend radi");
});
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({ ok: false, error: "Server error" });
});
app.listen(process.env.PORT || 3000);