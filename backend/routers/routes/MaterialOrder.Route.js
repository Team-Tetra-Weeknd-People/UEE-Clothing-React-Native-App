import express from "express";
import MaterialOrderController from "../../controllers/MaterialOrder.Service.js";

const router = express.Router();

router.get("/", MaterialOrderController.getMaterialOrders);
router.post("/", MaterialOrderController.createMaterialOrder);
router.get("/getOne/:id", MaterialOrderController.getMaterialOrder);
router.put("/:id", MaterialOrderController.updateMaterialOrder);
router.delete("/:id", MaterialOrderController.deleteMaterialOrder);
router.get(
  "/supplierID/:id",
  MaterialOrderController.getMaterialOrdersBySupplierID
);
router.get(
  "/status/:status",
  MaterialOrderController.getMaterialOrdersByStatus
);
router.get(
  "/supplierID/:supplierID/status/:status",
  MaterialOrderController.getMaterialOrdersBySupplierIDAndStatus
);
router.get(
  "/manufacturerID/:id",
  MaterialOrderController.getMaterialOrdersByManufacturerID
);

export default router;
