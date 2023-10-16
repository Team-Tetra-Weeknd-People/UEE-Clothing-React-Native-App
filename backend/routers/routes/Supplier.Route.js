import express from "express";
import SupplierController from "../../controllers/Supplier.Service.js";

const router = express.Router();

router.get("/", SupplierController.getSuppliers);
router.post("/", SupplierController.createSupplier);
router.get("/:id", SupplierController.getSupplier);
router.put("/:id", SupplierController.updateSupplier);
router.delete("/:id", SupplierController.deleteSupplier);
router.post("/login", SupplierController.loginSupplier);

export default router;
