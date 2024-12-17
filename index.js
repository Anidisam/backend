const express = require("express");
const Postmark = require("postmark");
require("dotenv").config();

const app = express();
app.use(express.json()); // Middleware to parse JSON data

// Initialize Postmark Client
const client = new Postmark.ServerClient(process.env.POSTMARK_API_TOKEN);

// Simple Route
app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

// Endpoint to Send Invoice Email
app.post("/send-invoice", async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    await client.sendEmail({
      From: "youremail@example.com",
      To: email,
      Subject: subject || "Your Invoice",
      TextBody: message || "Here is your invoice.",
    });
    res.status(200).json({ message: "Invoice sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send invoice", details: error });
  }
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
