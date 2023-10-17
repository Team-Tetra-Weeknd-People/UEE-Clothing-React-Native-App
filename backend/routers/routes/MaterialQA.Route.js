import express from "express";
import MaterialQAController from "../../controllers/MaterialQA.Service.js";

const router = express.Router();

router.get("/", MaterialQAController.getMaterialQAs);
router.post("/", MaterialQAController.createMaterialQA);
router.get("/getOne/:id", MaterialQAController.getMaterialQA);
router.put("/:id", MaterialQAController.updateMaterialQA);
router.delete("/:id", MaterialQAController.deleteMaterialQA);
router.get("/materialID/:id", MaterialQAController.getMaterialQAByMaterialID);

export default router;
