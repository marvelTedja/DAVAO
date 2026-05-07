const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("node:dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3000;

async function connectDB() {
  try {
    const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);
    await mongoose.connect(DB);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const medicineRoutes = require("./routes/medicines");
app.use("/davao", medicineRoutes);

app.get("/", (req, res) => res.redirect("/davao"));

function startServer() {
  app.listen(PORT, () => {
    console.log(`RGM Davao running on port ${PORT}`);
  });
}

connectDB().then(startServer);
