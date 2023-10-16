import express from "express";
import MaterialQAComplaintController from "../../controllers/MaterialQAComplaint.Service.js";

const router = express.Router();

router.get("/", MaterialQAComplaintController.getMaterialQAComplains);
router.post("/", MaterialQAComplaintController.createMaterialQAComplain);
router.get("getOne/:id", MaterialQAComplaintController.getMaterialQAComplain);
router.put("/:id", MaterialQAComplaintController.updateMaterialQAComplain);
router.delete("/:id", MaterialQAComplaintController.deleteMaterialQAComplain);
router.get(
  "/materialOrderID/:id",
  MaterialQAComplaintController.getMaterialQAComplainsByMaterialOrderID
);

export default router;
