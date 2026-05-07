const Medicine = require("../models/medicine-model");

const CATEGORIES = [
  "Fever & Pain",
  "Stuffy Nose",
  "Cough",
  "Pain",
  "Nausea & Vomiting",
  "Diarrhoea",
  "Gastric Issues",
  "Stomach Pain",
  "Antibiotics",
  "Allergy & Asthma",
  "Rash",
  "Skin & Wound Care",
  "Ear & Eye",
  "Herbal"
];

exports.CATEGORIES = CATEGORIES;

// GET /davao — list + search
exports.index = async (req, res) => {
  const q = (req.query.q ?? "").trim();
  const category = (req.query.category ?? "").trim();

  try {
    const query = {};

    if (q) {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { brand_name: { $regex: q, $options: "i" } },
        { indication: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { notes: { $regex: q, $options: "i" } }
      ];
    }

    if (category) {
      query.category = category;
    }

    const medicines = await Medicine.search(query);
    const total = await Medicine.count();

    return res.render("index", {
      medicines,
      searchQuery: q,
      category,
      categories: CATEGORIES,
      total
    });
  } catch (err) {
    console.error("Error in index:", err);
    return res.render("error", { message: "Could not load medicines. Please try again." });
  }
};

// GET /davao/medicine/:id — detail
exports.detail = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.render("error", { message: "Medicine not found." });
    return res.render("detail", { medicine });
  } catch (err) {
    console.error("Error in detail:", err);
    return res.render("error", { message: "Could not load medicine details." });
  }
};

// GET /davao/add — render form
exports.getAdd = (req, res) => {
  return res.render("create", {
    medicine: {},
    errors: [],
    categories: CATEGORIES
  });
};

// POST /davao/add — create
exports.postAdd = async (req, res) => {
  const name = (req.body.name ?? "").trim();
  const brand_name = (req.body.brand_name ?? "").trim();
  const category = (req.body.category ?? "").trim();
  const form = (req.body.form ?? "").trim();
  const indication = (req.body.indication ?? "").trim();
  const frequency = (req.body.frequency ?? "").trim();
  const notes = (req.body.notes ?? "").trim();

  let precautions = req.body.precautions || [];
  if (!Array.isArray(precautions)) precautions = [precautions];
  precautions = precautions.map(p => p.trim()).filter(p => p);

  let age_ranges = req.body.age_range || [];
  let doses = req.body.dose || [];
  if (!Array.isArray(age_ranges)) age_ranges = [age_ranges];
  if (!Array.isArray(doses)) doses = [doses];

  const dosage = [];
  for (let i = 0; i < age_ranges.length; i++) {
    if (age_ranges[i] && doses[i]) {
      dosage.push({ age_range: age_ranges[i].trim(), dose: doses[i].trim() });
    }
  }

  const errors = [];
  if (!name) errors.push("Medicine name is required.");
  if (!category) errors.push("Category is required.");
  if (!indication) errors.push("Indication (what it's for) is required.");

  if (errors.length > 0) {
    return res.render("create", {
      medicine: { name, brand_name, category, form, indication, frequency, notes, dosage, precautions },
      errors,
      categories: CATEGORIES
    });
  }

  try {
    await Medicine.create({ name, brand_name, category, form, indication, frequency, notes, dosage, precautions });
    return res.redirect("/davao");
  } catch (err) {
    console.error("Error in postAdd:", err);
    errors.push("Failed to save medicine.");
    return res.render("create", {
      medicine: { name, brand_name, category, form, indication, frequency, notes, dosage, precautions },
      errors,
      categories: CATEGORIES
    });
  }
};

// GET /davao/medicine/:id/edit — render edit form
exports.getEdit = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.render("error", { message: "Medicine not found." });
    return res.render("edit", { medicine, errors: [], categories: CATEGORIES });
  } catch (err) {
    console.error("Error in getEdit:", err);
    return res.render("error", { message: "Could not load edit form." });
  }
};

// POST /davao/medicine/:id/edit — update
exports.postEdit = async (req, res) => {
  const id = req.params.id;
  const name = (req.body.name ?? "").trim();
  const brand_name = (req.body.brand_name ?? "").trim();
  const category = (req.body.category ?? "").trim();
  const form = (req.body.form ?? "").trim();
  const indication = (req.body.indication ?? "").trim();
  const frequency = (req.body.frequency ?? "").trim();
  const notes = (req.body.notes ?? "").trim();

  let precautions = req.body.precautions || [];
  if (!Array.isArray(precautions)) precautions = [precautions];
  precautions = precautions.map(p => p.trim()).filter(p => p);

  let age_ranges = req.body.age_range || [];
  let doses = req.body.dose || [];
  if (!Array.isArray(age_ranges)) age_ranges = [age_ranges];
  if (!Array.isArray(doses)) doses = [doses];

  const dosage = [];
  for (let i = 0; i < age_ranges.length; i++) {
    if (age_ranges[i] && doses[i]) {
      dosage.push({ age_range: age_ranges[i].trim(), dose: doses[i].trim() });
    }
  }

  const errors = [];
  if (!name) errors.push("Medicine name is required.");
  if (!category) errors.push("Category is required.");
  if (!indication) errors.push("Indication is required.");

  if (errors.length > 0) {
    const medicine = { _id: id, name, brand_name, category, form, indication, frequency, notes, dosage, precautions };
    return res.render("edit", { medicine, errors, categories: CATEGORIES });
  }

  try {
    await Medicine.update(id, { name, brand_name, category, form, indication, frequency, notes, dosage, precautions });
    return res.redirect(`/davao/medicine/${id}`);
  } catch (err) {
    console.error("Error in postEdit:", err);
    const medicine = { _id: id, name, brand_name, category, form, indication, frequency, notes, dosage, precautions };
    return res.render("edit", { medicine, errors: ["Failed to update medicine."], categories: CATEGORIES });
  }
};

// GET /davao/medicine/:id/delete — confirm delete
exports.getDelete = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.render("error", { message: "Medicine not found." });
    return res.render("delete", { medicine });
  } catch (err) {
    console.error("Error in getDelete:", err);
    return res.render("error", { message: "Could not load delete form." });
  }
};

// POST /davao/medicine/:id/delete — delete
exports.postDelete = async (req, res) => {
  try {
    await Medicine.remove(req.params.id);
    return res.redirect("/davao");
  } catch (err) {
    console.error("Error in postDelete:", err);
    return res.render("error", { message: "Failed to delete medicine." });
  }
};
