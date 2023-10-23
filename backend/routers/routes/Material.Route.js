import express from "express";
import MaterialController from "../../controllers/Material.Service.js";

const router = express.Router();

router.get("/", MaterialController.getMaterials);
router.post("/", MaterialController.createMaterial);
router.get("/:id", MaterialController.getMaterial);
router.put("/:id", MaterialController.updateMaterial);
router.delete("/:id", MaterialController.deleteMaterial);
router.get("/supplier/:id", MaterialController.getMaterialsBySupplierID);

export default router;
