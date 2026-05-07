const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/medicine-controller");

// List + search
router.get("/", ctrl.index);

// Add
router.get("/add", ctrl.getAdd);
router.post("/add", ctrl.postAdd);

// Detail
router.get("/medicine/:id", ctrl.detail);

// Edit
router.get("/medicine/:id/edit", ctrl.getEdit);
router.post("/medicine/:id/edit", ctrl.postEdit);

// Delete
router.get("/medicine/:id/delete", ctrl.getDelete);
router.post("/medicine/:id/delete", ctrl.postDelete);

module.exports = router;
