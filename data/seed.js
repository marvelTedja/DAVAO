const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dns = require("node:dns");
const path = require("path");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config({ path: path.join(__dirname, "../config.env") });

const medicinesData = require("./medicines.json");

const dosageSchema = new mongoose.Schema({
  age_range: { type: String, default: "" },
  dose: { type: String, default: "" }
}, { _id: false });

const medicineSchema = new mongoose.Schema({
  name: String,
  brand_name: String,
  category: String,
  form: String,
  indication: String,
  dosage: [dosageSchema],
  frequency: String,
  precautions: [String],
  notes: String
}, { timestamps: true });

const Medicine = mongoose.model("Medicine", medicineSchema, "medicines");

async function seed() {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connected to MongoDB");

    const existing = await Medicine.countDocuments();
    if (existing > 0) {
      console.log(`Database already has ${existing} medicines. Dropping and re-seeding...`);
      await Medicine.deleteMany({});
    }

    await Medicine.insertMany(medicinesData);
    console.log(`✓ Seeded ${medicinesData.length} medicines successfully.`);
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
