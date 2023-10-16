import express from "express";
import MaterialOrderController from "../../controllers/MaterialOrder.Service.js";

const router = express.Router();

router.get("/", MaterialOrderController.getMaterialOrders);
router.post("/", MaterialOrderController.createMaterialOrder);
router.get("/getOne/:id", MaterialOrderController.getMaterialOrder);
router.put("/:id", MaterialOrderController.updateMaterialOrder);
router.delete("/:id", MaterialOrderController.deleteMaterialOrder);
router.get(
  "/materialID/:id",
  MaterialOrderController.getMaterialOrdersBySupplierID
);
router.get(
  "/supplierID/:id",
  MaterialOrderController.getMaterialOrdersByStatus
);
router.get(
  "/materialID/:materialID/supplierID/:supplierID",
  MaterialOrderController.getMaterialOrdersBySupplierIDAndStatus
);

export default router;
