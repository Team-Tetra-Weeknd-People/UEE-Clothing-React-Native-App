import express from "express";
import ManfacturerController from "../../controllers/Manufacturer.Service.js";

const router = express.Router();

router.get("/", ManfacturerController.getManufacturers);
router.post("/", ManfacturerController.createManufacturer);
router.get("/:id", ManfacturerController.getManufacturer);
router.put("/:id", ManfacturerController.updateManufacturer);
router.delete("/:id", ManfacturerController.deleteManufacturer);
router.post("/login", ManfacturerController.loginManufacturer);
router.post("/handleLevel/:id", ManfacturerController.handleLevel);

export default router;
