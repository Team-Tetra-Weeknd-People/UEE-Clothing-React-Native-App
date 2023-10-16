import express from "express";
import ItemOrderController from "../../controllers/ItemOrder.Service.js";

const router = express.Router();

router.get("/", ItemOrderController.getItemOrders);
router.post("/", ItemOrderController.createItemOrder);
router.get("/getOne/:id", ItemOrderController.getItemOrder);
router.put("/:id", ItemOrderController.updateItemOrder);
router.delete("/:id", ItemOrderController.deleteItemOrder);
router.get(
  "/manufacturerID/:id",
  ItemOrderController.getItemOrdersByManufacturerID
);
router.get("/status/:status", ItemOrderController.getItemOrdersByStatus);
router.get(
  "/manufacturerID/:id/status/:status",
  ItemOrderController.getItemOrdersByManufacturerIDAndStatus
);

export default router;
